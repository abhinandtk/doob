
let token_id;
let user_id;
let domain;
let currentLang;
let country;
if (typeof window !== 'undefined') {

    token_id = localStorage.getItem('user-login-tokens')
    user_id = localStorage.getItem('login-userId')
    country = localStorage.getItem('country-select')
    domain = window.location.hostname
    currentLang = document.documentElement.lang || 'en'
} else {
    country = null
    token_id = null
    user_id = null
}

// let domain_site = typeof window.location.hostname;


const isLocalhost = domain === 'localhost';
const isVercel = process.env.VERCEL === '1';
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
    'country': country,
    'domain': isLocalhost ? 'http://localhost:3000' : `https://${domain}`,
    'Error': currentLang === 'en' ? 'Error' : "خطأ",
    'Success': currentLang === 'en' ? 'Success' : "نجاح",
    'Warning': currentLang === 'en' ? 'Warning' : "تحذير",
    'Info': currentLang === 'en' ? 'Info' : "معلومات",
}

export default constants