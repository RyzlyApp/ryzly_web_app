"use client"
import { LoadingLayout } from "@/components/shared";
import { IPagination } from "@/helper/model/pagination";
import { IPayment } from "@/helper/model/payment";
import { dateFormat } from "@/helper/utils/dateFormat";
import { formatNumber } from "@/helper/utils/numberFormat";
import { useFetchData } from "@/hook/useFetchData";
import { TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Table } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function History() {

    const router = useRouter()

    let limit = 10

    const [paymentData, setPaymentData] = useState<IPayment[]>([])
    const [page, setPage] = useState(1)
    const { data, isLoading } = useFetchData<IPagination<IPayment[]>>({ name: "payment", endpoint: "/payment/list", pagination: true,  params: {
        limit: limit,
        page: page
    }}); 

    useEffect(() => {
        if (Array.isArray(data?.data) && data?.data.length > 0) {
            setPaymentData(data.data as unknown as IPayment[]);
        } else {
            setPaymentData([]);
        }
    }, [data?.data, isLoading]);

    return (
        <div className=" w-full flex flex-col bg-white p-4 gap-6 rounded-2xl " >
            <div className=" flex items-center gap-3 " >
                <button onClick={() => router.back()} >
                    <IoArrowBack size={"20px"} />
                </button>
                <p>Transaction History</p>
            </div>

            <LoadingLayout loading={isLoading} lenght={paymentData?.length} >
                <div className=" w-full flex flex-col gap-6 items-center " >
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>TYPE</TableColumn>
                            <TableColumn>AMOUNT</TableColumn>
                            <TableColumn>DESCRIPTION</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {paymentData?.map((item, index) => {
                                return (

                                    <TableRow key={index} >
                                        <TableCell>{item?.type}</TableCell>
                                        <TableCell>{formatNumber(item?.amount)}</TableCell>
                                        <TableCell>{item?.source}</TableCell>
                                        <TableCell>{dateFormat(item?.createdAt)}</TableCell>
                                        <TableCell>
                                            <div className={` w-fit px-3 flex justify-center text-white ${item?.status === "SUCCESS" ? " bg-success-500 " : item?.status === "PENDING" ? " bg-amber-500 " : " bg-red-500 "}  text-xs items-center h-[30px] rounded-full `} >
                                                <p>
                                                    {item?.status === "SUCCESS" ? "Successful" : item?.status === "PENDING" ? "Pending" : "Rejected"}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <Pagination showControls initialPage={page} total={Number(data?.total)/limit}
                        onChange={(page) => setPage(page)} />
                </div>
            </LoadingLayout>
        </div>
    )
}