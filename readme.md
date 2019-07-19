# PaperDoll

This is a Photoshop Plugin, designed to allow the user to quickly select which layers to make visible or change, based on a layer heirarchy.

## Symbols

The following symbols designate how the plugin sees different layers:

- '$' - Static - visible if parent is visible
- '%' - Toggle - checkbox controls visibility (only displayed if parent is visible)
- '#' - Choice - GROUP ONLY - radio buttons control which child is visible (only displayed if parent is visible)
- '*' - Option - only one is visible at a time, based on radio button
- '@' - Linked - Provide button to open linked file to edit contents.

## Flow

* init()
    - add listener to `btn_analyze` (**click**)
        - clear `"div_doc"`
        - analyze *app.activeDocument*
* analyze(*path*)
    - create array of all sub-layers
    - for each sub-layer
        - add to `"div_doc"` with label (see above)
        - analyze(*path* + sub-layer)

## Development Notes

To Call .jsx Photoshop Function from .js - csInterface.evalScript('function + parameters')