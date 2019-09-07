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
  
    if (GameTurf.ui.datGui) {
      var cats = GameTurf.ui.datGui.addFolder("Cats")
    }  

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
            lineWidth: 2
          , shouldDrawBodies: false
          , color: {
              r: 165
            , g: 42
            , b: 42
            }
          })
        , degreeToPlayer: 0
        , movementDirectionData: {
            interaction: false
          , vector: {
              x: 0
            , y: 0
            }
          }
        , color: "brown"
        , playerWalkRadius: 30
        , playerRotationDirection: 1
        , playerCurrentWalkRadius: 50

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
  
            GameTurf.wind.influenceEntityPhysic(
              cat.physics
            , cat.movementDirectionData)
  
            cat.movementDirectionData.vector = GameTurf.util.setVectorToLengthOne(
              cat.movementDirectionData.vector)
  
            if(cat.hasKi) {
  
              cat.movementDirectionData.interaction = true

              var distanz = GameTurf.util.vectorDistanz(
                player.physics.position
              , cat.physics.position)

              if (distanz < 200) {

                cat.degreeToPlayer = GameTurf.util.getVectorAngleDegree(
                  player.physics.position
                , cat.physics.position
                )

                if (Math.random() > 0.997) {
                  cat.playerRotationDirection *= -1
                }

                if (Math.random() > 0.97) {
                  cat.playerCurrentWalkRadius = cat.playerWalkRadius - ((Math.random()*20)-10)
                }

                var goToDegree = (((cat.degreeToPlayer + 180) + (cat.playerRotationDirection * 10) ) % 360) - 180;

                var goToPosition = GameTurf.util.getPositionByDegree(
                  player.physics.position
                , goToDegree
                , cat.playerCurrentWalkRadius
                );
                
                cat.movementDirectionData.vector.x = goToPosition.x - cat.physics.position.x
                cat.movementDirectionData.vector.y = goToPosition.y - cat.physics.position.y
              } 
  
              if (GameTurf.util.vectorLength(cat.movementDirectionData.vector) == 0) {
  
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
            
            GameTurf.theatre.drawTriangleFromCenterUpsideDown(
              'stage'
            , cat.physics
            , cat.color)
  
            GameTurf.theatre.drawTriangleFromCenter(
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

            GameTurf.theatre.drawTriangleFromCenter(
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
  
      if (GameTurf.ui.datGui) {
        var datGuiFolder = cats.addFolder("Cat - " + cat.Id)
        GameTurf.ui.datGui.remember(cat)
        datGuiFolder.add(cat, "color")
        datGuiFolder.add(cat, "hasKi")
        if (cat.name)
          datGuiFolder.add(cat, "name")
        datGuiFolder.add(cat, "type")
        datGuiFolder.add(cat, "playerWalkRadius")
        datGuiFolder.add(cat, "degreeToPlayer").listen()
  
        datGuiFolder.add(cat.movementDirectionData.vector, "x").listen()
        datGuiFolder.add(cat.movementDirectionData.vector, "y").listen()
        datGuiFolder.add(cat.movementDirectionData, "interaction").listen()
  
        cat.lastPositions.addToDatGuiFolder(datGuiFolder)
        cat.physics.addToDatGuiFolder(datGuiFolder)
        cat.face.addToDatGuiFolder(datGuiFolder)
      }

      return cat
    }
  })
  