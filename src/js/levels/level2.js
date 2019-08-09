/******************************************************************************
 * level2.js
 *
 * 
 *****************************************************************************/

define([

  'entities/ball'
, 'entities/enemy'

],function(

  Ball
, Enemy

){

  var level2 = {

      create: function(){

        Ball({
          name  : 'Ballerina'
        , hasKi : false
        })

        for (var i = 10; i >= 0; i--) {
          Enemy({
            hasKi   : true
          , physics : {
              position: {
                x: Math.random() * (50 * 40)
              , y: Math.random() * (50 * 52)
              }
            }
          })
        }

        for (var i = -1; i >= 0; i--) {
          Ball({
            hasKi   : false
          , physics : {
              position: {
                x: 30 * (i % 10) + 60
              , y: 30 * (i % 10) + 60
              }
            }
          })
        }
      }
  }

  return level2

})
