"use client"
import { ITask } from "@/helper/model/application"
import { FormikProps, FormikProvider } from "formik" 
import { CustomButton, CustomInput, CustomEditor } from "../custom"
import CustomDateTimePicker from "../custom/customDatePicker" 

interface IProp {
    formik: FormikProps<ITask>,
    isLoading: boolean,
    edit?: boolean
}

export default function TaskForm(
    {
        formik,
        isLoading,
        edit
    }: IProp
) {
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col gap-4 " >
                <CustomInput
                    name="title"
                    label="Title"
                    placeholder="What's the title of the challenge?"
                />
                <CustomEditor
                    name="description"
                    label="Description"
                    placeholder="Briefly describe the challenge" 
                />
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <CustomDateTimePicker withTime={false} name="startDate" label="Start Date" />
                    <CustomDateTimePicker withTime={false} name="endDate" label="End Date" />
                </div>
                <div className=" mt-4 w-full flex justify-end " >
                    <CustomButton type="submit" isLoading={isLoading} >{edit ? "Edit Task" : "Add Task"}</CustomButton>
                </div>
            </form>
        </FormikProvider>
    )
}