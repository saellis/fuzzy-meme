import { Board } from '../models/board';
import { Player } from '../models/player';
import { TRAIN_COLOR, Serializable } from '../models/models';

export class Game extends Serializable {

	constructor() {
		super();
		this.players = new Array();
		this.currentPlayerIndex = 0;
		this.board = new Board();
		this.cardsDrawnThisTurn = 0;
	}

	getColorFromValue(value) {
		switch(value) {
			case 0: return TRAIN_COLOR.BLUE;
			case 1: return TRAIN_COLOR.BLACK;
			case 2: return TRAIN_COLOR.RED;
			case 3: return TRAIN_COLOR.GREEN;
			case 4: return TRAIN_COLOR.YELLOW;
			default: return -1;
		}

	}

	startGame(){
		this.board.startGame();
	}



	//try not to use this function ??
	addPlayerWithColor(name, color){
		if(this.players.length >= 5){
			//only 5 players are allowed
			return;
		}
		if(color.value >= 0 && color.value <= 4 && !this.takenColors().includes(color.value)){
			this.players.push(new Player(name, color));
		}
	}

	takenColors(){
		var colorsTaken = [];
		this.players.forEach((player) => {
			colorsTaken.push(player.color.value);
		});
		return colorsTaken;
	}

	addPlayer(name){
		if(this.players.length >= 5){
			//only 5 players are allowed
			return;
		}

		var colorsTaken = this.takenColors();

		var solved = false;
		var myColorValue = -1;
		while(!solved){
			var rand = Math.floor(Math.random() * 5);
			if(!colorsTaken.includes(rand)){
				solved = true;
				myColorValue = rand;
			}
		}
		var myColor = this.getColorFromValue(myColorValue);
		if(myColor !== -1){
			var player = new Player(name, myColor)
			this.players.push(player);
			return player;
		}
	}

	getCurrentPlayer(){
		return this.players[this.currentPlayerIndex];
	}

	nextPlayer(){
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
		this.cardsDrawnThisTurn = 0;
	}

	drawTrainCard(index){
		//-1 is off the top
		if(index === -1){
			var card = this.board.drawTopCard();
			this.getCurrentPlayer().addToHand(card);
			this.cardsDrawnThisTurn ++;
			if(this.cardsDrawnThisTurn === 2){

				this.nextPlayer();
			}
			return card;
		} else if(index >= 0 && index <= this.board.visible.length){
			if(this.cardsDrawnThisTurn === 1  && this.board.visible[index].color === 'wild'){
				//can't draw visible wild on second draw
				console.log('can\'t draw wild on second draw');
				return null;
			}
			var card = this.board.drawFromVisible(index);
			if(!card){
				return null;
			}
			this.getCurrentPlayer().addToHand(card);
			this.cardsDrawnThisTurn ++;
			if(card.color === 'wild' || this.cardsDrawnThisTurn === 2){
				this.nextPlayer();
			}
			return card;
		}else{
			console.log("faulty request")
		}
		//0-4 is off the visible
	}

	playTrains(route_id, cards){
		this.getCurrentPlayer().removeFromHand(cards);
		cards.forEach(card => {
			this.board.discards.push(card);
		})
		this.nextPlayer();
	}

}
