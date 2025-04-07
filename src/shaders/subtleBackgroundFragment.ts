// Fragment shader with subtle white background effect
export const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 mouse;
  varying vec2 vUv;
  
  float field(in vec3 p) {
    float strength = 7.0;
    float accum = 0.0;
    float prev = 0.0;
    float tw = 0.0;
    
    for (int i = 0; i < 5; ++i) {
      float mag = dot(p, p);
      p = abs(p) / mag + vec3(-0.5, -0.4, -1.5);
      float w = exp(-float(i) / 7.0);
      accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
      tw += w;
      prev = mag;
    }
    
    return max(0.0, 5.0 * accum / tw - 0.7);
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 uvs = uv * 2.0 - 1.0;
    uvs.x *= resolution.x / resolution.y;
    
    // Add subtle mouse influence
    vec2 mousePos = mouse.xy / resolution.xy;
    mousePos = mousePos * 2.0 - 1.0;
    mousePos.x *= resolution.x / resolution.y;
    
    // Use a very subtle influence from mouse position
    float mouseInfluence = 0.02; // Very subtle effect
    vec3 p = vec3(uvs / 3.5, 0) + vec3(mousePos.x * mouseInfluence, mousePos.y * mouseInfluence, 1.0 + sin(time * 0.2) * 0.05);
    
    // Apply field function
    float t = field(p);
    
    // Make the effect more visible
    vec3 baseColor = vec3(0.98, 0.98, 1.0); // Almost white base
    
    // Create more visible color variation
    float colorIntensity = 0.06; // Increase intensity
    vec3 color = baseColor - vec3(t * colorIntensity, t * colorIntensity, t * colorIntensity * 0.8);
    
    // Ensure visible range while keeping white background
    color = clamp(color, 0.90, 1.0);
    
    // Add subtle vignette 
    float vignette = 1.0 - length(uv - 0.5) * 0.3;
    color *= vignette;
    
    // Increase alpha to make the effect more visible
    float alpha = 0.8; // Higher opacity for visibility
    
    gl_FragColor = vec4(color, alpha);
  }
`;
