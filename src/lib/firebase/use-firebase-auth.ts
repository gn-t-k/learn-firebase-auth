import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser,
  signOut as firebaseSignOut,
  Auth,
} from "firebase/auth";
import { app } from "./app";
import { useCallback } from "react";
import { User } from "feature/user/user";
import { Result } from "util/result";

type UseFirebaseAuth = () => {
  signUp: SignUp;
  signIn: SignIn;
  signOut: SignOut;
  subscribeAuthState: SubscribeAuthState;
};

type SignUp = (props: {
  email: string;
  password: string;
}) => Promise<Result<User>>;
type SignIn = (props: {
  email: string;
  password: string;
}) => Promise<Result<User>>;
type SignOut = () => Promise<void>;
type SubscribeAuthState = (props: EventHandlers) => Unsubscribe;

type Unsubscribe = () => void;
type EventHandlers = {
  onSignIn: (user: User) => void;
  onSignOut: () => void;
};

const signUpHOF =
  (auth: Auth): SignUp =>
  async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        isSuccess: true,
        data: {
          id: userCredential.user.uid,
        },
      };
    } catch (error) {
      return {
        isSuccess: false,
        failure: {
          message:
            error instanceof Error ? error.message : "create user failed",
        },
      };
    }
  };

const signInHOF =
  (auth: Auth): SignIn =>
  async ({ email, password }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        isSuccess: true,
        data: {
          id: userCredential.user.uid,
        },
      };
    } catch (error) {
      return {
        isSuccess: false,
        failure: {
          message:
            error instanceof Error ? error.message : "create user failed",
        },
      };
    }
  };

const signOutHOF =
  (auth: Auth): SignOut =>
  async () => {
    await firebaseSignOut(auth);
  };

const subscribeAuthStateHOF =
  (auth: Auth): SubscribeAuthState =>
  ({ onSignIn, onSignOut }) => {
    const observer = (user: FirebaseUser | null) => {
      if (user !== null) {
        onSignIn({
          id: user.uid,
        });
      } else {
        onSignOut();
      }
    };
    const unsubscribe = onAuthStateChanged(auth, observer);

    return unsubscribe;
  };

const auth = getAuth(app);
const signUp = signUpHOF(auth);
const signIn = signInHOF(auth);
const signOut = signOutHOF(auth);
const subscribeAuthState = subscribeAuthStateHOF(auth);

export const useFirebaseAuth: UseFirebaseAuth = () => ({
  signUp: useCallback(signUp, []),
  signIn: useCallback(signIn, []),
  signOut: useCallback(signOut, []),
  subscribeAuthState: useCallback(subscribeAuthState, []),
});
