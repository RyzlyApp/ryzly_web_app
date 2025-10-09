"use client" 
import { useFormik } from "formik"; 

const useFilter = () => { 
    
    // const overviewMutate = useMutation({
    //     mutationFn: (data: IOverview) => httpService.post(`/overview`, data),
    //     onError: (error: AxiosError) => {

    //         const message =
    //             (error?.response?.data as { message?: string })?.message ||
    //             "Something went wrong";

    //         addToast({
    //             title: "Error",
    //             description: message,
    //             color: "danger",
    //             timeout: 3000
    //         })
    //     },
    //     onSuccess: (data) => {
    //         addToast({
    //             title: "Success",
    //             description: data?.data?.message,
    //             color: "success",
    //         })
    //         queryClient.invalidateQueries({queryKey: ["challengedetails"]})
    //         setTab("")
    //         setIndexData(-1)
    //     },
    // });

    const formik = useFormik({
        initialValues: {
            industry: "",
            search: "",
            coach: ""
        },
        onSubmit: () => {
            // overviewMutate.mutate(data)
        },
    }); 

    return {
        formik
    }
}

export default useFilter
