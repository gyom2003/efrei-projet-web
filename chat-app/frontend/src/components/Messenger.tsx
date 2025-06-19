import React, { useState } from "react";
import ListConversation from "./ListConversation";
import Chat from "./Chat";
export default function Messenger() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <ListConversation onSelect={setSelectedConversation} />
      <Chat conversationId={selectedConversation} />
     
    </div>
  );
}
