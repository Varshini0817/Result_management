import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alerts";
import axios from "axios";
import toast from "react-hot-toast";

function ResultCheck() {
    const params = useParams();
    const dispatch = useDispatch();
    const [rollNum, setrollNum] = useState("");
    const [studentResult, setStudentResult] = useState(null);
    const [result, setResult] = useState([]);
    const getResult = async (values) => {
        try {
            dispatch(ShowLoading());
            console.log(params.resultId, params._id, " ");
            const response = await axios.post(
                `/api/result/get-result/${params.resultId}`,
                {},
                {}
            );
            dispatch(HideLoading());
            if (response.data.success) {
                setResult(response.data.data);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    };

    const getStudentResult = async (values) => {
        try {
            dispatch(ShowLoading());
            console.log(params.resultId, params._id, " ");
            const response = await axios.post(
                `/api/result/get-student-result`,
                {
                    rollNum: rollNum,
                    resultId: params.resultId
                },
                {}
            );
            dispatch(HideLoading());
            if (response.data.success) {
                //setResult(response.data.data);
                setStudentResult(response.data.data);
                console.log(studentResult," sr");
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getResult();
    }, []);

    return (
        <div >
            <Header />

            <div className="m-2 h-85 res">
            {result && (
                <div className="mt-5 p-3 d-flex flex-wrap justify-content-center align-items-center gap-3">
                    <h2 className="text-medium">
                        <b>Exam : </b>
                        {result.examination}
                    </h2>
                    <h3 className="text-medium">
                        <b>Class :</b> {result.class}
                    </h3>
                    <h3 className="text-medium">
                        <b>Date :</b> {result.date}
                    </h3>
                </div>
            )}
            <hr />
            <div className="d-flex flex-column gap-3 mt-3 p-3 card flex-md-row">
                <input
                    type="text"
                    placeholder="Enter roll num" name="rollNum"
                    className="w-300 w-md-25"
                    value={rollNum}
                    onChange={(e) => setrollNum(e.target.value)}
                ></input>
                <button className="secondary px-5 text-white" onClick={() => {
                    getStudentResult()
                    setStudentResult(null);
                }}>Check</button>
            </div>
            {studentResult &&  (
                <div>
                    <div className="m-3">
                        <h1 className="text-medium">
                            <b>Name : {studentResult.firstName} {studentResult.lastName} </b>
                        </h1>
                    </div>
                    <hr/>
                    <div className="m-3 ">
                        <table className="table table-bordered table-striped ">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Total Marks</th>
                                    <th>Obtained Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.subjects.map((subject) => (
                                    <tr>
                                        <td>{subject.name}</td>
                                        <td>{subject.totalMarks}</td>
                                        <td>
                                            {studentResult.obtainedMarks[subject?.name] || 0}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-3">
                            <h3 style={{textAlign: "center"}}>Verdict : <b style={{color : studentResult.verdict==="pass"? "green" : "red" }}>{studentResult?.verdict.toUpperCase()}</b></h3>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default ResultCheck;
