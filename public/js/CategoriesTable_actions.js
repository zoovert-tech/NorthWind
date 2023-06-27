function ShowPopUpDialog(optionType) {
    var dialog = document.getElementById('modal-window-id');
    var dialogAddUser = document.getElementById('modal-window-add-record-id');
    var dialogDeleteUser = document.getElementById('modal-window-delete-record-by-id');

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
    var name = document.getElementById('user-dialog-catNameID').value;
    var desc = document.getElementById('user-dialog-catDescID').value;

    // Send
    axios.post("/CategoriesTable", {
        name: name,
        desc: desc
    }
    ).then((response) => {
        console.log(response.data);

        if (response.data == 'allowReload')
            window.location.reload();
    });
}

function DeleteRow() {
    // Collect data from inputs
    var catID = document.getElementById('user-dialog-catID').value;

    // Send
    axios.post("/CategoriesTableDelete", {
        id: catID
    }
    ).then((response) => {
        console.log(response.data);

        if (response.data == 'allowReload')
            window.location.reload();
    });
}
