import { logo } from "../Images/index.js";
import { useEffect } from "react";
import { pb, useConfiguratorStore } from "../store.js";
const DownloadButton = () => {
    return (
        <button
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
            onClick={() => { }}
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
        <div className="rounded-2xl bg-white drop-shadow-md p-6 gap-6 flex flex-col">
            <div className="flex items-center gap-6 pointer-events-auto ">
                {categories?.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setCurrentCategory(category)}
                        className={`transition-colors duration-200 font-medium  
                            ${currentCategory?.name === category.name
                                ? "text-indigo-500"
                                : "text-gray-500 hover:text-gray-700"
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
                            src={pb.files.getUrl(asset, asset.thumbnail)}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export const UI = () => {
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
                <div className="flex flex-col gap-6">
                    <AssetsBox />
                </div>
            </div>
        </main>
    );
}