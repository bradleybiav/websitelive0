
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
  uniform vec2 mouse;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    vec2 uvs = uv * 2.0 - 1.0;
    uvs.x *= resolution.x / resolution.y;
    
    vec2 mousePos = mouse.xy / resolution.xy;
    mousePos = mousePos * 2.0 - 1.0;
    mousePos.x *= resolution.x / resolution.y;
    
    // Calculate distance from current pixel to mouse position
    float dist = distance(uvs, mousePos);
    
    // Create a wave effect that follows the mouse
    // Make the effect more concentrated around the mouse (less zoomed out)
    float strength = 0.02 / (0.01 + dist * 2.5); // Increased influence by lowering the denominator
    
    // Create displacement effect
    vec2 displacement = normalize(uvs - mousePos) * strength;
    
    // Base color (almost white for subtlety)
    vec3 color = vec3(0.98, 0.98, 0.98);
    
    // Add very subtle color variation based on displacement
    color += vec3(displacement.y * 0.04, displacement.x * 0.02, displacement.x * displacement.y * 0.01);
    
    // Ensure the color doesn't get too dark or bright
    color = clamp(color, 0.95, 1.0);
    
    // Subtle vignette effect to hide edges
    float vignette = 1.0 - length(uv - 0.5) * 0.2;
    color *= vignette;
    
    // Set a subtle alpha to ensure the effect is visible but not overwhelming
    float alpha = smoothstep(0.0, 0.5, strength) * 0.3;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = [event.clientX, event.clientY];
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Import Three.js dynamically to avoid SSR issues
    import('three').then(({ WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Clock }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

      const scene = new Scene();
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        time: { value: 0 },
        resolution: { value: [window.innerWidth, window.innerHeight] },
        mouse: { value: [0, 0] }
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
        uniforms.mouse.value = mousePosition.current;
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
        window.removeEventListener('mousemove', handleMouseMove);
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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none" />;
};

export default ShaderBackground;
