// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// Cubey
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters

// debug with extreme prejudice
"use strict"

import { Level1 } from "./Scenes/Level1.js";
import { Level2 } from "./Scenes/Level2.js";
import { Level3 } from "./Scenes/Level3.js";

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1000,
    height: 850,
    scene: [Level1, Level2, Level3],
    fps: { forceSetTimeOut: true, target: 60 }
}

// Global variable to hold sprites
var my = {sprite: {}};

const game = new Phaser.Game(config);
