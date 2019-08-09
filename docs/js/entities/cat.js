 /******************************************************************************
 * cat.js
 *
 * 
 *****************************************************************************/

define([

    'gameTurf'
  , './player'
  
  ],function(
  
    GameTurf
  , player
  
  ){
  
    return function(config) {
  
      config         = config         || {}
      config.physics = config.physics || {
        position: config.position || { x:0, y:0 }
      }
  
      var cat = {
          name    : undefined
        , hasKi   : true
        , type    : 'cat'
        , physics : GameTurf.physics({
            position: {
              x : config.physics.position.x || 230
            , y : config.physics.position.y || 180
            }
          , mass              : 0.01
          , width             : 15
          , height            : 9
          , frictionMagnitude : 0.88888
          , speed             : 1
          , isBounce          : false
          })
        , face: GameTurf.face({ color: "white" })
        , lastPositions: GameTurf.lastPositions({
            shouldDrawBodies: false,
            color: {
              r: 165
            , g: 42
            , b: 42
            }
          })
        , movementDirectionData: {
            interaction: false
          , vector: {
              x: 0
            , y: 0
            }
          }
        , color: "brown"
  
        , init: function(){
            
            if (cat.face){
               cat.face.init(cat.physics.width)
            }
  
            GameTurf.entityManager.add(cat)
            GameTurf.entityCollisionDetection.add(cat)
          }
  
        , purr: function() {
            GameTurf.sound.playEffect('catPurrs', true)
        }

        , update: function(timeElapsed){
  
            if (Math.random() > 0.99) {
                GameTurf.sound.playEffect('catMeowing', true)
            }

            cat.movementDirectionData.vector.x    = 0
            cat.movementDirectionData.vector.y    = 0
            cat.movementDirectionData.interaction = false
            cat.movementDirectionData.isRunning   = false
  
            GameTurf.wind.incluenceEntityPhysic(
              cat.physics
            , cat.movementDirectionData)
  
            cat.movementDirectionData.vector = GameTurf.util.setVectorToLengthOne(
              cat.movementDirectionData.vector)
  
            if(cat.hasKi) {
  
              cat.movementDirectionData.interaction = true
              
              if (Math.random() > 0.09 && !cat.physics.objectCollision) {
                cat.movementDirectionData.vector.x = player.physics.position.x - cat.physics.position.x
                cat.movementDirectionData.vector.y = player.physics.position.y - cat.physics.position.y
              }
  
              if (GameTurf.util.vectorLength(cat.movementDirectionData.vector) > 100) {
  
                if (Math.random() > 0.55) {
                  cat.movementDirectionData.vector.x = Math.random() - 0.5
                  cat.movementDirectionData.vector.y = Math.random() - 0.5
                } else {
                  cat.movementDirectionData.vector.x = 0
                  cat.movementDirectionData.vector.y = 0
                }
              }
            }
  
            cat.lastPositions.update(cat.physics)
            cat.physics.update(timeElapsed, cat.movementDirectionData)
  
            if (cat.face) {
              cat.face.update(
                cat.physics
              , cat.movementDirectionData.interaction)
            }
          }
  
        , draw: function(timeElapsed){
  
            cat.lastPositions.draw(cat.physics)
  
            cat.physics.draw()
            
            GameTurf.theatre.drawTrianlgeFromCenterUpsideDown(
              'stage'
            , cat.physics
            , cat.color)
  
            GameTurf.theatre.drawTrianlgeFromCenter(
                'stage'
              , {
                  position: {
                    x: cat.physics.position.x + cat.physics.halfWidth - 3
                  , y: cat.physics.position.y - cat.physics.halfHeight - 2
                  }
                , halfWidth: 2
                , halfHeight: 2
              }
              , cat.color)

            GameTurf.theatre.drawTrianlgeFromCenter(
                'stage'
                , {
                    position: {
                      x: cat.physics.position.x - cat.physics.halfWidth + 3
                    , y: cat.physics.position.y - cat.physics.halfHeight - 2
                    }
                  , halfWidth: 2
                  , halfHeight: 2
                }
                , cat.color)

            if (cat.face) {
              cat.face.draw(cat.physics)
            }
          }
        }
  
      cat.init()
  
      return cat
    }
  })
  