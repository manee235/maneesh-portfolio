"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import "./radial-orbital-timeline.css";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.25) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 210;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.45,
      Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusBadgeVariant = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div
      className="rot-container"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="rot-inner-wrap">
        <div
          className="rot-orbit-canvas"
          ref={orbitRef}
          style={{
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="rot-center-sun">
            <div className="rot-ping-1" />
            <div className="rot-ping-2" />
            <div className="rot-sun-core" />
          </div>

          <div className="rot-orbit-ring" />
          <div className="rot-orbit-ring-outer" />

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 250 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="rot-node"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`rot-node-glow ${isPulsing ? "is-pulsing" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 45}px`,
                    height: `${item.energy * 0.5 + 45}px`,
                    left: `-${(item.energy * 0.5 + 45 - 44) / 2}px`,
                    top: `-${(item.energy * 0.5 + 45 - 44) / 2}px`,
                  }}
                />

                <div
                  className={`rot-node-icon-box ${
                    isExpanded ? "expanded" : isRelated ? "related" : "idle"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <div
                  className={`rot-node-label ${
                    isExpanded ? "expanded" : "idle"
                  }`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="rot-card-popup">
                    <div className="rot-card-stem" />
                    <CardHeader style={{ padding: "0 0 8px 0" }}>
                      <div className="rot-card-header">
                        <Badge variant={getStatusBadgeVariant(item.status)}>
                          {item.status === "completed"
                            ? "COMPLETED"
                            : item.status === "in-progress"
                            ? "ACTIVE"
                            : "AVAILABLE"}
                        </Badge>
                        <span style={{ fontSize: "0.72rem", fontFamily: "monospace", color: "rgba(255,255,255,0.5)" }}>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="rot-card-title">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent style={{ padding: 0 }} className="rot-card-body">
                      <p>{item.content}</p>

                      <div className="rot-energy-box">
                        <div className="rot-energy-header">
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Zap size={12} color="#38bdf8" />
                            Proficiency &amp; Impact
                          </span>
                          <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#38bdf8" }}>
                            {item.energy}%
                          </span>
                        </div>
                        <div className="rot-energy-bar-track">
                          <div
                            className="rot-energy-bar-fill"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="rot-related-box">
                          <div className="rot-related-header">
                            <Link size={11} style={{ marginRight: 4 }} />
                            Connected Workflow Nodes
                          </div>
                          <div className="rot-related-tags">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              if (!relatedItem) return null;
                              return (
                                <button
                                  key={relatedId}
                                  type="button"
                                  className="rot-related-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem.title}
                                  <ArrowRight size={10} style={{ opacity: 0.7 }} />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
