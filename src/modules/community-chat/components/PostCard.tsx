"use client";

import { useState, useMemo } from "react";
import { Avatar } from "@heroui/react";
import { BiComment } from "react-icons/bi";
import { HiFire, HiOutlineFire } from "react-icons/hi";
import { Trash2 } from "lucide-react";
import { RiMoreLine } from "react-icons/ri";
import { ICommunityMessage } from "../models/community-chat.model";
import { CommunityMessageModal } from "@/components/communities/modals/communityMessageModal";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────
interface IMember {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  username?: string;
}

interface IMemberRecord {
  _id: string;
  member: IMember;
}

interface PostCardProps {
  message: ICommunityMessage;
  isSelf: boolean;
  userId: string;
  likedMessageIds: Set<string>;
  replies?: ICommunityMessage[];
  isLoadingReplies?: boolean;
  isSending: boolean;
  onDelete?: (id: string) => void;
  onFetchReplies: (id: string) => void;
  onSendReply: (messageId: string, content: string) => Promise<void>;
  likeAndUnlikePost: (messageId: string) => void;
  members?: IMemberRecord[];
}

// ── Media helpers ────────────────────────────────────────────
const IMAGE_RE = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
const VIDEO_RE = /^https?:\/\/.+\.(mp4|mov|webm|ogg)(\?.*)?$/i;

const parseContent = (content: string, image?: string) => {
  if (image) return { text: content, imageUrls: [], videoUrls: [] };
  const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
  const imageUrls: string[] = [];
  const videoUrls: string[] = [];
  const textLines: string[] = [];
  lines.forEach(line => {
    if (IMAGE_RE.test(line)) imageUrls.push(line);
    else if (VIDEO_RE.test(line)) videoUrls.push(line);
    else textLines.push(line);
  });
  return { text: textLines.join("\n"), imageUrls, videoUrls };
};

interface MediaItem { url: string; type: "image" | "video"; }

const MediaBlock = ({ message }: { message: ICommunityMessage }) => {
  const mediaItems = useMemo<MediaItem[]>(() => {
    const items: MediaItem[] = [];
    if (message.image) {
      items.push({ url: message.image, type: VIDEO_RE.test(message.image) ? "video" : "image" });
      return items;
    }
    if (message.content) {
      for (const line of message.content.split("\n")) {
        const t = line.trim();
        if (IMAGE_RE.test(t)) items.push({ url: t, type: "image" });
        else if (VIDEO_RE.test(t)) items.push({ url: t, type: "video" });
      }
    }
    return items;
  }, [message.image, message.content]);

  if (mediaItems.length === 0) return null;
  return (
    <div className="w-full overflow-hidden rounded-lg">
      {mediaItems.map((item, idx) =>
        item.type === "video" ? (
          <video
            key={idx}
            src={item.url}
            controls
            className="max-w-[400px] max-h-[400px] object-cover ml-6"
            controlsList="nodownload"
          />
        ) : (
          <img
            key={idx}
            src={item.url}
            alt="Media"
            className="max-w-[400px] max-h-[400px] object-cover ml-6"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        )
      )}
    </div>
  );
};

// ── Fire animation styles ────────────────────────────────────
const FIRE_STYLE = `
@keyframes fire-burst {
  0%   { transform: scale(1);    opacity: 1; }
  30%  { transform: scale(1.6);  opacity: 1; }
  60%  { transform: scale(1.3);  opacity: 0.85; }
  100% { transform: scale(1);    opacity: 1; }
}
@keyframes fire-shake {
  0%,100% { transform: rotate(0deg) scale(1); }
  20%      { transform: rotate(-15deg) scale(1.4); }
  40%      { transform: rotate(12deg)  scale(1.5); }
  60%      { transform: rotate(-10deg) scale(1.3); }
  80%      { transform: rotate(8deg)   scale(1.2); }
}
@keyframes spark-fly {
  0%   { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(var(--dx),var(--dy)) scale(0); opacity: 0; }
}
.fire-animating {
  animation: fire-shake 0.5s ease-out forwards;
  color: #f97316 !important;
}
.fire-liked { color: #f97316; }
.fire-spark {
  position: absolute;
  width: 5px; height: 5px;
  border-radius: 50%;
  pointer-events: none;
  animation: spark-fly 0.5s ease-out forwards;
}
`;

