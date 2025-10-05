import React from "react";

function ChatMessage({ text, self }: { text: string, self: boolean }) {
  // Regex: matches http(s), www, or bare domains with extensions
  const urlRegex =
    /\b((https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?)\b/;

  const match = text.match(urlRegex);

  return (
    <div>
      {(match && !text?.includes("https.")) ? (
        <a
          href={match[0].startsWith("http") ? match[0] : `https://${match[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className={` text-sm font-medium underline ${self ? "text-black " : "text-neonblue-500"}  `}
        >
          {match[0]}
        </a>
      ) : (
        <span className=" text-sm font-medium " >{text}</span>
      )}
    </div>
  );
}

export default ChatMessage;
