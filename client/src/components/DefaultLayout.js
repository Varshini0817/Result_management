import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function DefaultLayout(props){
    const navigate = useNavigate();
    const {staffMem}  = useSelector(state=> state.staffMem)
    //console.log(staffMem);

    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <h3 className="secondary-text cursor-pointer mx-3" onClick={()=>{
                    navigate('/');
                }}>RESULTS PORTAL</h3>
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <h3 className="text-white text-medium">{staffMem?.name}</h3>
                    <h3 className="text-white text-small cursor-pointer" onClick={()=>{
                        localStorage.removeItem("token");
                        toast.success("Log out successful !");
                        navigate("/login");
                    }}><i class="ri-logout-box-r-line" style={{color:"white"}}></i></h3>
                </div>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout;