import { create } from 'zustand'
import PocketBase from "pocketbase";
const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
    throw new Error("VITE_POCKETBASE_URL is required");
  }
export const pb = new PocketBase(pocketBaseUrl);
pb.autoCancellation(false); // Disable auto-cancellation
if (!pb) {
    throw new Error('PocketBase API key is required');
}


export const useConfiguratorStore = create((set) => ({
  
    categories: [],
    currentCategory: null,
    assets: [],
    customization: {},
    download: () => {},
    setDownload: (download) => set({ download }),

    fetchCategories: async () => {
        // you can also fetch all records at once via getFullList
        const categories = await pb.collection('CustomizationGroups').getFullList({
            sort: '+position',
        });
        const assets = await pb.collection('CustomizationAssets').getFullList({
            sort: '-created',
        });
        const customization = {};
        categories.forEach((category) => {
            category.assets = assets.filter((asset) => asset.group === category.id);
            customization[category.name]={}
            if (category.assetStarting) {
              customization[category.name].asset = category.assets.find(
                (asset) => asset.id === category.assetStarting
              );
            }
          });
        set({ categories, currentCategory: categories[0], assets,customization});
        
    },
    
    setCurrentCategory: (category) => set({ currentCategory: category }),
    changeAsset: (category, asset) => {
        set((state) => ({
          customization: {
            ...state.customization,
            [category]: {
              ...state.customization[category],
              asset,
            },
          },
        }));
      },


}))