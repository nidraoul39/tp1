import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather, AntDesign } from "@expo/vector-icons";
import Maps from "./Screen/Maps";
import MainScreen from "./Screen/MainScreen";
import SecondScreen from "./Screen/SecondScreen";
import MainScreen2 from "./Screen/MainScreen2";
import UseIdleGameContext from "./composant/UseIdleGameContext";
import GpsProvider from "./composant/useGpsContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Save"
        component={SecondScreen}
        options={{
          tabBarIcon: () => <AntDesign name="save" size={24} color="black" />,
        }}
      />
      <Tab.Screen name="Maps" component={Maps} />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Tabs} />

      <Drawer.Screen
        name="Detail"
        component={MainScreen2}
        options={{ title: "Détails" }}
      />
      <Drawer.Screen
        name="Save"
        component={SecondScreen}
        options={{ title: "Sauvegardes" }}
      />
      <Drawer.Screen name="Maps" component={Maps} />
    </Drawer.Navigator>
  );
}

// 4. La Racine : Le Stack principal
export default function App() {
  return (
    <GpsProvider>
      <UseIdleGameContext>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainDrawer" component={MyDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </UseIdleGameContext>
    </GpsProvider>
  );
}
