import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import Comments from "./social/Comments";
import PostActions from "./social/PostActions";
import SharedConfirmation from "./social/SharedConfirmation";
import moment from "moment";
import Link from "next/link";
import MobileFooter from "../shared/MobileFooter";
import { useSelector } from "react-redux";
import SharedPostHeaders from "./social/ModuleSharedPostHeaders";
import ModuleSharedPostImage from "./social/ModuleSharedPostImage";
import ModuleSharedPostDetails from "./social/ModuleSharedPostDetails";
import { useRouter } from "next/router";
import StoriesMainPage from "./StoriesMainPage";
import VisibilitySensor from "react-visibility-sensor";
import { Skeleton } from "antd";
import SharePostToUser from "./social/share/SharePostToUser";
import { useTranslation } from "next-i18next";

function SingleContainerHomePosts({ story }) {
  const { t } = useTranslation();

  const apiSuccess = useSelector((state) => state.api);
  const [visibleComment, setVisibleComment] = useState(false);
  const [visibleShared, setVisibleShared] = useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLike, setTotalLike] = useState();

  const [postsData, setPostsData] = useState([]);
  const [postId, setPostId] = useState(null);
  const [slug, setSlug] = useState(null);
  const [onSuccess, setOnSuccess] = useState(true);
  const router = useRouter();
  const { postSlug } = router.query;
  const { user_id } = router.query;
  console.log("sluuuuuug", user_id);
  useEffect(() => {
    const headers = {};

    if (constants.token_id) {
      headers.Authorization = `Token ${constants.token_id}`;
    }
    if (story) {
      Axios.post(
        apis.singleUserStory,
        {
          user_id: user_id,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log("we3", res, {
            slug_post: postSlug,
          });
          const updatedPosts = res.data.data.map((post) => ({
            ...post,
            liked: post.is_liked === 1 ? true : false,
            totalLike: post.like || 0,
          }));
          setPostsData(updatedPosts);
        })
        .catch((error) => {
          // localStorage.removeItem("user-login-tokens");
          console.error(error);
        });
    } else {
      Axios.post(
        apis.SinglePostView,
        {
          slug_post: postSlug,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log("we3", res, {
            slug_post: postSlug,
          });
          const updatedPosts = res.data.data.map((post) => ({
            ...post,
            liked: post.is_liked === 1 ? true : false,
            totalLike: post.like || 0,
          }));
          setPostsData(updatedPosts);
        })
        .catch((error) => {
          // localStorage.removeItem("user-login-tokens");
          console.error(error);
        });
    }
  }, [onSuccess, apiSuccess, visibleComment, postSlug, user_id]);

  console.log("weweweee", postsData);

  const likeHandler = (postId, index, isSharedPost) => {
    // e.preventDefault()
    const updatedPosts = [...postsData];
    const post = updatedPosts[index];

    if (post.liked) {
      post.liked = false;
      post.totalLike--;
    } else {
      post.liked = true;
      post.totalLike++;
    }
    setPostsData(updatedPosts);
    Axios.post(
      apis.likepost,
      {
        post_id: postId,
      },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      console.log("this is result", res);
    });
  };

  const commentClick = (post_id, slug) => {
    setVisibleComment(true);
    setPostId(post_id);
    setSlug(slug);
  };
  const sharedClick = (id) => {
    setPostId(id);
    setVisibleShared(true);
  };

  function timeSincePost(posted) {
    const timeDiff = moment.duration(moment().diff(moment(posted)));
    const timeString = timeDiff.humanize() + " ago";
    return timeString;
  }
  console.log(
    "yyyyyyyyy",
    postsData.length != 0,
    (postsData[0] && !postsData[0].is_private) ||
      (postsData[0] && postsData[0].is_private === 1)
  );
  const loginUser = constants.user_id;
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibilityChange = (isVisible, id) => {
    setIsVisible(isVisible);
    if (isVisible) {
      console.log("Element is now visible", id);
      Axios.post(
        apis.addPostActivity,
        {
          post_id: id,
        },
        {
          headers: {
            Authorization: `Token ${constants.token_id}`,
          },
        }
      ).then((res) => {
        console.log("resultadd", res);
      });
    } else {
      console.log("Element is now hidden");
      // Perform actions when the element becomes hidden
    }
  };
  return (
    <Fragment>
      {/* <div className="text_followers" >My Followers</div> */}
      {/* <div className="ms-1">
        <b>My Follow
        ers</b>
      </div> */}
      {postsData.length != 0 &&
      ((postsData[0] && !postsData[0].is_private) ||
        (postsData[0] && postsData[0].is_private === 1) ||
        (postsData[0] && postsData[0].user_detail.id === loginUser)) ? (
        postsData.map((item, index) => (
          <VisibilitySensor
            partialVisibility={true}
            key={index}
            onChange={(isVisible) =>
              handleVisibilityChange(isVisible, item.post_id)
            }
          >
            <div key={index} className="posts">
              <article className="post">
                <div className="post__header">
                  {item.owner_user_detail === null ? (
                    item.post_type === "Product" ? (
                      <SharedPostHeaders data={item} />
                    ) : item.post_type === "Store" ? (
                      <SharedPostHeaders data={item} />
                    ) : item.post_type === "Field" ? (
                      <SharedPostHeaders data={item} />
                    ) : (
                      <Link
                        href={
                          constants.user_id === item.user_detail.id
                            ? "profile"
                            : `/userprofile/${item.user_detail.id}`
                        }
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="post__profile">
                          <div className="post__avatar">
                            {item.user_detail.image ? (
                              <img
                                src={`${constants.port}/media/${item.user_detail.image}`}
                                alt="User Picture"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            ) : (
                              <img
                                src="/images/accounts/user_default.png"
                                alt="User Picture"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            )}
                          </div>

                          <div className="users">
                            <div className="post__likes">
                              <a className="post__user">
                                {item.user_detail.name}
                                {item.user_detail.account_type === "star" ? (
                                  <span>
                                    <img
                                      src="/images/Star.png"
                                      className="mx-1 mb-1"
                                    ></img>
                                  </span>
                                ) : (
                                  ""
                                )}
                              </a>
                            </div>
                            <div className="time">
                              {timeSincePost(item.posted)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  ) : (
                    <div className="post__profile">
                      <div className="post__avatar">
                        {item.owner_user_detail.user_detail.image ? (
                          <img
                            src={`${constants.port}/media/${item.owner_user_detail.user_detail.image}`}
                            alt="User Picture"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        ) : (
                          <img
                            src="/images/accounts/user_default.png"
                            alt="User Picture"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        )}
                      </div>
                      <div className="post__avatar1">
                        {item.user_detail.image ? (
                          <img
                            src={`${constants.port}/media/${item.user_detail.image}`}
                            alt="User Picture"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        ) : (
                          <img
                            src="/images/accounts/user_default.png"
                            alt="User Picture"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        )}
                      </div>

                      <div className="users">
                        <div className="post__likes">
                          <div className="post__user">
                            <Link
                              href={
                                constants.user_id === item.user_detail.id
                                  ? "/profile"
                                  : `/userprofile/${item.user_detail.id}`
                              }
                              style={{ textDecoration: "none" }}
                            >
                              {item.user_detail.name}
                              {item.user_detail.account_type === "star" ? (
                                <span>
                                  <img
                                    src="/images/Star.png"
                                    className="mx-1 mb-1"
                                  ></img>
                                </span>
                              ) : (
                                ""
                              )}
                            </Link>
                            <span className="mx-1" style={{ color: "#616661" }}>
                              Shared
                            </span>
                            <Link
                              href={
                                constants.user_id ===
                                item.owner_user_detail.user_detail.id
                                  ? "profile"
                                  : `/userprofile/${item.owner_user_detail.user_detail.id}`
                              }
                              style={{ textDecoration: "none" }}
                            >
                              {item.owner_user_detail.user_detail.name}
                              {item.owner_user_detail.user_detail
                                .account_type === "star" ? (
                                <span>
                                  <img
                                    src="/images/Star.png"
                                    className="mx-1 mb-1"
                                  ></img>
                                </span>
                              ) : (
                                ""
                              )}
                            </Link>
                            &nbsp;Post
                          </div>
                        </div>
                        <div className="time">{timeSincePost(item.posted)}</div>
                      </div>
                    </div>
                  )}

                  <button className="post__more-options">
                    <PostActions
                      data={item}
                      postId={item.post_id}
                      user={item.user_detail.id}
                      sharedClick={sharedClick}
                      setOnSuccess={setOnSuccess}
                      singlePost={true}
                    />
                  </button>
                </div>

                <div className="post__content-img">
                  {item.post_type === "Product" ? (
                    <ModuleSharedPostImage data={item} />
                  ) : item.post_type === "Store" ? (
                    <ModuleSharedPostImage data={item} />
                  ) : item.post_type === "Field" ? (
                    <ModuleSharedPostImage data={item} />
                  ) : (
                    <div className="post__medias">
                      {item.image && (
                        <img
                          className="post__media"
                          src={`${item.image}`}
                          // alt="Post Content"
                        />
                      )}
                      {/* multiple image */}
                      {/* <img
                    className="post__media"
                    src="../images/soccer-into-goal-success-concept 2.png"
                    alt="Post Content"
                  /> */}
                    </div>
                  )}
                </div>

                <div className="post__footer">
                  <div className="post__buttons">
                    {item.owner_user_detail === null ? (
                      item.post_type === "Product" ||
                      item.post_type === "Store" ||
                      item.post_type === "Field" ? (
                        ""
                      ) : (
                        <>
                          <button
                            onClick={() => likeHandler(item.post_id, index)}
                            className="post__button "
                          >
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 34 32"
                              stroke="black"
                              fill={`${item.liked ? "#17A803" : "white"}`}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.0002 26.6668C17.0002 26.6668 4.25024 19.9834 4.25024 11.9633C4.25024 3.94313 14.1669 3.27478 17.0002 9.54977C19.8336 3.27478 29.7502 3.94313 29.7502 11.9633C29.7502 19.9834 17.0002 26.6668 17.0002 26.6668Z"
                                stroke={`${item.liked ? "none" : "black"}`}
                                stroke-width="1.507"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                          {/* <button
                            onClick={() => {
                              sharedClick(item.post_id);
                            }}
                            className="post__button"
                            style={{ marginLeft: "-11px" }}
                          >
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.8848 15.9742L18.9425 10.3203"
                                stroke="black"
                                stroke-width="1.50701"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z"
                                stroke="black"
                                stroke-width="1.50701"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button> */}
                          <SharePostToUser />
                        </>
                      )
                    ) : (
                      <button
                        onClick={() =>
                          likeHandler(
                            item.owner_user_detail.orginal_post_id,
                            index,
                            true
                          )
                        }
                        className="post__button "
                      >
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 34 32"
                          stroke="black"
                          fill={`${item.liked ? "#17A803" : "white"}`}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.0002 26.6668C17.0002 26.6668 4.25024 19.9834 4.25024 11.9633C4.25024 3.94313 14.1669 3.27478 17.0002 9.54977C19.8336 3.27478 29.7502 3.94313 29.7502 11.9633C29.7502 19.9834 17.0002 26.6668 17.0002 26.6668Z"
                            stroke={`${item.liked ? "none" : "black"}`}
                            stroke-width="1.507"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    )}

                    {/* <button
                    onClick={() => {
                      sharedClick(item.post_id);
                    }}
                    className="post__button"
                    style={{ marginLeft: "-11px" }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8848 15.9742L18.9425 10.3203"
                        stroke="black"
                        stroke-width="1.50701"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.04074 11.9821C3.0321 11.5114 3.15432 10.1331 4.23215 9.82356L23.9935 4.14849C24.9526 3.87306 25.851 4.71151 25.5559 5.60667L19.4755 24.0506C19.1438 25.0566 17.667 25.1707 17.1627 24.2293L12.975 16.4123C12.8541 16.1866 12.6579 16.0035 12.416 15.8906L4.04074 11.9821Z"
                        stroke="black"
                        stroke-width="1.50701"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button> */}

                    {item.owner_user_detail === null ? (
                      item.post_type === "Product" ||
                      item.post_type === "Store" ||
                      item.post_type === "Field" ? (
                        <button className="post__button post__button--align-right">
                          <a>
                            <span
                              className="me-2"
                              style={{
                                color: "#959595",
                                fontWeight: "550",
                                fontSize: "14px",
                              }}
                            >
                              {item.post_type === "Product" && (
                                <s>{item.products.Display_Prize}&nbsp;KD</s>
                              )}
                            </span>
                            <span
                              style={{ color: "#17A803", fontWeight: "600" }}
                            >
                              {item.post_type === "Product"
                                ? `${item.products.Selling_Prize} KD`
                                : item.post_type === "Field"
                                ? `${item.stadiums.amount} KD`
                                : ""}
                            </span>
                          </a>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            commentClick(item.post_id, item.slug);
                          }}
                          className="post__button post__button--align-right"
                        >
                          {item.comment_count} {t("Comments")}
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => {
                          commentClick(
                            item.owner_user_detail.orginal_post_id,
                            item.owner_user_detail.orginal_post_slug
                          );
                        }}
                        className="post__button post__button--align-right"
                      >
                        {item.comment_count} {t("Comments")}
                      </button>
                    )}
                  </div>

                  <div className="post__infos">
                    {item.post_type === "Product" ? (
                      <ModuleSharedPostDetails data={item} />
                    ) : item.post_type === "Store" ? (
                      <ModuleSharedPostDetails data={item} />
                    ) : item.post_type === "Field" ? (
                      <ModuleSharedPostDetails data={item} />
                    ) : (
                      <>
                        <div className="post__likes">
                          <h6 className="post-names">
                            {item.totalLike} {t("Likes")}
                          </h6>
                        </div>
                        <div className="comments">{item.caption}</div>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </div>
          </VisibilitySensor>
        ))
      ) : (
        <></>

        // <Skeleton avatar active  />
      )}
      {visibleComment && (
        <Comments
          postId={postId}
          slug={slug}
          setVisibleComment={setVisibleComment}
        />
      )}
      {visibleShared && (
        <SharedConfirmation
          postId={postId}
          setVisibleShared={setVisibleShared}
          setOnSuccess={setOnSuccess}
        />
      )}

      <MobileFooter />
    </Fragment>
  );
}

export default SingleContainerHomePosts;
