class UI extends Phaser.Scene {
 constructor(){ super('UI'); }
 create(){ this.add.text(10,10,'UI',{fontSize:'24px',fill:'#fff'}); }
}