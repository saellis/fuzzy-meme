import { chai, assert, expect } from 'meteor/practicalmeteor:chai';
import { TRAIN_COLOR, TRAIN_TYPE, ROUTE_COLOR } from '../models/models';
import { Game } from '../models/game';
import { Board } from '../models/board';
import { TrainCard } from '../models/trainCard';
import { Player } from '../models/player';
import { Route, RouteBuilder } from '../models/route';

var should = chai.should();

describe('Models', function() {
	var game;

	beforeEach(function() {
		game = new Game();
	});

	describe('Game', function() {

		it('should be able to create new game', function() {
			should.equal(game.players.length, 0);
			should.equal(game.currentPlayerIndex, 0);
			should.equal(game.board.cards.length, 110);
			should.equal(game.board.visible.length, 0);
			should.equal(game.board.discards.length, 0);
		});

		describe('Making Routes', function() {

			it('should fail on creating invalid length routes', function() {
				var short = () => {new Route(['New York', 'Pittsburgh'], 0, 'Green'); };
				var long = () => {new Route(['New York', 'Pittsburgh'], 7, 'Green'); };
				short.should.throw(RangeError);
				long.should.throw(RangeError);
			});

			it('should fail on creating invalid number of cities', function() {
				var short = () => {new Route(['New York'], 2, 'Green'); };
				var long = () => {new Route(['New York', 'Pittsburgh', 'Chicago'], 2, 'Green'); };
				short.should.throw(RangeError);
				long.should.throw(RangeError);
			});

			it('should fail on creating invalid color routes', function() {
				var invalid = () => {new Route(['New York', 'Pittsburgh'], 1, 'Purple'); };
				invalid.should.throw(Error);
			});

			it('should not fail on creating valid color routes', function () {
				var valid = () => {new Route(['New York', 'Pittsburgh'], 1, 'Green'); };
				valid.should.not.throw(Error);
			});

			it('should be able to import routes from json', function() {
				//cant get this to work. All we need to do is properly supply the path of the json file to the RouteBuilder
				var builder = new RouteBuilder(require('path').resolve(__dirname, '../data/routes.json'));
				var routes = builder.getDefaultRoutes();
			});
		});

	});

	describe('Board', function () {
		it('should be able to properly deserialize Board from object', function() {
			var obj = {
				cards: [new TrainCard('yellow'), new TrainCard('blue')],
				discards: [new TrainCard('white')],
				visible: []
			}
			var actual = new Board();
			actual.fromJSON(obj);
			actual.should.have.property('cards').with.lengthOf(2);
			actual.should.have.property('discards').with.lengthOf(1);
			actual.should.have.property('visible').with.lengthOf(0);
		});

		it('should be able to properly serialize Board into object', function() {
			var board = new Board();
			var json = board.toJSON();
			json.should.have.property('cards').with.lengthOf(110);
			json.should.have.property('discards').with.lengthOf(0);
			json.should.have.property('visible').with.lengthOf(0);
		});
	});

	describe('Players', function() {

		describe('Adding Players', function() {

			it('should be able to add a player to game', function() {
				game.addPlayerWithColor("A", TRAIN_COLOR.BLACK);
				should.equal(game.players.length, 1);
				should.equal(game.players[0].name, "A");
				should.equal(game.players[0].color, TRAIN_COLOR.BLACK);
			})


			it('should be able to add multiple players to game', function() {
				game.addPlayerWithColor("A", TRAIN_COLOR.BLUE);
				game.addPlayerWithColor("B", TRAIN_COLOR.RED);
				game.addPlayerWithColor("C", TRAIN_COLOR.YELLOW);
				should.equal(game.players.length, 3);
			});

			it('should be able to auto assign colors', function() {
				game.addPlayer("A");
				game.addPlayer("B");
				game.addPlayer("C");
				should.equal(game.players.length, 3);
				game.players.forEach(function(player) {
					should.exist(player.color);
				});
			});

			it('when adding five players, they should all have five separate colors', function() {
				function checkUniqueColors(model) {
					var set = new Set();
					game.takenColors().forEach(function(color) {
						set.add(color);
					});
					return set.size;
				}
				game.addPlayer("A");
				should.equal(checkUniqueColors(game), 1);
				game.addPlayer("B");
				should.equal(checkUniqueColors(game), 2);
				game.addPlayer("C");
				should.equal(checkUniqueColors(game), 3);
				game.addPlayer("D");
				should.equal(checkUniqueColors(game), 4);
				game.addPlayer("E");
				should.equal(checkUniqueColors(game), 5);
			});

			it('should not be able to add more than 5 players', function() {
				game.addPlayer("A");
				game.addPlayer("B");
				game.addPlayer("C");
				game.addPlayer("D");
				game.addPlayer("E");
				should.equal(game.players.length, 5);
				game.addPlayer("F");

				game.addPlayer("F");
				game.addPlayer("F");
				game.addPlayer("F");
				game.addPlayer("F");

				should.equal(game.players.length, 5);
				game.players.forEach(function(player) {
					should.exist(player.color);
				});
			});
		});

		describe('Turns', function() {
			var me;
			beforeEach(function(){
				me = game.addPlayer("Me");
					game.addPlayer("You");
					game.addPlayer("Him");
				game.startGame();
			})

			describe('Drawing train cards', function() {


				it('drawing off the top should draw the top card', function() {
					var topCard = game.board.cards[game.board.cards.length - 1];
					var top = game.drawTrainCard(-1);
					should.equal(top, topCard);
					me.train_cards.should.include(top);
				});

				it('drawing from visible should draw that index', function () {
					for(var i = 0; i < 5; i++){
						var expected = game.board.visible[i];
						var p = game.getCurrentPlayer();
						var received = game.drawTrainCard(i);
						p.train_cards.should.include(received);
						if(received !== null){
							should.equal(expected, received);
						}
					}
				});

				it('drawing from visible should refill up to five cards in visible afterwards', function () {
					for(var i = 0; i < 100; i++){
						game.drawTrainCard(0);
						if(game.board.cards.length !== 0){
							should.equal(game.board.visible.length, 5);
						}
					}
				});

				it('should be able to draw exactly two off the top', function () {
					me = game.currentPlayerIndex;
					game.drawTrainCard(-1);
					should.equal(me, game.currentPlayerIndex);
					game.drawTrainCard(-1);
					should.not.equal(me, game.currentPlayerIndex);
					should.equal(game.cardsDrawnThisTurn,0);
				});

				it('should be able to draw exactly one wild off the visible', function () {
					me = game.currentPlayerIndex;
					game.board.visible = [new TrainCard('wild'), new TrainCard('wild'), new TrainCard('wild'), new TrainCard('wild'), new TrainCard('wild')];
					game.drawTrainCard(0)
					should.not.equal(me, game.currentPlayerIndex);
					should.equal(game.cardsDrawnThisTurn,0);

				});

				it('should be able to draw one wild off the top, then a visible', function () {
					me = game.currentPlayerIndex;
					game.board.cards.push(new TrainCard('wild'));
					game.drawTrainCard(-1);
					should.equal(me, game.currentPlayerIndex);
					game.board.visible = [new TrainCard('green'), new TrainCard('green'), new TrainCard('green'), new TrainCard('green'), new TrainCard('green')];

					game.drawTrainCard(0);
					should.not.equal(me, game.currentPlayerIndex);
					should.equal(game.cardsDrawnThisTurn,0);


				});
				it('should not be able to draw a wild from visible after drawing off the top', function () {
					me = game.currentPlayerIndex;
					game.drawTrainCard(-1);
					should.equal(me, game.currentPlayerIndex);
					game.board.visible = [new TrainCard('wild'), new TrainCard('green'), new TrainCard('green'), new TrainCard('green'), new TrainCard('green')];

					should.equal(game.drawTrainCard(0), null);
					should.equal(me, game.currentPlayerIndex);

					should.equal(game.cardsDrawnThisTurn,1);


				});

				it('should not be able to draw a wild from visible after drawing colored train card from visible', function () {
					me = game.currentPlayerIndex;
					game.board.visible = [new TrainCard('wild'), new TrainCard('green'), new TrainCard('green'), new TrainCard('green'), new TrainCard('green')];
					game.drawTrainCard(1);
					should.equal(me, game.currentPlayerIndex);
					should.equal(game.drawTrainCard(0), null);
					should.equal(me, game.currentPlayerIndex);

					should.equal(game.cardsDrawnThisTurn,1);


				});


			});

			describe('Drawing route cards', function() {

			});

			describe('Playing trains', function() {

				it('should be able to add played card(s) to discard pile', function() {
					game.drawTrainCard(0);
					game.drawTrainCard(0);
					game.drawTrainCard(0);
					//each of the players should have a card
					var route_id = 0;
					var me = game.getCurrentPlayer();
					var selectedCards = me.train_cards;
					game.playTrains(route_id, selectedCards);
					should.equal(game.board.discards.length, selectedCards.length);
					// game.board.should.have.property(discards).with.lengthOf(2);
				});

				it('should be able to remove played card(s) from hand', function() {
					for (var i = 50; i >= 0; i--) {
						game.drawTrainCard(0);
					}
					//each of the players should have a card
					var route_id = 0;
					var me = game.getCurrentPlayer();
					var selectedCards = Array.from(me.train_cards);
					selectedCards.splice(selectedCards.length - 3, 3);
					selectedCards.sort((a,b)=>{
						return Math.random();
					})
					game.playTrains(route_id, selectedCards);
					should.equal(me.train_cards.length, 3);
					// game.board.should.have.property(discards).with.lengthOf(2);
				});
			});
		});
	});
});
