import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const useGlobalState = <T>(props: {
  key: string;
  defaultValue: T;
}): [T, (newState: T) => void] => {
  const { key, defaultValue } = props;
  const recoilState = atom<T>({
    key,
    default: defaultValue,
  });

  const globalState = useRecoilValue(recoilState);

  const setterOrUpdater = useSetRecoilState(recoilState);
  const setGlobalState = useCallback(
    (newState: T) => {
      setterOrUpdater(newState);
    },
    [setterOrUpdater]
  );

  return [globalState, setGlobalState];
};
