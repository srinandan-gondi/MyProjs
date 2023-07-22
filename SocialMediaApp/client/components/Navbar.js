import { useEffect, useState } from "react";
import "../App.css";

export default function Navbar(){

    const [loginStatus, updateLoginStatus] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("loginStatus");
        updateLoginStatus(storedLoginStatus === "true");
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.setItem("loginStatus", false);
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        updateLoginStatus(false);
    };

    return (
        <div className="Navbar" >
            <a href="/">Home</a>

            {!loginStatus ? (
                <>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </>
            ) : (
                <>
                    <a href="/profile">Profile</a>
                    <a href="/login" onClick={handleLogout}>Logout</a>
                    <a href="/upload">New Post</a>
                </>
            )}
        </div>
    );
}