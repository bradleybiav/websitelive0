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
  
  float hash(float n) {
    return fract(sin(n) * 43758.5453);
  }
  
  float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    
    float n = p.x + p.y * 57.0 + p.z * 113.0;
    float res = mix(mix(mix(hash(n), hash(n + 1.0), f.x),
                        mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
                    mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                        mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
    return res;
  }
  
  float fbm(vec3 p) {
    float f = 0.0;
    float amp = 0.5;
    for(int i = 0; i < 5; i++) {
      f += amp * noise(p);
      p *= 2.03;
      amp *= 0.5;
    }
    return f;
  }
  
  void main() {
    vec2 uv = vUv;
    
    vec2 mousePos = mouse.xy / resolution.xy;
    mousePos = mousePos * 2.0 - 1.0;
    
    float mouseInfluence = 0.02;
    vec2 uvDistorted = uv + vec2(
      sin(uv.y * 10.0 + time * 0.3 + mousePos.x) * 0.01,
      cos(uv.x * 10.0 + time * 0.3 + mousePos.y) * 0.01
    ) * mouseInfluence;
    
    float t = time * 0.1;
    vec3 p = vec3(uvDistorted * 2.0, t * 0.05);
    float stars = pow(fbm(p * 5.0), 5.0) * 0.5;
    
    float nebula = fbm(p * 3.0 + fbm(p * 7.0) * 0.5) * 0.5;
    
    vec3 baseColor = vec3(0.99, 0.99, 1.0);
    
    vec3 nebulaColor = vec3(0.9, 0.95, 1.0);
    vec3 starsColor = vec3(1.0);
    
    float nebulaIntensity = 0.04;
    float starsIntensity = 0.05;
    
    vec3 color = baseColor;
    color = mix(color, nebulaColor, nebula * nebulaIntensity);
    color = mix(color, starsColor, stars * starsIntensity);
    
    color = clamp(color, 0.95, 1.0);
    
    float vignette = 1.0 - length(uv - 0.5) * 0.3;
    color *= vignette;
    
    float alpha = 0.3 + min(nebula * 0.1, 0.1);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = [event.clientX, event.clientY];
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    import('three').then(({ WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Clock }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new Scene();
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        time: { value: 0 },
        resolution: { value: [window.innerWidth, window.innerHeight] },
        mouse: { value: mousePosition.current }
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
