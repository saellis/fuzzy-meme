import { Serializable, ROUTE_COLOR } from '../models/models';
var fs = require('fs');

export class RouteBuilder {
  constructor(filename) {
    this.filename = filename;
  }
  getDefaultRoutes() {
    var results = [];
    var json_data = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
    for(var route in json_data.routes) {
      results.push(new Route(route.cities, route.length, route.color));
    }
    return results;
  }
}


/*
 * NOTE: these are Routes as in the single-color paths that directly connect two cities
 * I cant really think of a better name to differentiate this from the Route Cards you pull
 * Maybe call those routes 'path's? Can disucss this later
 */
export class Route extends Serializable {

  constructor(cities, length, color) {
		super();
    cities = new Set(cities);
    if(cities.size != 2) {
      throw new RangeError('There can only be exactly 2 unique cities in a Route object');
    }
    this.cities = cities;
    if(length < 1 || length > 6) {
      throw new RangeError('Length can only be between 1 and 6');
    }
    this.length = length;

    if(!ROUTE_COLOR.keys().includes(color)) {
      throw new Error('Color must be Gray, Orange, Black, White, Red, Yellow, Pink, Green, or Blue');
    }
    this.color = ROUTE_COLOR[color];
    this.value = [1, 2, 4, 7, 10, 15][this.length-1];
	}

}
