/******************************************************************************
 * level3.js
 *
 * 
 *****************************************************************************/

define([

  'entities/ball'
, 'entities/chest'
, 'entities/enemyMarch'

],function(

  Ball
, Chest
, Enemy

){

  var level = {

      create: function(){

        Ball({
          name: 'Ballerina'
        , hasKi: false
        })

        Chest()
     
        for (var i = 10; i >= 0; i--) {
          Enemy({
            hasKi: true
          , physics: {
              x: (Math.random() * 200) + 200
            , y: (Math.random() * 200) + 200
            }
          })
        }
   
      }
  }

  return level

})
