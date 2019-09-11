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
      console.log("data");
      window.location.href = '/profile'
    }
  });
});

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

$("#resetPassBtn").on("click", () => {
  var signInData = {
    username: $("#resetUsername").val(),
    password: $("#resetPassword").val(),
    confirmPass: $("#resetPassMatch").val()
  };
  console.log(signInData);
  $.ajax({
    url: "/authentication/resetpassword",
    type: "POST",
    dataType: "json",
    data: signInData,
    success: data => {
      alert(data);
    }
  });
});

$("#btnsubmit1").on("click", function () {
  var data = {
    fname: $("#firstname").val(),
    lname: $("#lastname").val(),
    gender: $("input[name=gender]:checked", "#myForm").val(),
    age: $("#age").val(),
    email: $("#email").val(),
    phone: $("#phone").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    address: $("#address").val()
  };

  $.ajax({
    url: "/myaccount/acc",
    type: "PUT",
    datatype: "JSON",
    data: data,
    success: function (data) {
      console.log(data);
    }
  });
});

// city filter buttons
// $('#delhBtn').on("click",function(){
//     var data=$('#delhBtn').val();
//     console.log("value of city "+data);
//     $.ajax({
//         url:'/hotels/sm',
//         type:'GET',
//         Datatype:'JSON',
//         data:data,
//         success:function(data){
//             console.log(data)
//         }
//     })
// })

// $('#delhBtn').off().on('click',function(){
//filter each city hotels
$("#Btn001").on("click", function () {
  var data = $("button[name=nBtn001]").val();
  console.log("the city value is :" + data);
  $.ajax({
    url: "/hotels/cityF/" + data,
    type: "GET",
    // dataType:'json',
    data: data,
    success: function (data) {
      console.log(data);
    }
  });
  window.location.href = "http://localhost:3000/hotels/cityF/" + data;
});

$("#Btn002").on("click", function () {
  var data = $("button[name=nBtn002]").val();
  console.log("the city value is :" + data);
  $.ajax({
    url: "/hotels/cityF/" + data,
    type: "GET",
    // dataType:'json',
    data: data,
    success: function (data) {
      console.log(data);
    }
  });
  window.location.href = "http://localhost:3000/hotels/cityF/" + data;
});

$("#Btn003").on("click", function () {
  var data = $("button[name=nBtn003]").val();
  console.log("the city value is :" + data);
  $.ajax({
    url: "/hotels/cityF/" + data,
    type: "GET",
    // dataType:'json',
    data: data,
    success: function (data) {
      console.log(data);
    }
  });
  window.location.href = "http://localhost:3000/hotels/cityF/" + data;
});

//fetch hotel values for booking
$(".button-nav1").on("click", "button", function () {
  var data = {
    hotelName: $(this).attr("value"),
    startDate: $("#fromDate").val(),
    endDate: $("#toDate").val()
  };
  //     hotelName:$('.card-title1').html()
  var data1 = $(this).attr("value");
  $.ajax({
    url: "hotels/book/",
    type: "PUT",
    data: data,
    success: function (data) {
      console.log(data);
    }
  });
  alert(
    "your stay at " +
    $(this).attr("value") +
    " is confirmed from " +
    $("#fromDate").val() +
    " to " +
    $("#toDate").val()
  );
  // window.location.href="http://localhost:3000/hotels/bookings/"+data1;
});

