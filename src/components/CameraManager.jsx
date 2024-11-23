import { CameraControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { useRef } from "react";




export const CameraManager = () => {
 
    const controls = useRef();
    useControls({
        getCameraPosition: button(() => {
          console.log("Camera Position", [...controls.current.getPosition()]);
        }),
        getCameraTarget: button(() => {
          console.log("Camera Target", [...controls.current.getTarget()]);
        }),
      });
  return (
    <CameraControls
      ref={controls}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
      minDistance={2}
      maxDistance={8}
    />
  );
};