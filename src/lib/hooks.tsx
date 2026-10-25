import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

export const WindowsizeContext = createContext(window.innerWidth);

export function WindowsizeContextProvider(props: PropsWithChildren) {
  const [value, setValue] = useState(window.innerWidth);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      setValue(window.innerWidth);
    });
    obs.observe(document.body);

    return () => {
      obs.disconnect();
    };
  });

  return <WindowsizeContext value={value}>{props.children}</WindowsizeContext>;
}
