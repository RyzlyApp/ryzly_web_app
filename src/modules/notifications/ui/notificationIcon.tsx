import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Spinner } from "@heroui/react";
import useNotification from "../hooks/useNotification";
import { RiNotification2Line } from "react-icons/ri";

function NotificationIcon() {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const { notifications, getNotifications, markAsRead } = useNotification();
  const unreadCount = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    (async function () {
      setIsLoading(true);
      await getNotifications({ limit: 20, page });
      setIsLoading(false);
    })();
  }, []);
  return (
    <Popover
      isOpen={notifOpen}
      onOpenChange={(v) => setNotifOpen(v)}
      placement="bottom-end"
      offset={10}
      showArrow
      backdrop="opaque"
    >
      <PopoverTrigger>
        <button className=" relative cursor-pointer ">
          <RiNotification2Line size={"17px"} />
          {/* unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#F16666] text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[420px]">
        <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200">
            <p className="text-xl font-bold">Notifications</p>
          </div>
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Spinner size="sm" />
              <span className="text-sm text-gray-500 ml-2">Loading notifications…</span>
            </div>
          )}
          {!isLoading && notifications.length === 0 && (
            <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                <RiNotification2Line className="text-gray-500" size={20} />
              </span>
              <p className="text-sm font-medium text-[#222]">No notifications yet</p>
              <p className="text-xs text-gray-500">You’re all caught up.</p>
            </div>
          )}
          {!isLoading && notifications.length > 0 && (
            <ul className="divide-y divide-gray-200">
              {notifications.map((n, i) => (
                <li key={i} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-5 w-5 text-gray-500"
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
                      <p className="text-sm text-[#222]">{n.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationIcon;
