import React from "react";
import PageTitle from "../../components/PageTitle";
import StudentForm from "../../components/StudentForm";

function AddStudent(){
    return(
        <diV>
            <PageTitle title="Add Student"/>
            {/* <img src="https://img.icons8.com/?size=100&id=N7aSIT2o3M6q&format=png&color=000000" alt="add student" style={{alignContent:"center"}}/> */}
            <StudentForm imgSrc={"https://img.icons8.com/?size=100&id=N7aSIT2o3M6q&format=png&color=000000"}/>
        </diV>
    )
}

export default AddStudent;