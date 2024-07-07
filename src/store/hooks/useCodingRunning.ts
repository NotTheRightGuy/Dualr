import { codeRunningAtom } from "../atoms/codeRunningAtom";
import { useRecoilState } from "recoil";
import type { SetterOrUpdater } from "recoil";

/*
 * useCode hook
 *
 * This hook provides a way to interact with the codeAtom.
 */

export function useCode(): [boolean, SetterOrUpdater<boolean>] {
  const [codeRunning, setCodeRunning] = useRecoilState(codeRunningAtom);

  return [codeRunning, setCodeRunning];
}
