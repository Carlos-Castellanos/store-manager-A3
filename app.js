let passCorrect = [0, 0, 0, 0, 0]; //Upper, lower, Number, Special,long
//user fucntion
function User(email, password, fName, lName, age, address, phoneNumber, payment, color) {
    this.email = email;
    this.password = password;
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.address = address;
    this.phoneNumber = phoneNumber
    this.payment = payment;
    this.color = color;
}

function isValid(user) {
    // return false when the user is invalid
    //return true when the user is vaid
    let valid = true;
    $("#errorEmail").empty();
    $("#errorFName").empty();
    $("#errorLName").empty();
    $("#errorPass").empty();
    //validate
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
        valid = true;
    }
    else {
        valid = false;
        console.log("error in email");
        $("#txtEmail").addClass("input-error");
        // $("#txtEmail").attr("placeholder", "Email error");
        $("#errorEmail").empty();
        $("#errorEmail").append("*");
    }
    if (user.email.length == 0) {
        valid = false;
        console.log("please add a email");
    }
    if (user.fName.length == 0) {
        valid = false;
        console.log("please add a correct name");
        $("#txtFirstName").addClass("input-error");
        $("#errorFName").empty();
        $("#errorFName").append("*");
    }
    if (user.lName.length == 0) {
        valid = false;
        console.log("please add a correct name");
        $("#txtLastName").addClass("input-error");
        $("#errorLName").empty();
        $("#errorLName").append("*");
    }
    if (user.password.length < 5) {
        valid = false;
        console.log("please add a correct pass, minimal length is 5");
        $("#txtPassword").addClass("input-error");
        $("#errorPass").empty();
        $("#errorPass").append("*");
    }

    // if (!valid)
    // $("input").addClasee("input-error");
    return valid;
}

// admin();

// register function
function register() {
    // recupera los valores de los inputs usando jquery
    let userName = $("#txtEmail").val();
    let userPass = $("#txtPassword").val();
    let userFirstName = $("#txtFirstName").val();
    let userLastName = $("#txtLastName").val();
    let userAge = $("#txtAge").val();
    let userAddress = $("#txtAddress").val();
    let userPhone = $("#txtPhoneNumber").val();
    let userPayment = $("#txtPayment").val();
    let userColor = $("#txtColor").val();
    // console.log(userName,userPass,userFirstName,userLastName);
    //crerating the objet
    let newUser = new User(userName, userPass, userFirstName, userLastName, userAge, userAddress, userPhone, userPayment, userColor);
    if (isValid(newUser)) {
        console.log(newUser);
        insertUserList(newUser);  //insert a new user in userList and record in localstorage
        $('input').val("");
    }
    $("#btnRegister").value="Register";
}

function validatePass(letter) {
    { //let passCorrect=[0,0,0,0,0]; //Upper, lower, Number, Special,long
        // console.log(letter + "  " + passCorrect);
        if (isNaN(letter) && letter.charAt(0) == letter.charAt(0).toUpperCase()) { passCorrect[0] = 1; }
        if (isNaN(letter) && letter.charAt(0) == letter.charAt(0).toLowerCase()) { passCorrect[1] = 1; }
        if (!isNaN(letter)) { passCorrect[2] = 1; }
        // if (/^[$@$!%*?&]$/.test(letter)){passCorrect[3]=1;}
        if (("#txtPassword").length > 4) { passCorrect[4] = 1; }
        // console.log(passCorrect);

    }
}   //validatePass()

//init function
function init() {

    $("#btnRegister").click(register);
    $("#btnLogin").click(login);
    $("#logout").click(logout);
    $("#txtPassword").keypress(function (e) {
        validatePass(e.key);
    });
    // $("#txtLastName").keypress(function (e) {
    //     if (e.key == "Enter") { register(); }
    // });
    $("#userPage").ready(function (e) {
        authorizedUser();
    });
  //  diplayTableUser();// move to user login 

}

window.onload = init;

