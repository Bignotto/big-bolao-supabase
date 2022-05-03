import "react-native-url-polyfill/auto";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import supabase from "./src/lib/supabase";
import { AuthProvider, useAuth } from "./src/components/UserContext";
import { User } from "@supabase/supabase-js";
import DashboardScreen from "./src/components/DashboardScreen";
import LoginScreen from "./src/components/LoginScreen";
import LoadingSession from "./src/components/LoadingSession";
import { AppNavigator } from "./src/routes/AppNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  //const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { session, user } = useAuth();

  useEffect(() => {
    console.log({
      where: "App.tsx",
      user: session?.user?.email,
      session_undefined: session === undefined,
    });
  }, []);

  // useEffect(() => {
  //   async function handleSupabase() {
  //     try {
  //       const { data, error } = await supabase
  //         .from("guesses")
  //         .select(
  //           `*,group_id(name),match_id(home_team_id(name),away_team_id(name))`
  //         );
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   }

  //   handleSupabase();
  // }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
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

{
  /* <View style={styles.container}>
<Text>Open up App.js to start working on your app!</Text>
<StatusBar style="auto" />
</View> */
}