if (typeof document !== "undefined" && !document.getElementById("fire-style")) {
  const s = document.createElement("style");
  s.id = "fire-style";
  s.textContent = FIRE_STYLE;
  document.head.appendChild(s);
}

const SPARK_COLORS = ["#f97316", "#ef4444", "#facc15", "#fb923c", "#fde68a"];
const SPARK_POSITIONS = [
  { dx: "-18px", dy: "-20px" }, { dx: "18px",  dy: "-20px" },
  { dx: "-22px", dy: "-8px"  }, { dx: "22px",  dy: "-8px"  },
  { dx: "0px",   dy: "-24px" }, { dx: "-10px", dy: "14px"  },
  { dx: "10px",  dy: "14px"  },
];

function spawnSparks(container: HTMLElement) {
  SPARK_POSITIONS.forEach(({ dx, dy }) => {
    const spark = document.createElement("span");
    spark.className = "fire-spark";
    spark.style.cssText = `
      background: ${SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]};
      --dx: ${dx}; --dy: ${dy};
      left: 50%; top: 50%; margin-left: -2px; margin-top: -2px;
    `;
    container.appendChild(spark);
    setTimeout(() => spark.remove(), 550);
  });
}

// ── Mention renderer ─────────────────────────────────────────
// Splits on "@FirstName LastName" tokens using a capture-group regex.
// Plain segments → <span>, mention segments → blue pill <Link>.
const MENTION_RE = /(@[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]+)+)/g;

