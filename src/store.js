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
    fetchCategories: async () => {
        // you can also fetch all records at once via getFullList
        const categories = await pb.collection('CustomizationGroups').getFullList({
            sort: '+position',
        });
        const assets = await pb.collection('CustomizationAssets').getFullList({
            sort: '-created',
        });
        categories.forEach((category) => {
            category.assets = assets.filter((asset) => asset.group === category.id);
            
          });
        set({ categories, currentCategory: categories[0], assets });
    },
    setCurrentCategory: (category) => set({ currentCategory: category }),
}))