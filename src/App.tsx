import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Increment } from './composant/Increment'
export default function App() {
  return (
    <View style={styles.container}>
      <Text>hello world ahah ! </Text>
      <Text>Yo bien ou bien!</Text>
      <Button title='bonjour'></Button>
      <Increment></Increment>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
