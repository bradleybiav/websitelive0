
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
    
    // Enhanced psychedelic noise parameters
    float noiseScale = 12.0;  // Increased from 8.0
    float timeScale = 0.4;    // Increased from 0.2
    float distortionIntensity = 0.03; // Increased from 0.01
    
    // Multiple layers of noise with different frequencies and time offsets
    float noiseValue = 0.0;
    noiseValue += noise(vec2(uv.x * noiseScale, uv.y * noiseScale + time * timeScale)) * 0.5;
    noiseValue += noise(vec2(uv.x * noiseScale * 2.0, uv.y * noiseScale * 2.0 + time * timeScale * 1.3)) * 0.25;
    noiseValue += noise(vec2(uv.x * noiseScale * 4.0, uv.y * noiseScale * 4.0 + time * timeScale * 1.7)) * 0.125;
    
    // More pronounced distortion
    vec2 distortedUv = uv + vec2(
      noiseValue * distortionIntensity, 
      noiseValue * distortionIntensity
    );
    
    // More dynamic gradient with noise influence
    float gradientValue = 1.0 - distortedUv.y * 0.2;
    gradientValue += (noiseValue - 0.5) * 0.05;
    
    // Soft color variation with psychedelic hints
    vec3 baseColor = vec3(0.9, 0.9, 1.0);  // Soft blue-white
    vec3 accentColor = vec3(0.8, 0.7, 1.0); // Soft lavender
    
    vec3 color = mix(baseColor, accentColor, noiseValue * 0.3) * gradientValue;
    
    gl_FragColor = vec4(color, 0.8);  // Slightly more transparent
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
        transparent: true
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

  return <canvas ref={canvasRef} className="shader-canvas fixed top-0 left-0 -z-10 w-full h-full opacity-80" />;
};

export default HeatShimmerShader;
