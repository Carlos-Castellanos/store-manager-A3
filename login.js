// login-container
// txtUserName
// txtpassword
// btnLogin

function login2() {
    console
    //get the values from the form
    let inputEmail = $("#txtUserName").val();
    let inputPass = $("#txtpassword").val();
    //use a flag
    let flag = false;
    //get the user from LS
    let userList = readUsers();
    // travel the user list
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == inputEmail && userList[i].password == inputPass) {
            user = userList[i];
            flag = true;
            sessionStorage.setItem(ADMON_KEY, "1"); 
            sessionStorage.setItem(SESSION_KEY, userList[i].email);
            window.location.href = "users.html";
        }
    }
    if (!flag) {
         $("#alertLoginError").removeClass("hide");
        setTimeout(function(){ $("#alertLoginError").addClass("hide");
    },3000);
    }
}

function init() {
    $("#btnLogin").click(login2);
}

window.onload = init;