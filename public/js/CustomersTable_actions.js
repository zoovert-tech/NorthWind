function ShowPopUpDialog(optionType) {
    var dialog = document.getElementById('modal-window-id');
    var dialogAddUser = document.getElementById('modal-window-add-record-id');

    if (dialog.style.display == 'flex') {
        // disable all
        dialog.style.display = 'none';
    }
    else {
        dialog.style.display = 'flex';

        if (optionType == 0) {
            dialogAddUser.style.display = 'none';
        }
        else {
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
    var companyName = document.getElementById('user-dialog-comNameID').value;
    var contantName = document.getElementById('user-dialog-contNameID').value;
    var contactTitle = document.getElementById('user-dialog-contTitleID').value;
    var address = document.getElementById('user-dialog-AddressID').value;
    var city = document.getElementById('user-dialog-CityID').value;
    var region = document.getElementById('user-dialog-RegionID').value;
    var countryCode = document.getElementById('user-dialog-CountryID').value;
    var phoneNumber = document.getElementById('user-dialog-PhoneID').value;
    var postalCode = document.getElementById('user-dialog-PostalCodeID').value;
    var faxNumber = document.getElementById('user-dialog-FaxID').value;

    // Send
    axios.post("/CustomersTable", {
        companyName: companyName,
        contantName: contantName,
        contactTitle: contactTitle,
        address: address,
        city: city,
        region: region,
        postalCode: postalCode,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        faxNumber: faxNumber
    }
    ).then((response) => {
        console.log(response.data);

        if (response.data == 'allowReload')
            window.location.reload();
    });
}
