import { useEffect,useState } from "react";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import Axios from "axios";
import "../App.css"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import {Image} from "cloudinary-react";
// import {AdvancedImage} from '@cloudinary/react';
// import cloudinary from "./cloudinary.config";
// import { CloudinaryImage } from "@cloudinary/url-gen";
// Create and configure your Cloudinary instance.
// const cld = new Cloudinary({
//   cloud: {
//     cloudName: 'dedf6p9d4u8mo'
//   }
// });
// const imageGen = new CloudinaryImage(); 


export default function Home(){
    
    const [loginStatus, updateLoginStatus] = useState(false);

    useEffect(() => {
        const storedLoginStatus = localStorage.getItem("loginStatus");
        updateLoginStatus(storedLoginStatus === "true");
    }, []);

    const url = "https://res.cloudinary.com/df6p9d4u8/image/upload/v1689928595/cat1_zc46o3.jpg";

    
        
        const [uploads, updateUploads] = useState([]);
        
        useEffect(() => {
            Axios.get("http://localhost:1000/user/upload").then((response) => {
            console.log(response);
            updateUploads(response.data);
        })
      });

      

    //   useEffect(() => {
    //         updateLikes(likes+1)
    //   }, likes);

    //   useEffect(() => {
    //     updateDislikes(dislikes+1)
    //   }, dislikes);

        



        
        // Instantiate a CloudinaryImage object for the image with public ID, 'sample'.
        // const myImage = cld.image('cat1_ipuwng');

        // // Return the delivery URL
        // const myUrl = myImage.toURL();
    
    
    // Instantiate a CloudinaryImage object for the image with public ID, 'sample'.
    // const myImage = cld.image('cat1_ipuwng');

    // Return the delivery URL
    
    

    return(
        <div className="Home">
            
            {!loginStatus ? (
                <h1>Hi!</h1>
            ) : (
                <>
                  {uploads.map(val => {
                    return (
                        <>
                            <div className="post">
                                <div className="eachPost">
                                    <img src={val.image}></img>
                                    <h3>title: {val.title}</h3>
                                    <h3>description: {val.description}</h3>
                                    <h2>posted by @ {val.posted_by}</h2>
                                    
                                </div>
                            </div>
                            
                            
                          
                        </>
                        
                    )
                  })}
                </>
                
                
            )}
        </div>
    );

}    
