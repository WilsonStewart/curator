import { atom, createStore } from "jotai";

export const authAtom = atom({
  isUserLoggedIn: false,
});

export const stateStore = createStore();
