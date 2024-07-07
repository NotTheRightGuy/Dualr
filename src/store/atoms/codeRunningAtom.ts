import { atom } from "recoil";

/*
 * Code Running atom
 *
 * This atom holds the boolean value of whether the code is being run. or not
 */

export const codeRunningAtom = atom<boolean>({
  key: "running",
  default: false,
});
