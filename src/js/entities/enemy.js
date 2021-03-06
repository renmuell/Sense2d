 /**
  * enemy.js
  *
  * 
  */

 define([

  'gameTurf'
, './player'

],function(

  GameTurf
, player

){

  if (GameTurf.ui.datGui) {
    var enemies = GameTurf.ui.datGui.addFolder("Enemies")
  }

  return function(config) {

    config         = config         || {}
    config.physics = config.physics || {
      position: config.position || { x:0, y:0 }
    }

    var enemy = {
        name    : undefined
      , hasKi   : true
      , type    : 'enemy'
      , physics : GameTurf.physics({
          position: {
            x : config.physics.position.x || 230
          , y : config.physics.position.y || 180
          }
        , mass              : 1
        , width             : 20
        , height            : 20
        , frictionMagnitude : 0.1
        , speed             : 1
        , isBounce          : false
        })
      , face: GameTurf.face({ color: "black" })
      , lastPositions: GameTurf.lastPositions({
          color: {
            r: 255
          , g: 255
          , b: 255
          }
        })
      , movementDirectionData: {
          interaction: false
        , vector: {
            x: 0
          , y: 0
          }
        }
      , color: "white"

      , init: function(){
          
          if (enemy.face){
             enemy.face.init(enemy.physics.width)
          }

          GameTurf.entityManager.add(enemy)
          GameTurf.entityCollisionDetection.add(enemy)
        }

      , update: function(timeElapsed){

          enemy.movementDirectionData.vector.x    = 0
          enemy.movementDirectionData.vector.y    = 0
          enemy.movementDirectionData.interaction = false
          enemy.movementDirectionData.isRunning   = false

          GameTurf.wind.influenceEntityPhysic(
            enemy.physics
          , enemy.movementDirectionData)

          enemy.movementDirectionData.vector = GameTurf.util.setVectorToLengthOne(
            enemy.movementDirectionData.vector)

          if(enemy.hasKi) {

            enemy.movementDirectionData.interaction = true
            
            if (Math.random() > 0.09) {
              enemy.movementDirectionData.vector.x = player.physics.position.x - enemy.physics.position.x
              enemy.movementDirectionData.vector.y = player.physics.position.y - enemy.physics.position.y
            }

            if (GameTurf.util.vectorLength(enemy.movementDirectionData.vector) > 100) {

              if (Math.random() > 0.55) {
                enemy.movementDirectionData.vector.x = Math.random() - 0.5
                enemy.movementDirectionData.vector.y = Math.random() - 0.5
              } else {
                enemy.movementDirectionData.vector.x = 0
                enemy.movementDirectionData.vector.y = 0
              }
            }
          }

          enemy.lastPositions.update(enemy.physics)
          enemy.physics.update(timeElapsed, enemy.movementDirectionData)

          if (enemy.face) {
            enemy.face.update(
              enemy.physics
            , enemy.movementDirectionData.interaction)
          }
        }

      , draw: function(timeElapsed){

          if(enemy.physics.currentSpeed > 1) {
            //enemy.lastPositions.draw(enemy.physics)
          }

          enemy.physics.draw()

          GameTurf.theatre.drawTriangleFromCenterUpsideDown(
            'stage'
          , enemy.physics
          , enemy.color)

          if (enemy.face) {
            enemy.face.draw(enemy.physics)
          }
        }
      }

    enemy.init()

    return enemy
  }
})
