import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import { Button, Input } from "react-native-elements";
import { useAuth } from "../../components/UserContext";
import { AppError } from "../../lib/AppError";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const { signIn } = useAuth();

  const handleLogin = async (type: string, email: string, password: string) => {
    setLoading(type);
    try {
      return await signIn(email, password);
    } catch (error) {
      if (error instanceof AppError) console.log(error.message);
      else console.log("unknown error in handleLogin");
    }

    // console.log({ user, message: "you should redirect to dashboard" });
    setLoading("");
  };

  return (
    <View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
        <Button
          title="Sign in"
          disabled={!!loading.length}
          loading={loading === "LOGIN"}
          onPress={async () => await handleLogin("LOGIN", email, password)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={!!loading.length}
          loading={loading === "SIGNUP"}
          onPress={() => handleLogin("SIGNUP", email, password)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
});
