import { atom } from "recoil";

/*
 * This atom is used to store the question data.
 */

const questionAtom = atom({
  key: "questionAtom",
  default: {} as any,
});

export default questionAtom;
