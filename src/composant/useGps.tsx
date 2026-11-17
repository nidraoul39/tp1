import * as Location from "expo-location";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function useGps() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (e: any) {
        setErrorMsg(e.message ?? "Erreur de localisation");
      }
    }

    getCurrentLocation();

    const timer = setInterval(() => {
      getCurrentLocation();
    }, 1000);

    return () => clearInterval(timer);
  }, []);
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

  const MyLocLong = location ? location.coords.longitude : 0;
  const MyLocLat = location ? location.coords.latitude : 0;

  return { MyLocLong, MyLocLat, errorMsg };
}
