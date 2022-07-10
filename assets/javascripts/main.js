"use strict";

var phamous2day = phamous2day || {};

phamous2day.game = new Phaser.Game(256, 240, Phaser.AUTO, 'game');

phamous2day.game.state.add('Boot', phamous2day.Boot);
phamous2day.game.state.add('Preload', phamous2day.Preload);
phamous2day.game.state.add('Game', phamous2day.Game);
phamous2day.game.state.add('Finale', phamous2day.Finale);
phamous2day.game.state.add('Credits', phamous2day.Credits);
phamous2day.game.state.start('Boot');
