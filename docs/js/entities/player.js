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
      , physics   : GameTurf.physics({
          x                 : 75
        , y                 : 75
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

      , update: function(){
          player.lastPositions.update(player.physics)

          if (GameTurf.input.lastClickPosition.new){
            GameTurf.input.lastClickPosition.new = false
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
                , player.physics)

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

          player.physics.update(playerInput)

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
            GameTurf.theatre.drawSquareFromCenter(
              'stage'
            , entity.physics
            , 'blue')
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

      , draw: function (){

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
                x: player.goToPlace.x
              , y: player.goToPlace.y
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
