"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Controls,
  MiniMap,
  MarkerType,
  type Edge,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence } from "framer-motion";

import { careerNodes, nodeById } from "@/data/careerNodes";
import { careerPaths } from "@/data/paths";
import type { PathId } from "@/data/types";
import { pathColor, pathHex } from "@/lib/pathColors";
import { CareerRoleNode, type RoleFlowNode } from "./CareerRoleNode";
import { CareerNodeCard } from "./CareerNodeCard";

const nodeTypes = { role: CareerRoleNode };

const roleTitles = new Map(careerNodes.map((n) => [n.id, n.title]));

export function CareerTree() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activePath, setActivePath] = useState<PathId | null>(null);

  const nodes = useMemo<RoleFlowNode[]>(
    () =>
      careerNodes.map((role) => ({
        id: role.id,
        type: "role" as const,
        position: role.position,
        selected: role.id === selectedId,
        data: {
          role,
          dimmed:
            activePath !== null && role.path !== "shared" && role.path !== activePath,
        },
      })),
    [selectedId, activePath],
  );

  const edges = useMemo<Edge[]>(
    () =>
      careerNodes.flatMap((source) =>
        source.nextRoles.map((targetId) => {
          const target = nodeById.get(targetId);
          const color = pathColor(target?.path ?? "shared");
          const dimmed =
            activePath !== null &&
            target !== undefined &&
            target.path !== "shared" &&
            target.path !== activePath;
          return {
            id: `${source.id}→${targetId}`,
            source: source.id,
            target: targetId,
            type: "smoothstep",
            animated: !dimmed && activePath !== null,
            style: { stroke: color, strokeWidth: 1.5, opacity: dimmed ? 0.08 : 0.55 },
            markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
          } satisfies Edge;
        }),
      ),
    [activePath],
  );

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    setSelectedId(node.id);
  }, []);

  const selectedRole = selectedId ? nodeById.get(selectedId) : undefined;

  return (
    <div className="flex h-full w-full flex-col">
      {/* Path legend / filter bar */}
      <div className="border-b border-[var(--line)] px-3 py-2">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-1">
          <button
            onClick={() => setActivePath(null)}
            className={`rune rounded px-2 py-1.5 transition-colors ${
              activePath === null ? "bg-ink-800 text-brass-bright" : "text-muted hover:text-parchment"
            }`}
          >
            All Paths
          </button>
          {careerPaths.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePath((cur) => (cur === p.id ? null : p.id))}
              className={`rune flex items-center gap-1.5 rounded px-2 py-1.5 transition-all ${
                activePath === p.id ? "bg-ink-800" : "hover:bg-ink-900"
              }`}
              style={{ color: activePath === null || activePath === p.id ? pathColor(p.id) : "var(--muted)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: pathColor(p.id) }}
              />
              {p.shortName}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onPaneClick={() => setSelectedId(null)}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.25}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: false }}
      >
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          className="!hidden lg:!block"
          nodeColor={(n) => {
            const role = nodeById.get(n.id);
            return role ? pathHex(role.path) : "#8b93a3";
          }}
          maskColor="rgba(10, 13, 18, 0.8)"
        />
      </ReactFlow>

      <AnimatePresence>
        {selectedRole && (
          <CareerNodeCard
            role={selectedRole}
            onClose={() => setSelectedId(null)}
            onSelectRole={setSelectedId}
            allTitles={roleTitles}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
