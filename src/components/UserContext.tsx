import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User, AuthSession } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { Alert, LogBox } from "react-native";
import { isBrowser } from "../lib/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../lib/AppError";

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  user: User | null;
  session: AuthSession | null | undefined;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null | undefined>(
    undefined
  );
  const [user, setUser] = useState<User | null>(null);

  async function signOut() {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) return Alert.alert("something wrong in sing out");
      setUser(null);
    } catch (error) {}
  }

  async function signIn(email: string, password: string) {
    const { error, user } = await supabase.auth.signIn({ email, password });

    if (error) {
      throw new AppError(error.message, 0);
    }
    setUser(user);
  }

  async function signUp(email: string, password: string) {
    try {
      const { error, user } = await supabase.auth.signUp({ email, password });
      if (!error && user) {
        return Alert.alert("Check your email for the login link!");
      }
    } catch (error) {
      return console.log(
        "something wrong with sign in in userContext.tsx line 48"
      );
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer"]);

    //TODO: remove isBrownser
    try {
      const fetchedSession = supabase.auth.session();
      setSession(fetchedSession || isBrowser() ? fetchedSession : undefined);

      (async () => {
        if (isBrowser()) return;
        const storageSession = await AsyncStorage.getItem(
          "supabase.auth.token"
        );
        if (!storageSession) {
          setSession((oldSession) =>
            oldSession === undefined ? null : oldSession
          );
        }
      })();

      setUser(fetchedSession?.user ?? null);
    } catch (error) {
      console.log("try catch error on userContext");
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(
          `Supabase auth event: ${event}, session user: ${session?.user?.email}`
        );
        setSession(session || isBrowser() ? session : undefined);
        setUser(session?.user ?? null);
      }
    );
    return () => {
      authListener!.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
