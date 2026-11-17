import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { Marker, Circle } from "react-native-maps";
import { useGpsContext } from "../composant/useGpsContext";

export default function Maps() {
  const [latitudeB3, longitudeB3] = [49.244231, 4.062332];
  const { MyLocLong, MyLocLat } = useGpsContext();
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Circle
          center={{ latitude: latitudeB3, longitude: longitudeB3 }}
          radius={500}
          fillColor="#f00"
        />
        <Marker coordinate={{ latitude: MyLocLat, longitude: MyLocLong }} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
