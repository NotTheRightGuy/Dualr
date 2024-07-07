import { atom } from "recoil";

/*
 * Language atom
 *
 * This atom holds the value of the current language in the editor.
 */

export const languageAtom = atom<string>({
  key: "language",
  default: "javascript",
});
