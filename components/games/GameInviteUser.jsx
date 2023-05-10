import apis from "@/public/data/my-constants/Apis";
import { Input, List, Modal } from "antd";
import React, { useState } from "react";
import { Fragment } from "react";
import Axios from "axios";
import { CardImg } from "react-bootstrap";
import constants from "@/public/data/my-constants/Constants";
import Select from "react-select";
import { useRouter } from "next/router";

function GameInviteUser({ setOnSuccess }) {
  const router = useRouter();
  const { gameId } = router.query;
  const [visible, setVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [names, setNames] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setNames(e.target.value);
    Axios.post(apis.usersearch, {
      user_input: names,
    }).then((res) => {
      if (res.data.status === 1) {
        console.log("res23", res);
        setSearchResult(res.data.data.results);
      }
    });
  };

  const handleSelect = (id) => {
    console.log("iddd767", [id]);
    Axios.post(
      apis.inviteUser,
      {
        user_id: [id],
        game_slug: gameId,
        type: "invite",
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setVisible(false);
      setOnSuccess((prev) => !prev)
      console.log("resultinvite", res);
    });
  };
  return (
    <Fragment>
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        title="Invite Participants"
      >
        <Input
          placeholder="Enter names"
          // value={names}
          onChange={(e) => handleChange(e)}
        />
        <List
          dataSource={searchResult}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              style={{ padding: "0px" }}
              onClick={() => handleSelect(item.id)}
            >
              <div className="d-flex flex-start mt-4 mx-2">
                <a className="me-2" href="">
                  <CardImg
                    className="rounded-circle shadow-1-strong "
                    src={`${constants.port}/media/${item.image}`}
                    style={{
                      width: "44px",
                      height: "44px",
                      objectFit: "cover",
                    }}
                  ></CardImg>
                </a>
                <div
                  className="flex-grow-1 flex-shrink-1 "
                  style={{ marginBottom: "-24px" }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="mb-0"
                        style={{
                          fontWeight: "600",
                          color: "#000",
                          fontSize: "15px",
                        }}
                      >
                        {item.name}
                      </p>
                    </div>

                    <p
                      className="small "
                      style={{
                        color: "#000",
                        fontWeight: "400",
                        fontSize: "14px",
                        marginTop: "-3px",
                        float: "left",
                      }}
                    >
                      @{item.username}
                    </p>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          style={{ height: "250px", overflowY: "auto" }}
        />
      </Modal>
      <div className="clearfix Invite">
        <h5
          className="float-start"
          style={{ fontWeight: "700", fontSize: "15px" }}
        >
          Participants
        </h5>
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="Join-btn float-end"
        >
          Invite
        </button>
      </div>
    </Fragment>
  );
}

export default GameInviteUser;
