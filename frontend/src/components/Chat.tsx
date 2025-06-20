import { useEffect, useState } from "react";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

type Props = {
  conversationId: string | null;
  initialMessages: Message[];
};

export default function Chat({ initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Moi",
      text: inputValue,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 20,
        backgroundColor: "#f0f2f5",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 12,
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: "#999", fontStyle: "italic" }}>
            Aucun message dans cette conversation.
          </div>
        ) : (
          messages.map(({ id, sender, text, time }) => (
            <div
              key={id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: sender === "Moi" ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                {sender}
              </div>
              <div
                style={{
                  backgroundColor: sender === "Moi" ? "#25D366" : "#D3D3D3",
                  padding: "10px 14px",
                  borderRadius: 8,
                  maxWidth: "70%",
                  color: "black",
                  fontSize: 14,
                }}
              >
                {text}
              </div>
              <div
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  color: "#000000",
                  marginTop: 4,
                }}
              >
                {time}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Écris un message..."
          style={{
            flex: 1,
            padding: "10px 15px",
            borderRadius: 20,
            border: "1px solid #ccc",
            fontSize: 16,
            outline: "none",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            marginLeft: 8,
            padding: "10px 20px",
            borderRadius: 20,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
