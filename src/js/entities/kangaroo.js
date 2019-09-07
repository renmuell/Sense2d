 /******************************************************************************
 * kangaroo.js
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
  
      var kangaroo = {
          name    : config.name || "Känguru"
        , hasKi   : true
        , type    : 'kangaroo'
        , physics : GameTurf.physics({
            position: {
              x : config.physics.position.x || 230
            , y : config.physics.position.y || 180
            }
          , mass              : 1
          , width             : 10
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
        , color: "#DEB887"
  
        , init: function(){
            
            if (kangaroo.face){
               kangaroo.face.init(kangaroo.physics.width)
            }
  
            GameTurf.entityManager.add(kangaroo)
            GameTurf.entityCollisionDetection.add(kangaroo)
          }
  
        , update: function(timeElapsed){
  
            kangaroo.movementDirectionData.vector.x    = 0
            kangaroo.movementDirectionData.vector.y    = 0
            kangaroo.movementDirectionData.interaction = false
            kangaroo.movementDirectionData.isRunning   = false
  
            GameTurf.wind.influenceEntityPhysic(
              kangaroo.physics
            , kangaroo.movementDirectionData)
  
            kangaroo.movementDirectionData.vector = GameTurf.util.setVectorToLengthOne(
            kangaroo.movementDirectionData.vector)
  
            if(kangaroo.hasKi) {
  
              kangaroo.movementDirectionData.interaction = true
  
                if (Math.random() > 0.55) {
                    kangaroo.movementDirectionData.vector.x = Math.random() - 0.5
                    kangaroo.movementDirectionData.vector.y = Math.random() - 0.5
                } else {
                    kangaroo.movementDirectionData.vector.x = 0
                    kangaroo.movementDirectionData.vector.y = 0
                }

            }
  
            kangaroo.lastPositions.update(kangaroo.physics)
            kangaroo.physics.update(timeElapsed, kangaroo.movementDirectionData)
  
            if (kangaroo.face) {
              kangaroo.face.update(
                kangaroo.physics
              , kangaroo.movementDirectionData.interaction)
            }
          }
  
        , talk: function () {
            GameTurf.ui.showBubble(kangaroo.physics, kangaroo.name  +": Schnapspralinen", 1000)
        }

        , draw: function(timeElapsed){
  
            if(kangaroo.physics.currentSpeed > 1) {
              //kangaroo.lastPositions.draw(kangaroo.physics)
            }
  
            kangaroo.physics.draw()

            GameTurf.theatre.drawSquareFromCenter(
                'stage'
              , kangaroo.physics
              , kangaroo.color)
  
            if (kangaroo.face) {
              kangaroo.face.draw(kangaroo.physics)
            }
          }
        }
  
      kangaroo.init()
  
      return kangaroo
    }
  })
  