import React from "react";
import { Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HideLoading, ShowLoading } from '../../redux/alerts';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/staff/login", values);
            dispatch(HideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate("/staffMem");
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            dispatch(HideLoading())
            toast.error(error.message);
        }
    }
    return (
        <div className="h-screen d-flex flex-column">
            <Header />
            <div className="flex-grow-1 bg d-flex m-0 p-0 align-items-center justify-content-center ">
                <div className="box-shadow">
                    <Form layout="vertical w-400 white p-4" onFinish={onFinish} >
                        <h1 className="text-medium ">Staff - LOGIN</h1>
                        <hr />
                        <Form.Item name="staffId" label="Staff ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type='password' />
                        </Form.Item>
                        <button className="primary text-white px-5 my-2 w-100">Login</button>
                        <Link to='/register' className="text-small text-center d-block">Not Yet Registered, Click Here To Register !</Link>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;