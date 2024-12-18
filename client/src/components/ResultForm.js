import React from "react";
import {Row, Col, Form, Space } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alerts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ResultForm(){
    const { staffMem } = useSelector((state)=> state.staffMem);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values)=>{
    values.createdBy = staffMem._id;
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/result/add-result", values,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            dispatch(HideLoading());
            if(response.data.success){
                toast.success(response.data.message);
                navigate(-1);
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    }
    return(
        <div className="px-3">
            <Form  layout="vertical" onFinish={onFinish} initialValues={null}>
                <Row gutter={[10,10]}>
                    <Col span={16}>
                        <Form.Item label="Examination: " name="examination" >
                            <input type="text" placeholder="Examination"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}/>
                    <Col span={8} >
                        <Form.Item label="Date: " name="date" >
                            <input type="date" placeholder="date"></input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Class: " name="class" >
                            <input type="number" placeholder="class"></input>
                        </Form.Item>
                    </Col>
                </Row>
                <hr/>
                {/* dynamic form to add subjects */}
                <Form.List name="subjects">
                    {(fields, { add, remove }) => (
                        <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'Subject name']}
                                rules={[{ required: true, message: '*' }]}
                            >
                                <input placeholder="Subject Name" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'Total marks']}
                                rules={[{ required: true, message: '*' }]}
                            >
                                <input placeholder="Total marks" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'Pass marks']}
                                rules={[{ required: true, message: '*' }]}
                            >
                                <input placeholder="Pass marks" />
                            </Form.Item>
                            <i className="ri-delete-bin-fill" onClick={()=>{
                        remove(name);
                    }}></i>
                            </Space>
                        ))}
                        <Form.Item>
                            <button type="dashed" className="secondary text-white" onClick={() => add()} >
                            Add Subject
                            </button>
                        </Form.Item>
                        </>
                    )}
                </Form.List>
                <div className="d-flex justify-content-center mt-4">
                    <button className="primary px-3 ">Save</button>
                </div>
            </Form>
        </div>
    )
}

export default ResultForm;