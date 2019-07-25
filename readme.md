# PaperDoll

This is a Photoshop Plugin, designed to allow the user to quickly select which layers to make visible or change, based on layer hierarchy.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This is an extension for Adobe Photoshop CC, which must be installed for this code to work.

*Please note:* This extension has not yet been tested for past versions of Photoshop, and any new releases of Photoshop may break current functionality.

### Installing

A step by step series of examples that tell you how to download this extension and get it working in Photoshop

#### Via GitHub (requires GitHub desktop or similar)

Select the button above labeled "Clone This Repository" - this way, if any changes are made, your files will update automatically.

When prompted for the "Local Path", browse to "C:\Users\*your user name*\AppData\Roaming\Adobe\CEP\extensions\PaperDoll", creating subfolders as needed.

### Using in Photoshop

PaperDoll works by analyzing the layer names in the active document. It creates a more streamlined, organized panel that allows you to use buttons to determine layer visibility or to open linked files to change the contents. It does not prevent these actions from being taken elsewhere in the program, merely provides an alternate interface to perform them.

The first character is used to define what sort of layer it is, and how the extension shoud treat it:

#### Static Layers

Static layers may be single layers or group folders, and begin with a **'$'** symbol. If it is a main layer in the active document, it will always be visible. If it is a sub-layer of a group, it will be visible any time the group is visible. 

These will not be listed in the extension hierarchy, as they are to always remain visible.

#### Toggle Layers

Toggle layers may be single layers or group folders, and begin with a **'%'** symbol.  A button will be added to the PaperDoll panel, which will turn the layer visibility on or off whenever it is clicked.

#### Linked Layers

Linked layers are always single layers that are either Smart Objects or Linked Files, and begin with an **'@'** symbol.  A button will be added to the PaperDoll panel, which will open the linked file when clicked.  You may make any changes to the contents of this file, save, and close it, and you will see your changes updated in Photoshop.

#### Choice Layers

Choice layers are always group folders, and begin with a **'#'** symbol.  These folders designate that exactly one of its sub-layers must be visible, while all others remain invisible.  All sub-layers must be **Option Layers**, as explained below.  

A button will be added to the PaperDoll panel.  Clicking this button will show and hide buttons for each of the option sub-layers (these are shown by default when the Choice layer is loaded).

#### Option Layers

Option layers must be contained within a **Choice Layer** group folder, and begin with an **'\*'** symbol.  These may be single layers or group folders containing any number of Static, Toggle, Linked, or Choice layers.  Clicking any of these buttons will make the referenced layer visible, while hiding all other options in this Choice group.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/)
* [CC Extension Builder](https://marketplace.visualstudio.com/items?itemName=hennamann.cc-extension-builder)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/JohnAndOn/PaperDoll/tags). 

## Authors

* **John Schwendinger** - *Initial work* - [JohnAndOn](https://github.com/JohnAndOn)

See also the list of [contributors](https://github.com/JohnAndOn/PaperDoll/contributors) who participated in this project.

## License

This project is licensed under the GNU GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This code was originally created to be used at [Mascot Factory](www.mascotfactory.com)
