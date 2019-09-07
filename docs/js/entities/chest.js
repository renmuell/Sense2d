/**
 * chest.js
 *
 * 
 */

define([

    'gameTurf'
  
  ],function(
  
    GameTurf
  
  ){
  
    if (GameTurf.ui.datGui) {
      var chests = GameTurf.ui.datGui.addFolder("Chests")
    }
  
    return function(config) {
  
      config         = config         || {}
      config.physics = config.physics || {
        position: config.position || { x:0, y:0 }
      }
  
      var chest = {
          type: "chest"
        , isOpen: false
        , physics : GameTurf.physics({
            position: {
                x : config.physics.position.x || 80
              , y : config.physics.position.y || 10
            }
          , mass              : 10
          , width             : 30
          , height            : 15
          , frictionMagnitude : 1
          , speed             : 1
          , isBounce          : false
          })
        , interaction: GameTurf.interaction({
            onInteraction: function (entity) {
              chest.isOpen = true;
            },
            drawHighlightBox: function() {

            }
          })
        , colorOpen: "#ee00ee"
        , colorClose: "#cccccc"
  
        , init: function(){  
            GameTurf.entityManager.add(chest)
            GameTurf.entityCollisionDetection.add(chest)
          }
  
        , update: function(timeElapsed){
            if (chest.physics.velocity)
              chest.physics.update(timeElapsed, {
                vector: chest.physics.velocity
              })
          }
  
        , draw: function(timeElapsed){
  
            chest.physics.draw()
  
            GameTurf.theatre.drawSquareFromCenter(
              'stage'
            , chest.physics
            , chest.isOpen ? chest.colorOpen : chest.colorClose)
          }
        , tryOpenChest: function() {
            if (!chest.isOpen) {
                chest.isOpen = true;
                GameTurf.sound.playEffect('opening', true)
            }
        }
      }
  
      chest.init()
  
      if (GameTurf.ui.datGui) {
        var datGuiFolder = chests.addFolder("Chest - " + chest.Id)
        GameTurf.ui.datGui.remember(chest)
        datGuiFolder.add(chest, "isOpen").listen()
        datGuiFolder.add(chest, "colorOpen")
        datGuiFolder.add(chest, "colorClose")
        datGuiFolder.add(chest, "type")

        chest.physics.addToDatGuiFolder(datGuiFolder)
      }
  
      return chest
    }
  })
  