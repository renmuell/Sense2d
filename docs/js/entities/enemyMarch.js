 /******************************************************************************
 * enemyMarch.js
 *
 * 
 *****************************************************************************/

define([

  'gameTurf/gameTurf'
, './player'

],function(

  GameTurf
, player

){

  return function(config) {

    config         = config         || {}
    config.physics = config.physics || {}

    var enemy = {
        name    : undefined
      , hasKi   : true
      , physics : GameTurf.physics({
          x : config.physics.x || 230
        , y : config.physics.y || 180
        , mass              : 0.01
        , width             : 20
        , height            : 20
        , frictionMagnitude : 0.1
        , speed             : (Math.random() * 2) + 1
        , isBounce          : false
        })
      , face          : GameTurf.face({ color: "white" })
      , lastPositions : GameTurf.lastPositions({
          color : {
            r: 255
          , g: 255
          , b: 255
          }
        })
      , movementDirectionData: {
          interaction : false
        , vector      : {
            x: 0
          , y: 0
          }
        }
      , color: "red"
      , currentPathTarget: 0
      , path: config.path || [
          { x: 0   , y: 100  }
        , { x: -100, y: 0    }
        , { x: -50 , y: -100 }
        , { x: 0   , y: 0    }
        , { x: 50  , y: -100 }
        , { x: 100 , y: 0    }
        ]
      , init: function(){

          for (var i = enemy.path.length - 1; i >= 0; i--) {
            enemy.path[i].x += 200
            enemy.path[i].y += 200
          }

          if (enemy.face) {
            enemy.face.init(enemy.physics.width)
          }

          GameTurf.entityManager.add(enemy)
          GameTurf.entityCollisionDetection.add(enemy)
        }

      , update: function(){

          enemy.movementDirectionData.vector.x    = 0
          enemy.movementDirectionData.vector.y    = 0
          enemy.movementDirectionData.interaction = false
          enemy.movementDirectionData.isRunning   = false

          if(enemy.hasKi) {

            enemy.movementDirectionData.vector.x 
              = enemy.path[enemy.currentPathTarget].x - enemy.physics.x
            enemy.movementDirectionData.vector.y 
              = enemy.path[enemy.currentPathTarget].y -  enemy.physics.y

            if (GameTurf.util.vectorLength(enemy.movementDirectionData.vector) < 2) {
              enemy.currentPathTarget = (enemy.currentPathTarget + 1) % enemy.path.length
            }
            enemy.movementDirectionData.vector = 
              GameTurf.util.setVectorToLengthOne(
                enemy.movementDirectionData.vector)
          }

          GameTurf.wind.incluenceEntityPhysic(
            enemy.physics
          , enemy.movementDirectionData)
          
          enemy.movementDirectionData.vector = 
            GameTurf.util.setVectorToLengthOne(
              enemy.movementDirectionData.vector)

          enemy.lastPositions.update(enemy.physics)
          enemy.physics.update(enemy.movementDirectionData)

          if (enemy.face) {
            enemy.face.update(
              enemy.physics
            , enemy.movementDirectionData.interaction)
          }
        }

      , draw: function(){
          //GameTurf.theatre.drawPath('stage', enemy.path, 0, 'red', 1, enemy.path.length)

          enemy.lastPositions.draw(enemy.physics)

          enemy.physics.draw()

          GameTurf.theatre.drawTrianlgeFromCenterUpsideDown(
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
