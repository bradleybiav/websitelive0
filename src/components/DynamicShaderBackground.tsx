
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

  float field(in vec3 p) {
    float strength = 7.0 + 0.03 * log(1.e-6 + fract(sin(time) * 4373.11));
    float accum = 0.0;
    float prev = 0.0;
    float tw = 0.0;

    for(int i = 0; i < 4; ++i) {
      float mag = dot(p, p);
      p = abs(p) / mag + vec3(-0.5, -0.4, -1.5);
      float w = exp(-float(i) / 7.0);
      accum += w * exp(-strength * pow(abs(mag - prev), 2.3));
      tw += w;
      prev = mag;
    }
    
    return max(0.0, 5.0 * accum / tw - 0.7);
  }

  void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5);
    
    // Convert mouse position from screen coordinates to normalized [0,1]
    vec2 mousePos = mouse.xy / resolution.xy;
    
    // Increase mouse influence for more pronounced effect
    float mouseInfluence = 0.12; // Increased from 0.03 to 0.12
    vec2 adjustedUV = uv + (mousePos - center) * mouseInfluence;
    
    vec2 p = -1.0 + 2.0 * adjustedUV;
    p.x *= resolution.x / resolution.y;
    
    float t = field(vec3(p.x * 1.2, p.y, time * 0.1));
    
    // Slightly less white base with more color variation
    vec3 baseColor = vec3(0.95, 0.95, 0.97); // Slightly off-white base
    float colorIntensity = 0.1; // Increased from 0.04 to 0.1
    
    vec3 color = mix(
      baseColor,
      baseColor - vec3(t * colorIntensity, t * colorIntensity * 0.9, t * colorIntensity * 0.7),
      t * 0.35 // Increased from 0.2 to 0.35
    );
    
    // Add a slightly stronger vignette
    float vignette = 1.0 - length(uv - 0.5) * 0.35;
    color *= vignette;
    
    // Increase opacity for more visibility
    float alpha = 0.25 + min(t * 0.2, 0.25); // Increased from 0.2 + min(t * 0.1, 0.15)
    
    gl_FragColor = vec4(color, alpha);
  }
`;

const DynamicShaderBackground: React.FC = () => {
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

export default DynamicShaderBackground;
