import "../App.css";

export default function Profile(){

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    return(
    <div className="Profile" >
        
        <h2>Username: {username}</h2>
        <h2>Password: {password}</h2>
        
        
    </div>
    
    )
}