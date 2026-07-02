import React from "react";
import useNotification from "../hooks/useNotification";
import { RiNotification2Line } from "react-icons/ri";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
  useDisclosure,
  Button,
  ModalFooter,
} from "@heroui/react";
import { INotificationModel } from "../models/NotificationModel";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NotificationModal = ({ notifications, isLoading, isOpen, onClose, total, loadmore, mark }: { notifications: INotificationModel[], isLoading: boolean, isOpen: boolean, onClose: () => void, total: number, loadmore: () => void, mark: (noti: INotificationModel) => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader>
          <p className="text-xl font-bold">Notifications</p>
        </ModalHeader>
        <ModalBody className="px-0">
          <div className="w-full max-h-[400px] bg-white rounded-xl overflow-auto">
         
          
          {!isLoading && notifications.length === 0 && (
            <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                <RiNotification2Line className="text-gray-500" size={20} />
              </span>
              <p className="text-sm font-medium text-[#222]">No notifications yet</p>
              <p className="text-xs text-gray-500">You’re all caught up.</p>
            </div>
          )}
          {notifications?.length && notifications?.length > 0 && (
            <ul className="divide-y divide-gray-200 px-4 ">
              {notifications.map((n, i) => (
                <li key={i} onClick={() => mark(n)} className={cn(" py-4 hover:bg-gray-100 hover:cursor-pointer", !n.read && "bg-gray-100")}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
                        <svg
                          className="h-5 w-5 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="flex justify-start flex-1">
                        <p className="text-sm text-black">{n.message}</p>
                    </div>
                    <span className="text-xs whitespace-nowrap ml-2 text-primary">
                      {new Date(n.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Spinner size="sm" />
              <span className="text-sm text-gray-500 ml-2">Loading notifications…</span>
            </div>
          )}

         
        </div>
        </ModalBody>
        {notifications.length < total && (
           <ModalFooter>
              <div className="w-full h-auto">
                <Button isLoading={isLoading} className="w-full h-10 bg-transparent text-primary rounded-md border-[1px] border-primary" onClick={loadmore}>load more</Button>
              </div>
          </ModalFooter>
        )}
       
      </ModalContent>
    </Modal>
  )
}

function NotificationIcon() {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { notifications, getNotifications, markAsRead, total, getUnreadCount } = useNotification();
  const unreadCount = total;

  React.useEffect(() => {
    (async function () {
      setIsLoading(true);
      await getNotifications({ limit: 20, page });
      setIsLoading(false);
    })();
  }, [page]);


  const loadmore = async () => {
    setPage((prev) => prev + 1);
  }

  const mark = async (notification: INotificationModel) => {
    markAsRead([notification._id]);
    getUnreadCount().then(() => {
       if (notification.notificationType === "chat") { 
        router.push(`/dashboard/challenges/${notification.typeId}/details/overview`);
        }
        if (notification.notificationType === "challenge") {
            router.push(`/dashboard/challenges/${notification.typeId}/details/overview`);
        }
        if (notification.notificationType === "question") {
            router.push(`/dashboard/challenges/${notification.typeId}/details/overview`);
        }
        if (notification.notificationType === "payout") {
            router.push(`/dashboard/settings`);
        }
        if (notification.notificationType === "mention") {
            router.push(`/dashboard/challenges/${notification.typeId}/details/overview`);
      }
    });
  }
  return (
    <>
      <button className=" relative cursor-pointer " onClick={onOpen}>
          <RiNotification2Line size={"17px"} />
          {/* unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#F16666] text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        <NotificationModal loadmore={loadmore} notifications={notifications} isLoading={isLoading} isOpen={isOpen} onClose={onClose} total={total} mark={(not) => mark(not)} />
    </>
  );
}

export default NotificationIcon;
