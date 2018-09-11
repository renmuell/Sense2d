/******************************************************************************
 * gameTurf.js
 *
 * 
 *****************************************************************************/

define([

  './core/input'
, './core/settings'
, './core/theatre'
, './core/game'
, './core/ui'
, './entityPlugins/lastPositions'
, './entityPlugins/face'
, './entityPlugins/physics'
, './detectors/entityCollisionDetection'
, './managers/entityManager'
, './core/sound'
, './core/util'
, './systems/wind'
, './systems/world'
, './core/math'

],function(

  input
, settings
, theatre
, game
, ui
, lastPositions
, face
, physics
, entityCollisionDetection
, entityManager
, sound
, util
, wind
, world
, math

){

  return {
    settings : settings
,   input    : input
,   theatre  : theatre
,   ui       : ui
,   sound    : sound
,   util     : util
,   game     : game
,   face     : face
,   physics  : physics
,   wind     : wind
,   math     : math
,   world    : world
,   lastPositions : lastPositions
,   entityManager : entityManager
,   entityCollisionDetection : entityCollisionDetection
  }

})
