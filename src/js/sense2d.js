/******************************************************************************
 * pussycat.js
 *
 * 
 *****************************************************************************/

require.config({
    paths: {
        howler   : '../vendors/howler.min'
      , datGui   : '../vendors/dat.gui.min'
      , stats    : '../vendors/stats.min'
      , QuadTree :'../vendors/QuadTree'
      , SpatialHash :'../vendors/spatialhash'
    }
  , shim: {
      howler: {
        exports: 'Howler'
      }
    , datGui: {
        exports: 'dat'
      }
    , stats: {
        exports: 'Stats'
      }
    , SpatialHash :{
       exports: 'SpatialHash'
    }
    , QuadTree :{
       exports: 'QuadTree'
    }
  }
})

require([

  'gameTurf/gameTurf'
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
