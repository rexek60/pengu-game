class Player {
 constructor(scene,x,y){
   this.scene=scene;
   this.sprite=scene.physics.add.sprite(x,y,'pengu_idle');
   this.sprite.setCollideWorldBounds(true);
 }
 update(){
   const c=this.scene.cursors;
   if(c.left.isDown){ this.sprite.setVelocityX(-160); }
   else if(c.right.isDown){ this.sprite.setVelocityX(160); }
   else { this.sprite.setVelocityX(0); }

   if(c.up.isDown && this.sprite.body.onFloor()){
      this.sprite.setVelocityY(-330);
   }
 }
}
