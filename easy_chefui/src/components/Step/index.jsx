import React, {useState} from "react";
import "./style.css"
import { MDBInput, MDBContainer } from "mdb-react-ui-kit";
import { Thumb } from "../Auth/FormUtils";
const MAX_COUNT = 5;
const Step = (props) => {
    // const [lst, SetLst] = useState([])
    // const [box, SetBox] = useState("")
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const [image, setImage] = useState();
    const del = (e) => {
        e.preventDefault();
      
        let arr = props.lst;
        arr.splice(props.index, 1);
        console.log("before del", props.stepimglst);
       
        props.stepimglst.splice(props.index, 1);
        console.log("after del", props.stepimglst);
        props.render();
       
    
      };

      const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded){
            setUploadedFiles(uploaded);
            console.log(uploaded);
            props.setter(uploaded);
        } 

    }

    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        console.log("aids",chosenFiles);
        handleUploadFiles(chosenFiles);
    }
    return(
        <>
       
       <MDBContainer  breakpoint="150px">
            <div className="steps">
                    {props.text}
                </div>
                        
                <div className="buttons">

                    <label className="custom-file-upload">
                        <input type="file" id="step-image" onChange={ async (event) => {
                            //   console.log(event.currentTarget.files[0]);
                              setImage(event.currentTarget.files[0]);
                                handleFileEvent();
                              
                             

                            //   await props.setter(prev => [...prev, chosenFiles[0]]);
                            //   console.log(props.stepimglst);
                            //   props.render();
                            }}  disabled={fileLimit}/>
                        Img
                    </label>
                    

                    <button className="delete" onClick={del}>
                        <i className="far fa-trash-alt"></i>
                    </button>


                </div>
                {image && <Thumb file={image} />}




       </MDBContainer>
           
                
  

        </>
    )



}
export default Step;
