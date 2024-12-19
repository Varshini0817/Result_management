import React from "react";
import { Form, Input } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Header from "../../components/Header";
function Register() {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/staff/register", values);
            dispatch(HideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    }
    return (
        <div className=" h-screen d-flex flex-column">
            <Header/>
            <div className="flex-grow-1 primary d-flex align-items-center justify-content-center">
                <div className="box-shadow">
                <Form layout="vertical w-400 white p-4" onFinish={onFinish}>
                    <h1 className="text-medium ">Staff - Registration</h1>
                    <hr />
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>

                    <Form.Item name="staffId" label="Staff ID">
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password">
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item name="confirmPassword" label="Confirm Password">
                        <Input type="password" />
                    </Form.Item>
                    <button className="primary px-5 my-2 w-100">REGISTER</button>
                    <Link to='/login' className="m-5">Already Registered, Click Here To Login !</Link>
                </Form>
            </div>
                </div>
        </div>

    )
}

export default Register;