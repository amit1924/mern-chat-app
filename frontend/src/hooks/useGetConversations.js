/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching conversations...");
        const res = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          credentials: "include", // Include cookies with the request
        });
        console.log("Response received:", res);

        const data = await res.json();
        setConversations(data);
      } catch (e) {
        console.error("Error fetching conversations:", e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations, error };
};

export default useGetConversations;
