let token_id;
if (typeof window !== 'undefined') {

    token_id = localStorage.getItem('user-login-token')
}else{
    token_id=null
}



const constants ={

    
    // port : "http://127.0.0.1:8000",
    port : "https://1385-202-164-150-83.in.ngrok.io",

    'token_id':token_id,
}

export default constants