//flight search script
$(function () {
  var cityCodes = [
    "Agartala(IXA)",
    "Agatti Island(AGX)",
    "Agra(AGR)",
    "Ahmedabad(AMD)",
    "Aizawl(AJL)",
    "Akola(AKD)",
    "Allahabad(IXD)",
    "Along(IXV)",
    "Amritsar(ATQ)",
    "Aurangabad(IXU)",
    "Bagdogra(IXB)",
    "Balurghat(RGH)",
    "Bangalore(BLR)",
    "Bareli(BEK)",
    "Belgaum(IXG)",
    "Bellary(BEP)",
    "Bhatinda(BUP)",
    "Bhavnagar(BHU)",
    "Bhopal(BHO)",
    "Bhubaneswar(BBI)",
    "Bhuj(BHJ)",
    "Bikaner(BKB)",
    "Bilaspur(PAB)",
    "Car Nicobar(CBD)",
    "Chandigarh(IXC)",
    "Chennai/Madras(MAA)",
    "Coimbatore(CJB)",
    "Cooch Behar(COH)",
    "Cuddapah(CDP)",
    "Daman(NMB)",
    "Daparizo(DAE)",
    "Darjeeling(DAI)",
    "Dehra Dun(DED)",
    "Delhi(DEL)",
    "Deparizo(DEP)",
    "Dhanbad(DBD)",
    "Dharamsala(DHM)",
    "Dibrugarh(DIB)",
    "Dimapur(DMU)",
    "Diu(DIU)",
    "Gawahati(GAU)",
    "Gaya(GAY)",
    "Goa(GOI)",
    "Gorakhpur(GOP)",
    "Guna(GUX)",
    "Gwalior(GWL)",
    "Hissar(HSS)",
    "Hubli(HBX)",
    "Hyderabad(HYD)",
    "Imphal(IMF)",
    "Indore(IDR)",
    "Jabalpur(JLR)",
    "Jagdalpur(JGB)",
    "Jaipur(JAI)",
    "Jaisalmer(JSA)",
    "Jammu(IXJ)",
    "Jamnagar(JGA)",
    "Jamshedpur(IXW)",
    "Jeypore(PYB)",
    "Jodhpur(JDH)",
    "Jorhat(JRH)",
    "Kailashahar(IXH)",
    "Kamalpur(IXQ)",
    "Kandla(IXY)",
    "Kanpur(KNU)",
    "Keshod(IXK)",
    "Khajuraho(HJR)",
    "Khowai(IXN)",
    "Kochi(COK)",
    "Kolhapur(KLH)",
    "Kolkata(CCU)",
    "Kota(KTU)",
    "Kozhikode(CCJ)",
    "Bhuntar(KUU)",
    "Leh(IXL)",
    "Lilabari(IXI)",
    "Lucknow(LKO)",
    "Ludhiana(LUH)",
    "Madurai(IXM)",
    "Malda(LDA)",
    "Mangalore(IXE)",
    "Mohanbari(MOH)",
    "Mumbai(BOM)",
    "Muzaffarnagar(MZA)",
    "Muzaffarpur(MZU)",
    "Mysore(MYQ)",
    "Nagpur(NAG)",
    "Nanded(NDC)",
    "Nasik(ISK)",
    "Neyveli(NVY)",
    "Osmanabad(OMN)",
    "Pantnagar(PGH)",
    "Pasighat(IXT)",
    "Pathankot(IXP)",
    "Patna(PAT)",
    "Pondicherry(PNY)",
    "Porbandar(PBD)",
    "Port Blair(IXZ)",
    "Pune(PNQ)",
    "Puttaparthi(PUT)",
    "Raipur(RPR)",
    "Rajahmundry(RJA)",
    "Rajkot(RAJ)",
    "Rajouri(RJI)",
    "Ramagundam(RMD)",
    "Ranchi(IXR)",
    "Ratnagiri(RTC)",
    "Rewa(REW)",
    "Rourkela(RRK)",
    "Rupsi(RUP)",
    "Salem(SXV)",
    "Satna(TNI)",
    "Shillong(SHL)",
    "Sholapur(SSE)",
    "Silchar(IXS)",
    "Simla(SLV)",
    "Srinagar(SXR)",
    "Surat(STV)",
    "Tezpur(TEZ)",
    "Tezu(TEI)",
    "Thanjavur(TJV)",
    "Thiruvananthapuram(TRV)",
    "Tiruchirapally(TRZ)",
    "Tirupati(TIR)",
    "Tuticorin(TCR)",
    "Udaipur(UDR)",
    "Vadodara(BDQ)",
    "Varanasi(VNS)",
    "Vijayawada(VGA)",
    "Vishakhapatnam(VTZ)",
    "Warangal(WGC)",
    "Zero(ZER)"
  ];

  $("#originPlace").autocomplete({
    source: cityCodes,
    minLength: 3
  });

  $("#destinationPlace").autocomplete({
    source: cityCodes,
    minLength: 3
  });
});

$("#submitBtn").on("click", function () {
  //$("#result").html("");
  var originInput = $("#originPlace").val();
  var originplace = originInput.match(/\((.*)\)/).pop();
  // console.log(originplace);
  var destinationInput = $("#destinationPlace").val()
  var destinationplace = destinationInput.match(/\((.*)\)/).pop();
  // console.log(destinationPlace);
  var outboundpartialdate = $("#startDate").val();
  var inboundpartialdate = $("#returnDate").val();
  //console.log(originInput, destinationInput)
  $.ajax({
    async: true,
    // "crossDomain": true,
    url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/IN/INR/en-IN/" +
      originplace +
      "/" +
      destinationplace +
      "/" +
      outboundpartialdate +
      "/" +
      "?" +
      inboundpartialdate,
    method: "GET",
    dataType: "json",
    headers: {
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "449a8cfbd7msh3d1dea399244b3fp1ac941jsne993d603032a"
    },
    success: data => {
      $('#FlightResult').empty();
      console.log(data)

      function flightpriceFunc() {
        return Math.floor(Math.random() * 1000 + 2000);
      }
      console.log(data.Carriers.length);
      var flightSearchResult = "";
      if (data.Carriers) {
        for (let i = 0; i < data.Carriers.length; i++) {
          flightSearchResult += `
                    <div class="card pb-5">
                    <div class="card-header">
                    Name : ${data.Carriers[i].Name}
                    </div>
                    <div class="card-body">
                      <span class="card-title">Price : ${flightpriceFunc()} </span>
                      <span class="card-title">Origin City : ${originInput} </span>
                      <span class="card-title">Destination City : ${destinationInput} </span> 
                      <span class="card-title"> Journey Date : ${outboundpartialdate} </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" class="btn btn-primary">Book Now</a>
                    </div>
                  </div>
                    `;
        }
        $("#FlightResult").append(flightSearchResult)
      }
    }
  });
})