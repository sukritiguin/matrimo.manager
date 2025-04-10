import { createContext, ReactNode, useContext } from "react";

export function createReactContext<T>(
  init: () => T,
  defaultValue: T | undefined = undefined
) {
  const context = createContext<T | undefined>(defaultValue);

  function Provider({ children }: { children: ReactNode }) {
    const value = init();
    return <context.Provider value={value}>{children}</context.Provider>;
  }

  function useModifyContext() {
    const value = useContext(context);
    if (value === undefined) {
      throw new Error("useContext must be used within a Provider");
    }
    return value;
  }

  return {
    context,
    Provider,
    use: useModifyContext,
  };
}
