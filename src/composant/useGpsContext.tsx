import useGps from "../composant/useGps";
import { createContext, useContext } from "react";

const GpsContext = createContext<ReturnType<typeof useGps> | undefined>(
  undefined,
);

export default function GpsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const gps = useGps();
  return <GpsContext.Provider value={gps}>{children}</GpsContext.Provider>;
}
export function useGpsContext(): ReturnType<typeof useGps> {
  const context = useContext(GpsContext);
  if (!context) {
    throw new Error("erreur context");
  }
  return context;
}
