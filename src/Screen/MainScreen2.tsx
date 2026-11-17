import useGps from "../composant/useGps";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import TextMain from "../composant/TextMain";
import { useNavigation } from "@react-navigation/native";
import { useMonContext } from "../composant/UseIdleGameContext";
import * as Notifications from "expo-notifications";
import { useGpsContext } from "../composant/useGpsContext";

export default function MainScreen2() {
  const [latitudeB3, longitudeB3] = [49.244231, 4.062332];
  const { MyLocLong, MyLocLat } = useGpsContext();
  const [color, setColor] = useState("#fff");
  const { point, pps, prix, etat, click, setPrix } = useMonContext();
  const navigation = useNavigation<any>();
  const [prixB, setPrixB] = useState(prix);
  const d = getDistanceInMeters(latitudeB3, longitudeB3, MyLocLat, MyLocLong);
  const [res, setRes] = useState("");

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
  });

  useEffect(() => {
    if (d < 500) {
      setRes("nickel tu as droit au bonus");
      setPrix(2 * prixB);
      setColor("#f00");
      Notifications.scheduleNotificationAsync({
        content: {
          title: "attention",
          body: "on joue pas au bat 3",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 10,
        },
      });
    } else {
      setRes("trop loin");
      setPrix(prixB);
      setColor("#fff");
    }
  }, []);

  return (
    <>
      <Text>Hello</Text>
      <Text>{res}</Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>hello world ahah ! </Text>
          <Text>Yo bien ou bien!</Text>
        </View>

        <Button title="bonjour" onPress={() => navigation.navigate("Detail")} />

        <View style={styles.row}>
          <TextMain label="Prix : " unit=" pts" style={styles.localText}>
            {prix}
          </TextMain>
          <TextMain label=" | Vitesse : " unit=" pps" style={styles.localText}>
            {pps}
          </TextMain>
        </View>

        <View style={styles.row}>
          <TextMain label="Score : " unit=" pts" style={styles.localText}>
            {point}
          </TextMain>
          <Text> {etat}</Text>
        </View>

        <Button
          onPress={() => {
            click();
            navigation.navigate("Detail");
          }}
          title="améliorer coute"
        />

        <Pressable
          style={{ backgroundColor: color }}
          onPress={() => {
            navigation.navigate("Maps");
          }}
        >
          <Text>ouvrir Map</Text>
        </Pressable>

        <StatusBar style="auto" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  localText: {
    fontSize: 15,
    color: "red",
    fontWeight: "bold",
  },
});
const toRad = (deg: number) => (deg * Math.PI) / 180;

function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371000; // Rayon de la Terre en mètres

  const phi1 = toRad(lat1);
  const phi2 = toRad(lat2);
  const deltaPhi = toRad(lat2 - lat1);
  const deltaLambda = toRad(lon2 - lon1);

  const a =
    Math.sin(deltaPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
