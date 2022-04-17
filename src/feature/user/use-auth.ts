import { useAuthState, useAuthStateMutators } from "lib/recoil/use-auth-state";
import { useFirebaseAuth } from "lib/firebase/use-firebase-auth";
import { useCallback, useEffect, useState } from "react";
import { User } from "feature/user/user";

type UseAuth = () => [AuthState, AuthStateMutators];

type AuthState = {
  user: User | null;
  isProcessing: boolean;
  error: string | null;
};
type AuthStateMutators = {
  signUp: (props: { email: string; password: string }) => Promise<void>;
  signIn: (props: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuth: UseAuth = () => {
  const [isProcessing, setIsProcessing] =
    useState<AuthState["isProcessing"]>(false);
  const [error, setError] = useState<AuthState["error"]>(null);
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

  const { user } = useAuthState();

  const signUp: AuthStateMutators["signUp"] = useCallback(
    async ({ email, password }) => {
      setIsProcessing(true);
      setError(null);

      const result = await firebaseSignUp({ email, password });

      if (!result.isSuccess) {
        setError(result.failure.message);
      }

      setIsProcessing(false);
    },
    [firebaseSignUp]
  );

  const signIn: AuthStateMutators["signIn"] = useCallback(
    async ({ email, password }) => {
      setIsProcessing(true);
      setError(null);

      const result = await firebaseSignIn({ email, password });

      if (!result.isSuccess) {
        setError(result.failure.message);
      }

      setIsProcessing(false);
    },
    [firebaseSignIn]
  );

  const signOut: AuthStateMutators["signOut"] = useCallback(async () => {
    setIsProcessing(true);

    await firebaseSignOut();

    setIsProcessing(false);
  }, [firebaseSignOut]);

  return [
    { user, isProcessing, error },
    { signUp, signIn, signOut },
  ];
};
