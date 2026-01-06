"use client";

import React, { useState } from "react";

interface VideoModalProps {
    onInsert: (url: string) => void;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ onInsert, onClose }) => {
    const [videoUrl, setVideoUrl] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-[350px] rounded bg-white p-4 shadow">
                <h3 className="mb-2 font-medium">Insert video (YouTube link)</h3>
                <input
                    autoFocus
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste any YouTube link"
                    className="mb-3 w-full rounded border px-3 py-2"
                />
                <div className="flex justify-end gap-2">
                    <button type="button"
                        onClick={onClose}
                        className="rounded border px-3 py-1"
                    >
                        Cancel
                    </button>
                    <button type="button"
                        onClick={() => {
                            onInsert(videoUrl);
                        }}
                        className="rounded bg-blue-600 px-3 py-1 text-white"
                    >
                        Insert
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
