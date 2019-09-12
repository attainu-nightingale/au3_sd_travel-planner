  $('.delete-btn').on('click' , function(){
    var id = $(this).attr('value');

    $.ajax({
      type : 'delete',
      url : '/listfaq/'+ id,
      data : id  ,
      datatype : 'json',
      success : function(data) {
        console.log(id);
        console.log(data);
        location.reload(true);
      }
    })
})
