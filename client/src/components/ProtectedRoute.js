import React, { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alerts';
import { setStaffMem } from '../redux/staffMem';
import DefaultLayout from './DefaultLayout';

function ProtectedRoute(props){
    const dispatch = useDispatch();
    const [ readyToRender, setReadyToRender] = React.useState(false);
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
                dispatch(setStaffMem(response.data.data))
                console.log(response.data.data);
                setReadyToRender(true);
            }
        }catch(error) {
            dispatch(HideLoading());
            toast.error("Something went wrong!")
        }
    };

    useEffect(()=>{
        getStaffMemData();
    }, []);

    return readyToRender && <DefaultLayout>{props.children}</DefaultLayout>
}

export default ProtectedRoute;