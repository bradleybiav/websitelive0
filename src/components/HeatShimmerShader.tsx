
import React, { useRef, useEffect } from 'react';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  varying vec2 vUv;
  
  // Utility functions
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  // Cellular automaton-inspired function
  float cellular(vec2 uv, float time) {
    float resolution = 15.0;
    vec2 grid = fract(uv * resolution) - 0.5;
    vec2 id = floor(uv * resolution);
    
    float minDist = 1.0;
    
    // Check surrounding cells
    for(float y = -1.0; y <= 1.0; y++) {
      for(float x = -1.0; x <= 1.0; x++) {
        vec2 offset = vec2(x, y);
        vec2 r = offset + sin(time * 0.2 + random(id + offset) * 6.28) * 0.3;
        float d = length(grid - r);
        minDist = min(minDist, d);
      }
    }
    
    return smoothstep(0.2, 0.3, minDist);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Subtle time-based cellular pattern
    float cell = cellular(uv, time);
    float ring = smoothstep(0.0, 0.05, abs(cell - 0.5)) * 0.8;
    float disk = (1.0 - cell) * 0.2;
    
    // Apply cell colors
    vec3 cellColor = vec3(0.1, 0.1, 0.15);
    vec3 ringColor = vec3(0.0, 0.15, 0.2);
    vec3 diskColor = vec3(0.0, 0.0, 0.05);
    
    // Combine the patterns
    vec3 color = cell * cellColor + ring * ringColor + disk * diskColor;
    
    // Add subtle glow effect
    float c = 1.0 - disk;
    float c2 = cellular(uv + 0.5/resolution.xy, time);
    c2 = 1.0 - c2 * 0.5;
    
    // Add subtle blue highlights
    color += vec3(0.3, 0.4, 0.5) * max(c2*c2 - c*c, 0.0) * 1.5;
    
    // Ensure the background is subtle - limit brightness and increase transparency
    color = min(color, vec3(0.2, 0.2, 0.25));
    
    // Create a gradient vignette to fade the effect toward edges
    float vignette = smoothstep(0.8, 0.2, length(uv - 0.5) * 1.5);
    color *= vignette;
    
    // Set alpha to be more transparent
    float alpha = 0.5 * vignette;
    
    fragColor = vec4(color, alpha);
  }
`;

const HeatShimmerShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Import Three.js dynamically to avoid SSR issues
    import('three').then(({ WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Clock }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const scene = new Scene();
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        time: { value: 0 },
        resolution: { value: [window.innerWidth, window.innerHeight] }
      };

      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false
      });

      const geometry = new PlaneGeometry(2, 2);
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      const clock = new Clock();

      const animate = () => {
        uniforms.time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        animationFrameId.current = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.resolution.value = [window.innerWidth, window.innerHeight];
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        window.removeEventListener('resize', handleResize);
        scene.remove(mesh);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    });

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="shader-canvas fixed top-0 left-0 -z-10 w-full h-full pointer-events-none" />;
};

export default HeatShimmerShader;
