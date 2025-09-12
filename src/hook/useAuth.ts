"use client"
import * as Yup from 'yup';
import { useFormik } from "formik";

const useAuth = () => {


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: () => {

        },
    });

    return {
        formik
    }
}

export default useAuth