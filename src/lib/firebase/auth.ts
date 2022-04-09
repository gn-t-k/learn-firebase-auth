import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  Unsubscribe,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { app } from "./app";

const auth = getAuth(app);

type Failure = {
  message: string;
};
type Result =
  | {
      isSuccess: true;
      user: User;
    }
  | {
      isSuccess: false;
      failure: Failure;
    };

type SignUp = (props: { email: string; password: string }) => Promise<Result>;
export const signUp: SignUp = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      isSuccess: true,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      isSuccess: false,
      failure: {
        message: error instanceof Error ? error.message : "create user failed",
      },
    };
  }
};

type SignInProps = {
  email: string;
  password: string;
};
type SignIn = (props: SignInProps) => Promise<Result>;
export const signIn: SignIn = async ({ email, password }: SignInProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      isSuccess: true,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      isSuccess: false,
      failure: {
        message: error instanceof Error ? error.message : "create user failed",
      },
    };
  }
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

type Observer = (userState: User | null) => void;
type SubscribeAuthState = (observer: Observer) => Unsubscribe;
export const subscribeAuthState: SubscribeAuthState = (observer) => {
  const unsubscribe = onAuthStateChanged(auth, observer);

  return unsubscribe;
};
