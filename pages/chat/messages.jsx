import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MessagesList from "@/components/chat/MessagesList";
import DefaultChatBox from "@/components/chat/DefaultChatBox";
import ChatBox from "@/components/chat/ChatBox";
import NewMessageList from "@/components/chat/NewMessageList";

function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showNewMsg, setShowNewMsg] = useState(false);
  const showChatHandler = (id) => {
    setSelectedChatId(id);
  };
  const showNewMsgHandler = (state) => {
    setShowNewMsg(state);
  };
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileFooter />
      <MainSidebarFixed />

      <div className="container" style={{height:"calc(100vh - 110px)"}}>
        {showNewMsg ? (
          <NewMessageList
            onChatSelect={showChatHandler}
            onNewMsg={showNewMsgHandler}
          />
        ) : (
          <MessagesList
            onChatSelect={showChatHandler}
            onNewMsg={showNewMsgHandler}
          />
        )}
        {selectedChatId ? (
          <ChatBox selectedId={selectedChatId} onNewMsg={showNewMsgHandler}/>
        ) : (
          <DefaultChatBox />
        )}
      </div>
      <MobileFooter />
    </div>
  );
}

export default MessagesPage;
