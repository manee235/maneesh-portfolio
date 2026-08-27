import React from 'react';
import './TechStack.css';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Layer 1: Languages, Mobile & Game Development (Marquee Left)
const LAYER_1 = [
  { name: 'Flutter', icon: `${DEVICON}/flutter/flutter-original.svg`, level: 92 },
  { name: 'Dart', icon: `${DEVICON}/dart/dart-original.svg`, level: 90 },
  { name: 'Kotlin', icon: `${DEVICON}/kotlin/kotlin-original.svg`, level: 88 },
  { name: 'Java', icon: `${DEVICON}/java/java-original.svg`, level: 90 },
  { name: 'C#', icon: `${DEVICON}/csharp/csharp-original.svg`, level: 85 },
  { name: 'Python', icon: `${DEVICON}/python/python-original.svg`, level: 92 },
  { name: 'PHP', icon: `${DEVICON}/php/php-original.svg`, level: 86 },
  { name: 'C++', icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, level: 84 },
  { name: 'Unity Engine', icon: `${DEVICON}/unity/unity-original.svg`, level: 88 },
  { name: 'Android', icon: `${DEVICON}/android/android-original.svg`, level: 90 },
];

// Layer 2: Frontend, Modern Web & 3D Interactive (Marquee Right)
const LAYER_2 = [
  { name: 'React', icon: `${DEVICON}/react/react-original.svg`, level: 96 },
  { name: 'Next.js', icon: `${DEVICON}/nextjs/nextjs-original.svg`, level: 94 },
  { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg`, level: 92 },
  { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg`, level: 96 },
  { name: 'Unreal Engine', icon: `${DEVICON}/unrealengine/unrealengine-original.svg`, level: 82 },
  { name: 'Three.js', icon: `${DEVICON}/threejs/threejs-original.svg`, level: 88 },
  { name: 'Tailwind CSS', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, level: 96 },
  { name: 'HTML5', icon: `${DEVICON}/html5/html5-original.svg`, level: 98 },
  { name: 'CSS3', icon: `${DEVICON}/css3/css3-original.svg`, level: 98 },
  { name: 'Vue.js', icon: `${DEVICON}/vuejs/vuejs-original.svg`, level: 86 },
];

