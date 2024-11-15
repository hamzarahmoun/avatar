import {useRef} from 'react';
import { useGLTF } from '@react-three/drei';

export const Avatar = ({...props}) => {
  const group = useRef();
  const { nodes } = useGLTF("/Models/Armature.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

