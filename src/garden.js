 
function paintGarden(game) {
			var ctx = document.getElementById("garden").getContext("2d");
			//garden.width = gardenWidth*32;
			//garden.height = gardenHeight*32;
			for(var y=0; y<gardenHeight; y++) {
				for(var x=0; x<gardenWidth; x++) {
					ctx.drawImage(dirt, x*32, y*32);
				}
			}
		}
