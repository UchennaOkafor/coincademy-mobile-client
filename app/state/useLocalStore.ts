import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';
import create, { StateCreator } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface LocalUser {
  name: string
  experience: string
  interests: string[]
  onboarded: boolean
  createdAt: number
}

interface Preferences {
  audio: {
    muted: boolean,
    hasSeenNarrationPrompt?: boolean
  }
}

export interface Store {
  user: LocalUser
  preferences: Preferences
  setOnboardingValues: (user: LocalUser) => void
  setAudioMuted: (value: boolean) => void
  setHasSeenNarrationPrompt: (value: boolean) => void
  reset: () => void
}

const initialState: { user: LocalUser, preferences: Preferences } = {
  user: {
    name: '',
    experience: '',
    interests: [],
    onboarded: false,
    createdAt: Date.now()
  },
  preferences: {
    audio: {
      muted: true,
      hasSeenNarrationPrompt: false
    }
  },
}

type ZustandImmer = [['zustand/persist', unknown], ['zustand/immer', never]];

const initializer: StateCreator<Store, ZustandImmer, [], Store> = (set, get) => ({
    ...initialState,
    setOnboardingValues: (user: LocalUser) => {
      set(produce<Store>(state => {
        state.user.name = user.name;
        state.user.experience = user.experience;
        state.user.interests = user.interests;
        state.user.onboarded = true;
        state.user.createdAt = user.createdAt
      }));
    },
    setAudioMuted: (value: boolean) => {
      set(produce<Store>(state => {
        state.preferences.audio.muted = value;
      }))
    },
    setHasSeenNarrationPrompt: (value: boolean) => {
      set(produce<Store>(state => {
        state.preferences.audio.hasSeenNarrationPrompt = value;
      }))
    },
    reset: () => set(initialState)
});

const COINCADEMY_KEY = 'coincademy-local-store';

export const createLocalStore = persist(immer(initializer), {
  name: COINCADEMY_KEY,
  getStorage: () => AsyncStorage,
});

export const useLocalStore = create<Store>()(createLocalStore);