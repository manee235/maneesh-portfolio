import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

out vec4 fragColor;

// Simplex 2D noise helper functions
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractional Brownian Motion for liquid domain warping
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(st * frequency);
    st *= 2.1;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;

  // Interactive mouse ripple influence
  vec2 mouseSt = uMouse / uResolution.xy;
  mouseSt.x *= uResolution.x / uResolution.y;
  float distToMouse = length(st - mouseSt);
  float mouseRipple = smoothstep(0.45, 0.0, distToMouse) * 0.4;

  // Flow animation speed
  float t = uTime * 0.08;

  // Multi-octave domain warping for white liquid fluid movement
  vec2 q = vec2(0.0);
  q.x = fbm(st + vec2(0.0, 0.0) + 0.45 * t);
  q.y = fbm(st + vec2(5.2, 1.3) + 0.35 * t);

  vec2 r = vec2(0.0);
  r.x = fbm(st + 2.8 * q + vec2(1.7, 9.2) + 0.55 * t + mouseRipple);
  r.y = fbm(st + 2.8 * q + vec2(8.3, 2.8) + 0.45 * t);

  float f = fbm(st + 3.2 * r + mouseRipple);

  // Pure White & Silver Liquid Fluid Palette
  vec3 darkBase = vec3(0.02, 0.02, 0.03);             // Pitch black canvas base
  vec3 silverMid = vec3(0.4, 0.42, 0.48);             // Metallic silver fluid tone
  vec3 whiteLiquid = vec3(0.95, 0.96, 1.0);          // Bright white liquid fluid
  vec3 brightGlint = vec3(1.0, 1.0, 1.0);            // Specular white sheen

  // Mix white liquid fluid colors
  vec3 color = mix(darkBase, silverMid, clamp(f * 1.6, 0.0, 1.0));
  color = mix(color, whiteLiquid, clamp(length(q) * f * 2.2, 0.0, 1.0));

  // Flowing white liquid contour waves
  float waves = sin(f * 18.0 + uTime * 0.25);
  float whiteContour = smoothstep(0.72, 0.98, waves) * 0.65;
  color += whiteLiquid * whiteContour;

  // White liquid specular highlight sheen
  float highlight = pow(clamp(f * 1.4, 0.0, 1.0), 3.2);
  color += brightGlint * highlight * 0.4;

  fragColor = vec4(color, 1.0);
}
`;

const LiquidBackground = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize OGL Renderer
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      alpha: false,
      antialias: true,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0.02, 0.02, 0.03, 1);

    // Geometry & Program
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uMouse: { value: [0, 0] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mousemove handler
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = rect.height - (e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animFrame;
    let startTime = performance.now();

    const render = (now) => {
      const elapsed = (now - startTime) * 0.001;
      program.uniforms.uTime.value = elapsed;

      // Smooth lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];

      renderer.render({ scene: mesh });
      animFrame = requestAnimationFrame(render);
    };
    animFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (gl.canvas && gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#040406',
        pointerEvents: 'none',
      }}
    />
  );
};

export default LiquidBackground;
