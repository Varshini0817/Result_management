import React from "react";

function DefaultLayout(props){

    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <h3 className="text-white"> <b className="primary-text">STUDENT</b> RESULTS</h3>
                <h3 className="text-black text-medium">Staff Member</h3>
            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout;