import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react'
import { BoxGeometry } from 'three';

const App = () => {
  return (
    <>
      <Canvas
        camera={{
          position: [3, 3, 3],
          fov: 45,
        }}
      >
        <OrbitControls />
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshNormalMaterial />
        </mesh>
        <color attach="background" args={["#130f30"]} />
      </Canvas>
    </>
  );
}

export default App