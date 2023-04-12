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

    
    port : "http://127.0.0.1:8000",
    // port : "https://6e19-202-164-150-83.ngrok-free.app",

    'token_id':token_id,
    'user_id':user_id,
}

export default constants