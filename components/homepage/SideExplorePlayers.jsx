import { React, useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Link from "next/link";
import { useEffect } from "react";
import { notification } from "antd";
import { Labels } from "@/public/data/my-constants/Labels";
import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function SideExplorePlayers() {
  const { t } = useTranslation();
  const router = useRouter()
  const { locale } = router;


  const { theme } = useTheme();
  const [exploreData, setExploreData] = useState([]);

  const labels = Labels();
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    Axios.get(apis.explorepage, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setExploreData(res.data.data);
      console.log("55555555555", res);
    });
  }, [success]);

  const exploreFollowHandler = (id) => {
    Axios.post(
      apis.follow,
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setSuccess((prev) => !prev);
        notification.success({
          message: constants.Success,
          description: `${labels["Followed successfully"]}`,
        });
      } else if (res.data.status === 3) {
        setSuccess((prev) => !prev);
        notification.success({
          message: constants.Success,
          description: `${labels["Requested successfully"]}`,
        });
      }
    });
  };
  return (
    <section className="side-menu-section ">
      <div className="side-menu__suggestions-section">
        <div className="side-menu__suggestions-header">
          <h2>{t("Explore New Player's")}</h2>
        </div>
        <div className="side-menu__suggestions-content">
          {exploreData.slice(0, 5).map((item, index) => (
            <div key={index} className="side-menu__suggestion">
              <div className="side-menu__suggestion-avatar">
                {item.image ? (
                  <img
                    src={`${item.image}`}
                    style={{
                      objectFit: "cover",
                      width: "44px",
                      height: "44px",
                    }}
                    alt="User Picture"
                  />
                ) : (
                  <img
                    src="/images/accounts/user_default.png"
                    alt="User Picture"
                    style={{
                      objectFit: "cover",
                      width: "44px",
                      height: "44px",
                    }}
                  />
                )}
              </div>
              <Link
                href={`/userprofile/${item.id}`}
                style={{
                  textDecoration: "none",
                  color: theme === "dark" ? "#FFF" : "black",
                }}
              >
                <div className="side-menu__suggestion-info">
                  <a> {item.name}</a>
                  {item.latest_mutual_user && item.mutual_user_count && (
                    <span>
                      {t("Followed by")} {item.latest_mutual_user} {t("and")}{" "}
                      {item.mutual_user_count} {t("more")}
                    </span>
                  )}
                </div>
              </Link>
              <button
                onClick={() => exploreFollowHandler(item.id)}
                className="side-menu__suggestion-button"
                style={{ [locale === "en" ? "marginLeft" : "marginRight"]: "auto" }}
              >
                {t("Follow")}
              </button>
            </div>
          ))}
        </div>
        <img src="/images/Group 1000003423.png"></img>
      </div>
    </section>
  );
}

export default SideExplorePlayers;
