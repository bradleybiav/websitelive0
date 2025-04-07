
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
    
    // We want a very subtle effect - just whitish with a hint of variation
    vec3 baseColor = vec3(0.99, 0.99, 1.0); // Almost white base
    
    // Create very subtle color variation
    float colorIntensity = 0.03; // Very low intensity
    vec3 color = baseColor - vec3(t * colorIntensity, t * colorIntensity, t * colorIntensity * 0.8);
    
    // Increase brightness to ensure it's subtle and close to white
    color = clamp(color, 0.95, 1.0);
    
    // Add an extremely subtle vignette to hide edges
    float vignette = 1.0 - length(uv - 0.5) * 0.3;
    color *= vignette;
    
    // Set a high alpha to ensure the background shows through only subtly
    float alpha = 0.3 + min(t * 0.15, 0.2); // Low opacity for subtlety
    
    gl_FragColor = vec4(color, alpha);
  }
`;
