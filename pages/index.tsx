import type { NextPage } from "next";
import "modern-css-reset/dist/reset.min.css";
import { useAuth } from "feature/user/use-auth";
import { useState } from "react";

type SignedOutProps = {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onClickSignIn: () => Promise<void>;
  onClickSignUp: () => Promise<void>;
};
const SignedOut = ({
  setEmail,
  setPassword,
  onClickSignIn,
  onClickSignUp,
}: SignedOutProps): JSX.Element => (
  <>
    <h1>サインインする</h1>
    <div>
      <label htmlFor="email">メールアドレス</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">パスワード</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div>
      <button onClick={onClickSignIn}>サインインする</button>
      <button onClick={onClickSignUp}>アカウントを作成する</button>
    </div>
  </>
);

type SignedInProps = {
  user: { id: string };
  onClickSignOut: () => Promise<void>;
};
const SignedIn = ({ user, onClickSignOut }: SignedInProps): JSX.Element => (
  <>
    <h1>サインイン中</h1>
    <p>サインイン中のユーザー：{user.id}</p>
    <button onClick={onClickSignOut}>サインアウトする</button>
  </>
);

const Home: NextPage = () => {
  const [{ user, isProcessing, error }, { signUp, signIn, signOut }] =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignIn = async () => {
    await signIn({ email, password });
  };
  const onClickSignUp = async () => {
    await signUp({ email, password });
  };
  const onClickSignOut = async () => {
    await signOut();
  };

  return isProcessing ? (
    <p>loading...</p>
  ) : user === null ? (
    <>
      <SignedOut
        {...{
          setEmail,
          setPassword,
          onClickSignIn,
          onClickSignUp,
        }}
      />
      <p>{error}</p>
    </>
  ) : (
    <>
      <SignedIn {...{ user, onClickSignOut }} />
      <p>{error}</p>
    </>
  );
};

export default Home;
