# PROJECT CONTEXT

THIS IS MY AI AGENT WORKSPACE. I USE IT FOR RESEARCH, CONTENT CREATION AND PRODUCTIVITY WORKFLOW. 

# About Me


I am a web developer leading our team in using AI

#  Agent Behavior

On EVERY request:
1. Check the `workflows/` folder for a recipe that matches what the user is asking
2. If a matching workflow exists, follow it automatically — no command needed
3. If no workflow matches, use the general rules below

#  Rules

- Always ask clarifying questions before starting a complex task
- Show your plan and steps before executing
- Keep reports and summaries concise - bullet points over paragraphs
- Save all output files to the `output/` folder
- Cite sources when doing research
- Save all context to memory

#  Project Structure
- workflows/ - Workflow instruction files (plain English recipes the agent follows)
- output/ - finished deliverables (reports, drafts, analysis)
- resources/ - reference docs and templates