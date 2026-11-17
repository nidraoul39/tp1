import { UseIdleGame } from "../composant/UseIdleGame";
import { createContext, useContext } from "react";

const IdleGameContext = createContext<
  ReturnType<typeof UseIdleGame> | undefined
>(undefined);

export default function UseIdleGameContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const idleGame = UseIdleGame();
  return (
    <IdleGameContext.Provider value={idleGame}>
      {children}
    </IdleGameContext.Provider>
  );
}
export function useMonContext(): ReturnType<typeof UseIdleGame> {
  const context = useContext(IdleGameContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
