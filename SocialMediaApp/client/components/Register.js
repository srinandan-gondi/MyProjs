import { useState } from "react"
import "../App.css"
import Axios from "axios"

export default function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

     function register(){
        console.log(typeof username);
        console.log(typeof password);
        Axios.post("http://localhost:1000/user/register", {username:username, password:password});
    }

    return(
        <>
                <div className="Register">Registration</div>
                <div className="register">
                    <input type="text" placeholder="Username" onChange={(event) => {setUsername(event.target.value)}}></input>
                    
                    <input type="text" placeholder="Password" onChange={(event) => {setPassword(event.target.value)}}></input>
                    
                    <button onClick={register}>Register</button>
                </div>
                
        </>
        
        


    )
}