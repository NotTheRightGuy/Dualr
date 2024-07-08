import questionAtom from "../atoms/questionAtom";
import { useRecoilState } from "recoil";

/*
 * This hook is used to get and set the question data.
 */

export function useQuestion() {
  const [question, setQuestion] = useRecoilState(questionAtom);

  return [question, setQuestion];
}