function renderWithMentions(
  inputText: string,
  memberIdByName: Map<string, string>
): React.ReactNode {
  if (!inputText) return null;

  // split() with a capture group keeps the delimiters in the result array
  const segments = inputText.split(MENTION_RE);

  return (
    <>
      {segments.map((seg, i) => {
        if (!seg.startsWith("@")) {
          // Plain text — preserve newlines
          return (
            <span key={i} className="text-gray-700 whitespace-pre-wrap">
              {seg}
            </span>
          );
        }

        // Mention token e.g. "@John Doe"
        const name = seg.slice(1); // strip @
        const memberId = memberIdByName.get(name.toLowerCase());
        const href = memberId ? `/dashboard/profile/${memberId}` : "#";

        return (
          <Link
            key={i}
            href={href}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center bg-[#5160E7]/10 text-[#5160E7] hover:bg-[#5160E7]/20 rounded-full px-2 py-0.5 text-[13px] font-semibold transition-colors mx-0.5 leading-snug"
          >
            {seg}
          </Link>
        );
      })}
    </>
  );
}

// ── Component ────────────────────────────────────────────────
export const PostCard = ({
  message,
  isSelf,
  userId,
  likedMessageIds,
  replies,
  isLoadingReplies,
  isSending,
  onDelete,
  onFetchReplies,
  onSendReply,
  likeAndUnlikePost,
  members = [],
}: PostCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive]       = useState(false);
  const [liked, setLiked]         = useState(() => likedMessageIds?.has(message._id) ?? false);
  const [animating, setAnimating] = useState(false);
  const [localLikes, setLocalLikes] = useState(message.likes ?? 0);

  const { text } = parseContent(message.content, message.image);
  const hasMedia  = !!message.image || IMAGE_RE.test(message.content) || VIDEO_RE.test(message.content);
  const authorName  = `${message.author.firstName} ${message.author.lastName}`;
  const repliesCount = message.repliesCount ?? 0;

  // Build name → _id map from IMemberRecord[], deduped by member._id
  const memberIdByName = useMemo(() => {
    const map  = new Map<string, string>();
    const seen = new Set<string>();
    members.forEach(({ member: m }) => {
      if (seen.has(m._id)) return;
      seen.add(m._id);
      map.set(`${m.firstName} ${m.lastName}`.toLowerCase(), m._id);
    });
    return map;
  }, [members]);

  const handleOpenComments = () => {
    if (!replies) onFetchReplies(message._id);
    setShowModal(true);
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    const container = e.currentTarget;
    const wasLiked  = liked;
    setLiked(!wasLiked);
    setLocalLikes(prev => wasLiked ? Math.max(0, prev - 1) : prev + 1);
    if (!wasLiked) {
      setAnimating(true);
      spawnSparks(container);
      setTimeout(() => setAnimating(false), 520);
    }
    likeAndUnlikePost(message._id);
  };

  if (message.deleted) return null;

  return (
    <>
      <div
        className="bg-white rounded-2xl overflow-hidden border border-[#F0F0F0] mt-2"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-0 flex items-start justify-between">
          <div className="flex gap-3 items-start">
            <Link href={`/dashboard/profile/${message.author._id}`}>
              <Avatar
                src={message.author.profilePicture || ""}
                name={`${message.author.firstName?.[0]}${message.author.lastName?.[0]}`}
                className="size-10 shrink-0"
              />
            </Link>
            <div>
              <span className="text-sm font-semibold text-black block leading-tight">
                {authorName}
              </span>
              <span className="text-[11px] text-gray-400">
                {new Date(message.createdAt).toLocaleDateString(undefined, {
                  month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {isSelf && active && onDelete && (
              <button
                onClick={() => onDelete(message._id)}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
              >
                <Trash2 className="size-4" />
              </button>
            )}
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
              <RiMoreLine className="size-4" />
            </button>
          </div>
        </div>

        {/* Message body — plain text interspersed with @mention pills */}
        {text && (
          <div className="px-4 pt-3 pb-2 text-sm leading-relaxed break-words">
            {renderWithMentions(text, memberIdByName)}
          </div>
        )}

        {/* Media */}
        {hasMedia && (
          <div className="mt-2">
            <MediaBlock message={message} />
          </div>
        )}

        {/* Action bar */}
        <div className="px-2 py-1 mt-2 flex items-center justify-between border-t border-[#F0F0F0]">
          <div className="flex gap-2 items-center w-full justify-end">
            <button
              onClick={handleLike}
              className="relative flex items-center gap-1.5 py-2 px-2 text-sm text-gray-500 hover:bg-[#FFF7ED] rounded-lg transition-colors"
              title={liked ? "Unlike" : "Like"}
            >
              {liked
                ? <HiFire className={`size-5 transition-colors ${animating ? "fire-animating" : "fire-liked"}`} />
                : <HiOutlineFire className={`size-5 text-gray-400 hover:text-orange-400 transition-colors ${animating ? "fire-animating" : ""}`} />
              }
              <span className={`text-xs ${liked ? "text-orange-500 font-medium" : "text-gray-500"}`}>
                {localLikes >= 1000 ? `${(localLikes / 1000).toFixed(1)}K` : localLikes}
              </span>
            </button>

            <div className="flex gap-1 items-center">
              <button
                className="flex items-center justify-center gap-2 py-2 p-2 text-sm text-gray-500 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                onClick={handleOpenComments}
              >
                <BiComment className="size-4" />
              </button>
              {repliesCount > 0 && (
                <div className="pr-2">
                  <button className="text-xs text-gray-400" onClick={handleOpenComments}>
                    {repliesCount} comment{repliesCount !== 1 ? "s" : ""}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CommunityMessageModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={message}
        replies={replies ?? []}
        isLoadingReplies={isLoadingReplies ?? false}
        isSending={isSending}
        userId={userId}
        onSendReply={async (content) => { await onSendReply(message._id, content); }}
      />
    </>
  );
};