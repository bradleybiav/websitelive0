
import { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Clock } from 'three';

/**
 * Sets up a basic Three.js scene with a shader material
 */
export const setupShaderScene = (
  canvas: HTMLCanvasElement,
  vertexShader: string,
  fragmentShader: string,
  initialUniforms: Record<string, any> = {},
  transparent: boolean = true
) => {
  const renderer = new WebGLRenderer({ 
    canvas, 
    alpha: true, 
    antialias: true 
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    time: { value: 0 },
    resolution: { value: [window.innerWidth, window.innerHeight] },
    mouse: { value: [0, 0] },
    ...initialUniforms
  };

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent,
    depthWrite: false,
    depthTest: false
  });

  const geometry = new PlaneGeometry(2, 2);
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const clock = new Clock();
  clock.start();

  const cleanup = () => {
    scene.remove(mesh);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };

  return {
    renderer,
    scene,
    camera,
    clock,
    uniforms,
    cleanup
  };
};
