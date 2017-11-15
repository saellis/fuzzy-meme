import { Serializable } from '../models/models';

export class Turn extends Serializable {
	constructor(type) {
		super();
		this.type = type;
	}
	
}
