import { useGlobalState } from "lib/recoil/use-global-state";
import {
  signIn as firebaseSignIn,
  signUp as firebaseSignUp,
  signOut as firebaseSingOut,
  FirebaseUser,
  subscribeAuthState,
} from "lib/firebase/auth";
import { useCallback, useEffect } from "react";

type User = { id: string };
type AuthState = {
  user: User | null;
};

export type EmailAndPassword = {
  email: string;
  password: string;
};
type SignUp = (props: EmailAndPassword) => Promise<void>;
type SignIn = (props: EmailAndPassword) => Promise<void>;
type SignOut = () => Promise<void>;

type AuthStateMutator = {
  signUp: SignUp;
  signIn: SignIn;
  signOut: SignOut;
};
type UseAuth = () => [AuthState, AuthStateMutator];
export const useAuth: UseAuth = () => {
  const [authState, setAuthState] = useGlobalState<AuthState>({
    key: "authState",
    defaultValue: { user: null },
  });

  useEffect(() => {
    console.log("effect");
    const observer = (firebaseUser: FirebaseUser | null) => {
      const user = firebaseUser !== null ? { id: firebaseUser.uid } : null;

      setAuthState({ user });
    };

    const unsubscribe = subscribeAuthState(observer);

    return unsubscribe;
  }, []);

  const signUp = useCallback(async ({ email, password }: EmailAndPassword) => {
    await firebaseSignUp({ email, password });
  }, []);

  const signIn = useCallback(async ({ email, password }: EmailAndPassword) => {
    await firebaseSignIn({ email, password });
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSingOut();
  }, []);

  return [authState, { signUp, signIn, signOut }];
};
