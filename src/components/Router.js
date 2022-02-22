import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation  userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? 
                <>
                    <Route index element={<Home userObj={userObj}/>} />
                    <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                </> : <>
                    <Route index element={<Auth />} />
                </>}
            </Routes>
        </HashRouter>
    )
};

export default AppRouter;