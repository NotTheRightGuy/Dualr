import { useRecoilState } from "recoil";
import { userDataAtom } from "../atoms/userDataAtom";

export const useUser = () => {
  const [userData, setUserData] = useRecoilState(userDataAtom);

  return [userData, setUserData];
};
