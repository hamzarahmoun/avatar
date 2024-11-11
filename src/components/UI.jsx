
import { useConfiguratorStore } from "../store.js";
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
import { logo } from "../Images";
import { useEffect } from "react";
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
    useEffect(() => { fetchCategories }, []);
    return (
        <div className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20  backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden ">
            <div className="flex items-center gap-8 pointer-events-auto noscrollbar overflow-x-auto px-6 pb-2">
                {categories.map((category) => (

                    <button
                        key={category.id}
                        onClick={() => setCurrentCategory(category)}
                        className={`transition-colors duration-200 font-medium  
                            ${currentCategory === category.name
                                ? "text-indigo-500"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >

                        {category.name}
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