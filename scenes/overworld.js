import {BaseScene} from "./base.js";
import './interactive/factory.js';  // This has to run before the first scene in order to add the commands


export class OverworldScene extends BaseScene {

  constructor() {
    super('OverworldScene');
  }

  preload() {
    // The keys have to be unique! Otherwise they will not be preloaded again.
    // this.load.image("OverworldTiles", "./assets/prod/tilesets_and_maps/poke_converted.png");
    this.load.image("OverworldTiles", "./assets/prod/tilesets_and_maps/poke_converted_extruded.png");
    this.load.image("empty_tile", "./assets/prod/tilesets_and_maps/empty_tile.png");
    this.load.tilemapTiledJSON("OverworldMap", "./assets/prod/tilesets_and_maps/overworld.json");
    this.load.atlas("atlas", "./assets/prod/atlas/atlas.png", "./assets/prod/atlas/atlas.json");
	this.load.bitmapFont('pixelop', 'assets/prod/fonts/pixelop.png', 'assets/prod/fonts/pixelop.xml');
	this.load.bitmapFont('pixelopmono', 'assets/prod/fonts/pixelopmono.png', 'assets/prod/fonts/pixelopmono.xml');
	this.load.image("fullscreen", "./assets/prod/other/fullscreen.png");
    this.load.image("fullscreen2", "./assets/prod/other/fullscreen2.png");
  }

  create() {
    super.create("OverworldMap", "OverworldTiles", "poke");

    // Resize the world and camera bounds
    this.physics.world.setBounds(0, 0, 1920, 1088);
    this.cameras.main.setBounds(0, 0, 1920, 1088);

    // On scene switch (after entering a door) display the walking DOWN animation
    this.events.on('wake', () => {this.player.anims.play("ariel-front-walk", true)}, this);

    this.collide_with_world();  // Has to be called after the rest of the colliders are defined
  }
  
  update(time, delta) {
	  super.update(time, delta);
	  // Play the waving animation. Sort of hacky bc the initial square is the only place in the overworld where there
	  // is a physics overlap (and hence, the only place where player.body.embedded is true)
	  if (this.player.body.embedded && this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
		this.player.anims.play("ariel-wave", true);
	  }
  }

}
