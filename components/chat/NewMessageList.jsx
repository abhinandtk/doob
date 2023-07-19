import { useRouter } from "next/router";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import NewSingleChat from "./new-chat/NewSingleChat";
import CreateGroupChat from "./new-chat/CreateGroupChat";
function NewMessageList({ onChatSelect, onNewMsg }) {
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const createGroupShowHandler = (state) => {
    setShowCreateGroup(state);
  };

  return (
    <Fragment>
      {showCreateGroup ? (
        <CreateGroupChat
          onGrpShow={createGroupShowHandler}
          onChatSelect={onChatSelect}
          onNewMsg={onNewMsg}
        />
      ) : (
        <NewSingleChat
          onChatSelect={onChatSelect}
          onNewMsg={onNewMsg}
          onGrpShow={createGroupShowHandler}
        />
      )}
    </Fragment>
  );
}

export default NewMessageList;
