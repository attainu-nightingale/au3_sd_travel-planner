var editBtnId;
$(document).on("click", ".editfaqbtnData", function() {
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


$(document).on("click", ".deleteFaq", function() {
    var deleteId = $(this).attr("value")
    console.log(deleteId)
    $.ajax({
        url: "/listfaq?" + deleteId,
        type: "DELETE",
        dataType: "json",
        success: (data) => {
            alert("Faq Deleted")
        }
    })
})