function cs015_getpassword(){
    const chars=
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(){}";
    let plength=10;
    let password='';
    for(let i=0;i<plength;i++){
        let randno=Math.floor(Math.random()*chars.length);
        password+=chars.substring(randno,randno+1);
        document.getElementById('cs015_password').value=password;
    }
}