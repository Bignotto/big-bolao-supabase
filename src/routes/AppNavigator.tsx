import React from "react";
import { useAuth } from "../components/UserContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingSession from "../components/LoadingSession";
import LoginScreen from "../components/LoginScreen";
import DashboardScreen from "../components/DashboardScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppNavigator() {
  const { user } = useAuth();

  return (
    <Navigator>
      {user === undefined && (
        <Screen name="Loading" component={LoadingSession} />
      )}
      {user === null && <Screen name="Login" component={LoginScreen} />}
      {user && (
        <>
          <Screen
            name="Home"
            component={DashboardScreen}
            // options={{ headerRight: LogoutButton }}
          />
        </>
      )}
    </Navigator>
  );
}
