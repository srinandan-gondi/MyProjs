import { useState } from "react"
import "../App.css"
import Axios from "axios"
import { json, useNavigate } from "react-router-dom"

export default function Upload(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);
    const navigator = useNavigate();
    

    function upload(){
        const cloudinaryURL = 'https://api.cloudinary.com/v1_1/df6p9d4u8/image/upload';
        
        
        const formData = new FormData();
        formData.append('file', image[0]);
        formData.append('upload_preset', 'ml_default');

        
        
        Axios.post(cloudinaryURL, formData).then((response) => {
            const fileName = response.data.secure_url;
            const answer = response;


            Axios.post("http://localhost:1000/user/upload", {title: title, description: description, image: fileName, postedBy: localStorage.getItem("username"), answer:answer}).then((response) => {
                navigator("/");
            })
            
        })
    }

    return(
        <>
                <div className="Upload">Create New Post</div>
                <div className="upload">
                    <input type="text" placeholder="Title" onChange={(event) => {setTitle(event.target.value)}}></input>
                    
                    <input type="text" placeholder="Description" onChange={(event) => {setDescription(event.target.value)}}></input>

                    <input type="file" placeholder="Your Post" onChange={(event) => {setImage(event.target.files)}} ></input>
                    
                    <button onClick={upload}>Upload</button>

                    
                </div>
                
        </>
        
        
        

    )
}