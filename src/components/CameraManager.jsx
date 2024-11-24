import { CameraControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { useEffect, useRef } from "react";
import { useConfiguratorStore } from "../store";


export const DEFAULT_CAMERA_POSITION = [-1, 1, 5];
export const DEFAULT_CAMERA_TARGET = [0, 0, 0];

export const CameraManager = () => {
  const currentCategory = useConfiguratorStore(
    (state) => state.currentCategory
  );
    const controls = useRef();
    useControls({
        getCameraPosition: button(() => {
          console.log("Camera Position", [...controls.current.getPosition()]);
        }),
        getCameraTarget: button(() => {
          console.log("Camera Target", [...controls.current.getTarget()]);
        }),
      });
      useEffect(() => {
        if (currentCategory?.expand?.cameraPlacement) {
          controls.current.setLookAt(
            ...currentCategory.expand.cameraPlacement.position,
            ...currentCategory.expand.cameraPlacement.target,
            true
          );
        } else {
          controls.current.setLookAt(
            ...DEFAULT_CAMERA_POSITION,
            ...DEFAULT_CAMERA_TARGET,
            true
          );
        }
      }, [currentCategory]);
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
