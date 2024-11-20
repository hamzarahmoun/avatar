import { logo } from "../Images/index.js";
import { useEffect } from "react";
import { pb, useConfiguratorStore } from "../store.js";
import { Color } from "three";
const DownloadButton = () => {
   const download = useConfiguratorStore((state) => state.download); 
    return (
        <button
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
            onClick={download}
        >
            Download
        </button>
    );
};

const AssetsBox = () => {
    const {
        categories,
        currentCategory,
        fetchCategories,
        setCurrentCategory,
        changeAsset,
        customization, 
        lockedGroups,
    } = useConfiguratorStore();

    useEffect(() => { fetchCategories() }, []);

    return (
        <div className="rounded-t-lg bg-gradient-to-br drop-shadow-md py-6 gap-3 flex flex-col from-black/30 to-indigo-900/20 backdrop-blur-sm">
            <div className="flex items-center gap-8 pointer-events-auto overflow-x-auto px-6 pb-2 noscrollbar">
                {categories?.map((category) => (
                    <button
                        key={category.id} 
                        onClick={() => setCurrentCategory(category)}
                        className={`transition-colors duration-200 font-medium flex-shrink-0 border-b
                            ${currentCategory?.name === category.name
                                ? "text-white shadow-purple-100 border-b-white"
                                : "text-gray-500 hover:text-gray-500 border-b-transparent"
                            }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="flex gap-2 flex-row">
                {currentCategory?.assets?.map((asset) => (
                    <button
                        key={asset.thumbnail}
                        onClick={() => changeAsset(currentCategory.name, asset)}
                        className={`w-20 h-20 rounded-md overflow-hidden bg-gray-200 pointer-events-auto hover:opacity-100 transition-all border-2 duration-500
                            ${customization[currentCategory.name]?.id === asset.id
                                ? "border-indigo-600 opacity-100"
                                : "opacity-50 border-gray-300"
                            }
                        `}
                    >
                        <img
                        className="object-cover w-full h-full"
                            src={pb.files.getUrl(asset, asset.thumbnail)}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export const UI = () => {
    const currentCategory = useConfiguratorStore((state) => state.currentCategory);
    const customization = useConfiguratorStore((state) => state.customization);
    return (
        <main className="pointer-events-none fixed z-10 inset-0 select-none" >
            <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
                <div className="flex justify-between items-center p-10">
                    <a
                        className="pointer-events-auto"
                        href="/"
                    >
                        <img className="w-20" src={logo} />
                    </a>
                    <DownloadButton />
                </div>
                <div className="px-10 flex flex-col">
                    {currentCategory?.colorPalette &&
                    customization[currentCategory.name] && <ColorPicker/>
                    }
                    <AssetsBox />
                </div>
            </div>
        </main>
    );
}

const ColorPicker = () => {
    const updateColor = useConfiguratorStore((state) => state.updateColor);
    const currentCategory = useConfiguratorStore(
      (state) => state.currentCategory
    );
    const handleColorChange = (color) => {
      updateColor(color);
    };
    const customization = useConfiguratorStore((state) => state.customization);
  
    if (!customization[currentCategory.name]?.asset) {
      return null;
    }
    return (
      <div className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md noscrollbar px-2 md:px-0">
        {currentCategory.expand?.colorPalette?.colors.map((color, index) => (
          <button
            key={`${index}-${color}`}
            className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2
               ${
                 customization[currentCategory.name].color === color
                   ? "border-white"
                   : "border-transparent"
               }
            `}
            onClick={() => handleColorChange(color)}
          >
            <div
              className="w-full h-full rounded-md"
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
      </div>
    );
  };