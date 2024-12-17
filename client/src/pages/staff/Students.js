import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "axios";
import toast from "react-hot-toast";

function Students(){
    const navigate = useNavigate();
    const [students, setStudents ] = useState([]);
    const dispatch = useDispatch();
    const getStudents = async (values) =>{
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/student/get-all-students", {} ,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            });
            dispatch(HideLoading());
            if(response.data.success){
                setStudents(response.data.data);
                //toast.success(response.data.message);
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    }
        useEffect(()=>{
            getStudents();
        },[]);
    const columns = [
        {
            title: 'Class',
            dataIndex: 'class', //match with schema
            key: 'class'
        },
        {
            title: 'Roll No.',
            dataIndex: 'rollNum', //match with schema
            key: 'rollNum'
        },
        {
            title: 'First name',
            dataIndex: 'firstName', //match with schema
            key: 'firstName'
        },
        {
            title: 'Last name',
            dataIndex: 'lastName', //match with schema
            key: 'lastName'
        },
        {
            title: 'Phone',
            dataIndex: 'phone', //match with schema
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email', //match with schema
            key: 'email'
        },
        {
            title: "Action",
            key: 'action',
            render : (text, record)=>(
                <div className="d-flex gap-4">
                    <i className="ri-edit-box-fill" onClick={()=>
                        navigate(`edit/${record.rollNum}`)
                    }></i>
                    <i className="ri-delete-bin-fill" onClick={()=>{
                        deleteStudent(record.rollNum);
                    }}></i>
                </div>
            )
        }
    ]

    const deleteStudent = async(rollNum) =>{
        try {
            dispatch(ShowLoading());
            const response = await axios.post(`/api/student/delete-student/${rollNum}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        dispatch(HideLoading());
        if(response.data.success){
            getStudents();
            toast.success(response.data.message);
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
            <PageTitle title='Students'/>
            <div className="d-flex justify-content-between align-items-center my-2">
                <input type="text" className="w-300" placeholder="search students"></input>
                <button className="primary" onClick={()=>{
                    navigate("/staffMem/students/add-student")
                }}>Add Student</button>
            </div>
            <Table columns={columns} dataSource={students}/>
        </div>
    )
}

export default Students;