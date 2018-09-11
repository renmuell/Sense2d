/******************************************************************************
 * level3.js
 *
 * 
 *****************************************************************************/

define([

  'entities/ball'
, 'entities/enemyMarch'

],function(

  Ball
, Enemy

){

  var level = {

      create: function(){

        Ball({
          name: 'Ballerina'
        , hasKi: false
        })

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
