import { create } from 'zustand'

const pb = import.meta.env.VITE_POCKETBASE;
if (!pb) {
    throw new Error('PocketBase API key is required');
}

export const useConfiguratorStore = create((set) => ({
    categories: [],
    currentCategory: null,
    assets: [],
    fetchCategories: async () => {
        // you can also fetch all records at once via getFullList
        const categories = await pb.collection('CustomizationAssets').getFullList({
            sort: '+position',
        });
        const assets = await pb.collection('CustomizationAssets').getFullList({
            sort: '-created',
        });
        set({ categories, currentCategory: categories[0], assets });
    },
    setCurrentCategory: (category) => set({ currentCategory: category }),
}))