import { Suspense, useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { pb, useConfiguratorStore } from '../store';
import { Asset } from "./Asset";
import { GLTFExporter } from 'three-stdlib';

export const Avatar = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/Models/Armature.glb");
  const { animations } = useGLTF("/Models/Poses.glb");

  const customization = useConfiguratorStore((state) => state.customization);
  const { actions } = useAnimations(animations, group);
  const setDownload = useConfiguratorStore((state) => state.setDownload);
  useEffect(() => {
    function download() {
      const exporter = new GLTFExporter();
      exporter.parse(group.current, function (result) {
        save(
          new Blob([result], { type: "application/octet-stream" }),
            `avatar_${+new Date()}.glb`,
        )
      },
         function (error)  {
          console.log(error);
        },
        { binary: true }
      );
    };
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    function save(blob, filename) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    };
    setDownload(download);
  }, [setDownload]);
  useEffect(() => {
    actions["mixamo.com"]?.play();
  }, [actions]);
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

