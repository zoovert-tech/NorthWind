function SendAuthData() {
    // Collect data from input
    var userLogin = document.getElementById("userLoginID").value;
    var userPassword = document.getElementById("userPasswordID").value;

    // Send auth data to server
    axios.post("/index", {
        login: userLogin,
        password: userPassword
    }
    ).then((response) => {
        console.log(response.data);

        // If user is enter correct data - redirect to next page
        if (response.data == 'allow_redirect')
            window.location.href = 'usersTable';
    });
}