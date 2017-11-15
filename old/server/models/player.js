import { Serializable } from '../models/models';

export class Player extends Serializable {

	constructor(name, color) {
		super();
		this.train_cards = new Array();
		this.name = name;
		this.color = color;
	}

	addToHand(card){
		this.train_cards.push(card);
	}

	removeFromHand(cards){
		copy = Array.from(cards);
		this.train_cards = this.train_cards.filter((el) => {
			var index = -1;
			copy.forEach((card, i) => {
				if(index < 0){
					if (card.color === el.color){
						index = i;
					}
				}
			})
			if(index >= 0){
				copy.splice(index, 1);
				return false;
			}
			return true;
		})
	}

}
