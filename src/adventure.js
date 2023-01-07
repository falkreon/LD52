var adventure_upgrades = [
	{
		"name": "Test Strength",
		"key": "damage",
		"amount": 1,
		"currency": "coin",
		"base_cost": 1,
		"scale_cost": 1.0,
		"max": 20
	},
	{
		"name": "Test Dps",
		"key": "dps",
		"amount": 0.5,
		"currency": "coin",
		"base_cost": 20,
		"scale_cost": 1.0,
		"max": 20
	}
];

var all_enemies = [
	{
		"name": "Dionaea",
		"img": "data/enemy_plant.png",
		"hp": 20,
		"maxhp": 20,
		"rewards": [
			{
				"item": "seed_dionaea",
				"min": 1,
				"max": 1,
				"chance": 0.25
			},
			{
				"item": "coin",
				"min": 1,
				"max": 3,
				"chance": 1.0
			}
		]
	},
	{
		"name": "Aconitum",
		"img": "data/enemy_aconitum.png",
		"hp": 25,
		"maxhp": 25,
		"rewards": [
			{
				"item": "seed_aconitum",
				"min": 1,
				"max": 1,
				"chance": 0.25
			},
			{
				"item": "coin",
				"min": 1,
				"max": 3,
				"chance": 1.0
			}
		]
	},
	{
		"name": "Porcelain",
		"img": "data/enemy_porcelain.png",
		"hp": 20,
		"maxhp": 20,
		"rewards": [
			{
				"item": "seed_porcelain",
				"min": 1,
				"max": 1,
				"chance": 0.25
			},
			{
				"item": "coin",
				"min": 1,
				"max": 2,
				"chance": 1.0
			}
		]
	},
	{
		"name": "Devil's Tooth",
		"img": "data/enemy_devils_tooth.png",
		"hp": 20,
		"maxhp": 20,
		"rewards": [
			{
				"item": "seed_devilstooth",
				"min": 1,
				"max": 1,
				"chance": 0.25
			},
			{
				"item": "coin",
				"min": 1,
				"max": 2,
				"chance": 1.0
			}
		]
	},
];

var enemies = all_enemies; //TODO: How do we want to unlock new enemies? Battle power?

function attack(game) {
	if (game.player.attack_cooldown <= 0 && game.current_enemy!=null) {
		//console.log("Attack!");
		
		game.current_enemy.hp = Math.max(game.current_enemy.hp - game.player.attack, 0);
		if (game.current_enemy.hp <= 0) {
			//TODO: Trigger enemy reward and particle splash
			
			game.current_enemy = null;
			game.enemy_cooldown = game.enemy_cooldown_max;
		}
		
		game.player.attack_cooldown = game.attack_cooldown_max;
	} else {
		//Don't acknowledge yet
	}
	
}

function upgrade_cost(index, level) {
	let upgrade = adventure_upgrades[index]; if (upgrade===null || upgrade===undefined) return 1;
	let baseCost = upgrade.base_cost; if (baseCost===undefined) baseCost = 1.0;
	let scaleCost = upgrade.scale_cost; if (scaleCost===undefined) scaleCost = 1.0;
	return Math.pow(2, level) * scaleCost + baseCost;
}

function upgrade_adventure(game, index) {
	let upgrade = adventure_upgrades[index];
	
	//Initialize additional player upgrade levels if needed
	while (game.player.upgrade_levels.length<=index) {
		game.player.upgrade_levels.push(0);
	}
	
	let curLevel = game.player.upgrade_levels[index];
	if (curLevel===undefined) curLevel = 0;
	let nextCost = upgrade_cost(index, curLevel+1);
	//console.log("Cost: "+nextCost);
	
	switch(upgrade.key) {
		case "damage":
		game.player.attack += upgrade.amount;
		//console.log("Upgraded.");
		break;
		case "dps":
		game.player.dpt += upgrade.amount / ticks_per_second;
		break;
	}
	
	game.player.upgrade_levels[index] = curLevel+1;
}

function paintAdventure(game) {
	var ctx = document.getElementById("adventure").getContext("2d");
	ctx.imageSmoothingEnabled = false;
	
	ctx.drawImage(adventureBg, 0, 0, 384, 384);
	
	if (game.current_enemy != null) {
		var enemy = game.current_enemy.img;
		var ewid = enemy.width;
		var ehit = enemy.height;
		
		ctx.shadowColor = "rgba(0, 0, 0, 0);"
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		
		ctx.drawImage(enemy, 192 - ewid, 192-ehit, ewid*2, ehit*2);
		
		const barWidth = 100;
		let filledPortion = Math.floor( (game.current_enemy.hp / game.current_enemy.maxhp) * barWidth);
		let barLeft = 192 - (barWidth/2);
		
		let barTop = 192 - ehit - 8;
		
		ctx.fillStyle = "gray";
		ctx.fillRect(barLeft, barTop, barWidth, 4);
		ctx.fillStyle = "red";
		ctx.fillRect(barLeft, barTop, filledPortion, 4);
		
		//var nameWidth = ctx.measureText(game.current_enemy.name);
		var font = "16pt arial";
		ctx.font = font;
		ctx.shadowColor = "rgba( 130, 128, 74, 128 )";
		ctx.shadowOffsetX = 1;
		ctx.shadowOffsetY = 1;
		ctx.fillStyle = "rgb( 235, 233, 174 )";
		ctx.fillText(game.current_enemy.name, barLeft, 192 - ehit - 12);
	}
}
