function diplayTableUser() {
    let list = readUsers();

    $("#tbody-users").empty();
    for (let i = 0; i < list.length; i++) {
        $("#tbody-users").append(`<tr>`)
        $("#tbody-users").append(`<td>${list[i].email}</tr>`);
        $("#tbody-users").append(`<td>${list[i].password}</tr>`);
        $("#tbody-users").append(`<td>${list[i].fName}</tr>`);
        $("#tbody-users").append(`<td>${list[i].lName}</tr>`);
        $("#tbody-users").append(`<td>${list[i].age}</tr>`);
        $("#tbody-users").append(`<td>${list[i].address}</tr>`);
        $("#tbody-users").append(`<td>${list[i].phoneNumber}</tr>`);
        $("#tbody-users").append(`<td>${list[i].payment}</tr>`);
        $("#tbody-users").append(`<td style="background-color: ${list[i].color};" >${list[i].color}</tr>`);
        $("#tbody-users").append(`<td><input type="radio" name="rUsers" value="${list[i].email}"></tr>`);
        $("#tbody-users").append("</tr>");
    }
}

