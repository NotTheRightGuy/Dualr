import { opponentAtom } from "../atoms/opponentAtom";
import { useRecoilState } from "recoil";

export function useOpponent() {
  const [oppenent, setOpponet] = useRecoilState(opponentAtom);

  return [oppenent, setOpponet];
}
