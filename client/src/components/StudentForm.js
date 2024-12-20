import React from "react";
import { Row, Col, Form } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function StudentForm({ student, type, imgSrc }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response = null;
            if (type === "edit") {
                response = response = await axios.post(`/api/student/update-student/${student.rollNum}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            }
            else {
                response = await axios.post("/api/student/add-student", values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            }
            dispatch(HideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                if (type !== "edit") {
                    form.resetFields();
                }
                navigate("/staffMem/students")
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
        <div className="d-flex h-100 my-3 justify-content-center flex-column ">
            <div className="d-flex justify-content-center">
                <img
                    src={imgSrc}
                    alt="student"
                    height={100}
                    width={100}
                />
            </div>
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={student}>
                <Row gutter={[10, 10]}>
                    <Col span={8}>
                        <Form.Item label="Roll number:" name="rollNum">
                            <input type="text" placeholder="Enter roll num" disabled={type === "edit" ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="First name:" name="firstName">
                            <input type="text" placeholder="Enter first name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Last name:" name="lastName">
                            <input type="text" placeholder="Enter last name" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Class:" name="class">
                            <input type="number" placeholder="Enter class" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Phone no.:" name="phone">
                            <input type="text" placeholder="Enter phone" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Email:" name="email">
                            <input type="text" placeholder="Enter email" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-4">
                    <button className="primary text-white px-3 ">Save details</button>
                </div>
            </Form>
        </div>
    )
}

export default StudentForm;