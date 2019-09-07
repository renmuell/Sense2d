/******************************************************************************
 * ball.js
 *
 * 
 *****************************************************************************/

define([

  'gameTurf'

],function(

  GameTurf

){

  if (GameTurf.ui.datGui) {
    var balls = GameTurf.ui.datGui.addFolder("Balls")
  }

  return function(config) {

    config         = config         || {}
    config.physics = config.physics || {
      position: config.position || { x:0, y:0 }
    }

    var ball = {
        name    : config.name   || undefined
      , type    : 'ball'
      , hasKi   : config.hasKi !== undefined ? config.hasKi : true
      , physics : GameTurf.physics({
          position: {
            x : config.physics.position.x || 230
          , y : config.physics.position.y || 100
          }
        , mass              : 0.1
        , width             : 15
        , height            : 15
        , frictionMagnitude : 0.1
        , speed             : 6
        , isBounce          : true
        })
      , face          : config.hasKi ? GameTurf.face() : undefined
      , lastPositions : GameTurf.lastPositions({
          color: {
            r: 247
          , g: 220
          , b: 231
          }
        })
      , movementDirectionData: {
         interaction : false
        , vector     : {
            x: 0
          , y: 0
          }
        }
      , color: "#f7dce7"

      , init: function(){

          if (ball.face) {
            ball.face.init(ball.physics.width)
          }

          GameTurf.entityManager.add(ball)
          GameTurf.entityCollisionDetection.add(ball)
        }

      , update: function(timeElapsed){

          ball.movementDirectionData.vector.x    = 0
          ball.movementDirectionData.vector.y    = 0
          ball.movementDirectionData.interaction = false
          ball.movementDirectionData.isRunning   = false

          GameTurf.wind.influenceEntityPhysic(
            ball.physics
          , ball.movementDirectionData.vector)

          if(ball.hasKi) {
            if (Math.random() > 0.995) {
              ball.movementDirectionData.vector.x    = Math.random()
              ball.movementDirectionData.vector.y    = Math.random()
              ball.movementDirectionData.interaction = true
            }
          }

          ball.lastPositions.update(ball.physics)
          ball.physics.update(timeElapsed, ball.movementDirectionData)

          if (ball.face) {
            ball.face.update(
              ball.physics
            , ball.movementDirectionData.interaction)
          }
        }

      , draw: function(timeElapsed){

          if(ball.physics.currentSpeed > 1) {
            ball.lastPositions.draw(ball.physics)
          }

          ball.physics.draw()

          GameTurf.theatre.drawCircle(
            'stage'
          , ball.physics
          , ball.color)

          if (ball.face) {
            ball.face.draw(ball.physics)
          }
        }
    }

    ball.init()

    if (GameTurf.ui.datGui) {
      var datGuiFolder = balls.addFolder("Ball - " + ball.Id)
      GameTurf.ui.datGui.remember(ball)
      datGuiFolder.addColor(ball, "color")
      datGuiFolder.add(ball, "hasKi")
      datGuiFolder.add(ball, "name")
      datGuiFolder.add(ball, "type")

      datGuiFolder.add(ball.movementDirectionData.vector, "x").listen()
      datGuiFolder.add(ball.movementDirectionData.vector, "y").listen()
      datGuiFolder.add(ball.movementDirectionData, "interaction").listen()

      ball.lastPositions.addToDatGuiFolder(datGuiFolder)
      ball.physics.addToDatGuiFolder(datGuiFolder)
      if (ball.hasKi)
        ball.face.addToDatGuiFolder(datGuiFolder)
    }

    return ball
  }
})
