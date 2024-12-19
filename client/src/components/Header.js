import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ type }) {
    const navigate = useNavigate();
    return (
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <h3 className="primary-text"><b className="secondary-text">RESULTS</b> PORTAL</h3>
                {type === "home" ? (
                    <div className="d-flex justify-content-end align-items-center gap-3">
                        <h3
                            className="text-black text-small cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Sign up
                        </h3>
                        <h3
                            className="text-black text-small cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </h3>
                    </div>
                ) : 
                <div className="d-flex justify-content-end align-items-center gap-3">
                    <h3
                            className="text-black text-small cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Home
                        </h3>
                </div>}
            </div>
        </div>
    )
}

export default Header;