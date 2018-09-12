/******************************************************************************
 * pussycat.js
 *
 * 
 *****************************************************************************/

require.config({
    paths: {
      gameTurf    : '../vendors/gameTurf-min'
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
      ]
    , backgroundSong: {
      src: 'sounds/inside.mp3',
      volume: 0.1
    }
  })

})
