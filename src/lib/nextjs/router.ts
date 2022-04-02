import NextRouter from "next/router";

export default class Router {
  public static push = (path: string) => {
    NextRouter.push(path);
  };
}
