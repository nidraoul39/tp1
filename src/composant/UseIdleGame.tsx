import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export function useIdleGame() {
  const [point, setPoint] = useState(0);
  const [prix, setPrix] = useState(100);
  const [pps, setPps] = useState(1);
  const [etat, setEtat] = useState("");

  useEffect(() => {
    async function load() {
      const save = await AsyncStorage.getItem("save");
      if (save) {
        const data = JSON.parse(save);
        setPoint(data.point);
        setPrix(data.prix);
        setPps(data.pps);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoint((prev) => prev + pps);
    }, 1000);

    return () => clearInterval(timer);
  }, [pps]);

  function click() {
    if (point >= prix) {
      const newPoint = point - prix;
      const newPrix = prix * 2;
      const newPps = pps + 1;

      setPoint(newPoint);
      setPrix(newPrix);
      setPps(newPps);

      // Sauvegarde des nouvelles valeurs
      AsyncStorage.setItem(
        "save",
        JSON.stringify({ point: newPoint, prix: newPrix, pps: newPps }),
      );
    } else {
      setEtat("Erreur pas assez de point");
      setTimeout(() => setEtat(""), 3000);
    }
  }

  return { point, prix, pps, etat, click };
}
