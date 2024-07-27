import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages"; // Importing the custom hook for fetching messages
import MessageSkeleton from "../skeletons/MessageSkeleton"; // Importing a skeleton component for loading state
import Message from "./Message"; // Importing the Message component to display individual messages

const Messages = () => {
  const { messages, loading } = useGetMessages(); // Fetch messages and loading state from the custom hook
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }, [messages]); // Add messages as a dependency to scroll when messages update

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}{" "}
      {/* Show skeletons while loading */}
      {!loading &&
        messages.length === 0 && ( // If not loading and no messages
          <p className="text-center">Send a message to start chatting</p>
        )}
      {
        !loading &&
          Array.isArray(messages) && // Ensure messages is an array before mapping
          messages.length > 0 && // If not loading and there are messages
          messages.map((message, index) => (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <Message message={message} />
            </div>
          )) // Render each message
      }
    </div>
  );
};

export default Messages;
