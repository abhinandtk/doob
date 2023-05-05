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

    'stores':`${constants.port}/store/api/stores`,
    'storeview':`${constants.port}/store/api/store_view`,

    'storesearch':`${constants.port}/store/api/search_products`,

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

    'createBrand':`${constants.port}/store/api/create_brand`,
    'brandView':`${constants.port}/store/api/list_user_brands`,
    'editBrand':`${constants.port}/store/api/edit_brand`,

    'addCategory':`${constants.port}/store/api/add_category`,
    'editCategory':`${constants.port}/store/api/edit_category`,
    'editSubCategory':`${constants.port}/store/api/edit_subcategory`,
    'categoryList':`${constants.port}/store/api/store_category_list`,
    'categoryActive':`${constants.port}/store/api/category_active `,

    'productsList':`${constants.port}/store/api/list_products `,
    'addProduct':`${constants.port}/store/api/create_product `,
    'editProduct':`${constants.port}/store/api/edit_product `,

    'addReview':`${constants.port}/store/api/add_review `,
    'viewReview':`${constants.port}/store/api/view_review `,
    'deleteReview':`${constants.port}/store/api/delete_review `,

    //Play ground

    'listStadium':`${constants.port}/playground/api/list_all_stadium`,
    'listGameAmenities':`${constants.port}/playground/api/get_all_games_and_amenities `,









    
}

export default apis