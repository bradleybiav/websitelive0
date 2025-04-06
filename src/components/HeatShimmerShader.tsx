
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
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Simple noise function
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
  
  void main() {
    vec2 uv = vUv;
    
    // Subtle heat shimmer effect
    float noiseScale = 8.0;
    float timeScale = 0.2;
    
    // Create layers of noise with different scales
    float noiseValue = 0.0;
    noiseValue += noise(vec2(uv.x * noiseScale, uv.y * noiseScale + time * timeScale)) * 0.5;
    noiseValue += noise(vec2(uv.x * noiseScale * 2.0, uv.y * noiseScale * 2.0 + time * timeScale * 1.3)) * 0.25;
    noiseValue += noise(vec2(uv.x * noiseScale * 4.0, uv.y * noiseScale * 4.0 + time * timeScale * 1.7)) * 0.125;
    
    // Very subtle displacement
    vec2 distortedUv = uv + vec2(noiseValue * 0.01, noiseValue * 0.01);
    
    // Gradient from top to bottom with very subtle variation
    float gradientValue = 1.0 - uv.y * 0.1; // Very subtle gradient
    
    // Add noise to create a subtle texture
    gradientValue += (noiseValue - 0.5) * 0.02; // Very subtle noise
    
    // Final color - very subtle white to off-white
    vec3 color = vec3(1.0, 1.0, 1.0) * gradientValue;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const HeatShimmerShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Three.js
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Import Three.js dynamically to avoid SSR issues
    import('three').then(({ WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Clock }) => {
      // Renderer
      const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Scene
      const scene = new Scene();

      // Camera
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

      // Shader material
      const uniforms = {
        time: { value: 0 },
        resolution: { value: [window.innerWidth, window.innerHeight] }
      };

      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true
      });

      // Geometry - full screen quad
      const geometry = new PlaneGeometry(2, 2);
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);

      // Clock for animation
      const clock = new Clock();

      // Animation loop
      const animate = () => {
        uniforms.time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        animationFrameId.current = requestAnimationFrame(animate);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.resolution.value = [window.innerWidth, window.innerHeight];
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
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

  return <canvas ref={canvasRef} className="shader-canvas" />;
};

export default HeatShimmerShader;
