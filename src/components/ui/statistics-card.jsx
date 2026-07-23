import React, { useRef, useState, useEffect } from "react";
import NumberFlow from "@number-flow/react";
import { motion, useInView } from "framer-motion";

const statsStyles = `
.stats-section-flat {
  width: 100%;
  padding: 100px 5% 80px;
  background-color: #0a0a0a;
  position: relative;
  z-index: 10;
  color: #ffffff;
}

.stats-container-flat {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.stats-header-flat {
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.stats-title-flat {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 16px 0;
  color: #ffffff;
  line-height: 1.1;
}

.stats-desc-flat {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0;
}

.stats-grid-flat {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.stats-item-flat {
  flex: 1 1 200px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.stats-item-flat:not(:first-child) {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

@media (max-width: 768px) {
  .stats-item-flat {
    flex: 1 1 45%;
    border-left: none !important;
    padding: 20px 10px;
  }
  
  /* Create simple grid separation on mobile */
  .stats-item-flat:nth-child(even) {
    border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
  }
  .stats-item-flat:nth-child(3),
  .stats-item-flat:nth-child(4) {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.stats-num-flat {
  font-family: 'Inter Tight', 'Inter', sans-serif;
  font-size: clamp(2.8rem, 5vw, 4rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-label-flat {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}
`;

const Stats = () => {
  return (
    <section className="stats-section-flat">
      <style>{statsStyles}</style>
      <div className="stats-container-flat">
        {/* Header */}
        <div className="stats-header-flat">
          <h2 className="stats-title-flat">Maneesh in Numbers</h2>
          <p className="stats-desc-flat">
            A quick glance at the milestones and active impact of the digital products, custom web apps, and interfaces designed & developed so far.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-flat">
          <StatItem value={20} prefix="+" label="Projects Completed" index={0} />
          <StatItem value={50} suffix="+" label="Happy Clients" index={1} isSeparated />
          <StatItem value={2} suffix="+" label="Years of Experience" index={2} isSeparated />
          <StatItem value={99} suffix="%" label="Customer Satisfaction" index={3} isSeparated />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ value, prefix = "", suffix = "", label, isSeparated = false, index }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setCurrentVal(value);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, index]);

  return (
    <div ref={containerRef} className="stats-item-flat">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="stats-num-flat"
      >
        {prefix && <span style={{ marginRight: '2px' }}>{prefix}</span>}
        <NumberFlow value={currentVal} />
        {suffix && <span style={{ marginLeft: '2px' }}>{suffix}</span>}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.75 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="stats-label-flat"
      >
        {label}
      </motion.p>
    </div>
  );
};

export { Stats };
