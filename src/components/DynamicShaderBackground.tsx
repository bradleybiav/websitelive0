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
  
  const mat2 m = mat2( 0.80,  0.60, -0.60,  0.80 );

  float noise(in vec2 p) {
    return sin(p.x)*sin(p.y);
  }

  float fbm4(vec2 p) {
    float f = 0.0;
    f += 0.5000 * noise(p); p = m * p * 2.02;
    f += 0.2500 * noise(p); p = m * p * 2.03;
    f += 0.1250 * noise(p); p = m * p * 2.01;
    f += 0.0625 * noise(p);
    return f / 0.9375;
  }

  float fbm6(vec2 p) {
    float f = 0.0;
    f += 0.500000 * (0.5 + 0.5 * noise(p)); p = m * p * 2.02;
    f += 0.250000 * (0.5 + 0.5 * noise(p)); p = m * p * 2.03;
    f += 0.125000 * (0.5 + 0.5 * noise(p)); p = m * p * 2.01;
    f += 0.062500 * (0.5 + 0.5 * noise(p)); p = m * p * 2.04;
    f += 0.031250 * (0.5 + 0.5 * noise(p)); p = m * p * 2.01;
    f += 0.015625 * (0.5 + 0.5 * noise(p));
    return f / 0.96875;
  }

  vec2 fbm4_2(vec2 p) {
    return vec2(fbm4(p), fbm4(p + vec2(7.8)));
  }

  vec2 fbm6_2(vec2 p) {
    return vec2(fbm6(p + vec2(16.8)), fbm6(p + vec2(11.5)));
  }

  float func(vec2 q, out vec4 ron) {
    vec2 mousePos = mouse.xy / resolution.xy;
    mousePos = mousePos * 2.0 - 1.0;
    mousePos.x *= resolution.x / resolution.y;
    
    q += 0.03 * mousePos;
    
    q += 0.03 * sin(vec2(0.27, 0.23) * time + length(q) * vec2(4.1, 4.3));

    vec2 o = fbm4_2(0.9 * q);
    o += 0.04 * sin(vec2(0.12, 0.14) * time + length(o));
    vec2 n = fbm6_2(3.0 * o);

    ron = vec4(o, n);
    float f = 0.5 + 0.5 * fbm4(1.8 * q + 6.0 * n);
    return mix(f, f * f * f * 3.5, f * abs(n.x));
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (2.0 * uv - 1.0);
    p.x *= resolution.x / resolution.y;
    
    float e = 2.0 / resolution.y;
    vec4 on = vec4(0.0);
    float f = func(p, on);

    vec3 col = vec3(0.9, 0.9, 0.95); // Soft white base
    col = mix(col, vec3(0.8, 0.85, 0.9), f); // Silver-white variation
    col = mix(col, vec3(0.95, 0.95, 1.0), dot(on.zw, on.zw)); // Bright white highlights
    col = mix(col, vec3(0.75, 0.8, 0.85), 0.2 + 0.5 * on.y * on.y); // Soft silver tone
    col = clamp(col * f * 2.0, 0.0, 1.0);
    
    vec4 kk;
    vec3 nor = normalize(vec3(
      func(p + vec2(e, 0.0), kk) - f,
      2.0 * e,
      func(p + vec2(0.0, e), kk) - f
    ));
    
    vec3 lig = normalize(vec3(0.9, 0.2, -0.4));
    float dif = clamp(0.3 + 0.7 * dot(nor, lig), 0.0, 1.0);
    vec3 lin = vec3(0.9) * (nor.y * 0.5 + 0.5) + vec3(0.15) * dif;
    col *= 1.2 * lin;
    col = 1.0 - col;
    col = 1.1 * col * col;
    
    float alpha = 0.65; 
    
    gl_FragColor = vec4(col, alpha);
  }
`;

const DynamicShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePosition = useRef<[number, number]>([0, 0]);
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const clockRef = useRef<any>(null);
  const uniformsRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = [event.clientX, event.clientY];
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    import('three').then(({ WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh, Clock }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      rendererRef.current = new WebGLRenderer({ canvas, alpha: true, antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      sceneRef.current = new Scene();
      cameraRef.current = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

      uniformsRef.current = {
        time: { value: 0 },
        resolution: { value: [window.innerWidth, window.innerHeight] },
        mouse: { value: [0, 0] }
      };

      const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: uniformsRef.current,
        transparent: true,
        depthWrite: false,
        depthTest: false
      });

      const geometry = new PlaneGeometry(2, 2);
      const mesh = new Mesh(geometry, material);
      sceneRef.current.add(mesh);

      clockRef.current = new Clock();
      clockRef.current.start();

      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        
        uniformsRef.current.time.value = clockRef.current.getElapsedTime() % 1000;
        uniformsRef.current.mouse.value = mousePosition.current;
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        animationFrameId.current = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!rendererRef.current) return;
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        uniformsRef.current.resolution.value = [window.innerWidth, window.innerHeight];
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        
        if (mesh && geometry && material && sceneRef.current) {
          sceneRef.current.remove(mesh);
          geometry.dispose();
          material.dispose();
        }
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
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
