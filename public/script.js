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

var editBtnId;
$(document).on("click", ".editfaqbtn", function() {
    editBtnId = $(this).attr("value")
    console.log(editBtnId)
    $.ajax({
        url: "/editFaqByid/" + editBtnId,
        type: "GET",
        dataType: "json",
        async: false,
        success: (data) => {
            console.log(data)
            $('#faqQues').val(data.question)
            $('#answer').val(data.answer)
        }
    })
})


$('#updateFaqBtn').on('click', () => {
    var updateFaqData = {
        question: $('#faqQues').val(),
        answer: $('#answer').val()
    }
    $.ajax({
        url: "/updateFaq/" + editBtnId,
        type: "PUT",
        dataType: 'json',
        data: updateFaqData,
        success: (data) => {
            alert("Faq Updated")
        }
    })
})