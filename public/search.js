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
  ]

  $('#originPlace').autocomplete({
    source: cityCodes,
    minLength: 4
  });

  $('#destinationPlace').autocomplete({
    source: cityCodes,
    minLength: 4
  });
});


$('#submitBtn').on('click', function () {
  $('#result').html('');
  var originplace = $('#originPlace').val().match(/\((.*)\)/).pop();
  // console.log(originplace);
  var destinationplace = $('#destinationPlace').val().match(/\((.*)\)/).pop();
  // console.log(destinationPlace);
  var outboundpartialdate = $('#startDate').val();
  var inboundpartialdate = $('#returnDate').val();

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/IN/INR/en-IN/" + originplace + "/" + destinationplace + "/" + outboundpartialdate + "/" + "?" + inboundpartialdate,
    "method": "GET",
    "dataType": "json",
    "headers": {
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "449a8cfbd7msh3d1dea399244b3fp1ac941jsne993d603032a"
    }
  }
  $.ajax(settings).done(function (response) {
    console.log(response);
    $.ajax({
      url: '/search',
      type: 'POST',
      contentType: "application/json",
      dataType: 'json',
      data: JSON.stringify(response),
      success: function (data) {
        console.log('success');
        console.log(JSON.stringify(data));
      }
    });
    window.location.replace('/');
  });
});
