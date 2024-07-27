// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import useConversation from "../zustand/useConversation"; // Adjust the path as necessary

// const useGetMessages = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [messages, setMessages] = useState([]); // Initialize messages as an empty array
//   const { selectedConversation } = useConversation(); // Get the selected conversation from Zustand

//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!selectedConversation) {
//         setMessages([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(
//           `http://localhost:3000/api/messages/${selectedConversation._id}`, // Adjust API endpoint as needed
//           {
//             method: "GET",
//             credentials: "include", // Include cookies for authentication
//           }
//         );

//         const data = await res.json();
//         if (data.error) {
//           throw new Error(data.error);
//         }
//         setMessages(data);
//       } catch (err) {
//         console.error("Error fetching messages:", err.message);
//         toast.error(err.message);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedConversation?._id) fetchMessages();
//   }, [selectedConversation?._id]); // Re-fetch messages when selectedConversation changes

//   return { messages, loading, error }; // Return messages as part of the hook's state
// };

// export default useGetMessages;

import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
