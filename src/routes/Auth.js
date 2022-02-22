import { authService } from "fBase";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
import React, { useState } from "react";



const Auth = () => {
    const [email, setEmail] = useState("");
    const [password,  setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target : {name,value}} = event;
        if(name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);

            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
        
        
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev);
    }
    const onSocialClick =async(event) => {
        const {target: {name}} = event;
        let provider;
        try {
            if(name === "google") {
                provider = new GoogleAuthProvider();
                const result = await signInWithPopup(authService, provider);
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
            } else if (name === "github") {
                provider = new GithubAuthProvider();
                const result = await signInWithPopup(authService, provider);
                const credential = GithubAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
            } 
        } catch(e) {
            console.log(e)
        }
        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" onChange={onChange} required value={email} />
                <input name="password" type="password" placeholder="Password" onChange={onChange} required value={password} />
                <input type="submit" value={newAccount ? "Create" : "Sign In"} />
           
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Google</button>
                <button onClick={onSocialClick} name="github">Github</button>
            </div>
        </div>
    )
}

export default Auth;