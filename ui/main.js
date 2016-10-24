 var button=document.getElementById("busnumber");
 
 
 button.onclick=function loadMap() {
			
   var mapOptions = {
               center:new google.maps.LatLng(17.609993, 83.221436), 
               zoom:12, 
               mapTypeId:google.maps.MapTypeId.ROADMAP
            };
				
            var map = new google.maps.Map(document.getElementById("map"),mapOptions);
         }
			
      
      busnumber.innerHTML=button;
   
