import { TrainCard } from '../models/trainCard';
import { Serializable } from '../models/models';

export class Board extends Serializable {
	//cards, used cards, routes,

	constructor() {
		super();
		this.cards = new Array();
		this._addCards();
		this._shuffleCards();
		this.discards = new Array();
		this.visible = new Array();
	}

	_addCards() {
		for(var i = 0; i < 12; i++){
			this.cards.push(new TrainCard("purple"));
			this.cards.push(new TrainCard("orange"));
			this.cards.push(new TrainCard("yellow"));
			this.cards.push(new TrainCard("green"));
			this.cards.push(new TrainCard("white"));
			this.cards.push(new TrainCard("black"));
			this.cards.push(new TrainCard("blue"));
			this.cards.push(new TrainCard("pink"));
			this.cards.push(new TrainCard("wild"));
		}
		this.cards.push(new TrainCard("wild"));
		this.cards.push(new TrainCard("wild"));
	}

	_shuffleCards() {
		this.cards.sort((a,b) => {
			//shuffle
			return Math.random() - Math.random();
		});
	}

	startGame(){
		this.fillVisible();
	}

	fillVisible(){
		this.checkDeck();
		while(this.cards.length > 0 && this.visible.length < 5){
			this.visible.push(this.cards.pop());
		}
	}



	checkDeck(){
		if(this.cards.length === 0){
			this.cards = this.discards.sort((a,b) => {
				//shuffle
				return Math.random();
			});
		}
	}


	drawTopCard(){
		this.checkDeck();
		console.log(this.cards.length - 1);
		return this.cards.pop();
	}

	drawFromVisible(index){
		var ret = this.visible.splice(index, 1)[0];
		this.fillVisible();
		return ret;
	}

}
