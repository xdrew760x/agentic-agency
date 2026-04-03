# Nextech API Integration for Custom Booking Form -- Research Report
Date: 2026-04-02

## Executive Summary

- Nextech exposes two FHIR-based REST APIs (Select API and Practice+ API) with full appointment scheduling capabilities including slot availability queries, appointment creation, and inline prospect creation -- making a custom booking form technically feasible
- Authentication uses OAuth 2.0 via Microsoft Azure AD; credentials are not self-service and must be requested through Nextech's developer portal or the practice's Client Success Manager
- A lower-effort alternative exists: **NextPatient** is Nextech's endorsed third-party scheduling widget that handles availability, booking, duplicate patient matching, and consent forms out of the box -- worth evaluating before committing to a custom API build
- HIPAA compliance is a critical concern: any public-facing form collecting PHI must use TLS, a BAA must be in place with Nextech (available at nextech.com/legal/BAA), and the API proxy architecture must ensure no PHI is exposed client-side

---

## Key Findings

### 1. API Access and Developer Portal

- **Developer portal**: [nextech.com/developers-portal](https://www.nextech.com/developers-portal)
- **No self-service signup**: You cannot create API credentials yourself. The process requires:
  1. Fill out the connection request form on the developer portal
  2. Nextech reviews and approves your application
  3. Credentials are provisioned by a Nextech representative
- **Practice-side activation**: The practice must be a Nextech customer. A Super User on the practice's Nextech Community Portal (nextech.my.site.com/nextech) must order API access under the "ORDER NOW" tab
- **Support contact**: code.nextech@nextech.com for API-specific questions
- **Two API variants** exist depending on the practice's Nextech product:
  - **Select API** (for Nextech Select/NexCloud): Base URL `https://select.nextech-api.com/api`
  - **Practice+ API**: Base URL `https://api.pm.nextech.com/api`
  - Both are FHIR STU3 (3.0.1) compliant, JSON only, functionally similar but with slightly different auth flows

### 2. Authentication

- **Protocol**: OAuth 2.0 via Microsoft Azure AD
- **Token endpoint**: `POST https://login.microsoftonline.com/nextech-api.com/oauth2/token`
- **Select API** uses Resource Owner Password Credentials grant:
  - Parameters: `grant_type=password`, `client_id`, `username`, `password`, `resource`
  - Initial credentials expire on first login and must be reset at portal.azure.com
  - Returns a 1-hour access token + 14-day refresh token
- **Practice+ API** uses Client Credentials grant:
  - Parameters: `grant_type=client_credentials`, `client_id` (Partner ID), `client_secret` (Partner Secret), `resource`
  - Simpler server-to-server flow -- better suited for a backend service
- **All requests require two headers**:
  - `Authorization: Bearer {access_token}`
  - `nx-practice-id: {practice_identifier}` (unique per practice)
- **Critical implication**: OAuth tokens must NEVER be exposed to the browser. A backend proxy/serverless function is mandatory.

### 3. Appointment and Scheduling Endpoints

#### Querying Available Slots

- **Endpoint**: `GET /Slot?{parameters}`
- **Key parameters**:
  - `start=ge{date}&start=lt{date}` -- date range (FHIR date prefix operators)
  - `schedule.actor=location/{id}` -- filter by location
  - `schedule.actor=practitioner/{id}` -- filter by provider (supports multiple)
  - `slot-length={minutes}` -- override default slot duration
- **Example**: `GET /Slot?start=ge2026-04-02&start=lt2026-04-09&schedule.actor=practitioner/15&schedule.actor=location/7`
- **Response includes**: start/end times, status ("free"/"busy"), embedded Location and Practitioner resources, appointment-type extension
- **Important caveat**: Documentation states the slot endpoint "should not be used to generically find all open times on the schedule for display purposes, or data syncing" -- it is intended for targeted availability checks during active booking

#### Creating an Appointment

- **Endpoint**: `POST /Appointment/`
- **Required fields** (Practice+ API):
  - `appointment-type` (extension)
  - `appointment-purpose` (optional but recommended)
  - `status`: must be `"proposed"` for new bookings
  - `start` / `end`: ISO 8601 datetime
  - `participant`: array containing patient, practitioner, and location references
  - `appointment-schedule`: `"book"` or `"hold"`
- **For new prospects** (non-patients): Include demographic info in the `contained` section -- the system auto-creates a prospect record linked to the appointment
- **Success response**: 201 Created with the Appointment resource

#### Confirming an Appointment

- **Select API**: `PUT /Appointment/{id}` with `{ "status": "booked" }`
- **Practice+ API**: `PATCH /Appointment/{id}` to update status to "booked" or "arrived"

#### Listing Appointments

- **Endpoint**: `GET /Appointment?{parameters}`
- **Filters**: date, status, patient, location, practitioner
- **Pagination**: Default 10 results, max 50 per page via `_count` parameter
- **Status values**: proposed, booked, arrived, fulfilled, cancelled, noshow, EnteredInError, pending

### 4. Patient Records

- **Creating a patient is NOT required before booking** -- the API supports inline prospect creation
- **Inline prospect creation**: When POSTing an appointment, include demographic data in the `contained` section; a prospect record is auto-created and linked
- **Standalone patient creation**: `POST /Patient/`
- **Required fields for patient/prospect**:
  - Name: family and given (use="official")
  - Telecom: email + at least one phone (home, work, or mobile)
  - Birth date
  - Address with postal code
  - (Practice+ also requires: generalPractitioner, referral-source, patient-status)
- **Duplicate detection**: System checks name, email, birthdate, zip code, and phone. Returns 409 Conflict if a match is found
- **Patient statuses**: "patient", "prospect", or "patientprospect" (v14.1+)

### 5. Calendar Sync and Double-Booking Prevention

- The Slot endpoint returns real-time availability based on the practice's scheduling templates
- Slot status ("free"/"busy") reflects current calendar state
- No explicit double-booking prevention mechanism is documented at the API level
- The 409 Conflict response on duplicate patient creation suggests similar conflict handling may apply to overlapping appointments, but this is not explicitly confirmed
- **Practical recommendation**: Implement optimistic booking with error handling -- query slots, present to user, attempt booking, handle 409/conflict responses gracefully
- NextPatient's integration adds "smart matching" and respects PMs "find first available" logic, suggesting the raw API leaves some scheduling logic to the consumer

### 6. HIPAA and Compliance

- **BAA**: Nextech provides a BAA, available at [nextech.com/legal/BAA](https://www.nextech.com/legal/BAA). Must be executed before any PHI exchange
- **HIPAA requirements for the custom form**:
  - All data in transit must use TLS (HTTPS) -- the API enforces this
  - No PHI should be stored on the web server unless it is HIPAA-compliant infrastructure
  - API credentials and tokens must never be exposed to the client/browser
  - A backend proxy (serverless function or API gateway) is mandatory
  - Audit logging of all PHI access is required under HIPAA
  - Form submissions containing PHI (name, DOB, phone, email in medical context) must not be logged in plain text
- **Public form considerations**:
  - The form itself can be public, but all API calls must route through a secure backend
  - Consider collecting minimal data on the form (name, phone, email, desired service/date) and deferring full intake to the practice's patient portal
  - No medical history or clinical data should be collected on a public form
- **Third-party compliance**: If using any intermediary (hosting, CDN, analytics), ensure each vendor has a BAA in place or does not process PHI

### 7. Rate Limits and Pricing

- **Rate limit**: 20 requests per second per endpoint
- **Exceeded limit**: HTTP 429 "Too Many Requests"
- **Recommended handling**: Exponential backoff, request staggering, local caching
- **Daily limit** (noted in Getting Started doc): 1,000 API calls per day per client (12AM-12AM UTC) combined across all applications -- this is a significant constraint for a high-traffic booking form
- **Pricing**: Not publicly disclosed. No per-call fees are documented. API access appears to be included with the practice's Nextech subscription, but the practice must activate it. Third-party developer access terms are negotiated directly with Nextech
- **No free tier or sandbox** documented for external developers

### 8. Alternative Integration Paths

#### NextPatient (Recommended Evaluation)

- **What it is**: Third-party scheduling platform with deep Nextech integration, endorsed by Nextech
- **URL**: [nextpatient.co/integrations/nextech](https://www.nextpatient.co/integrations/nextech)
- **Features**:
  - Embeddable booking widget for websites
  - Three booking paths: location-based, provider-specific, multi-location proximity
  - Respects Nextech scheduling rules and templates
  - Smart patient matching to prevent duplicates
  - Digital consent forms auto-uploaded as PDFs to Nextech
  - 300,000+ self-scheduled appointments per month across their platform
- **Setup**: Practice activates "NextPatient API Access" through Nextech Community Portal
- **Cost**: Separate paid product (pricing not public, requires contacting NextPatient)
- **Trade-off**: Less customization than a direct API build, but dramatically faster time-to-market and handles compliance/duplicate-matching out of the box

#### Keragon (No-Code Integration Platform)

- **URL**: [keragon.com/integrations/nextech](https://www.keragon.com/integrations/nextech)
- **What it does**: Visual workflow builder that connects Nextech to 300+ healthcare tools
- **Triggers**: New/updated patient, appointment created/updated, payment created
- **Actions**: Search appointment slots, retrieve appointment statuses
- **Use case**: If you need to pipe Nextech data into other systems (CRM, marketing, etc.)

#### No Native Zapier Integration

- Nextech does not have a native Zapier connector
- Could potentially use Zapier's Webhook trigger with Nextech's API, but this requires custom setup and exposes the same authentication/HIPAA challenges as a direct integration

---

## Implications for the Build

- **Architecture**: A backend proxy is non-negotiable. Recommended stack: serverless function (AWS Lambda, Cloudflare Worker, or Vercel Edge Function) that holds OAuth credentials, handles token refresh, and proxies requests between the static frontend and Nextech API
- **Daily call limit is the biggest constraint**: At 1,000 calls/day, a high-traffic booking page could exhaust the limit quickly. Each booking flow involves at minimum: 1 slot query + 1 appointment POST = 2 calls. With browsing behavior (changing dates/providers), expect 3-5 calls per user session. That limits throughput to ~200-300 bookings/day before hitting the cap
- **Slot endpoint warning**: The docs explicitly say not to use it for "generic display of all open times." This means pre-loading a full calendar view of availability may violate intended usage. A progressive disclosure UX (select service -> select provider -> select date -> show slots) is the correct pattern
- **NextPatient evaluation is strongly recommended**: If the practice doesn't need a fully custom UI, NextPatient handles 90% of this use case with an embeddable widget, proven Nextech integration, and built-in compliance. Custom API integration makes sense only if the client needs a heavily branded/custom UX that NextPatient cannot provide
- **Which API to target**: Depends on the practice's Nextech product. Practice+ API uses client_credentials OAuth (simpler for server-to-server). Select API uses resource owner password credentials (more complex, requires credential management). Confirm with the practice which product they use before starting development

---

## Recommended Implementation Approach

1. **First**: Ask the client which Nextech product they use (Select or Practice+)
2. **Second**: Evaluate NextPatient -- if it meets UX requirements, use it and skip the custom build
3. **If custom build is needed**:
   - Contact Nextech developer portal to request API credentials
   - Build a backend proxy service (serverless function)
   - Implement OAuth token management with refresh logic
   - Build progressive-disclosure booking flow: Service Type -> Provider -> Date -> Available Slots -> Book
   - Handle 409 conflicts gracefully (slot taken, duplicate patient)
   - Implement rate limit awareness with queuing/backoff
   - Execute BAA with Nextech before going live
   - Audit log all PHI access

---

## Gaps and Caveats

- **No sandbox/test environment** documented -- unclear how to develop and test without a live practice account
- **Daily 1,000 call limit** sourced from a 2017 Getting Started PDF -- may have been updated; confirm with Nextech directly
- **Double-booking prevention** at the API level is not explicitly documented; may rely on the practice's scheduling templates
- **Pricing for developer API access** is not public -- must contact Nextech directly
- **NextPatient pricing** also not public
- **The Getting Started PDF** was not readable (binary PDF); some details may be missing from this report
- **Slot endpoint usage restrictions** ("should not be used to generically find all open times") need clarification from Nextech on what is acceptable for a public booking form

---

## Sources

1. [Nextech Developers Portal](https://www.nextech.com/developers-portal) -- Primary entry point for API access, connection request form, and documentation links
2. [Nextech Select API Reference](https://nextechsystems.github.io/selectapidocspub/) -- Full API documentation for Select product: auth, endpoints, FHIR resources, rate limits
3. [Nextech Practice+ API Reference](https://nextechsystems.github.io/practiceplusapidocspub/) -- Full API documentation for Practice+ product: auth, endpoints, appointment/slot/patient resources
4. [Nextech API Getting Started PDF](https://www.nextech.com/hubfs/Developers%20Portal/Nextech%20API%20Getting%20Started%20Document%20-%20Published.pdf) -- Registration process overview, daily call limit (1,000/day), credential setup (2017, may be outdated)
5. [NextPatient + Nextech Integration](https://www.nextpatient.co/integrations/nextech) -- Third-party embeddable scheduling widget, smart matching, consent forms
6. [NextPatient API Activation Instructions](https://help.nextpatient.co/nextech-select-and-practiceplus-api-activation-instructions) -- Steps to activate API access through Nextech Community Portal
7. [NextPatient Patient Self-Scheduling](https://help.nextpatient.co/patient-self-scheduling) -- Booking path options, widget placement guidance
8. [NextPatient Reviewing Online Appointments](https://help.nextpatient.co/nextech-reviewing-online-appointments) -- How appointments appear in Nextech's Online Appointment Queue
9. [Keragon Nextech Integration](https://www.keragon.com/integrations/nextech) -- No-code integration platform with Nextech triggers/actions
10. [Nextech BAA / Legal](https://www.nextech.com/legal/msla/) -- Master Software License Agreement referencing BAA requirements
11. [Nextech Blog: Online Patient Scheduling](https://www.nextech.com/blog/struggling-to-embrace-a-digital-medical-practice-start-with-online-patient-scheduling) -- Nextech's perspective on online scheduling adoption
12. [HIPAA Compliance for APIs Guide](https://intuitionlabs.ai/articles/hipaa-compliant-api-guide) -- General HIPAA API compliance requirements (TLS, audit logging, BAA)
13. [Nextech EMR Pricing - Software Finder](https://softwarefinder.com/emr-software/nextech) -- General Nextech product overview and pricing context
