import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import MainScreen from "../Screen/MainScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function UseIdleGame() {
  const [point, setPoint] = useState(0);
  const [prix, setPrix] = useState(100);
  const [pps, setPps] = useState(1);
  const [etat, setEtat] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    async function autorisation() {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
    }
    autorisation();
  }, []);

  useEffect(() => {
    async function load() {
      const save = await AsyncStorage.getItem("save");
      if (save) {
        const data = JSON.parse(save);
        setPoint(data.point);
        setPrix(data.prix);
        setPps(30);
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

  useEffect(() => {
    if (point > prix && !flag) {
      console.log("OK");
      Notifications.scheduleNotificationAsync({
        content: {
          title: "niveau suivant !",
          body: "tu peux upgrade",
          data: { screen: MainScreen },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 1,
        },
      });
      setFlag(true);
    }
  }, [point]);

  function click() {
    if (point >= prix) {
      const newPoint = point - prix;
      const newPrix = prix * 2;
      const newPps = pps + 1;

      setPoint(newPoint);
      setPrix(newPrix);
      setPps(newPps);
      setFlag(false);
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

  return { point, prix, pps, etat, click, setPrix };
}
