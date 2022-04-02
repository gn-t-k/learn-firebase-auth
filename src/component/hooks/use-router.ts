import Router from "lib/nextjs/router";

export const useRouter = () => {
  const push = Router.push;

  return { push };
};
