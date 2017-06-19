//digunakan pada halaman index.html
			/* untuk menambah list secara manual dari editText */
            function tambahlist(){
                var dataInput = document.getElementById("nkota").value;
                $.post("http://127.0.0.1/infocuaca/tambah.php?nkota=" + dataInput, function(data){
                
                    if(data.status == "sukses"){
                        alert('Input Berhasil');
                        window.location='index.html';
  			        }
  			        else if(data.status == 'gagal'){
                        alert("Error on query!");
                    }                     
             });
            }
            
            /* untuk menambah list dari posisi gps */
            function posisiGPS(){
                document.addEventListener("deviceready", function(){
                    navigator.geolocation.getCurrentPosition(function(position){
                        var lat  = position.coords.latitude;
                        var long = position.coords.longitude;
                        
                        window.location='cuaca.html?lat='+lat+'&long='+long+'';
                    }, function(error){
                        if(error.code == PositionError.PERMISSION_DENIED){
                            alert("App doesn't have permission to use GPS");
                        }
                        else if(error.code == PositionError.POSITION_UNAVAILABLE){
                            alert("No GPS device found");
                        }
                        else if(error.code == PositionError.TIMEOUT){
                            alert("Its taking too long find user location");
                        }
                        else{
                            alert("An unknown error occured");
                        }
                    }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
                }, false);
            }
            
            /* untuk menghapus list yang akan menuju halaman hapuslist */
            function hapuslist(){
                window.location="hapuslist.html";
            }

/*--------------------------------------------------------------------------------------------------------------------*/

//digunakan pada halaman hapuslist.html , cuaca.html dan cuacaforecast.html
			/* untuk kembali ke halaman sebelumnya */
            function kembali(){
                window.location="index.html";
            }

/*--------------------------------------------------------------------------------------------------------------------*/

//digunakan pada halaman hapuskonfirm.html
			/* untuk menghapus list yang diklik */
            function proseshapus(){
                var ID = parse("ID");
                $.post("http://127.0.0.1/infocuaca/hapus.php?ID="+ID, function(data){
                         
 		             if(data.status == "sukses"){
  				         alert('Delete Berhasil');
  				         window.location='hapuslist.html';
  			         }
  			         else if(data.status == 'gagal'){
                         alert("Error on query!");
                     }
                });
            }
            
            /* untuk membatalkan menghapus list yang diklik */
            function batal(){
                window.location="hapuslist.html";
            }
            
/*--------------------------------------------------------------------------------------------------------------------*/

//digunakan pada halaman hapuskonfirm.html , cuaca.html dan cuacaforecast.html
            /*fungsi untuk mengambil parameter dari link*/    
            function parse(val) {
                var result = "Not found",
                tmp = [];
                location.search
                .substr(1)
                .split("&")
                .forEach(function (item) {
                    tmp = item.split("=");
                    if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
                });
                return result;
            }

/*--------------------------------------------------------------------------------------------------------------------*/

//digunakan pada halaman cuaca.html
			/* untuk menuju ke halaman cuacaforecast */
			function forecast(){
                window.location='cuacaforecast.html?kota='+kota;
            }        

/*--------------------------------------------------------------------------------------------------------------------*/

//digunakan pada halaman cuaca.html dan cuacaforecast.html
            /* untuk refresh halaman */
            function refresh(){
                document.getElementById("loader").style.display = "block";
                document.getElementById("konten").style.display = "none";
                showLoader();
                loadWeather(kota);
            }
            
            /* untuk menampilkan loader halaman */
            function showLoader() {
                setTimeout(showPage, 5000);
            }

            /* untuk menampilkan konten setelah loader selesai */
            function showPage() {
            	document.getElementById("loader").style.display = "none";
            	document.getElementById("konten").style.display = "block";
            }

/*--------------------------------------------------------------------------------------------------------------------*/