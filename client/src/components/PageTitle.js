import React from "react";
import { useNavigate } from "react-router-dom";

function PageTitle({title}){
    const navigate = useNavigate();
    return (
        <div className="d-flex px-3 justify-content-between align-items-center gap-3">
            <i className=" ri-arrow-go-back-line cursor-pointer top" onClick={()=>{
                navigate(-1);
            }}></i>
            <h3 style= {{"marginBottom": "0.05rem"}} className="my-4">{title}</h3>
            <hr/>
        </div>
    )
}

export default PageTitle;