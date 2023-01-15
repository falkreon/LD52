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

var seed_images = {};
seed_images["seed_dionaea"] = new Image();
seed_images["seed_dionaea"].src = "data/plant_dionaea.png";
seed_images["seed_aconitum"] = new Image();
seed_images["seed_aconitum"].src = "data/plant_aconitum.png";
seed_images["seed_porcelain"] = new Image();
seed_images["seed_porcelain"].src = "data/plant_porcelain.png";
seed_images["seed_devilstooth"] = new Image();
seed_images["seed_devilstooth"].src = "data/plant_devilstooth.png";

var plant_data = {
	"seed_dionaea": {
		"rewards": [
			{
				"item": "item_thorn",
				"min": 1,
				"max": 1,
				"chance": 1.0
			},
			{
				"item": "coin",
				"min": 4,
				"max": 6,
				"chance": 1.0
			}
		],
	},
	
	"seed_aconitum": {
		"rewards": [
			{
				"item": "item_poison",
				"min": 1,
				"max": 1,
				"chance": 1.0
			},
			{
				"item": "coin",
				"min": 4,
				"max": 6,
				"chance": 1.0
			}
		],
	},
	
	"seed_porcelain": {
		"rewards": [
			{
				"item": "item_shard",
				"min": 1,
				"max": 1,
				"chance": 1.0
			},
			{
				"item": "coin",
				"min": 4,
				"max": 6,
				"chance": 1.0
			}
		],
	},
	
	"seed_devilstooth": {
		"rewards": [
			{
				"item": "item_ichor",
				"min": 1,
				"max": 1,
				"chance": 1.0
			},
			{
				"item": "coin",
				"min": 6,
				"max": 12,
				"chance": 1.0
			}
		],
	},
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
	
	
	if (game.garden!==undefined) {
		for(var i=0; i<4; i++) {
			const plant = game.garden[i];
			
			if (plant!==null) {
				var image = seed_images[plant.seed];
				if (image!==undefined) {
					ctx.drawImage(image, i*96, 130);
					
					let bar_left = i*96 + 2;
					let bar_width = 96 - 4;
					let filled_width = (((plant.max_ticks - plant.ticks) / plant.max_ticks) * bar_width) | 0;
					ctx.fillStyle = "gray";
					ctx.fillRect(bar_left, 100, bar_width, 4);
					ctx.fillStyle = "yellow";
					ctx.fillRect(bar_left, 100, filled_width, 4);
				}
			}
		}
	}
	//garden.width = gardenWidth*32;
	//garden.height = gardenHeight*32;
	//for(var y=0; y<gardenHeight; y++) {
	//	for(var x=0; x<gardenWidth; x++) {
	//		ctx.drawImage(dirt, x*32, y*32);
	//	}
	//}
}

function tickGarden(game) {
	for(var i=0; i<4; i++) {
		var plant = game.garden[i];
		if (plant!==null) {
			plant.ticks++;
			if (plant.ticks >= plant.max_ticks) {
				//drop the plant reward!
				game.garden[i] = null;
				let rewards = plant_data[plant.seed].rewards;
				reward(rewards);
			}
		}
	}
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

function selectPot(event, game) {
	const rect = document.getElementById("garden").getBoundingClientRect();
	const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
	
	const index = (x / 96) | 0;
	
	if (game.garden===undefined) game.garden = [ null, null, null, null ];
	
	if (selectedSeed!==null && game.garden[index]===null) {
		//console.log("Planting "+selectedSeed+" in pot "+index);
		var existing = (selectedSeed in game.player.items) ? game.player.items[selectedSeed] : 0;
		
		//Remove the seed from player.items
		game.player.items[selectedSeed] = Math.max(existing-1, 0);
		game.garden[index] = {
			"seed": selectedSeed,
			"ticks": 0,
			"max_ticks": 20 * 20,
		};
		
		deselectSeed();
		refreshItems();
	}
}

/*
document.getElementById("garden").addEventListener("mousemove", (event) => {
	const rect = document.getElementById("garden").getBoundingClientRect();
	const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
	
	const index = (x / 96) | 0;
	
	if (selectedSeed!==null) {
		hoveredSeed = index;
	}
});*/
