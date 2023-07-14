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

function MessagesPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileFooter />
      <MainSidebarFixed />

      <div className="container">
        <MessagesList />
        {/* <DefaultChatBox /> */}
        <ChatBox />
      </div>
      <MobileFooter />
    </div>
  );
}

export default MessagesPage;
