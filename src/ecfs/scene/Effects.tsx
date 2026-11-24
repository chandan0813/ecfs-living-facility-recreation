import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, DoubleSide, type MeshBasicMaterial, type Group } from "three";
import { sceneTheme as t } from "../theme";

export function ShineSweep({ active, reduced }: { active: number | null; reduced: boolean }) {
  const uniforms = useMemo(
    () => ({ uTime: { value: -4 }, uColor: { value: new Color(t.hot) } }),
    [],
  );
  useFrame(({ clock }) => {
    uniforms.uTime.value = reduced ? -4 : (clock.elapsedTime / (active === 1 ? 2 : 5)) % 1;
  });
  // Both facade UV planes share a diagonal band so the reflection wraps the tower corner.
  const material = (
    <shaderMaterial
      transparent
      depthWrite={false}
      blending={AdditiveBlending}
      uniforms={uniforms}
      vertexShader="varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}"
      fragmentShader="varying vec2 vUv; uniform float uTime; uniform vec3 uColor; void main(){float d=abs(vUv.x*.52+vUv.y*.73-(uTime*1.8-.25)); float light=exp(-d*d/.007); gl_FragColor=vec4(uColor*1.65,light*.62);}"
      toneMapped={false}
    />
  );
  return (
    <group>
      <mesh position={[-0.65, 3.95, 0.644]}>
        <planeGeometry args={[2.8, 7.9]} />
        {material}
      </mesh>
      <mesh position={[-2.062, 3.95, -0.75]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.75, 7.9]} />
        {material}
      </mesh>
    </group>
  );
}
export function MEPConduits({ active, reduced }: { active: number | null; reduced: boolean }) {
  const group = useRef<Group>(null);
  const color = useMemo(() => new Color(t.hot).multiplyScalar(1.55), []);
  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const pulse = reduced ? 1 : 0.83 + Math.sin(clock.elapsedTime * 3) * 0.17;
    for (const child of g.children) {
      if ("material" in child)
        (child.material as MeshBasicMaterial).opacity = (active === 3 ? 0.95 : 0.34) * pulse;
    }
  });
  const segments = [
    [0.64, 3.6, 0.68, 0.028, 6.9, 0.03],
    [0.55, 3.5, 0.68, 0.019, 6.7, 0.025],
    [2.63, 0.21, 2.56, 5.4, 0.025, 0.023],
    [-2.1, 0.22, 2.56, 3.9, 0.02, 0.023],
    [0.67, 0.22, 1.62, 0.022, 0.022, 1.9],
    [2.65, 1.5, 2.53, 0.024, 2.6, 0.025],
  ] as const;
  return (
    <group ref={group}>
      {segments.map(([x, y, z, w, h, d]) => (
        <mesh key={`${x},${y},${z}`} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshBasicMaterial color={color} transparent opacity={0.34} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
export function CleanAirParticles({
  reduced,
  active,
}: {
  reduced: boolean;
  active: number | null;
}) {
  const positions = useMemo(() => {
    const data = new Float32Array(2048 * 3);
    let seed = 161;
    const next = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = 0; i < data.length; i += 3) {
      data[i] = (next() - 0.5) * 15;
      data[i + 1] = next() * 9;
      data[i + 2] = (next() - 0.5) * 10;
    }
    return data;
  }, []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uActive: { value: 0 },
      uColor: { value: new Color(t.aqua) },
      uBright: { value: new Color(t.hot) },
    }),
    [],
  );
  useFrame(({ clock }) => {
    uniforms.uTime.value = reduced ? 0 : clock.elapsedTime;
    uniforms.uActive.value = active === 1 ? 1 : 0;
  });
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
        vertexShader="uniform float uTime; uniform float uActive; varying float vSpark; void main(){vec3 p=position; p.y=mod(p.y+uTime*.21,9.); p.x+=sin(uTime*.4+p.y)*.15; vSpark=smoothstep(.94,1.,sin(p.x*9.+p.z*8.))*(.35+uActive*.65); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); gl_PointSize=1.1+vSpark*2.; }"
        fragmentShader="uniform vec3 uColor; uniform vec3 uBright; varying float vSpark; void main(){ float alpha=1.-smoothstep(.05,.49,length(gl_PointCoord-.5)); gl_FragColor=vec4(mix(uColor,uBright,vSpark),alpha*(.19+vSpark*.62)); }"
      />
    </points>
  );
}
export function PestShield({ active }: { active: boolean }) {
  return (
    <mesh visible={active} position={[0, -0.06, 0]} scale={[6.5, 8.8, 4.3]}>
      <sphereGeometry args={[1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshBasicMaterial
        color={t.aqua}
        transparent
        opacity={0.135}
        depthWrite={false}
        side={DoubleSide}
        wireframe
      />
    </mesh>
  );
}
