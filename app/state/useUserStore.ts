import create from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from "zustand/middleware"
import produce from 'immer'

const userStorePersist = persist((set, get) => ({
  preferences: {
    sound: {
      muted: false
    },
  },
  misc: { 
    onboarded: false,
    signedIn: false,
    authToken: ""
  },
  user: {},
  setOnboardingComplete: () => {
    set(produce((state: any) => {
      state.misc.onboarded = true
    }))
  },
  setAuthenticated: (value: boolean) => {
    set(produce((state: any) => {
      state.misc.signedIn = value
    }))
  },
  setSoundMuted: (value: boolean) => {
    set(produce((state: any) => {
      state.preferences.sound.muted = value
    }))
  },
}), {
  name: "user-preferences-storage", // unique name
  getStorage: () => AsyncStorage,
});

export const useUserStore = create(userStorePersist);
