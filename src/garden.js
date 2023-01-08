var sill_image = new Image();
sill_image.src = "data/sill.png";

var planter_image = new Image();
planter_image.src = "data/planter.png";

var arrow_image = new Image();
arrow_image.src = "data/down_arrow.png";

var seed_info = {
	"seed_dionaea": "This variety of Dionaea is still monstrous. It will bite adjacent plants, but will leave fungus alone.",
	"seed_aconitum": "Aconitum is an extremely poisonous plant which grows in mountainous regions, but keeps to itself. Also known as Wolfsbane.",
	"seed_porcelain": "Porcelain is an autumn mushroom with distinctive gills that produces lots of mucous.",
	"seed_devilstooth": "Devil's Tooth is a distinctive mushrom which appears to 'bleed' red sap. It develops a symbiotic relationship with trees."
};

function paintGarden(game) {
	var ctx = document.getElementById("garden").getContext("2d");
	ctx.imageSmoothingEnabled = false;
	
	ctx.drawImage(sill_image, 0, 0, 384, 384);
	for(var x=0; x<4; x++) {
		ctx.drawImage(planter_image, x*96, 0, 96, 384);
	}
	
	if (hoveredSeed!==null) {
		ctx.drawImage(arrow_image, hoveredSeed*96 + 16, 96, 64, 64);
	}
	//garden.width = gardenWidth*32;
	//garden.height = gardenHeight*32;
	//for(var y=0; y<gardenHeight; y++) {
	//	for(var x=0; x<gardenWidth; x++) {
	//		ctx.drawImage(dirt, x*32, y*32);
	//	}
	//}
}

var hoveredSeed = null;
var selectedSeed = null;

function selectSeed(id) {
	document.getElementById("seed_dionaea").classList.remove("selected");
	document.getElementById("seed_aconitum").classList.remove("selected");
	document.getElementById("seed_porcelain").classList.remove("selected");
	document.getElementById("seed_devilstooth").classList.remove("selected");
	
	document.getElementById(id).classList.add("selected");
	selectedSeed = id;
	hoveredSeed = null;
	document.getElementById("seed_info_tip").innerText = seed_info[id];
	document.getElementById("seed_info").style.display="block";
}

function deselectSeed() {
	selectedSeed = null;
	hoveredSeed = null;
	document.getElementById("seed_info").style.display="none";
	
	document.getElementById("seed_dionaea").classList.remove("selected");
	document.getElementById("seed_aconitum").classList.remove("selected");
	document.getElementById("seed_porcelain").classList.remove("selected");
	document.getElementById("seed_devilstooth").classList.remove("selected");
}

function selectPot(event) {
	const rect = document.getElementById("garden").getBoundingClientRect();
	const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
	
	const index = (x / 96) | 0;
	
	//console.log("SelectPot! x "+x);
	if (selectedSeed!==null) {
		console.log("Planting "+selectedSeed+" in pot "+index);
	}
}

document.getElementById("garden").addEventListener("mousemove", (event) => {
	const rect = document.getElementById("garden").getBoundingClientRect();
	const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
	
	const index = (x / 96) | 0;
	
	if (selectedSeed!==null) {
		hoveredSeed = index;
	}
});
