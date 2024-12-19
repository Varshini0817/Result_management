import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "axios";
import toast from "react-hot-toast";

function Students() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    

    const dispatch = useDispatch();
    const getStudents = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/student/get-all-students",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                });
            dispatch(HideLoading());
            if (response.data.success) {
                setStudents(response.data.data);
                //toast.success(response.data.message);
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
        getStudents();
    }, []);
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
            render: (text, record) => (
                <div className="d-flex gap-4">
                    <i className="ri-edit-box-fill" onClick={() =>
                        navigate(`edit/${record.rollNum}`)
                    }></i>
                    <i className="ri-delete-bin-fill" onClick={() => {
                        deleteStudent(record.rollNum);
                    }}></i>
                </div>
            )
        }
    ]

    const deleteStudent = async (rollNum) => {
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
            if (response.data.success) {
                getStudents();
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
    const [searchParams, setSearchParams] = useState({
        filter: '', 
        searchTerm: ''
    });

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearch = async (values) => {
        if (!searchParams.filter || !searchParams.searchTerm) {
            toast.error("Please select a filter and enter a search term.");
            return;
        }

        try {
            dispatch(ShowLoading());
            const response = await axios.post(`/api/student/search-students`, 
                {
                    filter: searchParams.filter,
                    searchTerm: searchParams.searchTerm
                },{
                    
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            })
            ;
            dispatch(HideLoading());
            if (response.data.success) {
                setStudents(response.data.data);
            } else {
                setStudents(response.data.data);
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            toast.error(error.message);
        }
    };
    
    return (
        <div className="px-3">
            <PageTitle title='Students' />
            <div className="d-flex justify-content-between align-items-center my-2 flex-column flex-md-row">
                <div className="d-flex justify-content-start gap-3 align-items-center my-2">
                <select 
                        name="filter" className="text-align-center w-200 h-45"
                        value={searchParams.filter} onChange={handleSearchChange}
                    >
                        <option value="" disabled>Select</option>
                        <option value="class">Class</option>
                        <option value="rollNum">Roll No</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                    </select>
                    <input type="text" name="searchTerm" className="w-300" placeholder="Type"
                    value={searchParams.searchTerm} onChange={handleSearchChange}></input>
                    <i className="ri-user-search-fill i-search" onClick={()=>
                        handleSearch()
                    }></i>
                    <i class="ri-filter-off-fill i-search" onClick={()=>{
                    setSearchParams({ filter: '', searchTerm: '' });
                        getStudents() 
                    }}></i>
                </div>
                <button className="primary mt-3 mt-md-0" onClick={() => {
                    navigate("/staffMem/students/add-student")
                }}>Add Student</button>
            </div>
            <Table columns={columns} dataSource={students} />
        </div>
    )
}

export default Students;