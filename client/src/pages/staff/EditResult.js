import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "axios";
import toast from "react-hot-toast";
import PageTitle from "../../components/PageTitle";
import { Modal, Table } from "antd";

function EditResult() {
    const [result, setResult] = useState(null);
    const [obtainedMarks, setObtainedMarks] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showStudentsModal, setShowStudentsModal] = useState(false);
    const [students, setStudents] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getResult = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post(
                `/api/result/get-result/${params.resultId}`,
                {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            )
            dispatch(HideLoading());
            if (response.data.success) {
                setResult(response.data.data);
                const tempObtainedMarks = {};
                response.data.data.subjects.forEach((subject) => {
                    tempObtainedMarks[subject.name] = 0;
                });
                console.log(tempObtainedMarks);
                setObtainedMarks(tempObtainedMarks);
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
    //get students info
    const getStudents = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/student/get-all-students",
                {
                    class: result.class,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            )
            dispatch(HideLoading());
            if (response.data.success) {
                setStudents(response.data.data);
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
        if(!result){
            getResult();
        }

    }, []);

    //to select only  particular class of students
    useEffect(() => {
        if (result) {
            getStudents();
        }
    }, [result]);

    const saveStudentResult = async (values) => {
        let verdict ="pass";
        Object.keys(obtainedMarks).forEach((key)=>{
            const subjectName = key;
            const marks = obtainedMarks[key];
            const passMarks = result.subjects.find(
            (subject) => subject.name === subjectName
            ).passMarks;
            if(Number(marks) < Number(passMarks)){
                verdict = 'fail';
            }
            return;
        })
        try {
            dispatch(ShowLoading());
            const response = await axios.post(
                '/api/result/save-student-result',
                {
                    resultId: params.resultId,
                    examination: result.examination,
                    studentId: selectedStudent._id,
                    obtainedMarks: obtainedMarks,
                    verdict 
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            dispatch(HideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                setSelectedStudent(null);
                setObtainedMarks(null);
                getStudents();
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    }
    const columns = [
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class'
        },
        {
            title: 'Roll No.',
            dataIndex: 'rollNum',
            key: 'rollNum'
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName'
        }
    ]

    return (
        <div>
            <PageTitle title="Result Info" />
            {result && (<>
                <div className="d-flex justify-content-start gap-3 m-3">
                    <h1 className="text-medium"><b>Date</b>    : {result.date}</h1>
                    <h1 className="text-medium"><b>Name</b>    : {result.examination}</h1>
                    <h1 className="text-medium"><b>Class</b>   : {result.class}</h1>
                </div>
                <hr />
                {!selectedStudent ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <button className="primary mx-4 text-white" onClick={() => {
                        setShowStudentsModal(true);
                    }}>Add Student Results</button>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-between  align-items-center">
                            <h1 className="text-small m-3">
                                Name: {selectedStudent?.firstName} {selectedStudent?.lastName}
                            </h1>
                            <i class="ri-close-circle-fill" onClick={() => {
                                const tempObtainedMarks = {};
                                result?.subjects.forEach((subject) => {
                                    tempObtainedMarks[subject.name] = 0;
                                });
                                setObtainedMarks(tempObtainedMarks);
                                setSelectedStudent(null);
                            }}></i>
                        </div>
                        <hr />

                        {/* table to add marks */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Total Marks</th>
                                    <th>Pass Marks</th>
                                    <th>Obtained Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result?.subjects.map((subject, index) => (
                                    <tr>
                                        <td>{subject?.name}</td>
                                        <td>{subject?.totalMarks}</td>
                                        <td>{subject?.passMarks}</td>
                                        <td>
                                            <input type="text" className="w-110"
                                                value={obtainedMarks?.[subject?.name] ?? 0 }
                                                onChange={(e) => {
                                                    const tempObtainedMarks = { ...obtainedMarks };
                                                    tempObtainedMarks[subject?.name] = e.target.value;
                                                    //console.log(tempObtainedMarks);
                                                    setObtainedMarks(tempObtainedMarks);
                                                }}></input>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-center align-items-center">
                            <button className="secondary w-110" onClick={saveStudentResult}>SAVE</button>
                        </div>
                        <hr />
                    </>
                )}
            </>
            )}

            {/* student modal pop-up */}
            <Modal title="Select student" open={showStudentsModal} onCancel={() => {
                setShowStudentsModal(false);
            }}>
                <Table columns={columns} dataSource={students} onRow={(record) => {
                    return {
                        className: "cursor-pointer",
                        onClick: () => {
                            // console.log(record);
                            setSelectedStudent(record);
                            const resultExists = record?.results.find(
                                (result) => result?.resultId === params.resultId
                            )||null;
                            console.log(resultExists);
                            if (resultExists) {
                                setObtainedMarks(resultExists?.obtainedMarks);
                            }
                            setShowStudentsModal(false);
                        }
                    }

                }}></Table>
            </Modal>
        </div>
    )
}

export default EditResult;