
let token_id;
let user_id;
if (typeof window !== 'undefined') {

    token_id = localStorage.getItem('user-login-tokens')
    user_id = localStorage.getItem('login-userId')
} else {
    token_id = null
    user_id = null
}



// export function getLocale() {
//     const router = useRouter();
//     return router.locale
// }
// const locale = getLocale();
// console.log("8888888888888888888878778", locale)
const constants = {


    port: "https://doob.9pc.in",
    // port: "https://doobapi.9pc.in",
    // port : "http://64.227.146.95",
    // port : "http://165.22.213.124",

    'token_id': token_id,
    'user_id': user_id,

    'Error': 'Erorr',
    'Success': 'Success',
    'Warning': 'Warning',
    'Info': 'Info',
}

export default constants