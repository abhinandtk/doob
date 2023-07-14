import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState } from "react";
import MainHeader from "@/components/shared/headers/MainHeader";
import MobileHeader from "@/components/MobileHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import MobileFooter from "@/components/shared/MobileFooter";
import DefaultChatBox from "@/components/chat/DefaultChatBox";
import NewMessageList from "@/components/chat/NewMessageList";

function NewChatPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />

      <div className="container">
        <NewMessageList />
        <DefaultChatBox />
      </div>
      <MobileFooter />
    </div>
  );
}

export default NewChatPage;
