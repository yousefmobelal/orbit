import { create } from "zustand";

type FirstPlanetData = {
  name: string;
  theme: string;
};

type FirstTaskData = {
  name: string;
};

type OnBoardingState = {
  firstPlanetData: Partial<FirstPlanetData>;
  firstTaskData: Partial<FirstTaskData>;
  setFirstPlanetData: (data: FirstPlanetData) => void;
  setFirstTaskData: (data: FirstTaskData) => void;

  reset: () => void;
};

export const useOnBoardingStore = create<OnBoardingState>((set) => ({
  firstPlanetData: {},
  firstTaskData: {},
  signupData: {},
  setFirstPlanetData: (data) => set({ firstPlanetData: data }),
  setFirstTaskData: (data) => set({ firstTaskData: data }),

  reset: () =>
    set({
      firstPlanetData: {},
      firstTaskData: {},
    }),
}));
