 /******************************************************************************
 * player.js
 *
 * 
 *****************************************************************************/

define([

  'gameTurf'

],function(

  GameTurf

){

  var playerInput
    , player = {
        name      : "???"
      , type    : 'player'
      , physics   : GameTurf.physics({
          position: {
            x: 75
          , y: 75
          }
        , mass              : 10
        , width             : 20
        , height            : 20
        , frictionMagnitude : 1
        , speed             : 2
        , runSpeed          : 3
        })
      , face          : GameTurf.face()
      , lastPositions : GameTurf.lastPositions()
      , color         : "#FDF4C2"

      , goToPlace     : {
          x    : 0
        , y    : 0
        , done : true
        }

      , init: function(){
          player.face.init(player.physics.width)
          GameTurf.entityManager.add(player)
          GameTurf.entityCollisionDetection.add(player)
        }

      , update: function(timeElapsed){
          player.lastPositions.update(player.physics)

          var clicked = false;
          if (GameTurf.input.lastClickPosition.new){ // get click position, false if frame is differnet 
            GameTurf.input.lastClickPosition.new = false
            clicked = true;
          }

          var entity = GameTurf.entityManager.getNeahrestEntity(player, 50)

          var interacted = false;

          if (entity)  {

            var wantsToInteract = false;
            if (clicked && (
              ((entity.physics.position.x - (entity.physics.width/2)) < GameTurf.input.lastClickPosition.x) &&
              ((entity.physics.position.x + (entity.physics.width/2)) > GameTurf.input.lastClickPosition.x) &&
              ((entity.physics.position.y - (entity.physics.height/2)) < GameTurf.input.lastClickPosition.y) &&
              ((entity.physics.position.y + (entity.physics.height/2)) > GameTurf.input.lastClickPosition.y)  
            )) {
              wantsToInteract = true;
            } else if (GameTurf.input.keyPressed[69]) {
              wantsToInteract = true;
            }

            if (wantsToInteract && entity.type === "chest") {
              entity.tryOpenChest();
              GameTurf.ui.showBubble(player.physics, "Juhu!", 1000)
              interacted = true;
            } 

            if (wantsToInteract && entity.type === "cat") {
              entity.purr();
              GameTurf.ui.showBubble(player.physics, "Hi! Kitty :)", 1000)
              interacted = true;
            } 

            if (wantsToInteract && entity.type === "npc") {
              entity.talk();
              interacted = true;
            } 

            if (wantsToInteract && entity.type === "kangaroo") {
              entity.talk();
              interacted = true;
            } 
          } 
          
          if (clicked && interacted == false ) {
            player.goToPlace.x = GameTurf.input.lastClickPosition.x
            player.goToPlace.y = GameTurf.input.lastClickPosition.y
            player.goToPlace.done = false
          }
        
          playerInput = GameTurf.input.getPlayerMovementDirection()

          GameTurf.wind.incluenceEntityPhysic(player.physics, playerInput.vector)

          if (!playerInput.playerInteraction 
           && !player.goToPlace.done){

            var goToPlaceVectorFromPlayer = GameTurf.math.vectorSubstract(
                player.goToPlace
                , player.physics.position)

            if(GameTurf.util.vectorLength(goToPlaceVectorFromPlayer) > 0.5) {
              var goToPlaceDirection = GameTurf.util.setVectorToLengthOne(
                goToPlaceVectorFromPlayer)

              playerInput.vector.x  = goToPlaceDirection.x
              playerInput.vector.y  = goToPlaceDirection.y
              playerInput.isRunning = true
              playerInput.playerInteraction = true
              
            } else {
              player.goToPlace.done = true
            }
          }

          player.physics.update(timeElapsed, playerInput)

          if (playerInput.playerInteraction && player.physics.isMoving) {
            if (player.physics.isRunning) {
              GameTurf.sound.playEffect('running', true)
            } else {
              GameTurf.sound.playEffect('walk', true)
            }
          }

          player.face.update(player.physics, playerInput.playerInteraction)
        }

      , showNeahrestEntity: function(){
   
          var entity = GameTurf.entityManager.getNeahrestEntity(player, 50)
          
          if (entity) {
            if (entity.type == "chest" || entity.type == "npc"||entity.type == "cat") {
             /* GameTurf.theatre.drawSquareFromCenter(
                'stage'
              , {
                position: entity.physics.position
              , halfHeight: entity.physics.halfHeight + 2
              , halfWidth: entity.physics.halfWidth + 2
              , width: entity.physics.width + 4
              , height:entity.physics.height + 4
              }
              , 'rgba(0,0,255,.3)')*/
            }
          }
      
        }

      , postUpdate: function(){
          if (GameTurf.entityCollisionDetection
                      .isEntityCollidingWithOtherEntites(player)) {
            player.face.SetSurpiseFace()
          }
        }

      , preDraw: function(){
          GameTurf.theatre.playerUpdate(player.physics)
        }

      , draw: function (timeElapsed){

          if(player.physics.isRunning) {
            player.lastPositions.draw(player.physics)
          }

          player.physics.draw()

          // draw body
          GameTurf.theatre.drawSquareFromCenter(
            'stage'
          , player.physics
          , player.color)

          player.face.draw(player.physics)
          // interaction with neahest player
          player.showNeahrestEntity()

          if (!player.goToPlace.done){
            GameTurf.theatre.drawCircle(
              'stage'
            , {
                position: player.goToPlace
              , halfWidth : 10 
              , halfHeight: 10
              }
            , 'rgba(255,255,255,.7)')
          }
        }
    }

  if (GameTurf.ui.datGui) {
    var datGuiFolder = GameTurf.ui.datGui.addFolder("Player")
    GameTurf.ui.datGui.remember(player)
    datGuiFolder.addColor(player, "color")

    player.physics.addToDatGuiFolder(datGuiFolder)
    player.lastPositions.addToDatGuiFolder(datGuiFolder)
    player.face.addToDatGuiFolder(datGuiFolder)
  }
  
  return player

})
