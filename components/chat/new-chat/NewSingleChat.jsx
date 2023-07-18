import { useRouter } from "next/router";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";

function NewSingleChat({ onChatSelect, onNewMsg, onGrpShow }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchChangeHandler = (e) => {
    setSearchInput(e.target.value);
    Axios.post(
      apis.usersearch,
      {
        user_input: searchInput,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      if (res.data.status === 1) {
        setSearchResult(res.data.data.results);
      }
    });
  };

  const selectUserHandler = (id) => {
    Axios.post(
      apis.createChat,
      {
        type: "single",
        user: id,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res)=>{
      onChatSelect(res.data.data.id)
    })
  };

  return (
    <Fragment>
      <div className="leftSide">
        <div className="header">
          <div className="text">
            <h6
              style={{
                fontWeight: "600",
                fontSize: "17px",
                marginLeft: "11px",
              }}
            >
              {" "}
              <span
                onClick={() => onNewMsg(false)}
                style={{ cursor: "pointer" }}
              >
                <svg
                  width="15"
                  height="14"
                  style={{ marginRight: "4px" }}
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.84842 12.8221C6.0442 13.0178 6.28878 13.1156 6.53357 13.1156C6.77834 13.1156 7.02292 13.0178 7.21872 12.8221C7.61028 12.4305 7.61028 11.8188 7.21872 11.4272L3.35251 7.53656H14.0213C14.5596 7.53656 15 7.0962 15 6.55787C15 6.01953 14.5596 5.57916 14.0213 5.57916H3.35251L7.24315 1.68853C7.6347 1.29697 7.6347 0.685225 7.24315 0.293666C6.85159 -0.0978886 6.23985 -0.0978886 5.84829 0.293666L0.293666 5.87276C-0.0978886 6.26431 -0.0978886 6.87606 0.293666 7.26762L5.84842 12.8221Z"
                    fill="black"
                  />
                </svg>
              </span>
              Start New Message
            </h6>
          </div>
        </div>
        <div className="search_chat">
          <div>
            <input
              type="text"
              onChange={(e) => searchChangeHandler(e)}
              placeholder="Search Contacts"
            ></input>
          </div>
        </div>
        <div className="chatlist">
          <div className="block active">
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18.5"
                cy="18.5"
                r="18"
                fill="#17A803"
                stroke="#17A803"
              />
              <path
                d="M9 29C9 26.8783 9.84285 24.8434 11.3431 23.3431C12.8434 21.8429 14.8783 21 17 21C19.1217 21 21.1566 21.8429 22.6569 23.3431C24.1571 24.8434 25 26.8783 25 29H23C23 27.4087 22.3679 25.8826 21.2426 24.7574C20.1174 23.6321 18.5913 23 17 23C15.4087 23 13.8826 23.6321 12.7574 24.7574C11.6321 25.8826 11 27.4087 11 29H9ZM17 20C13.685 20 11 17.315 11 14C11 10.685 13.685 8 17 8C20.315 8 23 10.685 23 14C23 17.315 20.315 20 17 20ZM17 18C19.21 18 21 16.21 21 14C21 11.79 19.21 10 17 10C14.79 10 13 11.79 13 14C13 16.21 14.79 18 17 18ZM25.284 21.703C26.6893 22.3359 27.882 23.3612 28.7186 24.6557C29.5552 25.9502 30.0002 27.4587 30 29H28C28.0002 27.844 27.6666 26.7125 27.0391 25.7416C26.4116 24.7707 25.5171 24.0017 24.463 23.527L25.284 21.703ZM24.596 10.413C25.6035 10.8283 26.465 11.5335 27.071 12.4392C27.6771 13.3449 28.0004 14.4102 28 15.5C28.0004 16.8723 27.4877 18.1952 26.5625 19.2088C25.6374 20.2224 24.3667 20.8535 23 20.978V18.965C23.7409 18.8589 24.4283 18.518 24.9613 17.9925C25.4943 17.4669 25.8447 16.7843 25.9612 16.0449C26.0776 15.3055 25.954 14.5483 25.6084 13.8844C25.2628 13.2204 24.7134 12.6847 24.041 12.356L24.596 10.413Z"
                fill="white"
                stroke="#17A803"
                stroke-width="0.5"
              />
            </svg>{" "}
            <span>
              {" "}
              <h6
                style={{
                  fontWeight: "600",
                  fontSize: "17px",
                  marginLeft: "13px",
                }}
                onClick={() => onGrpShow(true)}
              >
                Add new group
              </h6>
            </span>
          </div>
          {searchResult &&
            searchResult.map((item, index) => (
              <div
                key={index}
                onClick={() => selectUserHandler(item.id)}
                className="block active"
              >
                <div className="imgBox">
                  <img
                    src={
                      item.image
                        ? `${constants.port}/media/${item.image}`
                        : "/images/accounts/user_default.png"
                    }
                    className="cover"
                    alt=""
                  />
                  <svg
                    width="10"
                    height="10"
                    style={{
                      marginLeft: "30px",
                      marginTop: "35px",
                      position: "absolute",
                    }}
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="4.82459"
                      cy="5.16357"
                      rx="4.66443"
                      ry="4.83643"
                      fill="#17A803"
                    />
                  </svg>
                </div>
                <div className="details">
                  <div className="listHead">
                    <p>{item.name}</p>
                  </div>
                  <div className="message_p">
                    <p className="note">@{item.username}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
}

export default NewSingleChat;
