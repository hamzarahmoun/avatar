import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react'
import { BoxGeometry } from 'three';
import { UI } from './components/UI';
import Experiences from './components/Experiences';
import { DEFAULT_CAMERA_POSITION } from './components/CameraManager';
import { Leva } from 'leva';

const App = () => {
  return (
    <>
    <UI />
    <Leva hidden/>
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: 45,
        }}
        gl={{
          preserveDrawingBuffer: true,
        }}
        shadows
      >
        <color attach="background" args={["#130f30"]} />
        <fog attach="fog" args={["#130f30", 15, 25]} />
        <group position-y={-0.005}>
        <Experiences />

        </group>
      </Canvas>
    </>
  );
}

export default App