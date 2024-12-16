import React, { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alerts';

function ProtectedRoute(){
    const dispatch = useDispatch();

    const getStaffMemData = async () => {
        try{
            dispatch(ShowLoading());
            const token = localStorage.getItem("token");
            dispatch(HideLoading());
            const response = await  axios.post
            ("/api/staff/get-staffmem-by-id",
                {  },
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                }
            );
            if(response.data.success){
                console.log(response.data.data);
            }
        }catch(error) {
            dispatch(HideLoading());
            toast.error("Something went wrong!")
        }
    };

    useEffect(()=>{
        getStaffMemData();
    }, []);

    return <div>ProtectedRoute</div>
}

export default ProtectedRoute;