import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";

import { StatusBar } from "expo-status-bar";
import { useAuth } from "./UserContext";
import supabase from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function DashboardScreen() {
  const [mySession, setMySession] = useState<Session | null | undefined>(null);

  const { session, signOut } = useAuth();
  const [loading, setLoading] = useState("");

  const handleLogout = async () => {
    setLoading("LOGOUT");
    return await signOut();
  };

  useEffect(() => {
    setMySession(session);
    console.log({
      where: "DashboardScreen",
      user: session?.user?.email,
      session_undefined: session === undefined,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is the Dashboard screen!</Text>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Button
          title="Logout"
          disabled={!!loading.length}
          loading={loading === "LOGOUT"}
          onPress={() => handleLogout()}
        />
      </View>
      <Text>{session?.user?.email}</Text>
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
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
