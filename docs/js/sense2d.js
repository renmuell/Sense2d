/******************************************************************************
 * pussycat.js
 *
 * 
 *****************************************************************************/

require.config({
    paths: {
      gameTurf    : '../vendors/gameTurf-min'
      //gameTurf    : '../../../gameTurf.js/build/gameTurf'
    }
  , shim: {
      gameTurf: {
        exports: 'gameTurf'
      }
  }
})

require([

  'gameTurf'
, 'entities/player'
, 'worlds/world3'
, 'levels/level3'

], function(

  GameTurf
, player
, world
, level

){

  window.player = player
  window.level = level
  window.world = world

  window.GameTurf = GameTurf

  player.init()
  level.create()
  world.init()

  GameTurf.game.init({
      effects: [
          { id: 'colide' , src: "sounds/jump.ogg"  , volume: .03}
        , { id: 'hello'  , src: "sounds/hello.ogg" , volume: .03}
        , { id: 'walk'   , src: "sounds/walk.ogg"  , volume:  .7}
        , { id: 'running', src: "sounds/walk.ogg"  , volume:   1}
        , { id: 'wind'   , src: "sounds/breath.ogg", volume:  .4}
        , { id: 'openChest', src: "sounds/SFXWoodenObjectOpen.ogg", volume: .7} 
        , { id: 'catMeowing', src: "sounds/cat_meowing.ogg", volume: .7} 
        , { id: 'catPurrs', src: "sounds/cat_purrs.ogg", volume: 5} 
        , { id: 'opening', src: "sounds/opening.ogg", volume: .7} 
      ]
    , backgroundSong: {
      src: 'sounds/inside.mp3',
      volume: 0// 0.1
    }
  })

})
