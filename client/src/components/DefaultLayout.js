import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function DefaultLayout(props){
    const navigate = useNavigate();
    const {staffMem}  = useSelector(state=> state.staffMem)
    console.log(staffMem);

    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <h3 className="primary-text"><b className="secondary-text">RESULTS</b> PORTAL</h3>
                <div>
                    <h3 className="text-black text-medium">{staffMem?.name}</h3>
                    <h3 className="text-black text-small cursor-pointer" onClick={()=>{
                        localStorage.removeItem("token");
                        toast.success("Log out successful !");
                        navigate("/login");
                    }}>Logout</h3>
                </div>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout;