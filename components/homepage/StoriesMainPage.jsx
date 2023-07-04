import React, { useEffect, useState } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";
function StoriesMainPage() {
  const router = useRouter();
  const [storyList, setStoryList] = useState([]);

  useEffect(() => {
    Axios.get(apis.userStoryList, {
      headers: {
        Authorization: `Token ${constants.token_id}`,
      },
    }).then((res) => {
      setStoryList(res.data.data);
      console.log("response67", res);
    });
  }, []);

  return (
    <div className="stories">
      {/* <div className="text_follower">My Followers</div> */}
      <button className="stories__left-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#fff"
            d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"
          ></path>
        </svg>
      </button>

      <div className="stories__content">
        <button className="story story--has-story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
                <defs>
                  <linearGradient
                    y2="0"
                    x2="1"
                    y1="1"
                    x1="0"
                    id="--story-gradient"
                  >
                    <stop offset="0" stop-color="#f09433" />
                    <stop offset="0.25" stop-color="#e6683c" />
                    <stop offset="0.5" stop-color="#dc2743" />
                    <stop offset="0.75" stop-color="#cc2366" />
                    <stop offset="1" stop-color="#bc1888" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str2.png " alt="User Picture"></img>
              <img
                src="../images/male-rugby-player-holding-ball-with-color-effect.jpg"
                alt="User Picture"
              />
            </div>
          </div>
        </button>
        {storyList &&
          storyList.map((item, index) => (
            <button
              onClick={() =>
                router.push({
                  pathname: `/story-view/${item.user_detail.name}`,
                  query: {
                    user_id: item.user_detail.id,
                  },
                })
              }
              key={index}
              className="story story--has-story"
            >
              <div className="story__avatar">
                <div className="story__border">
                  <svg
                    width="64"
                    height="64"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="31" cy="32" cx="32" />
                  </svg>
                </div>
                <div className="story__picture">
                  <img
                    src={`${constants.port}/media/${item.user_detail.image}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </button>
          ))}
        {/* <button className="story story--has-story">
                <div className="story__avatar">
                  <div className="story__border">
                    <svg
                      width="64"
                      height="64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle r="31" cy="32" cx="32" />
                    </svg>
                  </div>
                  <div className="story__picture">
                    <img src="../images/str3.png" alt="User Picture" />
                  </div>
                </div>
            
              </button> */}
        <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str4.png" alt="User Picture" />
            </div>
          </div>
        </button>
        <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str5.png" alt="User Picture" />
            </div>
          </div>
        </button>
        <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str6.png" alt="User Picture" />
            </div>
          </div>
        </button>
        {/* <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str7.png" alt="User Picture" />
            </div>
          </div>
        </button>
        <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str9.png" alt="User Picture" />
            </div>
          </div>
        </button> */}
        {/* <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str5.png" alt="User Picture" />
            </div>
          </div>
        </button>
        <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str6.png" alt="User Picture" />
            </div>
          </div>
        </button>
        <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str7.png" alt="User Picture" />
            </div>
          </div>
        </button>
        <button className="story">
          <div className="story__avatar">
            <div className="story__border">
              <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                <circle r="31" cy="32" cx="32" />
              </svg>
            </div>
            <div className="story__picture">
              <img src="../images/str9.png" alt="User Picture" />
            </div>
          </div>
        </button> */}
      </div>
      <button className="stories__right-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#fff"
            d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default StoriesMainPage;
