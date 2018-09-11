/******************************************************************************
 * level1.js
 *
 * 
 *****************************************************************************/

define([

  'entities/ball'

],function(

  Ball

){

  var level1 = {
      create: function(){
          Ball({
            name : 'Ballerina'
          , hasKi: false
          })
      }
  }

  return level1

})
