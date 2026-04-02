import {
  Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight,
  DirectionalLight, Color3, Color4, ShadowGenerator, PointLight,
} from '@babylonjs/core';

export function createScene(canvas) {
  // ── Engine ───────────────────────────────────────────────────────────────
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    antialias: true,
  });

  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.04, 0.04, 0.08, 1);
  scene.ambientColor = new Color3(0.1, 0.1, 0.15);

  // Slight fog for depth
  scene.fogMode    = Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.012;
  scene.fogColor   = new Color3(0.04, 0.04, 0.08);

  // ── Camera ───────────────────────────────────────────────────────────────
  // Third-person behind Anders: slightly east, looking northwest over his shoulder.
  // alpha=-1.3 | beta=1.22 | radius=6.5 | target=(4, 0.5, -3)
  // Overview of the GLB office — angled to see inside
  const camera = new ArcRotateCamera('cam', -Math.PI / 1.8, 1.1, 40, new Vector3(0, 1, 4), scene);
  camera.lowerRadiusLimit  = 1;
  camera.upperRadiusLimit  = 200;
  camera.lowerBetaLimit    = 0.2;
  camera.upperBetaLimit    = Math.PI / 2.1;

  // ── Clean up inputs — rebuild exactly what we want ───────────────────────
  camera.inputs.clear();
  camera.inputs.addMouseWheel();
  camera.inputs.addPointers();

  // Orbit with left button, pan with right button (button 2)
  const pointerInput = camera.inputs.attached.pointers;
  pointerInput.angularSensibilityX = 800;
  pointerInput.angularSensibilityY = 800;
  pointerInput.panningSensibility  = 50;
  pointerInput.buttons             = [0, 1, 2]; // left, middle, right

  // Zoom speed
  const wheelInput = camera.inputs.attached.mousewheel;
  if (wheelInput) {
    wheelInput.wheelDeltaPercentage = 0.01;
  }

  // Disable all auto-behaviors that move camera without user input
  camera.useBouncingBehavior    = false;
  camera.useAutoRotationBehavior = false;
  camera.useFramingBehavior     = false;

  // Right-click pans, left-click orbits
  camera.panningAxis          = new Vector3(1, 0, 1); // pan on XZ plane only
  camera.panningDistanceLimit = 60;
  camera.panningInertia       = 0.6;

  camera.attachControl(canvas, false); // false = preventDefault so right-click menu doesn't open

  // ── Ambient light ────────────────────────────────────────────────────────
  const ambient = new HemisphericLight('ambient', new Vector3(0, 1, 0), scene);
  ambient.intensity    = 0.4;
  ambient.diffuse      = new Color3(0.6, 0.65, 0.8);
  ambient.groundColor  = new Color3(0.05, 0.05, 0.08);

  // ── Directional (sun-like) ───────────────────────────────────────────────
  const sun = new DirectionalLight('sun', new Vector3(-1, -2, -1), scene);
  sun.position  = new Vector3(20, 30, 20);
  sun.intensity = 0.8;
  sun.diffuse   = new Color3(1, 0.95, 0.85);

  // ── Shadow generator ─────────────────────────────────────────────────────
  const shadows = new ShadowGenerator(1024, sun);
  shadows.useBlurExponentialShadowMap = true;
  shadows.blurKernel = 16;

  // ── Office point lights (per room) ───────────────────────────────────────
  const roomLights = [
    { pos: new Vector3(-16, 4.5,  2), color: new Color3(0.9, 0.92, 1.0), name: 'light_meeting'  },
    { pos: new Vector3(  4, 4.5,  0), color: new Color3(0.9, 0.92, 1.0), name: 'light_computer' },
    { pos: new Vector3( 25, 4.5,  0), color: new Color3(0.95, 0.9, 1.0), name: 'light_design'   },
    { pos: new Vector3(  7, 4.5, 27), color: new Color3(1.0, 0.85, 0.7), name: 'light_testing'  },
  ];

  roomLights.forEach(({ pos, color, name }) => {
    const pl = new PointLight(name, pos, scene);
    pl.diffuse    = color;
    pl.intensity  = 1.2;
    pl.range      = 20;
  });

  return { engine, scene, camera, shadows };
}
