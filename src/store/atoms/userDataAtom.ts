import { atom } from "recoil";

export const userDataAtom = atom<any>({
  key: "userData",
  default: {} as any,
});
