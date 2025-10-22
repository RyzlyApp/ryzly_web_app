import React from "react";

function ChatMessage({ text, self }: { text: string; self: boolean }) {
  // Regex: matches http(s), www, or bare domains with extensions
  const urlRegex =
    /\b((https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?)\b/;

  const match = text.match(urlRegex);

  // Helper: render text with @mentions highlighted in blue
  const renderWithMentions = (input: string) => {
    const parts = input.split(/(@[a-zA-Z0-9_]+)/g);
    return parts.map((part, idx) =>
      part.startsWith("@") ? (
        <span key={idx} className="text-neonblue-500 underline">
          {part}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  // Truncation and expand toggle
  const [expanded, setExpanded] = React.useState(false);
  const limit = 200; // character limit before truncation
  const getDisplayText = (input: string) => {
    if (expanded || input.length <= limit) return input;
    return input.slice(0, limit) + "…";
  };

  return (
    <div className="w-full flex flex-wrap items-center overflow-hidden">
      {match && !text?.includes("https.") ? (
        <a
          href={match[0].startsWith("http") ? match[0] : `https://${match[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className={` text-sm font-medium underline ${
            self ? "text-black " : "text-neonblue-500"
          }  `}
        >
          {match[0]}
        </a>
      ) : (
        <span className=" text-sm font-medium break-words whitespace-pre-wrap w-[100%]">
          {renderWithMentions(getDisplayText(text))}
          {text.length > limit && !expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-neonblue-500 underline ml-1"
            >
              See more
            </button>
          )}
          {text.length > limit && expanded && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-neonblue-500 underline ml-1"
            >
              See less
            </button>
          )}
        </span>
      )}
    </div>
  );
}

export default ChatMessage;
