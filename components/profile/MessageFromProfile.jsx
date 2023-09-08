import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { notification } from "antd";
function MessageFromProfile() {
  const router = useRouter();
  const { userId } = router.query;
  console.log("userid", userId);
  const profileMessageHandler = () => {
    Axios.post(
      apis.createChat,
      {
        type: "single",
        user: userId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("selectuser123", res);
      if (res.data.status === 1) {
        router.push({
          pathname: "/chat/messages",
          query: {
            chatId: res.data.data.id,
          },
        });
      } else {
        notification.error({
          message: constants.Error,
          description:
            locale === "en" ? res.data.message_en : res.data.message_ar,
        });
      }
    });
  };
  const { t } = useTranslation();
  return (
    <button
      onClick={() => profileMessageHandler()}
      className="side-menu__suggestion-buttons "
    >
      {t("Message")}
    </button>
  );
}

export default MessageFromProfile;
