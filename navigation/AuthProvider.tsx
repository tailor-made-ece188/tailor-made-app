import React, { createContext } from "react";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_BASE_URL } from "../config/apiKeys";
import { encode } from "base-64";
import { RegisterUserObject, UserProfile } from "../config/types";

interface AuthContextObject {
  userToken: string;
  isValidToken: boolean;
  login: (user: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (profile: RegisterUserObject) => Promise<void>;
  getCurrentUser: () => Promise<UserProfile | null>
}

const defaultAuthContext: AuthContextObject = {
  userToken: "",
  isValidToken: false,
  login: (user: string, pass: string) => new Promise<void>((resolve, reject) => { }),
  logout: () => new Promise<void>((resolve, reject) => { }),
  register: (profile: RegisterUserObject) => new Promise<void>((resolve, reject) => { }),
  getCurrentUser: () => new Promise<UserProfile | null>((resolve, reject) => { }),
}
export const AuthContext = createContext(defaultAuthContext);

//status:401 if invalid token
const getCachedToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@TAILOR_MADE_JWT_TOKEN");
    console.log("JWT Token Is: " + value);
    return value ? value : "";
  } catch (e) {
    console.log("ERROR GETTING TOKEN");
    return "";
  }
};

const setCachedToken = async (value: string) => {
  try {
    await AsyncStorage.setItem("@TAILOR_MADE_JWT_TOKEN", value);
    console.log("Successfully set storage to: " + value);
  } catch (e) {
    console.log("ERROR SETTING TOKEN");
    console.log(e);
  }
};

interface AuthProviderProps {
  children: JSX.Element
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  /*grab the token from storage when app first mounts, and attempt logging in thru
  our useEffect */
  useEffect(() => {
    const grabToken = async () => {
      const storageToken = await getCachedToken();
      setUserToken(storageToken);
    };
    grabToken();
  }, []);

  //function to login the user
  const login = async (user: string, pass: string) => {
    console.log("Basic " + encode(user + ":" + pass));
    const res = await fetch(SERVER_BASE_URL + "/loginUsername", {
      method: "POST",
      headers: {
        Authorization: "Basic " + encode(user + ":" + pass),
      },
    });
    console.log(res.status);
    if (res.status >= 400) {
      console.log("Error signing in!");
      alert("Invalid username or password");
      setIsValidToken(false);
      setCachedToken("");
    } else {
      const tokenStatusData = await res.json();
      console.log("Successfully signed in");
      setCachedToken(tokenStatusData["jwt_token"]);
      setUserToken(tokenStatusData["jwt_token"]);
      setIsValidToken(true);
    }
  };

  //TODO: FIX ERROR MESSAGE
  //function to register the user
  const register = async (profile: RegisterUserObject) => {
    const { username, password } = profile;
    const registerResponse = await fetch(
      SERVER_BASE_URL + "/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }
    );

    const registerResponseData = await registerResponse.json();
    console.log(registerResponseData);
    if (registerResponse.status > 400) {
      alert("This username or email is already taken!");
    } else {
      alert("User has been successfully registered!");
      await login(username, password);
    }
  };

  const getCurrentUser = async () => {
    const res = await fetch(SERVER_BASE_URL + "/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-token": userToken,
      },
    });
    if (res.status === 200) {
      const json = await res.json();
      const profile: UserProfile = json.profile;
      return profile;
    }
    return null;
  };

  //useEffect to track if the jwt token is valid
  useEffect(() => {
    const attemptLoginJWT = async () => {
      if (!userToken) {
        setIsValidToken(false);
      } else if (userToken && !isValidToken) {
        console.log("attempting log-in with: " + userToken);
        const res = await fetch(SERVER_BASE_URL + "/validateToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": userToken,
          },
        });
        console.log(res.status);
        const tokenStatusData = await res.json();
        console.log(tokenStatusData);
        if (res.status >= 400) {
          console.log("Error signing in!");
          setIsValidToken(false);
          setCachedToken("");
        } else {
          console.log("Successfully signed in");
          setIsValidToken(true);
        }
      }
    };
    attemptLoginJWT();
  }, [userToken]);

  const logout = async () => {
    console.log("Logging out...");
    await setCachedToken("");
    setUserToken("");
  };
  return (
    <AuthContext.Provider
      value={{
        userToken,
        isValidToken,
        login: login,
        logout: logout,
        register: register,
        getCurrentUser: getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};