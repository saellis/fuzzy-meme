import { EJSON } from 'meteor/ejson';

export const TURN_TYPE  = {
		DRAW_TRAIN_CARDS : {value: 0, name: "Draw train cards"},
		PLAY_TRAINS: {value: 1, name: "Play trains"},
		DRAW_ROUTES : {value: 2, name: "Draw route cards"}
}

export const TRAIN_COLOR = {
		BLUE: {value: 0, name: "Blue"},
		BLACK: {value: 1, name: "Black"},
		RED: {value: 2, name: "Red"},
		GREEN: {value: 3, name: "Green"},
		YELLOW: {value: 4, name: "Yellow"}
}

export const ROUTE_COLOR = {
		ANY: {value: 0, name: "Any"},
		WHITE: {value: 1, name: 'White'},
		GREEN: {value: 2, name: "Green"},
		BLUE: {value: 3, name: "Blue"},
		ORANGE: {value: 4, name: "Orange"},
		YELLOW: {value: 5, name: "Yellow"},
		PINK: {value: 6, name: "Pink"},
		RED: {value: 7, name: "Red"},
		BLACK: {value: 8, name: "Black"},
		keys: function() {
			var keyarray = [];
			for(var k in this) {
				keyarray.push(this[k]['name']);
			}
			return keyarray;
		}
}

export const CITIES = [
	'Vancouver', 'Seattle', 'Portland', 'Calgary', 'San Francisco', 'Los Angeles',
	'Helena', 'Salt Lake City', 'Las Vegas', 'Phoenix', 'Winnipeg', 'Duluth', 'Omaha',
	'Denver', 'Santa Fe', 'El Paso', 'Oklahoma City', 'Kansas City', 'Sault St. Marie',
	'Chicago', 'St. Louis', 'Little Rock', 'Dallas', 'Houston', 'Montreal', 'Toronto',
	'Boston', 'New Orleans', 'Miami', 'Atlanta', 'Charleston', 'Nashville', 'Raleigh',
	'Washington', 'New York', 'Pittsburgh'
]

export class Serializable {
		toJSON() {
			var result = {};
			for(var key in this) {
				if(!_.isFunction(this[key])) {
					result[key] = this[key];
				}
			}
			return result;
		}

		fromJSON(json) {
			for(var key in json) {
				if(this[key] != undefined) {
					this[key] = json[key];
				}
			}
		}
}
