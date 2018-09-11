/******************************************************************************
 * gameTurf.js
 *
 * 
 *****************************************************************************/

define([

  './../helpers/tilesHelper'
, './../detectors/worldCollsitionDetection'

],function(

  tilesHelper
, worldCollsitionDetection

){

  var world = {

      map              : undefined
    , worldWith        : undefined
    , wolrdHeight      : undefined
    , mapWithTileTypes : undefined

      /**
       *  Initialize the World.
       *
       *  @param {array[number]} map  
       *  @param {number} height
       *  @param {number} width 
       */
    , init: function(
        map 
      , height 
      , width
      ){
        world.map              = map
        world.worldWith        = width
        world.wolrdHeight      = height
        world.mapWithTileTypes = tilesHelper.calculateMapWithTileTypes(
          world.map
        , world.worldWith
        , world.wolrdHeight)
      }

      /**
       *  Detect if hitbox is coliding with the world border.
       *  
       *  @param {} 
       */
    , collsitionDetection: function(
        hitbox
      , moveDirectionVector
      , isBounce
      ){  
        return worldCollsitionDetection.collsitionDetection(
          world.mapWithTileTypes
        , world.worldWith
        , world.wolrdHeight
        , hitbox
        , moveDirectionVector
        , isBounce)
      }

      /**
       *
       */
    , draw: function() {
        tilesHelper.drawTiles(
          world.mapWithTileTypes
        , world.worldWith
        , world.wolrdHeight)
      }
  };

  return world

})
