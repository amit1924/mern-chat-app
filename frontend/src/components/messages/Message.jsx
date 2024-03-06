const Message = () => {
  return (
    <div>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User Avatar" src={""} />
        </div>
      </div>
      <div className="chat-bubble text-white">hi</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center"></div>
    </div>
  );
};

export default Message;
