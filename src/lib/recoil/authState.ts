import { atom, useRecoilState } from "recoil";

type User = { id: string };

type AuthState = {
  user: User | null;
};

const authAtom = atom<AuthState>({
  key: "auth",
  default: { user: null }
})

export const useAuthState = () => {
  return useRecoilState(authAtom)
}
