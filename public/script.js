$('#loginToYourAccount').on('click', () => {
    var loginData = {
        username: $("#loginUsername").val(),
        password: $('#loginPassword').val()
    }
    console.log(loginData)
    $.ajax({
        url: "/authentication/login",
        type: "POST",
        dataType: "json",
        data: loginData,
        success: (data) => {
            alert(data.success)
            console.log("data")
            location.reload()
        }
    })
})

// $('#logOutBtn').on('click', () => {
//     $.ajax({
//         url: "/logout",
//         type: "GET",
//         dataType: 'json',
//         success: (data) => {
//             console.log("User Logged Out")
//         }
//     })

// })


$('#signUpButton').on('click', () => {
    var signInData = {
        username: $("#signupUsername").val(),
        password: $("#signupPassword").val(),
        confirmPass: $('#passMatch').val()
    }
    console.log(signInData)
    $.ajax({
        url: "/authentication/signup",
        type: "POST",
        dataType: "json",
        data: signInData,
        success: (data) => {
            alert(data)
        }
    })
})

$('#resetPassBtn').on('click', () => {
    var signInData = {
        username: $("#resetUsername").val(),
        password: $("#resetPassword").val(),
        confirmPass: $('#resetPassMatch').val()
    }
    console.log(signInData)
    $.ajax({
        url: "/authentication/resetpassword",
        type: "POST",
        dataType: "json",
        data: signInData,
        success: (data) => {
            alert(data)
        }
    })
})