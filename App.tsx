import "react-native-url-polyfill/auto";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

import { AuthProvider, useAuth } from "./src/components/UserContext";
import { Routes } from "./src/routes";

export default function App() {
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
    <>
      <StatusBar style="auto" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
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
