import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useIdleGame } from "../composant/UseIdleGame";

export default function MainScreen() {
  const { point, pps, prix, etat, click } = useIdleGame();
  return (
    <View style={styles.container}>
      <Text>hello world ahah ! </Text>
      <Text>Yo bien ou bien!</Text>
      <Button title="bonjour"></Button>
      <Text>Prix d'amélioration : {prix}</Text>
      <Text>Vitesse : {pps}</Text>
      <Text>{point}</Text>
      <Text>{etat}</Text>
      <Button onPress={click} title="améliorer coute"></Button>
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
  },
});
