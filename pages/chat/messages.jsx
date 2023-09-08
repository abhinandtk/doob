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
import GroupInfo from "@/components/chat/GroupInfo";
import MobileHeader from "@/components/MobileHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
function MessagesPage() {
  const router = useRouter();
  const { chatId } = router.query;
  const [selectedChatId, setSelectedChatId] = useState(chatId ? chatId : null);
  const [showNewMsg, setShowNewMsg] = useState(null);
  const showChatHandler = (id) => {
    setSelectedChatId(id);
  };
  const showNewMsgHandler = (state) => {
    setShowNewMsg(state);
  };
  console.log("selectedChatId", chatId, selectedChatId);
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MobileFooter />
      <MainSidebarFixed />

      <div className="container" style={{ height: "calc(100vh - 110px)" }}>
        {showNewMsg === "new" ? (
          <NewMessageList
            onChatSelect={showChatHandler}
            onNewMsg={showNewMsgHandler}
          />
        ) : showNewMsg === "info" ? (
          <GroupInfo
            selectedId={selectedChatId}
            // onChatSelect={showChatHandler}
            onNewMsg={showNewMsgHandler}
          />
        ) : (
          <MessagesList
            onChatSelect={showChatHandler}
            onNewMsg={showNewMsgHandler}
          />
        )}
        {selectedChatId ? (
          <ChatBox selectedId={selectedChatId} onNewMsg={showNewMsgHandler} />
        ) : (
          <DefaultChatBox />
        )}
      </div>
      <MobileFooter />
    </div>
  );
}

export default MessagesPage;
