import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure a message is provided before sending
    if (!message) {
      return;
    }

    // Send the message
    await sendMessage(message);
    setMessage(""); // Clear the input field after sending
  };

  return (
    <form className="relative px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-5 flex items-center pr-3"
          disabled={loading} // Disable button while loading
        >
          <BsSend className={`${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
