/* eslint-disable no-unused-vars */
import React from "react";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { conversations, loading, error } = useGetConversations();

  // Log conversations for debugging purposes
  console.log("Conversations:", JSON.stringify(conversations, null, 2));

  // Handle loading state
  if (loading) {
    return <p className="text-center">Loading conversations...</p>;
  }

  // Handle error state
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.length > 0 ? (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      ) : (
        <p className="text-center">No conversations found.</p>
      )}
    </div>
  );
};

export default Conversations;
