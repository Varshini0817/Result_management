import React from 'react';
import {Row, Col} from 'antd';
import { useNavigate } from "react-router-dom";

function StaffMemHome(){
    const navigate = useNavigate();

    return <div className='h-100 d-flex justify-content-center align-items-center'>
        <Row gutter={[10,10]}>
            <Col span = {12}>
                <div className='p-3 secondary-border card w-300 cursor-pointer' onClick={()=>{
                    navigate("/staffMem/students")
                }}>
                    <h1>Students</h1>
                </div>
            </Col>
            <Col span = {12}>
                <div className='p-3 secondary-border card w-300 cursor-pointer' onClick={()=>{
                    navigate("/staffMem/results")
                }}>
                    <h1>Results</h1>
                </div>
            </Col>
        </Row>
    </div>
}

export default StaffMemHome;