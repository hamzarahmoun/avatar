import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react'
import { BoxGeometry } from 'three';
import { UI } from './components/UI';
import Experiences from './components/Experiences';

const App = () => {
  return (
    <>
    <UI />
      <Canvas
        camera={{
          position: [-1, 1, 5],
          fov: 45,
        }}
        gl={{
          preserveDrawingBuffer: true,
        }}
        shadows
      >
        <color attach="background" args={["#130f30"]} />
        <fog attach="fog" args={["#130f30", 10, 40]} />
        <group>
        <Experiences />

        </group>
      </Canvas>
    </>
  );
}

export default App