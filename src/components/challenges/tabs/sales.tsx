import { LoadingLayout } from "@/components/shared";
import { IChallenge } from "@/helper/model/challenge";
import { dateFormat } from "@/helper/utils/dateFormat";
import { formatNumber } from "@/helper/utils/numberFormat";
import { useFetchData } from "@/hook/useFetchData";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { RiCashLine, RiMoneyDollarCircleLine } from "react-icons/ri"; 
import AddCouponBtn from "../addBtn/addCoupons";
import EmailBlastBtn from "../addBtn/emailBlast";


export default function SalesTab(
    { item }: { item: IChallenge }
) {



    const { data, isLoading } = useFetchData<{
        "totalPayments": number,
        "rate": number,
        "profit": number
    }>({
        endpoint: `/challenge/payments/${item?._id}`, name: "tasks", params: {
            id: item?._id
        }
    })

    const { data: listpayment = [], isLoading: loading } = useFetchData<{
        "_id": string,
        "isDeleted": boolean,
        "type": string,
        "source": string,
        "flow": string,
        "typeId": string,
        "reference": string,
        "amount": number,
        "senderId": string,
        "currencyType": string,
        "status": string,
        "createdAt": string,
        user: {
            "_id": string,
            "email": string,
            "fullName": string,
            "profilePicture": string
        }
        "updatedAt": string,
    }[]>({
        endpoint: `/payment/by-type/${item?._id}`, name: "tasks", params: {
            id: item?._id
        }
    })

    return (
        <LoadingLayout loading={isLoading} >

            <div className=" w-full flex flex-col p-4 gap-4" >
                <div className=" w-full grid grid-cols-2 gap-4 " >
                    <div className=" w-full h-[96px] flex items-center gap-2 " >
                        <div className=" w-12 h-12 rounded-full flex justify-center items-center bg-[#FFF1EE] " >
                            <RiMoneyDollarCircleLine color="#FC7753" size={"24px"} />
                        </div>
                        <div className=" flex flex-col " >
                            <p className=" text-xl font-semibold " >{formatNumber(data?.profit ?? 0)}</p>
                            <p className=" text-xs text-violet-300 " >Coach Profit</p>
                        </div>
                    </div>
                    <div className=" w-full h-[96px] flex items-center gap-2 " >
                        <div className=" w-12 h-12 rounded-full flex justify-center items-center bg-[#EEF0FF] " >
                            <RiCashLine color="#596AFE" size={"24px"} />
                        </div>
                        <div className=" flex flex-col " >
                            <p className=" text-xl font-semibold " >{formatNumber(data?.totalPayments ?? 0)}</p>
                            <p className=" text-xs text-violet-300 " >Total Sales</p>
                        </div>
                    </div>
                </div>
                <EmailBlastBtn />
                <LoadingLayout loading={loading} lenght={listpayment?.length} >
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Talent Name</TableColumn> 
                            <TableColumn>Reference ID</TableColumn>
                            <TableColumn>Payment Date</TableColumn>
                            <TableColumn>Total Profit</TableColumn>
                        </TableHeader>
                        <TableBody> 
                            {listpayment?.map((item, index) => {
                                return (
                                    <TableRow key={index} className=" cursor-pointer "  >
                                        <TableCell>
                                            {item?.user?.fullName}
                                        </TableCell> 

                                        <TableCell>
                                            {item?.reference}
                                        </TableCell>

                                        <TableCell>
                                            {dateFormat(item?.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            {formatNumber(item?.amount)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </LoadingLayout>
            </div>
        </LoadingLayout>
    )
}