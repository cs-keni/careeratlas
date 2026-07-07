"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ReactFlow,
  Controls,
  MiniMap,
  MarkerType,
  type Edge,
  type NodeMouseHandler,
  type ReactFlowInstance,
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

type RfInstance = ReactFlowInstance<RoleFlowNode, Edge>;

/* Share links: /tree?node=<id>. Plain location + replaceState + popstate by
 * design (eng review decision 2A) — useSearchParams would put the whole tree
 * behind a Suspense boundary for a param only this component cares about. */
const NODE_PARAM = "node";
// w-60 card ≈ 240×110px; pan targets the node's visual center.
const NODE_CENTER_X = 120;
const NODE_CENTER_Y = 55;
const ARRIVAL_ZOOM = 0.9;

/** The ?node= id, or null if absent/unknown — invalid ids silently fall back
 * to the plain tree (specified: no toast). */
function sharedNodeId(): string | null {
  const id = new URLSearchParams(window.location.search).get(NODE_PARAM);
  return id !== null && nodeById.has(id) ? id : null;
}

function writeNodeParam(id: string | null) {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set(NODE_PARAM, id);
  else url.searchParams.delete(NODE_PARAM);
  window.history.replaceState(window.history.state, "", url);
}

/** Bridges router-driven ?node= changes into tree state. A Next <Link> to the
 * same segment (header nav today, PR2 search results tomorrow) neither
 * remounts the tree nor fires popstate — useSearchParams is the only signal.
 * Isolated child so just this empty subtree sits behind the Suspense boundary
 * (eng decision 2A: keep the tree itself out of it). */
function NodeParamSync({ onChange }: { onChange: (id: string | null) => void }) {
  const params = useSearchParams();
  const raw = params?.get(NODE_PARAM) ?? null;
  const id = raw !== null && nodeById.has(raw) ? raw : null;
  useEffect(() => {
    onChange(id);
  }, [id, onChange]);
  return null;
}

export function CareerTree() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activePath, setActivePath] = useState<PathId | null>(null);
  const rfRef = useRef<RfInstance | null>(null);

  const panTo = useCallback((id: string, duration = 800) => {
    const role = nodeById.get(id);
    if (!role) return;
    // Reduced motion: jump to the node instead of animating the camera.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rfRef.current?.setCenter(
      role.position.x + NODE_CENTER_X,
      role.position.y + NODE_CENTER_Y,
      { zoom: ARRIVAL_ZOOM, duration: reduceMotion ? 0 : duration },
    );
  }, []);

  /** Selection changes mirror into the URL so the current view is always
   * shareable; replaceState keeps browsing the tree out of back-history. */
  const selectNode = useCallback((id: string | null) => {
    setSelectedId(id);
    writeNodeParam(id);
  }, []);

  const onInit = useCallback(
    (instance: RfInstance) => {
      rfRef.current = instance;
      const shared = sharedNodeId();
      if (shared) {
        setSelectedId(shared);
        panTo(shared);
      }
    },
    [panTo],
  );

  useEffect(() => {
    const onPopState = () => {
      const id = sharedNodeId();
      setSelectedId(id);
      if (id) panTo(id, 500);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [panTo]);

  /** Router navigations (Link, PR2 search) change ?node= without a popstate;
   * reconcile selection and camera. No-op when the change was our own
   * replaceState mirror (prev === id). */
  const onRouteParamChange = useCallback(
    (id: string | null) => {
      setSelectedId((prev) => {
        if (prev === id) return prev;
        if (id) panTo(id, 500);
        return id;
      });
    },
    [panTo],
  );

  /** React Flow's keyboard path (Tab + Enter/Space, Escape) drives its
   * internal selection but never calls onNodeClick — selection changes are
   * the only signal keyboard users emit. The ref swallows repeat/initial
   * events so init noise can't close a deep-linked panel. */
  const rfSelectionRef = useRef<string | null>(null);
  const onSelectionChange = useCallback(
    ({ nodes: selected }: { nodes: { id: string }[] }) => {
      const id = selected[0]?.id ?? null;
      if (id === rfSelectionRef.current) return;
      rfSelectionRef.current = id;
      selectNode(id);
    },
    [selectNode],
  );

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

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      selectNode(node.id);
    },
    [selectNode],
  );

  const selectedRole = selectedId ? nodeById.get(selectedId) : undefined;

  return (
    <div className="flex h-full w-full flex-col">
      <Suspense fallback={null}>
        <NodeParamSync onChange={onRouteParamChange} />
      </Suspense>

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
        onInit={onInit}
        onNodeClick={onNodeClick}
        onSelectionChange={onSelectionChange}
        onPaneClick={() => selectNode(null)}
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
            onClose={() => selectNode(null)}
            onSelectRole={selectNode}
            allTitles={roleTitles}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
