/******************************************************************************
 * level3.js
 *
 * 
 *****************************************************************************/

define([

  'entities/ball'
, 'entities/chest'
, 'entities/enemyMarch'
, 'entities/enemy'
, 'entities/cat'
, 'entities/npc'
, 'entities/kangaroo'
],function(

  Ball
, Chest
, EnemyMarch
, Enemy
, Cat
, NPC
, Kangaroo
){

  var level = {

      create: function(){

        Ball({
          name: 'Ballerina'
        , hasKi: false
        })

        Chest()
     
        NPC({       
          name: "Jon"  
        , hasKi: true
        , physics: {
            position: {
              x: 700
            , y: 300
            }
          }
        })

        Kangaroo({       
          hasKi: true
        , physics: {
            position: {
              x: 300
            , y: 700
            }
          }
        })

        Cat({
          hasKi: true
          , physics: {
              position: {
                x: (Math.random() * 100) + 200
              , y: (Math.random() * 100) + 200
              }
            }
        })
       
        for (var i = 10; i >= 0; i--) {
          EnemyMarch({
            hasKi: true
          , physics: {
              position: {
                x: (Math.random() * 200) + 200
              , y: (Math.random() * 200) + 200
              }
            }
          })
        }
   
        for (var i = 3; i >= 0; i--) {
          Enemy({
            hasKi: true
          , physics: {
              position: {
                x: (Math.random() * 700) + 200
              , y: (Math.random() * 700) + 200
              }
            }
          })
        }
     
      }
  }

  return level

})
