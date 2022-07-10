"use strict";

var phamous2day = phamous2day || {};
phamous2day.Preload = function() {};

phamous2day.Preload.prototype = {

  preload: function() {
    this.logo();
    this.preloadBar();
    this.loadGameAssets();
    this.loadSpeechBubble();
    this.loadFinaleAssets();
  },

  create: function() {
    this.game.time.events.add(Phaser.Timer.SECOND * 2, function() {
      this.state.start('Game');
    }.bind(this));
  },

  logo: function() {
    var logo = this.add.sprite(this.game.world.centerX,
    this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5);
  },

  preloadBar: function() {
    var preloadBar = this.add.sprite(this.game.world.centerX,
    this.game.world.centerY, 'preload-bar');
    preloadBar.anchor.setTo(0.5, -8);
    preloadBar.scale.setTo(3, 1);
    this.load.setPreloadSprite(preloadBar);
  },

  loadGameAssets: function() {
    this.game.load.spritesheet('player', 'assets/sprites/player.png', 42, 42);
    this.load.tilemap('level', 'assets/tilemaps/maps/level.json',
    null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/tilemaps/tiles/super_mario_bros.png');
    this.load.spritesheet('coin', 'assets/tilemaps/tiles/super_mario_bros.png', 16, 16);
    this.load.spritesheet('transparent', 'assets/tilemaps/tiles/super_mario_bros.png', 16, 16);
    this.load.spritesheet('goomba', 'assets/sprites/goomba.png', 36, 36);
    this.loadNPCs();
    this.loadSounds();

    this.load.spritesheet('dave', 'assets/sprites/dave.png', 48, 48);
    this.load.spritesheet('ring', 'assets/sprites/ring.png', 7, 9);
    this.load.spritesheet('heart', 'assets/sprites/heart.png', 7, 8);
  },

  loadNPCs: function() {
    this.load.spritesheet('mario', 'assets/sprites/mario.png', 54, 54);
    this.load.spritesheet('yoshi', 'assets/sprites/yoshi.png', 54, 54);
    this.load.spritesheet('luigi', 'assets/sprites/luigi.png', 54, 54);
    this.load.spritesheet('toad', 'assets/sprites/toad.png', 54, 54);
    this.load.spritesheet('funky', 'assets/sprites/funky.png', 54, 54);
    this.load.spritesheet('diddy', 'assets/sprites/diddy.png', 54, 54);
    this.load.spritesheet('fox', 'assets/sprites/fox.png', 54, 54);
    this.load.spritesheet('pikachu', 'assets/sprites/pikachu.png', 54, 54);
    this.load.spritesheet('link', 'assets/sprites/link.png', 54, 54);
  },

  loadSpeechBubble: function() {
    this.game.load.spritesheet('bubble-border', 'vendor/assets/sprites/bubble-border.png', 6, 6);
    this.game.load.image('bubble-tail', 'vendor/assets/images/bubble-tail.png');
    this.game.load.bitmapFont('8bitoperator', 'vendor/assets/fonts/bitmaps/8bitoperator.png',
                                              'vendor/assets/fonts/bitmaps/8bitoperator.xml');
  },

  loadFinaleAssets: function() {
    this.load.tilemap('finale', 'assets/tilemaps/maps/finale.json',
                                null, Phaser.Tilemap.TILED_JSON);
  },

  loadSounds: function() {
    this.load.audio('coin', 'assets/audios/sound_effects/coin.wav');
    this.load.audio('jump', 'assets/audios/sound_effects/jump.wav');
    this.load.audio('squish', 'assets/audios/sound_effects/squish.wav');
    this.load.audio('fire-ball', 'assets/audios/sound_effects/magical_5.ogg');
    this.load.audio('powerup', 'assets/audios/sound_effects/powerup.wav');

    this.load.audio('level', 'assets/audios/bmgs/level.mp3');
    this.load.audio('level-complete', 'assets/audios/bmgs/level-complete.mp3');
    this.load.audio('finale', 'assets/audios/bmgs/finale.mp3');
    this.load.audio('credits', 'assets/audios/bmgs/credits.mp3');
  }
};
