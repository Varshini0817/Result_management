import React, { useEffect } from "react";
import PageTitle from "../../components/PageTitle";
import StudentForm from "../../components/StudentForm";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alerts";
import axios from "axios";
import toast from "react-hot-toast";

function EditStudent(){
    const [ student, setStudent ] = React.useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const getStudent = async(values)=>{
        try {
            dispatch(ShowLoading());
            const response = await axios.post(
                `/api/student/get-student/${params.rollNum}`,
                {},{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            )
            dispatch(HideLoading());
            if(response.data.success){
                setStudent(response.data.data);
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
    useEffect(()=>{
        getStudent();
    },[]);

    return(
        <diV>
            <PageTitle title="Edit Student"/>
            {student && <StudentForm student={student} type="edit" imgSrc="https://img.icons8.com/?size=100&id=svaFdGaOLJOl&format=png&color=000000"/>}
        </diV>
    )
}

export default EditStudent;