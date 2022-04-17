import NextRouter from "next/router";

export const useRouter = () => {
  const push = (path: string) => {
    NextRouter.push(path);
  };

  return { push };
};
