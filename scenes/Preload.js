class Preload extends Phaser.Scene {
 constructor(){ super('Preload'); }
 preload(){
   this.load.image('pengu_idle','assets/pengu_idle.png');
 }
 create(){ this.scene.start('Menu'); }
}