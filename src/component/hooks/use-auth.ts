import { useAuthState, useAuthStateMutators } from "lib/recoil/use-auth-state";
import { useFirebaseAuth } from "lib/firebase/use-firebase-auth";
import { useCallback, useEffect } from "react";
import { User } from "feature/user/user";

type UseAuth = () => [AuthState, AuthStateMutators];

type AuthState = {
  user: User | null;
};
type AuthStateMutators = {
  signUp: (props: { email: string; password: string }) => Promise<void>;
  signIn: (props: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuth: UseAuth = () => {
  const { setUser, unsetUser } = useAuthStateMutators();
  const {
    signUp: firebaseSignUp,
    signIn: firebaseSignIn,
    signOut: firebaseSignOut,
    subscribeAuthState,
  } = useFirebaseAuth();

  useEffect(() => {
    const onSignIn = (user: User) => {
      setUser(user.id);
    };
    const onSignOut = () => {
      unsetUser();
    };

    const unsubscribe = subscribeAuthState({ onSignIn, onSignOut });

    return unsubscribe;
  }, [setUser, subscribeAuthState, unsetUser]);

  const authState: AuthState = useAuthState();

  const signUp: AuthStateMutators["signUp"] = useCallback(
    async ({ email, password }) => {
      await firebaseSignUp({ email, password });
    },
    [firebaseSignUp]
  );

  const signIn: AuthStateMutators["signIn"] = useCallback(
    async ({ email, password }) => {
      await firebaseSignIn({ email, password });
    },
    [firebaseSignIn]
  );

  const signOut: AuthStateMutators["signOut"] = useCallback(async () => {
    await firebaseSignOut();
  }, [firebaseSignOut]);

  return [authState, { signUp, signIn, signOut }];
};
