 /******************************************************************************
 * npc.js
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
      var npcs = GameTurf.ui.datGui.addFolder("NPCs")
    }

    return function(config) {
  
      config         = config         || {}
      config.physics = config.physics || {
        position: config.position || { x:0, y:0 }
      }
  
      var npc = {
          name    : config.name || "???"
        , hasKi   : true
        , type    : 'npc'
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
        , color: "#FDF4C2"
  
        , init: function(){
            
            if (npc.face){
               npc.face.init(npc.physics.width)
            }
  
            GameTurf.entityManager.add(npc)
            GameTurf.entityCollisionDetection.add(npc)
          }
  
        , update: function(timeElapsed){
  
            npc.movementDirectionData.vector.x    = 0
            npc.movementDirectionData.vector.y    = 0
            npc.movementDirectionData.interaction = false
            npc.movementDirectionData.isRunning   = false
  
            GameTurf.wind.influenceEntityPhysic(
              npc.physics
            , npc.movementDirectionData)
  
            npc.movementDirectionData.vector = GameTurf.util.setVectorToLengthOne(
            npc.movementDirectionData.vector)
  
            if(npc.hasKi) {
  
              npc.movementDirectionData.interaction = true
  
                if (Math.random() > 0.55) {
                    npc.movementDirectionData.vector.x = Math.random() - 0.5
                    npc.movementDirectionData.vector.y = Math.random() - 0.5
                } else {
                    npc.movementDirectionData.vector.x = 0
                    npc.movementDirectionData.vector.y = 0
                }

            }
  
            npc.lastPositions.update(npc.physics)
            npc.physics.update(timeElapsed, npc.movementDirectionData)
  
            if (npc.face) {
              npc.face.update(
                npc.physics
              , npc.movementDirectionData.interaction)
            }
          }
  
        , talk: function () {
            GameTurf.ui.showBubble(npc.physics, npc.name  +": Fuck you!", 1000)
        }

        , draw: function(timeElapsed){
  
            if(npc.physics.currentSpeed > 1) {
              //npc.lastPositions.draw(npc.physics)
            }
  
            npc.physics.draw()

            GameTurf.theatre.drawSquareFromCenter(
                'stage'
              , npc.physics
              , npc.color)
  
            if (npc.face) {
              npc.face.draw(npc.physics)
            }
          }
        }
  
      npc.init()
  
      if (GameTurf.ui.datGui) {
        var datGuiFolder = npcs.addFolder("NPC - " + npc.Id)
        GameTurf.ui.datGui.remember(npc)
        
        datGuiFolder.add(npc, "type")
        datGuiFolder.add(npc, "color")
        datGuiFolder.add(npc, "name")
        datGuiFolder.add(npc, "hasKi")

        datGuiFolder.add(npc.movementDirectionData.vector, "x").listen()
        datGuiFolder.add(npc.movementDirectionData.vector, "y").listen()
        datGuiFolder.add(npc.movementDirectionData, "interaction").listen()
  
        npc.physics.addToDatGuiFolder(datGuiFolder)
        npc.lastPositions.addToDatGuiFolder(datGuiFolder)
        npc.face.addToDatGuiFolder(datGuiFolder)
      }

      return npc
    }
  })
  