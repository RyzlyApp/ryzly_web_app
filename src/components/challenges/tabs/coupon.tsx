import { LoadingLayout } from "@/components/shared"
import { useFetchData } from "@/hook/useFetchData"
import { AddCouponBtn } from ".."
import { IChallenge } from "@/helper/model/challenge"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { dateFormat } from "@/helper/utils/dateFormat" 
import { formatNumber } from "@/helper/utils/numberFormat"


export default function CouponTab(
    { item }: { item: IChallenge }
) {

    const { data = [], isLoading } = useFetchData<{
        "_id": string,
        "isDeleted": boolean,
        "userId": string,
        "challengeId": string,
        "code": string,
        "discount": number,
        "discountType": string,
        "useCount": number,
        "maxUseCount": number,
        "validFrom": string,
        "validTo": string,
        "createdAt": string,
        "updatedAt": string,
    }[]>({
        endpoint: `/coupon/challenge/${item?._id}`, name: "coupon"
    })

    console.log(data);


    return (
        <div className=" w-full flex flex-col gap-4 " >

            <div className=" w-full flex flex-col p-4 gap-4" >
                <AddCouponBtn />
            </div>

            <LoadingLayout loading={isLoading} >
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Code</TableColumn>
                        <TableColumn>Discount</TableColumn>
                        <TableColumn>Max Use Count</TableColumn>
                        <TableColumn>Use Count</TableColumn>
                        <TableColumn>Start Date</TableColumn>
                        <TableColumn>End Date</TableColumn>
                        <TableColumn>Created Date</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item, index) => {
                            return (
                                <TableRow key={index} className=" cursor-pointer "  >
                                    <TableCell>
                                        {item?.code}
                                    </TableCell>

                                    <TableCell>
                                        {item?.discount}
                                    </TableCell> 
                                    <TableCell>
                                        {formatNumber(item?.maxUseCount, "")}
                                    </TableCell>
                                    <TableCell>
                                        {formatNumber(item?.useCount, "")}
                                    </TableCell>
                                    <TableCell>
                                        {dateFormat(item?.validFrom)}
                                    </TableCell>
                                    <TableCell>
                                        {dateFormat(item?.validTo)}
                                    </TableCell>
                                    <TableCell>
                                        {dateFormat(item?.createdAt)}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </LoadingLayout>
        </div>
    )

}