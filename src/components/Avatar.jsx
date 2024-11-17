import {Suspense, useEffect, useRef} from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { pb, useConfiguratorStore } from '../store';
import { Asset } from "./Asset";

export const Avatar = ({...props}) => {
  const group = useRef();
  const { nodes } = useGLTF("/Models/Armature.glb");
  const { animations } = useGLTF("/Models/Poses.glb");

 const customization = useConfiguratorStore((state) => state.customization);
 const { actions } = useAnimations(animations, group);
 const pose = useConfiguratorStore((state) => state.pose);
 useEffect(() => {
  actions[pose]?.fadeIn(0.2).play();
  return () => actions[pose]?.fadeOut(0.2).stop();
}, [actions, pose]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.007}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            (key) =>
              customization[key]?.asset?.url && (
                <Suspense key={customization[key].asset.id}>
                  <Asset
                    categoryName={key}
                    url={pb.files.getUrl(
                      customization[key].asset,
                      customization[key].asset.url
                    )}
                    skeleton={nodes.Plane.skeleton}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
}

