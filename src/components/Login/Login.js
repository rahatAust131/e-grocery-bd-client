import { useContext, useState } from "react";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import firebaseConfig from "./firebase.config";

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const Login = () => {
    // state of user
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: "",
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    // handling form or field blur
    const handleBlur = (e) => {
        let isFieldValid = true;
        // email validation
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        // password validation
        if (e.target.name === "password") {
            const isPassValid = e.target.value.length >= 6;
            const passHasNumber = /\d/.test(e.target.value);
            isFieldValid = isPassValid && passHasNumber;
        }
        // input field validation
        if (isFieldValid) {
            const validUser = { ...user };
            validUser[e.target.name] = e.target.value;
            setUser(validUser);
        }
    };

    // handling google sign in
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const signedInUser = result.user;
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                updateUserName(user.displayName);
                history.replace(from);
            })
            .catch((error) => {
                var errorMessage = error.message;
                var email = error.email;
                const signedInUser = { ...user };
                signedInUser.error = errorMessage;
                console.log(email, errorMessage);
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
            });
    };

    // handling login
    const handleLogin = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const signedInUser = { ...user };
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                updateUserName(loggedInUser.name);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                const signedInUser = { ...user };
                signedInUser.error = errorCode + errorMessage;
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
            });
    };

    // update user name
    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;
        user
            .updateProfile({
                displayName: name,
            })
            .then(() => {
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="w-100">
            <form className="login-form-container" onSubmit={handleLogin}>
                <input
                    className="form-row"
                    type="email"
                    name=""
                    placeholder="Email"
                    id="email-field"
                    required
                    onBlur={handleBlur}
                />
                <input
                    className="form-row"
                    type="password"
                    name=""
                    placeholder="Password"
                    id="password-field"
                    required
                    onBlur={handleBlur}
                />
                <button className="btn btn-success">Login</button>
            </form>
            <div className="extra-login">
                <p className="text-center">Or</p>
                {/* google sign in button */}
                <button className="btn btn-dark light-bg google-btn" onClick={handleGoogleSignIn}>
                    <span className="google-icon">
                        <img
                            src="https://cdn.worldvectorlogo.com/logos/google-icon.svg"
                            alt="google-icon"
                        />
                    </span>
                    Sign In With Google
                </button>
            </div>
            <p style={{ color: "red" }}> {user.error} </p>
        </div>
    );
};

export default Login;