/******************************************************************************
 * ui.js
 *
 * 
 *****************************************************************************/

define([

  'datGui'
, './settings'

],function(

  dat
, settings

){

  /**
   *  
   */ 
  var ui = {

    /**
     *  
     */ 
    menu  : document.getElementById("Menu")

    /**
     *  
     */ 
  , continueBtn  : document.getElementById("continue")

    /**
     *  
     */ 
  , datGui: settings.datGuiIsOn ? new dat.GUI() : undefined    

  , init: function(continueGameCallback){
      ui.continueBtn.addEventListener('click', function(){
        continueGameCallback();
      })
    }

    /**
     *  
     */ 
  , openMenu: function(){
      ui.menu.className = ""
    }

    /**
     *  
     */ 
  , closeMenu: function(){
      ui.menu.className = "hide"
    }
  }

  return ui

})
