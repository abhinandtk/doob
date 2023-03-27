import constants from "./Constants";

const apis = {
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
}

export default apis