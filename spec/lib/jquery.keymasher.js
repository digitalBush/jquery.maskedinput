/*
	Key Masher plugin for jQuery (https://github.com/digitalBush/jquery.keymasher)
	Copyright (c) 2010 Josh Bush (digitalbush.com)
	Licensed under the MIT license
	Version: 0.1
*/

(function($,undefined){
	var modifiers={shift:16,ctrl:17,meta:224,alt:18};
		//numberPad={'0':96,'1':97,'2':98,'3':99,'4':100,'5':101,'6':102,'7':103,'8':104,'9':105,'*':106,'+':107,'-':109,'.':110,'/':111},
	
	var keys=(function(){
		var keys    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890`-=[]\\;',./ \t\n";
		var shifted = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()~_+{}|:\"<>?";
		var noprint={f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,
					capslock:20,numlock:144,scrolllock:145,pageup:33,pagedown:34,end:35,home:36,backspace:8,
					insert:45,del:46,pause:19,esc:27,left:37,up:38,right:39,down:40,printscreen:44};

		var defs={};
		$.each(keys,function(index,value){
			var keyCode=value.charCodeAt(0),shift=shifted[index];			
			defs[value]={keyCode:keyCode,charCode:keyCode,shift:shift};
			if(shift)
				defs[shift]={keyCode:keyCode,charCode:shift.charCodeAt(0),shift:value,requiresShift:index>=26};
		});
		$.each(noprint,function(key,value){defs[value]={keyCode:value};});
		return defs;
	})();

	var KeyMasher=function(elm){
		var modifierState={alt: false, ctrl: false,	meta: false, shift: false};

		var queueModifierEvent=function(direction,modifier){	
			modifierState[modifier]=(direction=='down');		
			var event=$.extend($.Event(), modifierState, {type:'key'+direction, keyCode: modifiers[modifier], charCode: 0});
			elm.queue('keymash',function(){
				elm.trigger(event);
				$(this).dequeue('keymash');
			});
		};		
		
		var queueStroke=function(key){
			if($.type(key)==='string')
				key=keys[key];	
			
			if(modifierState.shift && key.shift)
				key=keys[key.shift];

			var ignore = !key.charCode || modifierState.alt || modifierState.ctrl || modifierState.meta,
				down = $.extend($.Event('keydown'), modifierState, {keyCode: key.keyCode, charCode: 0}),
				press = $.extend($.Event('keypress'), modifierState, {keyCode: key.charCode, charCode: key.charCode}),
				up = $.extend($.Event('keyup'), modifierState, {keyCode: key.keyCode, charCode: 0});				
			
			elm.queue('keymash',function(){
				elm.trigger(down);
				if(!down.isPropagationStopped() || ignore){
					elm.trigger(press);
					if(!press.isPropagationStopped()){					
						//need to do caret positioning
						elm.val(elm.val()+String.fromCharCode(key.charCode));
					}
				}
				elm.trigger(up);
				$(this).dequeue('keymash');
			});
		};

		var public={
			hold:function(holding,typing){
				var toks=holding.split(',');
				$.each(toks,function(index,value){queueModifierEvent('down',value);});
				public.type(typing);
				$.each(toks,function(index,value){queueModifierEvent('up',value);});
				return public;
			},				
			type:function(){
				$.each(arguments,function(index,typing){
					if($.type(typing)==='string')
						$.each(typing,function(index,value){queueStroke(value);});
					else
						queueStroke(typing);					
				});
				return public;
			}
		};
		return $.extend(public,keys);
	};

	$.fn.mashKeys=function(fn){
		if($.type(fn)==='string'){
			var typing=fn;
			fn=function(keys){keys.type(typing)};
		}
		return this.each(function(){
			var elm=$(this);
			fn(KeyMasher(elm));			
		}).dequeue("keymash");
	};
})(jQuery);