Masked Input Plugin for jQuery
==============================

Fix
---
Fixed conflict with jQuery TOOLS mask. See http://stackoverflow.com/questions/11678505/jquery-masked-input-plugin-conflicts-with-jquery-tools-at-least-with-overlay
and https://github.com/digitalBush/jquery.maskedinput/issues/94.

Usage
-----
After the fix (see above) right now you should write $("#input").maskedinput("your mask here") instead of $("#input").mask("your mask here");

Overview
--------
This is a masked input plugin for the jQuery javascript library. It allows a user to more easily enter fixed width input where you would like them to enter the data in a certain format (dates,phone numbers, etc). It has been tested on Internet Explorer 6/7, Firefox 1.5/2/3, Safari, Opera, and Chrome.  A mask is defined by a format made up of mask literals and mask definitions. Any character not in the definitions list below is considered a mask literal. Mask literals will be automatically entered for the user as they type and will not be able to be removed by the user.The following mask definitions are predefined:

* a - Represents an alpha character (A-Z,a-z)
* 9 - Represents a numeric character (0-9)
* \* - Represents an alphanumeric character (A-Z,a-z,0-9)
