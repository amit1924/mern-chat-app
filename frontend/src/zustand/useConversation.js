import { create } from "zustand";

// Create the Zustand store
const useConversation = create((set) => ({
  // Initial state
  selectedConversation: null,
  messages: [],

  // Actions to update the state
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
