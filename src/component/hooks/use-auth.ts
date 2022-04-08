import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  signIn as firebaseSignIn,
  signUp as firebaseSignUp,
} from "lib/firebase/auth";

type User = { id: string };
type AuthState = {
  user: User | null;
};
type SignUpProps = {
  email: string;
  password: string;
};
type SignInProps = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const authRecoilState = atom<AuthState>({
    key: "authState",
    default: { user: null },
  });

  const authState = useRecoilValue(authRecoilState);
  const setAuthState = useSetRecoilState(authRecoilState);

  const signUp = async ({ email, password }: SignUpProps) => {
    const result = await firebaseSignUp({ email, password });

    setAuthState({ user: result.isSuccess ? { id: result.user.uid } : null });
  };

  const signIn = async ({ email, password }: SignInProps) => {
    const result = await firebaseSignIn({ email, password });

    setAuthState({ user: result.isSuccess ? { id: result.user.uid } : null });
  };

  return [authState];
};
