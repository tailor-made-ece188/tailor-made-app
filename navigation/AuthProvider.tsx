import React, { createContext } from "react";

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_BASE_URL } from "../config/apiKeys";
import { encode } from "base-64";
import { RegisterUserObject, UserProfile, UploadedPicture } from "../config/types";
import { grabUserImages } from "../db/mongoFunctions";

interface AuthContextObject {
  userToken: string;
  isValidToken: boolean;
  login: (user: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (profile: RegisterUserObject) => Promise<void>;
  user: UserProfile | null;
  userPics: UploadedPicture[];
  setUserPics: React.Dispatch<React.SetStateAction<UploadedPicture[]>>;
}

const defaultAuthContext: AuthContextObject = {
  userToken: "",
  isValidToken: false,
  login: (user: string, pass: string) => new Promise<void>((resolve, reject) => { }),
  logout: () => new Promise<void>((resolve, reject) => { }),
  register: (profile: RegisterUserObject) => new Promise<void>((resolve, reject) => { }),
  user: null,
  userPics: [],
  setUserPics:  ()=> {}
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
  const [user,setUser] = useState<null | UserProfile>(null);
  const [userPics, setUserPics] = useState<UploadedPicture[]>([]);
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
      setUserToken("");
      await setCachedToken("");
    } else {
      const tokenStatusData = await res.json();
      console.log("Successfully signed in");
      await setCachedToken(tokenStatusData["jwt_token"]);
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

  const getCurrentUser = async (userToken : string) => {
    console.log("Getting user info");
    const res = await fetch(SERVER_BASE_URL + "/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": userToken,
      },
    });
    //console.log(res);
    if (res.status === 200) {
      const json = await res.json();
      console.log("user info");
      console.log(json);
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
        setUserPics([]);
        setUser(null);
        return;
      } else if (userToken && !isValidToken) {
        if(user){
          console.log("already signed in!");
          return;
        }
        console.log("attempting log-in with: " + userToken);
        try{
          console.log("validating with " + userToken);
        const res = await fetch(SERVER_BASE_URL + "/validateToken", {
          method: "GET",
          headers: {
            "auth-token": userToken,
          },
        });
        if (res.status >= 400) {
          console.log("Error signing in!");
          await setCachedToken("");
          setIsValidToken(false);
        } else {
          console.log("Successfully signed in");
          const tokenStatusData = await res.json();
          console.log(tokenStatusData);
          const user = await getCurrentUser(userToken);
          console.log(user);
          setUser(user);
          setIsValidToken(true);
        }
      }
      catch(err){
        console.error(err);
      }
    };
  }
    //console.log("attempting jwt local sign-in");
    attemptLoginJWT();
  }, [userToken]);

  //get pictures tied to the user when the user loads in
  useEffect(() => {
    if(!user){
      return;
    }
    if(!userToken){
      console.error("Error, user is set before token!");
    }
    console.log("Getting user' s pictures!");
    grabUserImages(userToken).then(images => {
      //console.log(images);
      setUserPics(images);
    })
  }, [user]);

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
        user: user,
        userPics: userPics,
        setUserPics: setUserPics
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};