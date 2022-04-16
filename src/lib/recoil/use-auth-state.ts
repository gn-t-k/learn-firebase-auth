import { User } from "feature/user/user";
import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type AuthState = {
  user: User | null;
};

const authAtom = atom<AuthState>({
  key: "auth",
  default: { user: null },
});

export const useAuthState = () => {
  return useRecoilValue(authAtom);
};

export const useAuthStateMutators = () => {
  const setAuthState = useSetRecoilState(authAtom);

  const setUser = useCallback(
    (id: string) => {
      setAuthState({ user: { id } });
    },
    [setAuthState]
  );

  const unsetUser = useCallback(() => {
    setAuthState({ user: null });
  }, [setAuthState]);

  return { setUser, unsetUser };
};
