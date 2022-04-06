import {
  getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  Unsubscribe,
} from "firebase/auth";

const auth = getAuth();

type Failure = {
  message: string;
};
type Result = User | Failure;

type SignUp = (email: string, password: string) => Promise<Result>;
export const signUp: SignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "create user failed",
    };
  }
};

type SignIn = (email: string, password: string) => Promise<Result>;
export const signIn: SignIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "create user failed",
    };
  }
};

type Observer = (userState: User | null) => void;
type SubscribeAuthState = (observer: Observer) => Unsubscribe;
export const subscribeAuthState: SubscribeAuthState = (observer) => {
  const unsubscribe = onAuthStateChanged(auth, observer);

  return unsubscribe;
};
