import React from "react";
import { Fragment } from "react";

function ChatBox() {
  return (
    <Fragment>
      <div className="rightSide1">
        <div className="header">
          <div className="imgText">
            <div className="userimg">
              <img src="../images/Rec.png" alt="" className="pic"></img>

              <p
                style={{
                  marginLeft: "90px",
                  marginTop: "36px",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Ayman Alruwaished<br></br>
                <span
                  style={{
                    fontWeight: "400",
                    fontSize: "13px",
                    color: "#797C7B",
                  }}
                >
                  Active Now
                </span>
              </p>
            </div>
            <svg
              width="10"
              height="10"
              style={{
                marginLeft: "-68px",
                marginTop: "63px",
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

          <ul className="nav_icons" style={{ marginTop: "35px" }}>
            <svg
              width="23"
              height="25"
              className="mt-1 ms-2 "
              viewBox="0 0 23 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.125 19.8421V18.2066C20.125 17.3939 19.6478 16.6632 18.9202 16.3614L16.9708 15.5529C16.0452 15.169 14.9904 15.5848 14.5446 16.5093L14.375 16.8611C14.375 16.8611 11.9792 16.3642 10.0625 14.3769C8.14583 12.3896 7.66667 9.90538 7.66667 9.90538L8.00593 9.72949C8.89753 9.26725 9.29857 8.17355 8.92835 7.21388L8.1486 5.19262C7.85753 4.43811 7.15275 3.94336 6.36902 3.94336H4.79167C3.73312 3.94336 2.875 4.83312 2.875 5.9307C2.875 14.7113 9.73997 21.8294 18.2083 21.8294C19.2669 21.8294 20.125 20.9397 20.125 19.8421Z"
                stroke="black"
                stroke-width="1.12994"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              width="33"
              height="33"
              className="mx-2"
              viewBox="0 0 33 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.3124 24.8564H7.67651C5.99774 24.8564 4.6377 23.4462 4.6377 21.7055V11.9028C4.6377 10.1621 5.99774 8.75195 7.67651 8.75195H18.3124C19.9912 8.75195 21.3512 10.1621 21.3512 11.9028V21.7055C21.3512 23.4462 19.9912 24.8564 18.3124 24.8564Z"
                stroke="black"
                stroke-width="1.27896"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.3516 18.3405L26.477 22.6173C27.4711 23.4477 28.9486 22.7139 28.9486 21.3905V12.218C28.9486 10.8946 27.4711 10.1608 26.477 10.9913L21.3516 15.268"
                stroke="black"
                stroke-width="1.27896"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="4"
              height="31"
              viewBox="0 0 4 16"
              className="me-4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 7.99251L2 8.00749M2 2L2 2.01498M2 13.985L2 14"
                stroke="black"
                stroke-width="2.36268"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ul>
        </div>
        <hr
          style={{ color: "grey", width: "95%" }}
          className="col-md-7 mx-3"
        ></hr>

        {/* <div class="chatbox">
            <button type="button" class="btn btn-success btn-sm">Today</button> */}
        {/* <div  className="today" >Today</div>  */}
        {/* <div class="message my_msg">
                    <p>Hello! Ahmed Al Tourah </p>
                    <div className='minute'>09:35AM</div>
                </div>
            
                <div class="message friend_msg">
                    <p>Hello ! Muhammad How are youfsjfgkaggh gel;hhlhhnkyhbiiyhrhekhgkkhryhirhkrhkdrhl rlhhlyhryhyrihyhlfghfghffffffffffffffffffffffffff?</p>
                    <div className='minute1'>09:35AM</div>
                </div>
               
                <div className="message my_msg">
                    <p>I'm doing really well, thank you. </p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Hope you like it</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Have a great day</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message my_msg" >
                    <p>Hello! Ahmed Al Tourah</p>
                 
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message my_msg">
                    <p>Hello! Ahmed Al Tourah</p>
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Have a great day</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message my_msg" >
                    <p>Hello! Ahmed Al Tourah</p>
                 
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message my_msg">
                    <p>Hello! Ahmed Al Tourah</p>
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Have a great day</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message my_msg" >
                    <p>Hello! Ahmed Al Tourah</p>
                 
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message my_msg">
                    <p>Hello! Ahmed Al Tourah</p>
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Have a great day</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message my_msg" >
                    <p>Hello! Ahmed Al Tourah</p>
                 
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message my_msg">
                    <p>Hello! Ahmed Al Tourah</p>
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Have a great day</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message my_msg" >
                    <p>Hello! Ahmed Al Tourah</p>
                 
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message my_msg">
                    <p>Hello! Ahmed Al Tourah</p>
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Have a great day</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message my_msg" >
                    <p>Hello! Ahmed Al Tourah</p>
                 
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message my_msg">
                    <p>Hello! Ahmed Al Tourah</p>
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message friend_msg">
                    <p>Have a great day</p>
                    <div className='minutes'>09:35AM</div>
                </div>
                <div className="message my_msg" >
                    <p>Hello! Ahmed Al Tourah</p>
                 
                    <div className='minute'>09:35AM</div>
                </div>
                <div className="message my_msg">
                    <p>Hello! Ahmed Al Tourah</p>
                    <div className='minute'>09:35AM</div>
                </div>
                <div className='missed-call  '>You have a missed call at 9.46 AM</div>   
            </div>   */}

        {/* sajin chat  */}
        <button type="button" class="btn btn-success btn-sm">
          Today
        </button>
        <div className="chatbox">
          <div className="message my_message">
            <p>
              hi<br></br>
            </p>
          </div>
          <div className="my_chatam">12:15 AM</div>

          <div className="message frnd_message">
            <p>
              helloke fkekeshkskgsek kg kgkhs kgsgkksgghe ekhts hfsgfAJBS kgfa
              agwfa ug fkagksfhsvfs jwvfjgg bjj gg fawa wbdad geuuerykwfh
              kgf'ashd fsv jav<br></br>
            </p>
          </div>
          <div className="frnd_chatam">12:15 AM</div>

          <div className="message my_message">
            <p>
              j,dbvjdz,vbkbsggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggdhvdh
              <br></br>
            </p>
          </div>
          <div className="my_chatam">12:15 AM</div>

          <div className="message frnd_message">
            <p>
              ertyuiodfghjhjk<br></br>
            </p>
          </div>
          <div className="frnd_chatam">12:15 AM</div>

          <div className="message my_message">
            <p>
              fhgjlhjbjhkj<br></br>
            </p>
          </div>
          <div className="my_chatam">12:15 AM</div>

          <div className="message frnd_message">
            <p>
              yydtfyggh<br></br>
            </p>
          </div>
          <div className="frnd_chatam">12:15 AM</div>

          <div className="message my_message">
            <p>
              h0okjfghjlki<br></br>
            </p>
          </div>
          <div className="my_chatam">12:15 AM</div>

          <div className="message frnd_message">
            <p>
              helsishj8+lo<br></br>
            </p>
          </div>
          <div className="frnd_chatam">12:15 AM</div>
        </div>

        {/* sajin chat end  */}

        <div className="chat_input">
          <input type="text" placeholder="Write your message" />
          <svg
            width="28"
            height="26"
            viewBox="0 0 28 26"
            className="mx-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0254 14.833L17.6792 9.58301"
              stroke="white"
              stroke-width="1.85685"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.77104 11.1263C2.82963 10.6892 2.94371 9.40933 3.94968 9.12191L22.3937 3.85221C23.2888 3.59645 24.1273 4.37501 23.8518 5.20623L18.1768 22.3328C17.8672 23.2669 16.4889 23.3728 16.0182 22.4987L12.1097 15.2401C11.9968 15.0304 11.8138 14.8604 11.588 14.7556L3.77104 11.1263Z"
              stroke="white"
              stroke-width="1.85685"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1316_10557)">
              <path
                d="M8.80292 6.68722V7.41958C9.04779 7.41958 9.27646 7.29721 9.41228 7.09346L8.80292 6.68722ZM10.3702 4.33631L9.76083 3.93007V3.93007L10.3702 4.33631ZM18.3806 4.33632L18.9899 3.93007L18.3806 4.33632ZM19.9478 6.68722L19.3385 7.09346C19.4743 7.29721 19.703 7.41958 19.9478 7.41958V6.68722ZM16.9865 15.0459C16.9865 16.488 15.8175 17.657 14.3754 17.657V19.1217C16.6264 19.1217 18.4512 17.2969 18.4512 15.0459H16.9865ZM14.3754 17.657C12.9333 17.657 11.7643 16.488 11.7643 15.0459H10.2995C10.2995 17.2969 12.1244 19.1217 14.3754 19.1217V17.657ZM11.7643 15.0459C11.7643 13.6038 12.9333 12.4348 14.3754 12.4348V10.9701C12.1244 10.9701 10.2995 12.7949 10.2995 15.0459H11.7643ZM14.3754 12.4348C15.8175 12.4348 16.9865 13.6038 16.9865 15.0459H18.4512C18.4512 12.7949 16.6264 10.9701 14.3754 10.9701V12.4348ZM9.41228 7.09346L10.9796 4.74256L9.76083 3.93007L8.19356 6.28098L9.41228 7.09346ZM12.2248 4.07611H16.5259V2.61139H12.2248V4.07611ZM17.7712 4.74256L19.3385 7.09346L20.5572 6.28098L18.9899 3.93007L17.7712 4.74256ZM16.5259 4.07611C17.0263 4.07611 17.4936 4.3262 17.7712 4.74256L18.9899 3.93007C18.4407 3.10623 17.5161 2.61139 16.5259 2.61139V4.07611ZM10.9796 4.74256C11.2571 4.3262 11.7244 4.07611 12.2248 4.07611V2.61139C11.2347 2.61139 10.3101 3.10623 9.76083 3.93007L10.9796 4.74256ZM24.7879 11.1452V18.9466H26.2526V11.1452H24.7879ZM21.0623 22.6722H7.68843V24.1369H21.0623V22.6722ZM3.96283 18.9466V11.1452H2.49811V18.9466H3.96283ZM7.68843 22.6722C5.63084 22.6722 3.96283 21.0042 3.96283 18.9466H2.49811C2.49811 21.8132 4.82189 24.1369 7.68843 24.1369V22.6722ZM24.7879 18.9466C24.7879 21.0042 23.1199 22.6722 21.0623 22.6722V24.1369C23.9289 24.1369 26.2526 21.8132 26.2526 18.9466H24.7879ZM21.0623 7.41958C23.1199 7.41958 24.7879 9.08759 24.7879 11.1452H26.2526C26.2526 8.27865 23.9289 5.95486 21.0623 5.95486V7.41958ZM7.68843 5.95486C4.8219 5.95486 2.49811 8.27865 2.49811 11.1452H3.96283C3.96283 9.08759 5.63084 7.41958 7.68843 7.41958V5.95486ZM7.68843 7.41958H8.80292V5.95486H7.68843V7.41958ZM21.0623 5.95486H19.9478V7.41958H21.0623V5.95486Z"
                fill="white"
              />
              <circle cx="13.3743" cy="6.68676" r="1.11449" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_1316_10557">
                <rect width="26.7478" height="26.7478" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </Fragment>
  );
}

export default ChatBox;
