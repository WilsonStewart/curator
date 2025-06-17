import { createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const isAuthedAtom = atomWithStorage("isAuthed", false);

export const stateStore = createStore();
