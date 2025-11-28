class Enemy {
 constructor(scene,x,y,texture){
   this.scene=scene;
   this.sprite=scene.physics.add.sprite(x,y,texture);
   this.sprite.setVelocityX(60);
 }
 update(){
   // simple patrol
 }
}
