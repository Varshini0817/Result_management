import React from "react";
import { useSelector } from "react-redux";

function DefaultLayout(props){

    const {staffMem}  = useSelector(state=> state.staffMem)
    console.log(staffMem);

    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <h3 className="text-white"> <b className="primary-text">STUDENT</b> RESULTS</h3>
                <h3 className="text-black text-medium">{staffMem?.name}</h3>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout;