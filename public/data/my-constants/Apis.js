import constants from "./Constants";

const apis = {

    // user module
    "country" : `${constants.port}/API/country-api`,
    "register" : `${constants.port}/API/register_api`,
    "verifyotp" : `${constants.port}/API/verify-otp`,
    "login" : `${constants.port}/API/login-api`,
    "forgetemail" : `${constants.port}/API/forgot-password-resend-otp`,
    "forgetotpverify" : `${constants.port}/API/forgot-password-verify-otp`,
    "passwordchange" : `${constants.port}/API/confirm-forgot-password`,
    "resendotp" : `${constants.port}/API/resend_otp`,
    "ssoregister" : `${constants.port}/API/sso-register-api`,
    "ssologin" : `${constants.port}/API/sso-login-api`,
    "logout" : `${constants.port}/API/logout_api`,

    // social module

    'homepageapi':`${constants.port}/social/Api/home_page_api/`,
    'likepost':`${constants.port}/social/Api/post_like`,
    'postcomment':`${constants.port}/social/Api/comment_api`,
    'commentlist':`${constants.port}/social/Api/comment_list`,
    'sharedpost':`${constants.port}/social/Api/shared/`,
    'reportpost':`${constants.port}/social/Api/report_posts`,
    'deletepost':`${constants.port}/social/Api/delete_post`,
    'reportcomment':`${constants.port}/social/Api/report_comments`,
    'deletecomment':`${constants.port}/social/Api/delete_comment`,
    'profilepage':`${constants.port}/social/Api/upload_profile_image`,
    'usersearch':`${constants.port}/social/Api/users_search`,
    'postsearch':`${constants.port}/social/Api/post_search`,
    'otheruser':`${constants.port}/social/Api/other_user`,
    'follow':`${constants.port}/social/Api/follow_unfollow`,
    'followerslist':`${constants.port}/social/Api/follower_list`,
    'followinglist':`${constants.port}/social/Api/following_list`,
    'removefollower':`${constants.port}/social/Api/remove_follower`,
    'notification':`${constants.port}/social/Api/notification`,
    'activity':`${constants.port}/social/Api/activity`,

    
}

export default apis