import { useLayoutEffect, useMemo, useRef } from "react";
import { BoxGeometry, Color, InstancedMesh, Object3D } from "three";
import { RoundedBox } from "@react-three/drei";
import { sceneTheme as t } from "../theme";

type Block = { x: number; y: number; z: number; w: number; h: number; d: number; color: string };
const buildings = [
  { x: -0.65, z: -0.75, w: 2.8, d: 2.75, h: 7.9, floors: 15, cols: 7 },
  { x: 1.65, z: -0.25, w: 1.95, d: 2.45, h: 5.8, floors: 11, cols: 5 },
  { x: 3.55, z: 0.95, w: 3.55, d: 3.15, h: 2.65, floors: 5, cols: 9 },
];
function blocks() {
  const solid: Block[] = [];
  const glass: Block[] = [];
  const plants: Block[] = [];
  const add = (x: number, y: number, z: number, w: number, h: number, d: number, color: string) =>
    solid.push({ x, y, z, w, h, d, color });
  for (const [i, b] of buildings.entries()) {
    add(b.x, b.h / 2, b.z, b.w, b.h, b.d, t.metal);
    add(b.x, b.h + 0.035, b.z, b.w + 0.1, 0.09, b.d + 0.1, t.roof);
    add(b.x - 0.2, b.h + 0.22, b.z - 0.15, b.w * 0.4, 0.35, b.d * 0.37, t.concrete);
    add(b.x, b.h + 0.48, b.z, b.w * 0.28, 0.14, b.d * 0.19, t.roof);
    for (let f = 0; f < b.floors; f++)
      for (let c = 0; c < b.cols; c++) {
        const y = ((f + 0.5) * b.h) / b.floors;
        const q = (c + 0.5) / b.cols - 0.5;
        const tone =
          (f + c + i) % 7 === 0 ? t.cool : (f * 7 + c * 3) % 5 < 2 ? t.glassDark : t.glass;
        for (const direction of [-1, 1]) {
          glass.push({
            x: b.x + q * b.w,
            y,
            z: b.z + direction * (b.d / 2 + 0.012),
            w: b.w / b.cols - 0.043,
            h: b.h / b.floors - 0.053,
            d: 0.025,
            color: tone,
          });
          glass.push({
            x: b.x + direction * (b.w / 2 + 0.012),
            y,
            z: b.z + q * b.d,
            w: 0.025,
            h: b.h / b.floors - 0.053,
            d: b.d / b.cols - 0.043,
            color: tone,
          });
        }
      }
    // The mid-rise's entrance faces into the low-rise, so only the other two get a canopy.
    if (i !== 1) {
      add(b.x, 0.6, b.z + b.d / 2 + 0.24, b.w * 0.58, 0.09, 0.62, t.roof);
      add(b.x - b.w * 0.24, 0.3, b.z + b.d / 2 + 0.46, 0.045, 0.6, 0.045, t.metal);
      add(b.x + b.w * 0.24, 0.3, b.z + b.d / 2 + 0.46, 0.045, 0.6, 0.045, t.metal);
    }
  }
  add(-3.65, 0.94, 0.7, 3.45, 1.88, 3.6, t.concrete);
  add(-3.65, 1.92, 0.7, 3.53, 0.13, 3.68, t.roof);
  for (let i = 0; i < 8; i++) {
    add(-5.06 + i * 0.405, 1.47, 2.511, 0.33, 0.19, 0.025, t.glassDark);
    add(-4.9 + i * 0.37, 2.09, -0.35 + (i % 2) * 1.2, 0.28, 0.26, 0.52, t.concrete);
  }
  for (let i = 0; i < 3; i++) {
    add(-4.76 + i * 1.04, 0.47, 2.52, 0.65, 0.91, 0.044, t.metal);
    for (let k = 0; k < 5; k++)
      add(-4.76 + i * 1.04, 0.22 + k * 0.13, 2.549, 0.59, 0.019, 0.014, t.road);
  }
  add(0, -0.043, 0, 11.65, 0.09, 7.6, t.concrete);
  add(0, 0.009, 3.02, 11.42, 0.02, 0.72, t.road);
  for (let i = 0; i < 20; i++) add(-5.36 + i * 0.56, 0.024, 3.02, 0.25, 0.008, 0.035, t.marking);
  for (let i = 0; i < 24; i++) {
    const x = -5.3 + (i % 12) * 0.96,
      z = i < 12 ? 3.58 : -3.33;
    const h = 0.4 + (Math.sin(i * 7.13) + 1) * 0.13;
    add(x, 0.12, z, 0.045, 0.24, 0.045, t.metal);
    plants.push({
      x,
      y: 0.19 + h / 2,
      z,
      w: 0.38,
      h,
      d: 0.39,
      color: i % 3 ? t.foliage : t.topiary,
    });
  }
  for (let i = 0; i < 11; i++) {
    const x = 2.06 + (i % 6) * 0.58,
      z = i < 6 ? -0.38 : 2.18;
    plants.push({
      x,
      y: 2.88,
      z,
      w: 0.3,
      h: 0.31 + (i % 2) * 0.13,
      d: 0.31,
      color: i % 2 ? t.foliage : t.topiary,
    });
  }
  return { solid, glass, plants };
}
function Tiles({ items, kind }: { items: Block[]; kind: "glass" | "solid" | "plants" }) {
  const ref = useRef<InstancedMesh>(null);
  const geometry = useMemo(() => (kind === "plants" ? null : new BoxGeometry()), [kind]);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const obj = new Object3D();
    const color = new Color();
    items.forEach((tile, index) => {
      obj.position.set(tile.x, tile.y, tile.z);
      obj.scale.set(tile.w, tile.h, tile.d);
      obj.rotation.y = kind === "plants" ? index * 1.8 : 0;
      obj.updateMatrix();
      mesh.setMatrixAt(index, obj.matrix);
      mesh.setColorAt(index, color.set(tile.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [items, kind]);
  return (
    <instancedMesh
      ref={ref}
      args={[geometry ?? undefined, undefined, items.length]}
      frustumCulled={false}
    >
      {kind === "plants" && <icosahedronGeometry args={[0.68, 1]} />}
      <meshStandardMaterial
        roughness={kind === "glass" ? 0.24 : 0.72}
        metalness={kind === "glass" ? 0.47 : 0.03}
        envMapIntensity={kind === "glass" ? 1.1 : 0.45}
      />
    </instancedMesh>
  );
}
export function BuildingComplex() {
  const { solid, glass, plants } = useMemo(blocks, []);
  return (
    <>
      <RoundedBox args={[11.95, 0.44, 7.85]} position={[0, -0.28, 0]} radius={0.16} smoothness={3}>
        <meshStandardMaterial color={t.roof} roughness={0.53} />
      </RoundedBox>
      <RoundedBox args={[11.53, 0.12, 7.43]} position={[0, -0.52, 0]} radius={0.055} smoothness={2}>
        <meshStandardMaterial color={t.metal} />
      </RoundedBox>
      <Tiles items={solid} kind="solid" />
      <Tiles items={glass} kind="glass" />
      <Tiles items={plants} kind="plants" />
    </>
  );
}
