import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Color, Group, MathUtils, Vector3 } from "three";
import { BuildingComplex } from "./BuildingComplex";
import { CleanAirParticles, MEPConduits, PestShield, ShineSweep } from "./Effects";
import { sceneTheme as t } from "../theme";

export type SceneProps = {
  active: number | null;
  reduced: boolean;
  high: boolean;
  visible: boolean;
  onReady: () => void;
  onUnavailable: () => void;
};
const defaultView = [-9, 8, 14, 0, 2.8, 0] as const;
// World-space anchor on the campus for each service node, in `services` order.
const anchors = [
  [-0.65, 8.75, -0.75], // Facility Management: tower roof
  [-0.65, 4.6, 0.66], // Housekeeping: tower facade
  [3.55, 2.75, 0.95], // Office Cleaning: low-rise offices
  [1.65, 6.35, -0.25], // MEP Maintenance: mid-rise plant room
  [-3.65, 2.1, 0.7], // Pest Control: warehouse
  [0.6, 0.05, 3.02], // Manpower & Payroll: entrance road
] as const;
function Set({ active, reduced, onReady }: Pick<SceneProps, "active" | "reduced" | "onReady">) {
  const campus = useRef<Group>(null);
  const frames = useRef(0);
  const eye = useMemo(() => new Vector3(), []);
  const point = useMemo(() => new Vector3(), []);
  const nodes = useRef<HTMLElement[]>([]);
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const stage = gl.domElement.closest(".facility-stage");
    const found = stage ? [...stage.querySelectorAll<HTMLElement>("[data-node-index]")] : [];
    nodes.current = found;
    return () => {
      for (const node of found) {
        node.style.removeProperty("--node-x");
        node.style.removeProperty("--node-y");
      }
      nodes.current = [];
    };
  }, [gl]);
  useFrame(({ camera, clock, size }) => {
    // Fixed framing; the scene sits inline on the page, so it no longer follows page scroll.
    const scale = size.width < 280 ? 1.46 : size.width < 480 ? 1.3 : 1.18;
    eye.set(defaultView[0] * scale, defaultView[1] * scale, defaultView[2] * scale);
    camera.position.copy(eye);
    camera.lookAt(defaultView[3], defaultView[4], defaultView[5]);
    const group = campus.current;
    if (group) {
      group.rotation.y = reduced ? 0 : Math.sin(clock.elapsedTime * 0.3) * 0.16;
      group.position.y = reduced ? 0 : Math.sin(clock.elapsedTime * 1.05) * 0.085;
      group.updateMatrixWorld();
      // Pin each HTML service node to its anchor so it tracks the model as it sways.
      for (const node of nodes.current) {
        const anchor = anchors[Number(node.dataset["nodeIndex"])];
        if (!anchor) continue;
        point.set(anchor[0], anchor[1], anchor[2]).applyMatrix4(group.matrixWorld).project(camera);
        const x = MathUtils.clamp((point.x + 1) * 50, 5, 95);
        const y = MathUtils.clamp((1 - point.y) * 50, 6, 94);
        node.style.setProperty("--node-x", `${x.toFixed(2)}%`);
        node.style.setProperty("--node-y", `${y.toFixed(2)}%`);
      }
    }
    if (++frames.current === (reduced ? 1 : 3)) onReady();
  });
  return (
    <group ref={campus}>
      <BuildingComplex />
      <ShineSweep active={active} reduced={reduced} />
      <MEPConduits active={active} reduced={reduced} />
      <CleanAirParticles reduced={reduced} active={active} />
      <PestShield active={active === 4} />
    </group>
  );
}
export default function FacilityScene({
  active,
  reduced,
  high,
  visible,
  onReady,
  onUnavailable,
}: SceneProps) {
  const fogColor = useMemo(() => new Color(t.cool), []);
  useEffect(() => {
    if (!visible) return;
    const fail = (event: Event) => {
      event.preventDefault();
      onUnavailable();
    };
    const canvas = document.querySelector(".facility-stage canvas");
    canvas?.addEventListener("webglcontextlost", fail);
    return () => canvas?.removeEventListener("webglcontextlost", fail);
  }, [onUnavailable, visible]);
  return (
    <Canvas
      dpr={high ? [1, 1.75] : 1}
      camera={{
        position: [defaultView[0], defaultView[1], defaultView[2]],
        fov: 37,
        near: 0.1,
        far: 85,
      }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={visible ? (reduced ? "demand" : "always") : "never"}
      performance={{ min: 0.5 }}
    >
      <hemisphereLight color={fogColor} groundColor={t.road} intensity={2.25} />
      <directionalLight position={[-8, 15, 9]} color={t.cool} intensity={2.35} />
      <directionalLight position={[7, 9, 8]} color={t.warm} intensity={1.25} />
      <directionalLight position={[3, 6, -10]} color={t.hot} intensity={1.55} />
      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer
            position={[0, 7, 0]}
            rotation-x={Math.PI / 2}
            scale={[14, 14, 1]}
            intensity={1.3}
          />
          <Lightformer position={[-7, 4, 5]} scale={[6, 11, 1]} intensity={2} color={t.cool} />
        </Environment>
      </Suspense>
      <Set active={active} reduced={reduced} onReady={onReady} />
      {high && visible && !reduced && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.6} intensity={0.8} mipmapBlur />
          <Vignette darkness={0.35} offset={0.3} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
