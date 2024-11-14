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
          position: [3, 3, 3],
          fov: 45,
        }}
      >
        <Experiences />
        <color attach="background" args={["#130f30"]} />
      </Canvas>
    </>
  );
}

export default App