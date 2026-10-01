import { useState, useEffect } from "react";
import { Text, Button } from "react-native";

export function Increment() {
  const [prix, setPrix] = useState(100);
  const [point, setPoint] = useState(0);
  const [etat, setEtat] = useState("");
  const [pps, setPps] = useState(1);
  useEffect(() => {
    const Intervall = setInterval(() => {
      setPoint(point + pps);
    }, 1000);
    return () => {
      clearInterval(Intervall);
    };
  }, [point]);

  function click() {
    if (point > prix) {
      setPps(pps + 1);
      setPrix(prix * 2);
      setPoint(point - prix);
    } else {
      setEtat("Erreur pas assez de point");
      setTimeout(() => {
        setEtat("");
      }, 3000);
    }
    const objet = {
      point : point;
    };
    console.log(JSON.stringify(objet));
  }

  return (
    <>
      <Text>Prix d'amélioration : {prix}</Text>
      <Text>Vitesse : {pps}</Text>
      <Text>{point}</Text>
      <Text>{etat}</Text>
      <Button onPress={click} title="améliorer coute"></Button>
    </>
  );
}