// Layer 3: Backend, Cloud, Databases & Networking (Marquee Left)
const LAYER_3 = [
  { name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg`, level: 92 },
  { name: 'Supabase', icon: `${DEVICON}/supabase/supabase-original.svg`, level: 94 },
  { name: 'Firebase', icon: `${DEVICON}/firebase/firebase-plain.svg`, level: 92 },
  { name: 'Vercel', icon: `${DEVICON}/vercel/vercel-original.svg`, level: 95 },
  { name: 'CCNA Network', icon: 'bx bx-network-chart', isBoxicon: true, level: 88 },
  { name: 'MySQL', icon: `${DEVICON}/mysql/mysql-original.svg`, level: 90 },
  { name: 'MongoDB', icon: `${DEVICON}/mongodb/mongodb-original.svg`, level: 90 },
  { name: 'Docker', icon: `${DEVICON}/docker/docker-original.svg`, level: 86 },
  { name: 'Linux', icon: `${DEVICON}/linux/linux-original.svg`, level: 88 },
  { name: 'GitHub', icon: `${DEVICON}/github/github-original.svg`, level: 96 },
  { name: 'Web Hosting', icon: 'bx bx-server', isBoxicon: true, level: 92 },
];

// Layer 4: UI/UX Design, Spatial UI & Audio Production (Marquee Right)
const LAYER_4 = [
  { name: 'Figma', icon: `${DEVICON}/figma/figma-original.svg`, level: 96 },
  { name: 'Photoshop', icon: `${DEVICON}/photoshop/photoshop-original.svg`, level: 94 },
  { name: 'Illustrator', icon: `${DEVICON}/illustrator/illustrator-original.svg`, level: 90 },
  { name: 'Adobe XD', icon: `${DEVICON}/xd/xd-original.svg`, level: 90 },
  { name: 'Blender 3D', icon: `${DEVICON}/blender/blender-original.svg`, level: 84 },
  { name: 'Spatial UI', icon: 'bx bx-cube-alt', isBoxicon: true, level: 92 },
  { name: 'Lottie Animations', icon: 'bx bx-play-circle', isBoxicon: true, level: 92 },
  { name: 'FL Studio', icon: 'bx bxs-music', isBoxicon: true, level: 95 },
  { name: 'Sony ACID Pro', icon: 'bx bx-slider-alt', isBoxicon: true, level: 92 },
  { name: 'Premiere Pro', icon: `${DEVICON}/premierepro/premierepro-original.svg`, level: 90 },
];

const LAYERS = [
  { id: 'l1', items: LAYER_1, direction: 'track-left', offset: 0 },
  { id: 'l2', items: LAYER_2, direction: 'track-right', offset: 1 },
  { id: 'l3', items: LAYER_3, direction: 'track-left', offset: 0 },
  { id: 'l4', items: LAYER_4, direction: 'track-right', offset: 1 },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="ts-grid-section">
      <div className="ts-grid-container">

        {/* Section Heading */}
        <div className="ts-grid-header">
          <h2 className="ts-grid-title">
            Technologies &amp; tools we <span>build &amp; collaborate</span> with.
          </h2>
        </div>

        {/* 4-Layer Crosshair Grid Marquee Wrapper */}
        <div className="ts-crosshair-marquee-wrap">
          {LAYERS.map((layer, lIdx) => (
            <div key={layer.id} className="ts-row-strip">
              <div className={`ts-row-track ${layer.direction}`}>
                {/* First Set */}
                {layer.items.map((item, idx) => (
                  <div
                    key={`${layer.id}-a-${idx}`}
                    className={`ts-grid-cell ${(idx + layer.offset) % 2 === 0 ? 'cell-tinted' : 'cell-white'}`}
                    style={{ '--target-skill': `${item.level}%` }}
                  >
                    {/* Background Progress Fill Bar */}
                    <div className="ts-cell-progress-bar" />

                    <div className="ts-cell-content">
                      {item.isBoxicon ? (
                        <i className={`${item.icon} ts-brand-bx`}></i>
                      ) : (
                        <img src={item.icon} alt={item.name} className="ts-brand-img" draggable="false" />
                      )}
                      <span className="ts-brand-name">{item.name}</span>
                    </div>

                    {/* Skill Level Percentage Badge on Hover */}
                    <div className="ts-cell-skill-badge">
                      <span className="ts-skill-num">{item.level}%</span>
                    </div>

                    {/* Intersection Crosshair Plus Sign */}
                    <span className="ts-crosshair-plus" aria-hidden="true">+</span>
                  </div>
                ))}

                {/* Duplicate Set for Seamless Loop */}
                {layer.items.map((item, idx) => (
                  <div
                    key={`${layer.id}-b-${idx}`}
                    className={`ts-grid-cell ${(idx + layer.offset) % 2 === 0 ? 'cell-tinted' : 'cell-white'}`}
                    style={{ '--target-skill': `${item.level}%` }}
                  >
                    {/* Background Progress Fill Bar */}
                    <div className="ts-cell-progress-bar" />

                    <div className="ts-cell-content">
                      {item.isBoxicon ? (
                        <i className={`${item.icon} ts-brand-bx`}></i>
                      ) : (
                        <img src={item.icon} alt={item.name} className="ts-brand-img" draggable="false" />
                      )}
                      <span className="ts-brand-name">{item.name}</span>
                    </div>

                    {/* Skill Level Percentage Badge on Hover */}
                    <div className="ts-cell-skill-badge">
                      <span className="ts-skill-num">{item.level}%</span>
                    </div>

                    <span className="ts-crosshair-plus" aria-hidden="true">+</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
