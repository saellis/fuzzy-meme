import { Serializable } from '../models/models';

export class TrainCard extends Serializable {
	constructor(color) {
		super();
		this.color = color
	}
}
