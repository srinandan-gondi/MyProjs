import { useState } from "react"
import "../App.css"
import Axios from "axios"
import Navbar from "./Navbar";
import Home from "./Home";



export default function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    
 
    function login(){
         Axios.post("http://localhost:1000/user/login", {username:username, password:password}).then((response) => {
            if(response.data.loginStatus){
                localStorage.setItem("loginStatus",true);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("password", response.data.password);
                setErrorMessage(response.data.message);
            }
            else{
                setErrorMessage(response.data.message);
            }
         })
    }

    return(
        <div className="Login">
            <div className="login">
                <input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)
                console.log(username)}}></input>
                <input type="text" placeholder="Password" onChange={(event) => {setPassword(event.target.value)
                console.log(password)}}></input>
                <button onClick={login}>Login</button>
                {errorMessage}

            </div>
        </div>
    

)}