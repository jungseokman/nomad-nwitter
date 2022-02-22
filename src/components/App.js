import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "fBase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] =  useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(async(user) => {
      if(user) {
        setIsLoggedIn(true)
        await setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => updateProfile(user, {displayName: user.displayName}),
        });
      } else {
        setIsLoggedIn(false)
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args),
    })
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter </footer>
    </>
  );
}

export default App;
