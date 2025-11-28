class Menu extends Phaser.Scene {
 constructor(){ super('Menu'); }
 create(){
   this.add.text(200,200,'PENGU GAME',{fontSize:'48px',fill:'#fff'});
   this.input.once('pointerdown',()=>{ this.scene.start('SkinShop'); });
 }
}