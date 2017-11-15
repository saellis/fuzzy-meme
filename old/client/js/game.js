
//if(Meteor.isClient){
	//Session.setDefault("game", new GameModel());

	Template.game.onCreated(() => {
		console.log("Game created");
		Template.instance().game = new ReactiveVar(new GameModel());
	});


	Template.game.helpers({
		cardCount() {
			var gm = Template.instance().game.get();
			
			//console.log(visible);
			return gm.getCardsLength();
		},

		visibleCards() {
			var gm = Template.instance().game.get();
			return gm.board.visible;
			//return Session.get("game");
		}
	});

	Template.game.events({
		'click #play': () => {
			// var gm = new GameModel();
			// gm.setUpFromObject(Session.get("game"));
			// gm.addPlayer("A", "A");
			// gm.addPlayer("B", "B");
			// gm.addPlayer("C", "C");
			// gm.addPlayer("D", "D");
			// for(var i = 0; i < 10; i++){
			// 	var tm = new TurnModel(TURN_TYPE.DRAW_TRAIN_CARDS);
			// 	gm.makeTurn(tm);
			// }
			// console.log(gm);
			// Session.set("game", gm);
		}
	});
//}

