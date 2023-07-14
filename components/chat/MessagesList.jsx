import { useRouter } from "next/router";
import React from "react";
import { Fragment } from "react";

function MessagesList() {
  const router = useRouter();
  return (
    <Fragment>
      <div className="leftSide">
        <div className="header">
          <div className="text">
            <h6
              style={{
                fontWeight: "600",
                fontSize: "17px",
                marginLeft: "3px",
              }}
            >
              Messages
            </h6>
          </div>
          <h6
            style={{
              fontWeight: "600",
              color: "#17a803",
              fontSize: "15px",
              marginRight: "8px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/chat/new-chat")}
          >
            New Message
          </h6>
        </div>
        <div className="search_chat">
          <div>
            <input type="text" placeholder="Search Contacts"></input>
          </div>
        </div>
        <div className="chatlist">
          <div className="block active">
            <div className="imgBox">
              <img src="../images/Rec.png" className="cover" alt="" />
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
                <p>
                  Ayman Alruwaished
                  <span>
                    <img
                      src="../images/star.png"
                      className=" mb-1"
                      style={{
                        width: "10px",
                        height: "10px",
                        marginLeft: "1px",
                      }}
                    ></img>
                  </span>
                </p>
                <b>1</b>
              </div>
              <div className="message_p">
                <p>Can't wait to try it out!</p>
                <p className="time">12:34</p>
              </div>
            </div>
          </div>
          <div className="block active">
            <div className="imgBox">
              <img src="../images/Rec.png" className="cover" alt="" />
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
                <p>Ayman Alruwaished</p>
              </div>
              <div className="message_p">
                <p>Can't wait to try it out!</p>
                <p className="time">12:34</p>
              </div>
            </div>
          </div>

          <div className="block active">
            <div className="imgBox">
              <img src="../images/Rec.png" className="cover" alt="" />
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
                <p>Ayman Alruwaished</p>
                <b>1</b>
              </div>
              <div className="message_p">
                <p>Can't wait to try it out!</p>
                <p className="time">12:34</p>
              </div>
            </div>
          </div>
          <div className="block active">
            <div className="imgBox">
              <img src="../images/Rec.png" className="cover" alt="" />
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
                <p>Ayman Alruwaished</p>
                <b>1</b>
              </div>
              <div className="message_p">
                <p>Can't wait to try it out!</p>
                <p className="time">12:34</p>
              </div>
            </div>
          </div>
          <div className="block active">
            <div className="imgBox">
              <img src="../images/Rec.png" className="cover" alt="" />
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
                <p>Ayman Alruwaished</p>
              </div>
              <div className="message_p">
                <p>Can't wait to try it out!</p>
                <p className="time">12:34</p>
              </div>
            </div>
          </div>

          <div className="block active">
            <div className="imgBox">
              <img src="../images/Rec.png" className="cover" alt="" />
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
                <p>Ayman Alruwaished</p>
                <b>1</b>
              </div>
              <div className="message_p">
                <p>Can't wait to try it out!</p>
                <p className="time">12:34</p>
              </div>
            </div>
          </div>

          <div className="block active">
            <div className="imgBox">
              <img src="../images/Rec.png" className="cover" alt="" />
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
                <p>Ayman Alruwaished</p>
              </div>
              <div className="message_p">
                <p>Can't wait to try it out!</p>
                <p className="time">12:34</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MessagesList;
