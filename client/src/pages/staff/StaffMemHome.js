import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";

function StaffMemHome() {
    const navigate = useNavigate();

    return <div className='h-100 d-flex flex-grow-1 justify-content-center align-items-center'>
        <Row gutter={[20, 20]} >
            <Col span={12}
            xs={24} sm={12} md={8} lg={12} className="d-flex justify-content-center ">
                <div className='p-5 secondary-border card box-shadow w-300 cursor-pointer justify-content-center align-items-center' onClick={() => {
                    navigate("/staffMem/students")
                }}>
                    <img src="https://img.icons8.com/?size=100&id=ZCM53x6mh09b&format=png&color=000000" height={50} width={50} alt="students"></img>
                    <h2>Students</h2>
                </div>
            </Col>
            <Col span={12} xs={24} sm={12} md={8} lg={12} className="d-flex justify-content-center">
                <div className='p-5 secondary-border card box-shadow w-300 cursor-pointer justify-content-center align-items-center' onClick={() => {
                    navigate("/staffMem/results")
                }}>
                    <img src="https://img.icons8.com/?size=100&id=RgBKcYs9ShAW&format=png&color=000000" height={50} width={50} alt='results' />
                    <h2>Results</h2>
                </div>
            </Col>
        </Row>
    </div>
}

export default StaffMemHome;