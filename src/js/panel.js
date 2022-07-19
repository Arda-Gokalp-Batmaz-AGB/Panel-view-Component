/**
 * @author Arda Gokalp Batmaz <arda.batmaz@piworks.net>
 * @description A script that creates a panel-view component structure
 * that can be used by any personal projects
 */

/**
 * A class that provides observer pattern for the panel view objects.
 */
function FullScreenController() {
  this.observers = [];
}
FullScreenController.prototype = {
  /**
   * Returns the index of specified panel object in the observers list
   * @param {panel object} observer 
   * @returns Index of specified panel object
   */
  getIndex: function(observer) {
    return this.observers.indexOf(observer)
  },
  /**
   * Makes a panel object observer
   * @param {panel object} observer 
   */
  subscribe: function(observer) {
    this.observers.push(observer);
  },
  /**
   * Removes observer permission from the specified panel
   * @param {panel object} observer 
   */
  unsubscribe: function(observer) {
    this.observers = this.observers.filter(item => item !== observer)
  },

  /**
   * Toggles the full screen of the specified observer panel
   * @param {panel object} observer 
   */
  notify: function (observer) {
    let observerIndex = this.getIndex(observer);
    if(observerIndex > -1) {
      if(observer.fullScreen == true)
      {
        observer.toggleFullScreen();
      }
      this.notify(observerIndex);
    }
  },
  /**
   * Notifies all of the panel objects and toggles screen of every panel
   * if they are in the fullscreen mode
   */
  notifyAll: function () {
    for (let i = 0; i < this.observers.length; i++) {
      this.notify(this.observers[i]);
    }
  },
  /**
   * Checks if there are any full screen panels in the site
   * if there is a full screen panel, makes other panels hidden
   */
  checkFullScreens : function () {
    let result = false;
    for (let i = 0; i < this.observers.length; i++)  { 
      const observer = this.observers[i];
      if(result != true)
      {
        result = this.IsFullScreenOccurs(observer);
      }
    }   
    //console.log(result);
    if(result == true)//if there is a full screen, set panel-hidden
    {
      this.IteratePanels("add","panel-hidden");
    }
    else // if not, remove panel-hidden
    {
      this.IteratePanels("remove","panel-hidden");
    } 
  },

  /**
   * Iterates all the panels and removes or adds classes
   * depending on the parameters
   * @param {add or remove operation} command 
   * @param {specified class} param 
   */
  IteratePanels : function (command,param) {
    for (let i = 0; i < this.observers.length; i++) { 
      const observer = this.observers[i];
      if(this.IsFullScreenOccurs(observer) != true)
      {
        if(command == "add")
        {
          observer.panelElement.classList.add(param);
        }
        else if(command == "remove")
        {
          observer.panelElement.classList.remove(param);
        }
      }      
    }
  },
  /**
   * Checks if there are any full screen panel
   * @param {panel object} observer 
   * @returns occurs or not
   */
  IsFullScreenOccurs: function (observer) {
    let observerIndex = this.getIndex(observer);
    if(observerIndex > -1) {
      if(observer.fullScreen == true)
      {
        return true;
      }
      this.IsFullScreenOccurs(observerIndex);
    }
  }
}


const screencontroller = new FullScreenController();

/**
 * This class creates a panel object depending on the given attributes
 * also it uses panelbutton class as a helper class while creating buttons
 * on the panels
 * @param {ID of the panel} panelID 
 * @param {allow full screen or not default:true} allowFullScreenButton 
 * @param {allow remove button or not default:true} allowRemoveButton 
 */
function panel(panelID, allowFullScreenButton = true,allowRemoveButton = true){  
    var self = this;
    self.ID = panelID,
    self.panelElement = document.getElementById(panelID),
    self.fullScreen = false,
    /**
     * Returns the panel id
     * @returns ID of the panel
     */
    self.toString = function () {
         return self.ID;
    };
    /**
     * Toggles the screen of the specified panel.
     */
    self.toggleFullScreen = function () {
        if(self.fullScreen == false)
        {
           screencontroller.notifyAll();
           self.panelElement.classList.add("panel-fullscreen");
           self.fullScreen = true;
           console.log(self.ID + " Switched to Full Screen");
        }
        else
        {
            self.panelElement.classList.remove("panel-fullscreen");
            self.fullScreen = false;
            console.log(self.ID  + " Switched to Small Screen")
        }
        screencontroller.checkFullScreens();
   };
   
   /**
    * Removes the panel
    */
   self.removePanel = function () 
   {
     self.panelElement.parentNode.removeChild(self.panelElement); 
     screencontroller.unsubscribe(self);     
     screencontroller.checkFullScreens(); 
     console.log(screencontroller.observers);
   }

   if(allowFullScreenButton == true)
      this.fullscreenbtn = new PanelButton("zoom-btn","Full Screen","zoombtn_",self.toggleFullScreen,self);
    if(allowRemoveButton == true)
      this.removebtn = new PanelButton("remove-btn","Remove","removebtn_",self.removePanel,self);

   screencontroller.subscribe(self);
   console.log(screencontroller.observers);
}

/**
 * This is a helper class of the panel. It is used for 
 * creating custom buttons on the specified sections of the panels
 * @param {name of the button class} className 
 * @param {text of the button} innerText 
 * @param {ID of the button} id 
 * @param {function that will be trigger after click} eventType 
 * @param {parent element of the button} parent 
 * @param {which part of the panel default:0 (header)} section 
 */
function PanelButton(className,innerText,id, eventType,parent,section=0) {//section = 0
    var self = this;
    this.buttonElement = document.createElement("button");
    this.buttonElement.className = className;
    this.buttonElement.innerText = innerText;
    this.buttonElement.id = id + parent.ID;
    this.buttonElement.onclick = function(event) {
      eventType();
    } 
    console.log(parent);
    parent.panelElement.children[section].insertBefore(this.buttonElement,parent.panelElement.children[section].children[0]); 
}