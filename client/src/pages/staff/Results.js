import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "axios";
import toast from "react-hot-toast";
import { Table } from "antd";
import PageTitle from "../../components/PageTitle";

function Results(){
    const navigate = useNavigate();
    const [ results, setResults] = useState([]);
    const dispatch = useDispatch();
    const getResults = async(values)=>{
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/result/get-all-results", {},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            dispatch(HideLoading());
            if(response.data.success){
                setResults(response.data.data);
            }
            else{
                toast.error(response.data.messag);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getResults();
    },[]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date', //match with schema
            key: 'date'
        },
        {
            title: 'Examination',
            dataIndex: 'examination', //match with schema
            key: 'examination'
        },
        {
            title: 'Class',
            dataIndex: 'class', //match with schema
            key: 'class'
        },
        {
            title: "Action",
            key: 'action',
            render : (text, record)=>(
                <div className="d-flex gap-4">
                    <i className="ri-edit-box-fill" onClick={()=>{
                        navigate(`/staffMem/results/edit/${record._id}`)
                    }}></i>
                    <i className="ri-delete-bin-fill" onClick={()=>{
                        
                    }}></i>
                </div>
            )
        }
    ]
    return(
        <div className="px-3">
            <PageTitle title="Results"/>
            <div className="d-flex justify-content-between align-items-center my-2">
                <input type="text" className="w-300" placeholder="search results"></input>
                <button className="primary" onClick={()=>{
                    navigate('/staffMem/results/add-results')
                }}>Add Results</button>
            </div>
            <Table columns={columns} dataSource={results}/>

        </div>
    )
}

export default Results;