import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { UseIdleGame } from "../composant/UseIdleGame";
import TextMain from "../composant/TextMain";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useMonContext } from "../composant/UseIdleGameContext";

export default function MainScreen() {
  const { point, pps, prix, etat, click } = useMonContext();
  const navigation = useNavigation<any>();
  return (
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
      <StatusBar style="auto" />
    </View>
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
