//let pictures = ["img/aragorn.jpg", "img/arwena.jpg", "img/boromir.jpg", "img/deadking.jpg", "img/elrond.jpg", "img/frodo.jpg", "img/galadriela.jpg", "img/gandalf.jpg", "img/gimli.jpg", "img/grishnak.jpg", "img/legolas.jpg", "img/merry.jpg", "img/nazgul.jpg", "img/pipin.jpg", "img/sam.jpg", "img/sauroneye.jpg", "img/smigol.jpg", "img/urukhai.jpg"];
let pictures = [];

let g = new Game();

g.chooseLevel();

	function Game() {

		let level = "";
		let levels = ["Easy", "Medium", "Hard"];
		let $board = $(".board");

		let oneVisible = false;
		let visibleNum = 0;
		let pairsLeft = 0;
		let turnCounter = 0;
		let opacityValue = 0;

		// choosing level of the game
		this.chooseLevel = function () {

			for (i = 0; i < levels.length; i++) {
			$board.append("<div class=\"level\"><p>"+levels[i]+"</p></div>");
			}

			$(".level").each(function(i) {
				$(this).on("click", () => play(i));
			});
		};

		// let's play!
		function play(setLevel) {

			$board.html("<div class=\"field\"></div>");
			$("#counter").html("Turn Counter: " + turnCounter);

			let $field = $(".field");
			
			switch(setLevel) {
				case 0:
					level = "easy";
					pictures = ["img/boromir.jpg", "img/aragorn.jpg", "img/deadking.jpg", "img/arwena.jpg", "img/boromir.jpg", "img/frodo.jpg", "img/deadking.jpg", "img/aragorn.jpg", "img/elrond.jpg", "img/elrond.jpg", "img/arwena.jpg", "img/frodo.jpg"];
					pairsLeft = 6;
					//console.log("pictures array: ", pictures);
					break;
				case 1: 
					level = "medium";
					pictures = ["img/legolas.jpg", "img/gimli.jpg", "img/deadking.jpg", "img/arwena.jpg", "img/boromir.jpg", "img/grishnak.jpg", "img/merry.jpg", "img/frodo.jpg", "img/deadking.jpg", "img/aragorn.jpg", "img/elrond.jpg", "img/elrond.jpg", "img/boromir.jpg", "img/aragorn.jpg", "img/arwena.jpg", "img/frodo.jpg", "img/gandalf.jpg", "img/gimli.jpg", "img/gandalf.jpg", "img/galadriela.jpg", "img/galadriela.jpg", "img/grishnak.jpg", "img/legolas.jpg", "img/merry.jpg"];
					pairsLeft = 12;
					//console.log("pictures array: ", pictures);
					break;
				case 2:
					level = "hard";
					pictures = ["img/nazgul.jpg", "img/sauroneye.jpg", "img/grishnak.jpg", "img/merry.jpg", "img/frodo.jpg", "img/deadking.jpg", "img/aragorn.jpg", "img/elrond.jpg", "img/elrond.jpg", "img/boromir.jpg", "img/aragorn.jpg", "img/arwena.jpg", "img/frodo.jpg", "img/gandalf.jpg", "img/gimli.jpg", "img/gandalf.jpg", "img/galadriela.jpg", "img/galadriela.jpg", "img/grishnak.jpg", "img/legolas.jpg", "img/merry.jpg", "img/smigol.jpg", "img/urukhai.jpg", "img/nazgul.jpg", "img/smigol.jpg", "img/pipin.jpg", "img/pipin.jpg", "img/sam.jpg", "img/sauroneye.jpg", "img/urukhai.jpg", "img/sam.jpg", "img/legolas.jpg", "img/gimli.jpg", "img/deadking.jpg", "img/arwena.jpg", "img/boromir.jpg"];
					pairsLeft = 18;
					//console.log("pictures array: ", pictures);
					break;
			}

			$(pictures).each(function(i) {
				$field.append("<div id=\"c"+i+"\" class=\"card\"></div>");
			});

			//clicking On The Cards :)
			$(".card").css("background-image", "url(\"img/karta.jpg\")")
				.each(function (i) {
					$(this).on("click", function() {
						opacityValue = $("#c"+i).css("opacity");
						console.log(opacityValue);
						if(opacityValue != 0) {
							if(oneVisible == false) {
								revealCard(i);
								visibleNum = i;
								oneVisible = true;
							} else {
								if(pictures[visibleNum] == pictures[i]) {
									revealCard(i);
									setTimeout(() => hidden2Cards(visibleNum, i), 750);
									oneVisible = false;
								} else {
									revealCard(i);
									setTimeout(() => restore2Cards(visibleNum, i), 1000);
									oneVisible = false;
								}
							}
						}
					});					
				});
		};

		function revealCard(nr) {
			$("#c"+nr).css({"background-image": "url(\""+pictures[nr]+"\")", "opacity": "1"});
		};

		function hidden2Cards(nr1, nr2) {
			$("#c"+nr1).css("opacity", "0");
			$("#c"+nr2).css("opacity", "0");

			pairsLeft--;
			if(pairsLeft == 0) {
				$(".field").html("<div class=\"winnerBoard\">YOU WIN!</div>");
			}

			turnCounter++;
			$("#counter").html("Turn Counter: " + turnCounter);
		};

		function restore2Cards(nr1, nr2) {
			$("#c"+nr1).css({"background-image": "url(\"img/karta.jpg\")", "opacity": "0.8"});
			$("#c"+nr2).css({"background-image": "url(\"img/karta.jpg\")", "opacity": "0.8"});

			turnCounter++;
			$("#counter").html("Turn Counter: " + turnCounter);
		};
	}