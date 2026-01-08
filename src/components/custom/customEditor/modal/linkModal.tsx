interface LinkModalProps {
    showLinkModal: boolean;
    setShowLinkModal: (show: boolean) => void;
    linkUrl: string;
    setLinkUrl: (url: string) => void;
    linkText: string;
    setLinkText: (text: string) => void;
    insertLink: (url: string, text: string) => void;
}

export default function LinkModal({ setShowLinkModal, linkUrl, setLinkUrl, linkText, setLinkText, insertLink }: LinkModalProps) {
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-[350px] rounded bg-white p-4 shadow">
                <h3 className="mb-2 font-medium">Insert hyperlink</h3>
                <input
                    autoFocus
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="mb-2 w-full rounded border px-3 py-2"
                />
                <input
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Display text (optional)"
                    className="mb-3 w-full rounded border px-3 py-2"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setShowLinkModal(false)}
                        className="rounded border px-3 py-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => insertLink(linkUrl, linkText)}
                        className="rounded bg-blue-600 px-3 py-1 text-white"
                    >
                        Insert
                    </button>
                </div>
            </div>
        </div>
    )
}