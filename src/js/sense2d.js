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

  GameTurf.game.init()

})
