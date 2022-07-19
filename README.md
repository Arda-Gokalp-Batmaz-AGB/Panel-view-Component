# Panel View

## Description

The objective of the project was creating a panel-view component that can be used by the developers who want to use this componenent in their projects. Therefore demo and implementation of the panel-view component has been seperated from each other. Panel-view components contains header, content and footer parts in itself.

## Usage

Firstly, design this html block on the body part of html file and also make sure that css classes are present in the stylesheet of the project.

`


        <div id="MyPanel1" class="panel">
            <div class="panel-head">
            </div>
            <div class="panel-content">
            </div>
            <div class="panel-foot">
            </div>
        </div>
`

After that, put the script source of the panel.js class at the bottom of the body part.

`<script src="../src/js/panel.js"></script>`

Finally, panel-view components can be created by using "new" keyword. While creating a new panel-view object, up to 3 arguments can be used.

`var newpanel = new panel(panelID, allowFullScreenButton (default value is true),allowRemoveButton (default value is true));`

## Usage Examples
- Creates a new panel that has a id of "MyPanel1" and creates a full screen button and remove button for the panel.

`var newpanel = new panel("MyPanel1");`
- Creates a new panel that has a id of "MyPanel2" and creates a full screen button but not creates a remove button for the panel.

`var newpanel = new panel("MyPanel2",true,false);`

- Creates a new panel that has a id of "MyPanel3" and creates remove button but not creates a full screen button for the panel.

`var newpanel = new panel("MyPanel3",false,true);`

### Methods of the component

Component contains two methods that are used for making the panel full screen and removing.

Toggles the full screen attribute of the panel component.

`panel.toggleFullScreen()`

Removes the specified panel from the component list and html body.

`panel.removePanel()`


