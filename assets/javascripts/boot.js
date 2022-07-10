"use strict";

var phamous2day = phamous2day || {};
phamous2day.Boot = function() {};

phamous2day.Boot.prototype = {

  preload: function() {
    this.load.image('preload-bar', 'assets/images/preload-bar.png');
    this.load.image('logo', 'assets/images/logo.png');
  },

  create: function() {
    this.game.stage.backgroundColor = '#000';

    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
};
