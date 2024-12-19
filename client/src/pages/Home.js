import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { ShowLoading, HideLoading } from "../redux/alerts";
import Header from "../components/Header";
import { Col, Row } from "antd";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [results, setResults] = useState([]);
    const getResults = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post(
                `/api/result/get-all-results`,
                {},
                {}
            )
            dispatch(HideLoading());
            if (response.data.success) {
                setResults(response.data.data);
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (results.length === 0) {
            getResults();
        }
    }, [])
    return (
        <div >
            <Header type="home" />
            {results?.length > 0 ? (
                <div className="m-5 d-flex flex-column res h-85 ">
                    <h3 style={{ textAlign: "center" }} className="mt-3">Select your exam to check your results...</h3>
                    <hr/>
                    <Row gutter={[20, 20]}>
                        {results.map((result) => {
                            return (
                                <Col span={8} xs={24} 
                                sm={12} 
                                md={8} 
                                lg={6} 
                                xl={6} >
                                    <div className="card d-flex flex-column p-2 mt-3 cursor-pointer secondary-border" onClick={() => {
                                        navigate(`/result/${result._id}`)
                                    }}>
                                        <h2 className="text-medium" style={{ textAlign: "center", margin: "0" }}><b>Exam : </b>{result.examination}</h2>
                                        <hr />
                                        <div className="d-flex justify-content-center gap-4 align-items-center">
                                            <h3 className="text-small"><b>Class :</b> {result.class}</h3>
                                            <h3 className="text-small"><b>Date  :</b> {result.date}</h3>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            ) :
                <div className="d-flex justify-content-center align-items-center h-85">
                    <h3>No results found !</h3>
                </div>}
        </div>
    )
}

export default Home;