let token_id;
if (typeof window !== 'undefined') {

    token_id = localStorage.getItem('user-login-token')
}else{
    token_id=null
}



const constants ={

    
    port : "https://5f89-202-164-150-83.in.ngrok.io",
    // port : "https://1385-202-164-150-83.in.ngrok.io",

    'token_id':token_id,
}

export default constants