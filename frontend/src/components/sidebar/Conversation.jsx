import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  // Handle click to set the selected conversation
  const handleConversationClick = () => {
    setSelectedConversation(conversation);
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 p-2 py-1 rounded cursor-pointer hover:bg-sky-500 transition-colors ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={handleConversationClick}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full overflow-hidden">
            <img
              src={conversation.profilePic}
              alt={`${conversation.username}'s avatar`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-200">
              {conversation.fullName || "Unknown User"}
            </p>
            <span className="text-2xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1 bg-gray-600" />}
    </div>
  );
};

export default Conversation;
