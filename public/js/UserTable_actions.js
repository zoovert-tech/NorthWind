function ShowPopUpDialog(optionType) {
    var dialog = document.getElementById('modal-window-id');
    var dialogAddUser = document.getElementById('modal-window-delete-add-user');
    var dialogDeleteUser = document.getElementById('modal-window-delete-user-by-id');

    if (dialog.style.display == 'flex') {
        // disable all
        dialog.style.display = 'none';
    }
    else {
        dialog.style.display = 'flex';

        if (optionType == 0) {
            dialogDeleteUser.style.display = 'flex';
            dialogAddUser.style.display = 'none';
        }
        else {
            dialogDeleteUser.style.display = 'none';
            dialogAddUser.style.display = 'flex';
        }
    }

    window.onclick = function (event) {
        if (event.target == dialog) {
            dialog.style.display = 'none';
        }
    }
}

function AddRow() {
    // Collect data from inputs
    var login = document.getElementById('user-dialog-loginID').value;
    var password = document.getElementById('user-dialog-passwordID').value;

    // Send
    axios.post("/usersTable", {
        login: login,
        password: password
    }
    ).then((response) => {
        console.log(response.data);

        if (response.data == 'allowReload')
            window.location.reload();
    });
}

function DeleteRow() {
    // Collect data from inputs
    var userID = document.getElementById('user-dialog-userID').value;

    // Send
    axios.post("/usersTableDelete", {
        id: userID
    }
    ).then((response) => {
        console.log(response.data);

        if (response.data == 'allowReload')
            window.location.reload();
    });
}
