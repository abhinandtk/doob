import constants from "./Constants";

const apis = {


    //commmon Api
    "commonList": `${constants.port}/API/common_list_api`,
    "countDisplay": `${constants.port}/API/count_display_api`,
    "sponsers": `${constants.port}/API/sponsor_page`,

    //support
    "supportView": `${constants.port}/API/support_list_api`,
    "supportDetail": `${constants.port}/API/ticket_details`,
    "userSupportMsg": `${constants.port}/API/add_ticket_message`,
    "createSupport": `${constants.port}/API/create_support`,

    // user module
    "country": `${constants.port}/API/country-api`,
    "register": `${constants.port}/API/register_api`,
    "verifyotp": `${constants.port}/API/verify-otp`,
    "login": `${constants.port}/API/login-api`,
    "forgetemail": `${constants.port}/API/forgot-password-resend-otp`,
    "forgetotpverify": `${constants.port}/API/forgot-password-verify-otp`,
    "passwordchange": `${constants.port}/API/confirm-forgot-password`,
    "resendotp": `${constants.port}/API/resend_otp`,
    "ssoregister": `${constants.port}/API/sso-register-api`,
    "ssologin": `${constants.port}/API/sso-login-api`,
    "logout": `${constants.port}/API/logout_api`,
    "settings": `${constants.port}/API/list_user_status`,
    "update_delete_account": `${constants.port}/API/update_user_status`,
    "changePasswordSettings": `${constants.port}/API/change_password`,
    "privacy_age_followers": `${constants.port}/API/toggle_age_followers`,

    //chat module
    'inboxUser': `${constants.port}/social/Api/inbox`,
    'chatView': `${constants.port}/social/Api/get_full_chat`,
    'sendMessage': `${constants.port}/social/Api/send_message`,
    'clearChat': `${constants.port}/social/Api/clear_chat`,
    'createChat': `${constants.port}/social/Api/create_chat`,
    'exitGroup': `${constants.port}/social/Api/leave_group`,
    'addMemberGroup': `${constants.port}/social/Api/add_member_group`,
    'groupInfo': `${constants.port}/social/Api/group_members`,
    'editGroup': `${constants.port}/social/Api/edit_group`,
    'removeMemberGroup': `${constants.port}/social/Api/remove_member_group`,
    'chatInboxSearch': `${constants.port}/social/Api/chat_inbox_serach`,


    // social module

    'homepageapi': `${constants.port}/social/Api/home_page_api/`,
    'SinglePostView': `${constants.port}/social/Api/post_detail_view`,
    'likepost': `${constants.port}/social/Api/post_like`,
    'postcomment': `${constants.port}/social/Api/comment_api`,
    'commentlist': `${constants.port}/social/Api/comment_list`,
    'sharedpost': `${constants.port}/social/Api/shared/`,
    'reportpost': `${constants.port}/social/Api/report_posts`,
    'deletepost': `${constants.port}/social/Api/delete_post`,
    'reportcomment': `${constants.port}/social/Api/report_comments`,
    'deletecomment': `${constants.port}/social/Api/delete_comment`,
    'profilepage': `${constants.port}/social/Api/upload_profile_image`,
    'userActivity': `${constants.port}/social/Api/request_user_activity`,
    'otherUserActivity': `${constants.port}/social/Api/other_user_activity_view`,
    'usersearch': `${constants.port}/social/Api/users_search`,
    'postsearch': `${constants.port}/social/Api/post_search`,
    'otheruser': `${constants.port}/social/Api/other_user`,
    'follow': `${constants.port}/social/Api/follow_unfollow`,
    'followerslist': `${constants.port}/social/Api/follower_list`,
    'followinglist': `${constants.port}/social/Api/following_list`,
    'removefollower': `${constants.port}/social/Api/remove_follower`,
    'notification': `${constants.port}/social/Api/notification`,
    'activity': `${constants.port}/social/Api/activity`,
    'explorepage': `${constants.port}/social/Api/unfollowedaccounts`,
    'shareProductToPost': `${constants.port}/social/Api/share_product`,
    'shareStoreToPost': `${constants.port}/social/Api/share_store`,
    'shareFieldToPost': `${constants.port}/social/Api/share_field`,
    'acceptRequest': `${constants.port}/social/Api/follow_request_accept`,
    'rejectRequest': `${constants.port}/social/Api/follow_request_reject`,
    'likedUsers': `${constants.port}/social/Api/liked_users`,
    'userPostList': `${constants.port}/social/Api/user_post_list`,

    'blockUser': `${constants.port}/social/Api/user_block_api`,
    'unblockUser': `${constants.port}/social/Api/user_unblock_api`,
    'listUserBlock': `${constants.port}/social/Api/list_user_block_api`,
    'userStoryList': `${constants.port}/social/Api/user_post_story`,
    'singleUserStory': `${constants.port}/social/Api/single_user_story_list`,
    'addPostActivity': `${constants.port}/social/Api/add_post_activity`,
    'editProfile': `${constants.port}/social/Api/edit_profile_api`,

    'addStory': `${constants.port}/social/Api/add_story`,
    'deleteStory': `${constants.port}/social/Api/delete_story`,
    'restriction': `${constants.port}/social/Api/add_restriction`,
    'restrictedUsers': `${constants.port}/social/Api/view_user_restriction`,


    //store module

    'feedback': `${constants.port}/API/feedback-api`,
    'stores': `${constants.port}/store/api/stores`,
    'storeview': `${constants.port}/store/api/store_view`,
    'reportStore': `${constants.port}/store/api/report_store`,

    'storesearch': `${constants.port}/store/api/search_products`,
    'storeFiltersearch': `${constants.port}/store/api/product_filter`,
    'brandCategoryList': `${constants.port}/store/api/store_brand_category_list`,
    'searchbyCategory': `${constants.port}/store/api/category_list`,

    'viewwishlist': `${constants.port}/store/api/view_wishlist_product`,
    'addwishlist': `${constants.port}/store/api/create_product_wishlist`,
    'removewishlist': `${constants.port}/store/api/remove_product_wishlist`,

    'addstorewishlist': `${constants.port}/store/api/add_store_wishlist`,
    'removestorewishlist': `${constants.port}/store/api/remove_store_wishlist`,
    'viewstorewishlist': `${constants.port}/store/api/view_wishlist_store`,

    'productDetail': `${constants.port}/store/api/product_detail_view`,
    'addtoCart': `${constants.port}/store/api/add_to_cart`,
    'viewCart': `${constants.port}/store/api/view_cart_api`,
    'addAddress': `${constants.port}/store/api/add_address`,
    'updateCart': `${constants.port}/store/api/update_cart_list`,
    'removeCart': `${constants.port}/store/api/remove_cart_api`,
    'checkout': `${constants.port}/store/api/checkout_view`,
    'orderList': `${constants.port}/store/api/order_list_view`,
    'addressView': `${constants.port}/store/api/address_list_view`,
    'singleAddressView': `${constants.port}/store/api/detail_view_address`,
    'editAddress': `${constants.port}/store/api/edit_address`,
    'deleteAddress': `${constants.port}/store/api/delete_address`,
    'defaultAddress': `${constants.port}/store/api/update_address_is_default`,

    'updateStoreStatus': `${constants.port}/store/api/update_store_status`,
    'storeSettings': `${constants.port}/store/api/store_api_list`,
    'storeReviewView': `${constants.port}/store/api/view_review_store`,
    'addStoreReview': `${constants.port}/store/api/add_store_review`,
    'removeStoreReview': `${constants.port}/store/api/remove_review_store`,

    'requestStore': `${constants.port}/store/api/request_store_api`,
    'editStore': `${constants.port}/store/api/edit_store_api`,

    //shop management

    'allImagesUpload': `${constants.port}/store/api/upload_image`,

    'createBrand': `${constants.port}/store/api/create_brand`,
    'brandView': `${constants.port}/store/api/list_user_brands`,
    'editBrand': `${constants.port}/store/api/edit_brand`,
    'activeBrand': `${constants.port}/store/api/brand_active`,
    'brandReport': `${constants.port}/store/api/brand_report `,

    'addCategory': `${constants.port}/store/api/add_category`,
    'editCategory': `${constants.port}/store/api/edit_category`,
    'editSubCategory': `${constants.port}/store/api/edit_subcategory`,
    'categoryList': `${constants.port}/store/api/store_category_list`,
    'categoryActive': `${constants.port}/store/api/category_active `,
    'subCategoryActive': `${constants.port}/store/api/subcategory_active `,
    'categoryReport': `${constants.port}/store/api/category_report `,

    'productsList': `${constants.port}/store/api/list_products`,
    'addProduct': `${constants.port}/store/api/create_product`,
    'editProduct': `${constants.port}/store/api/edit_product`,
    'productReport': `${constants.port}/store/api/product_report`,
    'getByidProduct': `${constants.port}/store/api/get_product_detail`,

    'stockApi': `${constants.port}/store/api/list_product_variants_stock`,

    'customerReport': `${constants.port}/store/api/customer_report`,

    'shopSummary': `${constants.port}/store/api/new_order`,

    'addReview': `${constants.port}/store/api/add_review`,
    'viewReview': `${constants.port}/store/api/view_review`,
    'deleteReview': `${constants.port}/store/api/delete_review`,

    'ordersAdmin': `${constants.port}/store/api/order_list_api_store`,
    'changeStatus': `${constants.port}/store/api/change_status_product`,

    'salesReport': `${constants.port}/store/api/sales_report`,
    'earningReport': `${constants.port}/store/api/earnings_day_report`,
    'earningReportExport': `${constants.port}/store/api/sales_report_pdf`,
    // 'earningReportExport': `${constants.port}/store/api/earnings_day_report_csv `,

    'listingVarients': `${constants.port}/store/api/listing_varients `,
    'addOffers': `${constants.port}/store/api/create_offer `,
    'listOffers_ad': `${constants.port}/store/api/list_offers `,
    'deleteOffer': `${constants.port}/store/api/delete_offer `,
    'updateOffer': `${constants.port}/store/api/update_offer `,
    'offers_view_get': `${constants.port}/store/api/list_offers_view `,

    'bannerView': `${constants.port}/store/api/list_user_banner `,
    'addBanner': `${constants.port}/store/api/add_banner_table `,
    'editBanner': `${constants.port}/store/api/update_banner`,
    'deleteBanner': `${constants.port}/store/api/banner_delete`,
    'getbyIdBanner': `${constants.port}/store/api/single_banner_list`,

    //Play ground

    'homePagePlay': `${constants.port}/playground/api/games_homepage`,
    'listStadium': `${constants.port}/playground/api/list_all_stadium`,
    'listGameAmenities': `${constants.port}/playground/api/get_all_games_and_amenities `,
    'stadiumDetailView': `${constants.port}/playground/api/list_timeslots `,
    'createGame': `${constants.port}/playground/api/create_game`,
    'playCart': `${constants.port}/playground/api/play_cart`,
    'gameDetail': `${constants.port}/playground/api/games_detail`,
    'inviteUser': `${constants.port}/playground/api/invite_user`,
    'removeUser': `${constants.port}/playground/api/remove_user`,
    'addPlayground': `${constants.port}/playground/api/ad_add_playground`,
    'requestPlayground': `${constants.port}/playground/api/request_stadium_api`,
    'playgroundCheckout': `${constants.port}/playground/api/checkout`,

    'listAllGames': `${constants.port}/playground/api/list_games`,
    'gameHistory': `${constants.port}/playground/api/list_games_history`,
    'listAllBooking': `${constants.port}/playground/api/list_all_booking`,
    'cancelBooking': `${constants.port}/playground/api/cancel_booking`,
    'walletView': `${constants.port}/playground/api/wallet_details`,
    'ground_admin_view_get_put': `${constants.port}/playground/api/list_or_update`,
    'groundRemoveCartItems': `${constants.port}/playground/api/remove_cart_items`,

    'bookingReport': `${constants.port}/playground/api/ad_report`,
    'playgroundReport': `${constants.port}/playground/api/ad_playground_report`,
    'gameReport': `${constants.port}/playground/api/ad_game_report`,
    'groundEarning': `${constants.port}/playground/api/ad_earning_report`,
    'customerReportPlay': `${constants.port}/playground/api/ad_customer_report`,
    'adminAllBookings': `${constants.port}/playground/api/ad_list_all_booking`,
    'adminBookingStatusChange': `${constants.port}/playground/api/booking_status_change`,
    'groundmanageSummary': `${constants.port}/playground/api/ad_playground_management`,
    'stadiumReviewView': `${constants.port}/playground/api/show_stadium_review`,
    'stadiumReviewAdd': `${constants.port}/playground/api/create_stadium_review`,
    'stadiumReviewRemove': `${constants.port}/playground/api/remove_stadium_review`,

    'playgroundSearchFilter': `${constants.port}/playground/api/playground_search`,
    'reportField': `${constants.port}/playground/api/add_report_stadium`,

    //Tournament

    'tournamentHome': `${constants.port}/tournament/api/tournament_home`,
    'allTournament': `${constants.port}/tournament/api/all_tournament`,
    'tournamentDetails': `${constants.port}/tournament/api/tournament_details`,
    'createTeam': `${constants.port}/tournament/api/create_team`,
    'createTeamTemp': `${constants.port}/tournament/api/create_team_temporary`,
    'deleteTeam': `${constants.port}/tournament/api/delete_team`,
    'deleteTeamTemp': `${constants.port}/tournament/api/delete_team_temporary`,
    'playerDetails': `${constants.port}/tournament/api/player_details_api`,
    'updateMatchResult': `${constants.port}/tournament/api/update_match_result`,
    'tourStadiumSearch': `${constants.port}/tournament/api/stadium_serach_view`,
    'generateMatch': `${constants.port}/tournament/api/generate_matches`,
    'matchDetail': `${constants.port}/tournament/api/match_detail`,
    'createTimeline': `${constants.port}/tournament/api/create_match_point`,
    'leagueTable': `${constants.port}/tournament/api/league_table`,
    'doubleEliminationMatchUpdate': `${constants.port}/tournament/api/double_elimination_match_status`,
    'drawPartner': `${constants.port}/tournament/api/draw_your_partner`,














}

export default apis