// src/modules/community-chat/components/PostSkeleton.tsx
export const PostSkeleton = () => (
    <div className="p-4 flex flex-col gap-3 animate-pulse">
        <div className="flex gap-3">
            <div className="size-9 rounded-full bg-gray-100 shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
                <div className="h-3 w-32 bg-gray-100 rounded" />
                <div className="h-2.5 w-20 bg-gray-100 rounded" />
            </div>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-4/5 bg-gray-100 rounded" />
        <div className="h-40 w-full bg-gray-100 rounded-xl" />
    </div>
);