import { codeAtom } from "../atoms/codeAtom";
import { useRecoilState } from "recoil";
import type { SetterOrUpdater } from "recoil";

/*
 * useCode hook
 *
 * This hook provides a way to interact with the codeAtom.
 */

export function useCode(): [string, SetterOrUpdater<string>] {
  const [code, setCode] = useRecoilState(codeAtom);

  return [code, setCode];
}
