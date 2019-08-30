$("#loginToYourAccount").on("click", () => {
    var loginData = {
        username: $("#loginUsername").val(),
        password: $("#loginPassword").val()
    };
    console.log(loginData);
    $.ajax({
        url: "/authentication/login",
        type: "POST",
        dataType: "json",
        data: loginData,
        success: data => {
            alert(data.success);
            window.location.href = data.redirect;
        }
    });
});

$("#signUpButton").on("click", () => {
    var signInData = {
        username: $("#signupUsername").val(),
        password: $("#signupPassword").val(),
        confirmPass: $("#passMatch").val()
    };
    console.log(signInData);
    $.ajax({
        url: "/authentication/signup",
        type: "POST",
        dataType: "json",
        data: signInData,
        success: data => {
            alert(data);
        }
    });
});