"use strict";

var phamous2day = phamous2day || {};
phamous2day.Finale = function() {};

phamous2day.Finale.prototype = {

  create: function() {
    this.createLevel();
    this.createAndrea();
    this.createAndreaAnimations();
    this.createdave();
    this.createdaveAnimations();
    this.createNPCs();
    this.createScenes();
  },

  createLevel: function() {
    this.level = this.game.add.tilemap('finale');
    this.level.addTilesetImage('super_mario_bros', 'tiles');

    var backgroundLayer = this.level.createLayer('backgroundLayer');
    this.blockedLayer = this.level.createLayer('blockedLayer');

    this.level.setCollisionBetween(1, 900, true, 'blockedLayer');
    backgroundLayer.resizeWorld();

    this.createBMG();
  },

  createBMG: function() {
    this.bmg = this.game.add.audio('finale', 1, true);
    this.bmg.play();
  },

  createAndrea: function() {
    this.andrea = this.game.add.sprite(10, 166, 'player');
  },

  createdave: function() {
    this.dave = this.game.add.sprite(220, 162, 'dave');
    this.dave.frame = 3;
  },

  createAndreaAnimations: function(){
    this.andrea.animations.add('right', [6,7], 6, true);
    this.andrea.frame = 6;
  },

  createdaveAnimations: function(){
    this.dave.animations.add('left', [2, 1, 0], 10, true);
    // this.dave.animations.add('right', [5, 6, 7], 10, true);
  },

  daveText: [
              'I\'m glad you made it to the castle.',
              'Even if you didn\'t we always find a way to be together mahal ko.',
              'Even through difficult times or when we\'re far away, you always make me smile.',
              'More and more I realize how important you are to me.',
              'You are the reason I get up in the morning.',
              'You are the reason I made this game.',
              'Are you ready to be all my reasons?',
              'Andrea Salazar, will you marry me?'
             ],
  textIndex: 0,
  textSpeed: 8,

  createSpeechBubble: function(character, text) {
    var currentSpeechBubble = this.game.world.add(new SpeechBubble(this.game, character.x + 20, character.y + 8, 114, text[this.textIndex]));
    this.game.time.events.add(Phaser.Timer.SECOND * this.textSpeed, function() {
      this.game.world.remove(currentSpeechBubble);
      this.textIndex++;
      if(this.textIndex === text.length) {
        this.textIndex = 0;
        return;
      }
      this.createSpeechBubble(character, text);
    }, this);
  },

  npcs: [
    { gid: 672, name: 'mario' },
    { gid: 673, name: 'yoshi' },
    { gid: 674, name: 'luigi' },
    { gid: 675, name: 'toad' },
    { gid: 676, name: 'funky' },
    { gid: 677, name: 'diddy' },
    { gid: 678, name: 'fox' },
    { gid: 679, name: 'pikachu' },
    { gid: 680, name: 'link' },
  ],

  createNPCs: function() {
    for (let npc of this.npcs) {
      var name = npc['name']
      var gid = npc['gid']

      this[name] = this.game.add.group();
      this[name].enableBody = true;
      this.level.createFromObjects('objectsLayer', gid, name, 0, true, false, this[name]);
    }
  },

  npcsAction: function() {
    for (let npc of this.npcs) {
      var name = npc['name'];
      this[name].children[0].frame = 1;
    }
  },

  sceneOne: function() {
  },

  sceneTwo: function() {
    this.andrea.animations.play('right');
    this.dave.animations.play('left');

    this.game.add.tween(this.andrea).to({
      x: 100,
    },
    1000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
      this.andrea.animations.stop();
      this.andrea.frame = 6;
    }.bind(this));

    this.game.add.tween(this.dave).to({
      x: 130,
    },
    1000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
      this.dave.animations.stop();
      this.dave.frame = 0;
    }.bind(this));
  },

  sceneThree: function() {
    this.createSpeechBubble(this.dave, this.daveText);
  },

  sceneFour: function() {
    var ring = this.game.add.sprite(142, 166, 'ring');

    this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
      this.game.add.tween(ring).to({
        x: 106,
      },
      2000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
        this.game.add.tween(ring).to({
          y: 175,
        },
        1000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
          var powerupSound = this.game.add.audio('powerup');
          powerupSound.play();

          ring.kill();

          this.npcsAction();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },

  sceneFive: function() {
    this.andrea.animations.play('right', 5);
    this.dave.animations.play('left', 5);

    this.game.add.tween(this.andrea).to({
      x: 114,
    },
    1000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
      this.andrea.animations.stop();
      this.andrea.frame = 9;
    }.bind(this));

    this.game.add.tween(this.dave).to({
      x: 124,
    },
    1000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
      this.dave.animations.stop();
      this.dave.frame = 0;

      var heart = this.game.add.sprite(126, 190, 'heart');
      this.game.add.tween(heart).to( { x: -100, y: -100 }, 3000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
        this.bmg.stop();
        this.state.start('Credits');
      }.bind(this));
      this.game.add.tween(heart.scale).to( { x: 256, y: 240 }, 12000, Phaser.Easing.Linear.None, true);
    }.bind(this));
  },

  sceneIndex: 0,
  totalOfScenes: 5,

  getScenes: function(index) {
    var scenes = [[this.sceneOne, 3], [this.sceneTwo, 2],
                      [this.sceneThree, (this.daveText.length * this.textSpeed)],
                      [this.sceneFour, 7], [this.sceneFive, 2]]
    return scenes[index];
  },

  createScenes: function() {
    var currentScene = this.getScenes(this.sceneIndex);
    currentScene[0].call(this);
    this.game.time.events.add(Phaser.Timer.SECOND * currentScene[1], function() {
      this.sceneIndex++;
      if(this.sceneIndex === this.totalOfScenes) {
        return;
      }
      this.createScenes();
    }, this);
  }
};
