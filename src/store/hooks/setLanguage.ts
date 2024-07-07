import { useRecoilState } from "recoil";
import { languageAtom } from "../atoms/languageAtom";

/*
 * useLanguage hook
 *
 * This hook provides a way to interact with the languageAtom.
 */

export function useLanguage(): [string, (language: string) => void] {
  const [language, setLanguage] = useRecoilState(languageAtom);

  return [language, setLanguage];
}
