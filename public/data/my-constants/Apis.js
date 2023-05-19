import constants from "./Constants";

const apis = {


    //commmon Api
    "commonList" : `${constants.port}/API/common_list_api`,


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
    'explorepage':`${constants.port}/social/Api/unfollowedaccounts`,

    //store module

    'feedback':`${constants.port}/API/feedback-api`,
    'stores':`${constants.port}/store/api/stores`,
    'storeview':`${constants.port}/store/api/store_view`,

    'storesearch':`${constants.port}/store/api/search_products`,
    'searchbyCategory':`${constants.port}/store/api/category_list`,

    'viewwishlist':`${constants.port}/store/api/view_wishlist_product`,
    'addwishlist':`${constants.port}/store/api/create_product_wishlist`,
    'removewishlist':`${constants.port}/store/api/remove_product_wishlist`,

    'addstorewishlist':`${constants.port}/store/api/add_store_wishlist`,
    'removestorewishlist':`${constants.port}/store/api/remove_store_wishlist`,
    'viewstorewishlist':`${constants.port}/store/api/view_wishlist_store`,
    
    'productDetail':`${constants.port}/store/api/product_detail_view`,
    'addtoCart':`${constants.port}/store/api/add_to_cart`,
    'viewCart':`${constants.port}/store/api/view_cart_api`,
    'addAddress':`${constants.port}/store/api/add_address`,
    'updateCart':`${constants.port}/store/api/update_cart_list`,
    'removeCart':`${constants.port}/store/api/remove_cart_api`,
    'checkout':`${constants.port}/store/api/checkout_view`,
    'orderList':`${constants.port}/store/api/order_list_view`,
    'addressView':`${constants.port}/store/api/address_list_view`,
    'defaultAddress':`${constants.port}/store/api/update_address_is_default`,

    //shop management

    'allImagesUpload':`${constants.port}/store/api/upload_image`,

    'createBrand':`${constants.port}/store/api/create_brand`,
    'brandView':`${constants.port}/store/api/list_user_brands`,
    'editBrand':`${constants.port}/store/api/edit_brand`,
    'activeBrand':`${constants.port}/store/api/brand_active`,
    'brandReport':`${constants.port}/store/api/brand_report `,

    'addCategory':`${constants.port}/store/api/add_category`,
    'editCategory':`${constants.port}/store/api/edit_category`,
    'editSubCategory':`${constants.port}/store/api/edit_subcategory`,
    'categoryList':`${constants.port}/store/api/store_category_list`,
    'categoryActive':`${constants.port}/store/api/category_active `,
    'categoryReport':`${constants.port}/store/api/category_report `,

    'productsList':`${constants.port}/store/api/list_products `,
    'addProduct':`${constants.port}/store/api/create_product `,
    'editProduct':`${constants.port}/store/api/edit_product `,
    'productReport':`${constants.port}/store/api/product_report `,
    'getByidProduct':`${constants.port}/store/api/get_product_detail `,

    'costomerReport':`${constants.port}/store/api/customer_report `,

    'addReview':`${constants.port}/store/api/add_review `,
    'viewReview':`${constants.port}/store/api/view_review `,
    'deleteReview':`${constants.port}/store/api/delete_review `,

    'ordersAdmin':`${constants.port}/store/api/order_list_api_store `,
    'changeStatus':`${constants.port}/store/api/change_status_product `,

    'salesReport':`${constants.port}/store/api/sales_report `,
    'earningReport':`${constants.port}/store/api/earnings_day_report `,
    


    //Play ground

    'homePagePlay':`${constants.port}/playground/api/games_homepage`,
    'listStadium':`${constants.port}/playground/api/list_all_stadium`,
    'listGameAmenities':`${constants.port}/playground/api/get_all_games_and_amenities `,
    'stadiumDetailView':`${constants.port}/playground/api/list_timeslots `,
    'createGame':`${constants.port}/playground/api/create_game`,
    'playCart':`${constants.port}/playground/api/play_cart`,
    'gameDetail':`${constants.port}/playground/api/games_detail`,
    'inviteUser':`${constants.port}/playground/api/invite_user`,
    'removeUser':`${constants.port}/playground/api/remove_user`,
    'addPlayground':`${constants.port}/playground/api/ad_add_playground`,

    'listAllGames':`${constants.port}/playground/api/list_games`,
    'gameHistory':`${constants.port}/playground/api/list_games_history`,











    
}

export default apis