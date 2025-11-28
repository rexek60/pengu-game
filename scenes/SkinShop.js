class SkinShop extends Phaser.Scene {
 constructor(){ super('SkinShop'); }
 create(){
   this.add.text(100,100,'Skin Shop',{fontSize:'40px',fill:'#fff'});
   this.input.once('pointerdown',()=>{ this.scene.start('Game'); });
 }
}