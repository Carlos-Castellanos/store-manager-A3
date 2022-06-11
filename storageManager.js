const STORE_KEY = "LS-userlist";
const SESSION_KEY = "authorized";
const ADMON_KEY = "admin-user";

function readUsers() {
    let data = localStorage.getItem(STORE_KEY)
    console.log(data);
    if (!data) {
        let list = [];
        return list;
    }
    let list = JSON.parse(data);
    console.log(list);
    return list;
}

function insertUserList(newUser) {
    // old data;
    let userList = readUsers();
    //insert a new user in userList 
    userList.push(newUser);
    console.log(userList);
    //record array in localstorage
    localStorage.setItem(STORE_KEY, JSON.stringify(userList));

}
// find a  user login in the localstorage array
function findUser(username) {
    let userList = readUsers();
    let user;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email == username) { user = userList[i]; }
    }
console.log(user);
    return user;
}

//create administrator user

function createAdmin(username) {
    if (username == "admin") {
        //validar si ya existe
        let userList = readUsers();
        let adminU = false;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].email == "admin") { adminU = true }
        }
        if (!adminU) {
            alert("creating admin account");
            let newUser = new User("admin", "12345", "Administrator", "Lopez", "", "", "", "", "");
            console.log(newUser);
            insertUserList(newUser);  //insert a new user in userList and record in localstorage
        }
    }
}

// validates the login with the values stored in the localstorage
// create a new varibale "authorized" when the login is correct
function login() {
    // recupera los valores de los inputs usando jquery
    let userName = $("#txtUserName").val();
    let userPass = $("#txtpassword").val();
    //validatin admin user
    createAdmin(userName);
    //validating user with localStorage array using function findUser()
    let userValid = findUser(userName);
    console.log("user login is valid?" + userValid);
    if (userValid || (userName == "admin" && userPass == "12345")) {
        let userMessage;
        if (userName == "admin" && userPass == "12345") {
            userMessage = "Administrator user";
            sessionStorage.setItem(ADMON_KEY, "1");  //ADMINISTRATOR LOGGED
        }
        else {
            userMessage = " User authorized";
            sessionStorage.setItem(ADMON_KEY, "0"); //normal user LOGGED
        }
        console.log(`welcome ${userValid.fName} ${userValid.lName} ${userMessage}`);
        sessionStorage.setItem(SESSION_KEY, userName);  //is saved like a sessionStorege to destroy it when close the project
        window.location.href = "users.html";
    }
    else {
        console.log("i don't know you, please log with valid user o with (admin/12345)");
        // clear sessionStorage
        sessionStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(ADMON_KEY);
    }
    // clear inputs using jquery
    $('input').val("");
    $('#btnLogin').val("Submit");
}

// When loading users.html validates the user, verifies in the localstorage that the authorized user (SESSION_KEY)corresponds to the objet user ("user") 
function authorizedUser() {
    console.log("userHTML");
    let userActive = sessionStorage.getItem(SESSION_KEY);
    let typeUser = sessionStorage.getItem(ADMON_KEY);
    let userValid = findUser(userActive);
    $("#userPage").empty();
    $("#usersTable").hide();
    if (userActive) {
        $("#userPage").append(`<h1>Welcome ${userValid.fName} ${userValid.lName}</h1>`);
        diplayTableUser();
        $("#usersTable").show();
        switch (typeUser) {
            case '0':
                $("#userPage").append(`<h2>Type User: Normal</h2>`);
                break;
            case '1':
                $("#userPage").append(`<h2>---STORE MANAGER</h2>`);
                break;
            default:
                $("#userPage").append(`<h2>E R R O R</h2>`);
        }
    }
    else {
        $("#userPage").append(`<h1>i don't know you, <br> please login with valid user or with (admin/12345)</h1>`)
    }

}

// Erase in the localstorage the varibale "authorized"
function logout() {
    $("#userPage").empty();
    $("#usersTable").empty();
    $("#userPage").append(`<h1>Good bye!</h1>`)
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(ADMON_KEY);
    $("#usersTable").hide();

}


