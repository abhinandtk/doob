let token_id;
let user_id;
if (typeof window !== 'undefined') {

    token_id = localStorage.getItem('user-login-token')
    user_id = localStorage.getItem('login-userId')
}else{
    token_id=null
    user_id=null
}



const constants ={

    
    // port : "https://doobapi.9pc.in",
    // port : "http://64.227.146.95",
    port : "http://165.22.213.124",

    'token_id':token_id,
    'user_id':user_id,
}

export default constants