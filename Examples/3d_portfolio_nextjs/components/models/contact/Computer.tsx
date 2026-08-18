import { useGLTF } from "@react-three/drei";
import { Mesh, Material } from "three";
import type { ComponentProps } from "react";


interface GLTFResult {
  nodes: {
    Cube000_ComputerDesk_0001_1: Mesh;
    Cube000_ComputerDesk_0001_2: Mesh;
  };
  materials: {
    [name: string]: Material;
  };
}

export function Computer(props: ComponentProps<'group'>) {
  const { nodes, materials } = useGLTF("/models/computer-optimized-transformed.glb") as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group position={[-4.005, 67.549, 58.539]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_1.geometry}
          material={materials["ComputerDesk.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_ComputerDesk_0001_2.geometry}
          material={materials["FloppyDisk.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/computer-optimized-transformed.glb");

export default Computer;