import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingSession from "../components/LoadingSession";
import { useAuth } from "../components/UserContext";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user === undefined && (
        <Navigator>
          <Screen name="Loading" component={LoadingSession} />
        </Navigator>
      )}
      {user === null && <AuthRoutes />}
      {user && <AppRoutes />}
    </NavigationContainer>
  );
}
