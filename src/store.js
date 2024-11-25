import { create } from 'zustand'
import PocketBase from "pocketbase";
import { MeshStandardMaterial } from 'three';
import { randInt } from 'three/src/math/MathUtils.js';
const pocketBaseUrl = import.meta.env.VITE_POCKETBASE_URL;
if (!pocketBaseUrl) {
    throw new Error("VITE_POCKETBASE_URL is required");
  }

  export const PHOTO_POSES = {
    Idle: "Idle",
    Chill: "Chill",
    Cool: "Cool",
    Punch: "Punch",
    Ninja: "Ninja",
    King: "King",
    Busy: "Busy",
  };
  export const UI_MODES = {
    PHOTO: "photo",
    CUSTOMIZE: "customize",
  };
export const pb = new PocketBase(pocketBaseUrl);
pb.autoCancellation(false); // Disable auto-cancellation
if (!pb) {
    throw new Error('PocketBase API key is required');
}


export const useConfiguratorStore = create((set,get) => ({
  setPose: (pose) => set({ pose }),
  mode: UI_MODES.CUSTOMIZE,
  setMode: (mode) => {
    set({ mode });
    if (mode === UI_MODES.CUSTOMIZE) {
      set({ pose: PHOTO_POSES.Idle });
    }
  },
    categories: [],
    currentCategory: null,
    assets: [],
    customization: {},
    lockedGroups: {},

    skin: new MeshStandardMaterial({ color: 0xf5c6a5, roughness: 1 }),

    download: () => {},
    setDownload: (download) => set({ download }),
    updateColor: (color)=>{
      set((state) => ({ 
         customization: {
        ...state.customization,
        [state.currentCategory.name]: {
          ...state.customization[state.currentCategory.name],
          color,
        },
      }
      }))
      if (get().currentCategory.name === "Head") {
        get().updateSkin(color);
      }
    },
    updateSkin: (color) => {
      get().skin.color.set(color);
    },
    fetchCategories: async () => {
        // you can also fetch all records at once via getFullList
        const categories = await pb.collection('CustomizationGroups').getFullList({
            sort: '+position',
            expand: 'colorPalette,cameraPlacement',
        });
        const assets = await pb.collection('CustomizationAssets').getFullList({
            sort: '-created',
        });
        const customization = {};
        categories.forEach((category) => {
            category.assets = assets.filter((asset) => asset.group === category.id);
            customization[category.name]={
              color: category.expand?.colorPalette?.colors?.[0] || "",
            }
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
        get().applyLockedAssets();

      },
      randomize: () => {
        const customization = {};
        get().categories.forEach((category) => {
          let randomAsset = category.assets[randInt(0, category.assets.length - 1)];
          if (category.removable) {
            if (randInt(0, category.assets.length - 1) === 0) {
              randomAsset = null;
            }
          }
          const randomColor =
            category.expand?.colorPalette?.colors?.[
              randInt(0, category.expand.colorPalette.colors.length - 1)
            ];
          customization[category.name] = {
            asset: randomAsset,
            color: randomColor,
          };
          if (category.name === "Head") {
            get().updateSkin(randomColor);
          }
        });
        set({ customization });
        get().applyLockedAssets();

      },

      applyLockedAssets: () => {
        const customization = get().customization;
        const categories = get().categories;
        const lockedGroups = {};
    
        Object.values(customization).forEach((category) => {
          if (category.asset?.lockedGroups) {
            category.asset.lockedGroups.forEach((group) => {
              const categoryName = categories.find(
                (category) => category.id === group
              ).name;
              if (!lockedGroups[categoryName]) {
                lockedGroups[categoryName] = [];
              }
              const lockingAssetCategoryName = categories.find(
                (cat) => cat.id === category.asset.group
              ).name;
              lockedGroups[categoryName].push({
                name: category.asset.name,
                categoryName: lockingAssetCategoryName,
              });
            });
          }
        });
    
        set({ lockedGroups });
      },

}))