class GameScene extends Phaser.Scene {
 constructor(){ super('Game'); }
 create(){
   this.cursors=this.input.keyboard.createCursorKeys();
   this.player=new Player(this,100,450);
 }
 update(){
   this.player.update();
 }
}