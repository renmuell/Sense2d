/******************************************************************************
 * chest.js
 *
 * 
 *****************************************************************************/

define([

    'gameTurf'
  
  ],function(
  
    GameTurf
  
  ){
  
    if (GameTurf.ui.datGui) {
      var chests = GameTurf.ui.datGui.addFolder("Chest")
    }
  
    return function(config) {
  
      config         = config         || {}
      config.physics = config.physics || {}
  
      var chest = {
          type: "chest"
        , isOpen: false
        , physics : GameTurf.physics({
            x                 : config.physics.x || 30
          , y                 : config.physics.y || 10
          , mass              : 10
          , width             : 30
          , height            : 15
          , frictionMagnitude : 1
          , speed             : 1
          , isBounce          : false
          })
        , colorOpen: "#ee00ee"
        , colorClose: "#cccccc"
  
        , init: function(){  
            GameTurf.entityManager.add(chest)
            GameTurf.entityCollisionDetection.add(chest)
          }
  
        , update: function(){
            if (chest.physics.velocity)
              chest.physics.update({
                vector: chest.physics.velocity
              })
          }
  
        , draw: function(){
  
            chest.physics.draw()
  
            GameTurf.theatre.drawSquareFromCenter(
              'stage'
            , chest.physics
            , chest.isOpen ? chest.colorOpen : chest.colorClose)
          }
        , tryOpenChest: function() {
            if (!chest.isOpen) {
                chest.isOpen = true;
                GameTurf.sound.playEffect('openChest', true)
            }
        }
      }
  
      chest.init()
  
      if (GameTurf.ui.datGui) {
        var datGuiFolder = chests.addFolder("Ball - " + chest.Id)
        GameTurf.ui.datGui.remember(chest)
        datGuiFolder.addColor(chest, "color")
  
        chest.physics.addToDatGuiFolder(datGuiFolder)
      }
  
      return chest
    }
  })
  