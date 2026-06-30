import { userAtom } from "@/helper/atom/user";
import { IChallenge } from "@/helper/model/challenge";
import { Badge, Skeleton, Spinner, useSelect } from "@heroui/react";
import { useAtom } from "jotai";
import React, { use } from "react";
import TextBox from "./TextBox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpService from "@/helper/services/httpService";
import { URLS } from "@/helper/services/urls";
import { IPagination } from "@/helper/model/pagination";
import { IAnnouncement } from "@/types";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { uniqBy } from "lodash";

export const Loader = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">

      <div className="w-full h-[40px] flex justify-start mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="w-full h-[80px] flex justify-end mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="w-full h-[120px] flex justify-start mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="w-full h-[60px] flex justify-end mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="w-full h-[180px] flex justify-start mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="w-full h-[80px] flex justify-end mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="w-full h-[80px] flex justify-start mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      <div className="w-full h-[180px] flex justify-end mt-2">
        <Skeleton className="rounded-lg w-[65%] h-full">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

    </div>
  )
}

const AnnouncementCard = ({ item, index, previous, challenge, handleDelete }: { item: IAnnouncement, index: number, challenge: IChallenge, handleDelete: (id: string) => void, previous?: IAnnouncement | undefined }) => {
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);
  const { mutate, isPending } = useMutation({
    mutationFn: () => httpService.delete(`${URLS.ANNOUNCEMENT}/${item._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${challenge?._id}-Announcements`] });
      handleDelete(item._id);
    }
  })
  const [showMore, setShowMore] = React.useState(false);
  const date = new Date(item.createdAt);
  // const nextDate = index > 0 && index <= announcements?.length - 1 ? new Date(announcements[index + 1].createdAt) : null;
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className=" flex flex-col mb-4">
      <div className="w-full">
        {(index === 0 || formattedDate !== new Date(previous?.createdAt as any).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })) && (
            <div className="w-full flex items-center justify-center my-4 ">
              <div className="w-[110px] h-[32px] rounded-full flex justify-center items-center bg-gray-200">
                <p className="text-sm text-gray-500">
                {formattedDate}
              </p>
              </div>
            </div>
          )}
      </div>
      <div className="flex w-full h-auto">
        <div className="w-[30px] h-[30px] rounded-[30px] bg-gray-400 mt-2 mr-2 overflow-hidden">
          <img src={challenge?.creator?.profilePicture} className="w-full h-full" />
        </div>
        <div key={item._id} className="w-[85%] bg-gray-100 p-3 rounded-md h-auto ">
          <div className="flex items-center border-b-[1px] border-gray-300 pb-2 mb-2">
            <p className="text-[16px] font-medium">{challenge?.creator?.firstName} {challenge?.creator?.lastName}</p>

            <div className="flex justify-center items-center w-[50px] h-[20px] rounded-[10px] bg-primary text-white text-xs ml-2">
              <p>Coach</p>
            </div>

            {user?.data?._id === challenge?.creator?._id && (
              <Button color=''  size="sm" className="ml-auto bg-red-400 w-10 h-10" onClick={() => mutate()} disabled={isPending}>
                {isPending ? <Spinner size="sm" color="white" /> : <Trash className="w-4 h-4" />}
              </Button>
            )}
          </div>

          <p className="mt-2 font-normal text-gray-500 text-[14px]">{item?.content?.length > 300 && !showMore ? `${item?.content?.substring(0, 300)}...` : item?.content}</p>
          {item?.content?.length > 300 && (
            <p className="font-medium text-primary text-[14px] mt-2 cursor-pointer" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function AnnouncementSection({ challenge }: { challenge: IChallenge }) {
  console.log(challenge);
  const [userState] = useAtom(userAtom);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [announcements, setAnnouncements] = React.useState<IAnnouncement[]>([]);
  const isOwner = userState?.data?._id === challenge?.creator?._id;

  const { isLoading, data } = useQuery({
    queryKey: [`${challenge?._id}-Announcements`],
    queryFn: () => httpService.get(URLS.ANNOUNCEMENT, {
      params: {
        challengeID: challenge?._id,
        page: page,
        limit: 20
      }
    }),
  });

  React.useEffect(() => {
    if (!isLoading && data?.data) {
      console.log(data?.data);
      const items = data?.data as IPagination<IAnnouncement>;
      setTotal(items.total);
      setAnnouncements((prev) => uniqBy([...prev, ...items.data as IAnnouncement[]], "_id"));
    }
  }, [data, isLoading]);

  const handleDeleteAnnouncement = (id: string) => {
    // Implement delete functionality here
    setAnnouncements((prev) => prev.filter((item) => item._id !== id));
  }

  return (
    <div className="w-full h-full flex flex-col rounded-sm overflow-hidden">
      <div className={`${!isOwner ? 'flex-[0.9]' : 'flex-[0.9]'} w-full h-full overflow-auto bg-white`}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full flex flex-col  overflow-y-auto">

            {announcements.map((item: IAnnouncement, index) => {
              return <AnnouncementCard key={item._id} handleDelete={() => handleDeleteAnnouncement(item?._id)} item={item} index={index} previous={announcements[index - 1]} challenge={challenge} />
            })}
          </div>
        )}
      </div>
      {isOwner ? (
        <div className="w-full flex-[0.1] flex items-center justify-center">
          <TextBox type="ANNOUNCEMENT" challengeId={challenge._id} />
        </div>
      ) : (
        <div className="w-full flex-[0.1] text-xs bg-gray-200 flex items-center justify-center gap-2">
          Only <span className="text-primary font-medium">coaches</span> can send an annoucement.
        </div>
      )}
    </div>
  )
}

export default AnnouncementSection;
