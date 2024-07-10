import { atom, SetterOrUpdater } from "recoil";

export const userDataAtom = atom<any>({
  key: "userData",
  default: {} as any,
});
