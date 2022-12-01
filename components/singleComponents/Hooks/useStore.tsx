import { SpringValue } from "react-spring";
import create from "zustand";

interface globalStore {
  GPUTier: number;
  setGPUTier: (GPU: number) => void;
  scroll: SpringValue | null;
  setScrollY: (y: SpringValue) => void;
  animation: any;
  setAnimation: (func: () => void) => void;
}

const useStore = create<globalStore>((set) => ({
  GPUTier: 0,
  setGPUTier: (GPU) => set({ GPUTier: GPU }),
  scroll: null,
  setScrollY: (y) => set({ scroll: y }),
  animation: "singing",
  setAnimation: (animation) => set({ animation: animation }),
}));

export default useStore;
