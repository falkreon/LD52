var currentTab = 0;
tab(0);

function tab(id) {
	let tabDivs = document.getElementsByClassName("tab");
	for(i=0; i<tabDivs.length; i++) {
		if (id==tabDivs[i].getAttribute("tabId")) {
			tabDivs[i].classList.add("active");
		} else {
			tabDivs[i].classList.remove("active");
		}
	}

	let tabContentDivs = document.getElementsByClassName("tab_content");
	for(i=0; i<tabContentDivs.length; i++) {
		//console.log(tabContentDivs[i].getAttribute("tabId"));
		if (id==tabContentDivs[i].getAttribute("tabId")) {
			tabContentDivs[i].classList.add("active");
		} else {
			tabContentDivs[i].classList.remove("active");
		}
	}
}

function begin() {
	/*
	var bgm = document.getElementById("bgm");
	bgm.volume = 0.2;
	bgm.loop = true;
	bgm.play();
	
	window.requestAnimationFrame(frame);
	*/
	console.log("Begin.");
}
