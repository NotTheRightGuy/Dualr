import { atom } from "recoil";

/*
 * Code atom
 *
 * This atom holds the value of the current code in the editor.
 */

export const codeAtom = atom<string>({
  key: "code",
  default: "",
});
