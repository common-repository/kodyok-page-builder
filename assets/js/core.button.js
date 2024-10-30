jQuery(document).ready(function(){
	jQuery('body').on('click','.kodyok-element-button-edit',function(){
		active_element = jQuery(this).parent().parent();
		jQuery(active_element).children('a').attr('contenteditable','true');
		jQuery(active_element).children('a').focus();
		selection = window.getSelection();
        range = document.createRange();
	    range.selectNodeContents(jQuery(active_element).children('a')[0]);
        selection.removeAllRanges();
        selection.addRange(range);
	});
	jQuery('body').on('click','.kodyok-element-button-link',function(){
		active_element = jQuery(this).parent().parent();
		parent.link_edit(jQuery(active_element).children('a').attr('href'));
	});
});
function get_button_settings(){
	opacity_value = jQuery(active_element).children('a').css('background-color');
	opacity_value = opacity_value.split(',');
	if(opacity_value.length==4){
		opacity_value = opacity_value[3].replace(' ','');
		opacity_value = opacity_value.replace(')','');
		jQuery('#button_opacity',window.parent.document).val(parseFloat(opacity_value).toFixed(1)*100);
	} else {
		jQuery('#button_opacity',window.parent.document).val(100);
	}
	jQuery('#button_border',window.parent.document).val(jQuery(active_element).children('a').css('border-width'));
}
function set_button_border(change_type){
	border_value = jQuery(active_element).children('a').css('border-width');
	border_value = border_value.split('px');
	if(change_type=='minus'){
		border_value = parseInt(border_value[0])-1;
	} else if(change_type=='plus'){
		border_value = parseInt(border_value[0])+1;
	}
	jQuery(active_element).children('a').css('border-style','solid');
	jQuery(active_element).children('a').css('border-width',border_value+'px');
	return border_value+'px';
}
function set_button_opacity(change_type){
	opacity_value = jQuery(active_element).children('a').css('background-color');
	old_opacity_value_1 = opacity_value;
	opacity_value = opacity_value.split(',');
	if(opacity_value.length==4){
		opacity_value = opacity_value[3].replace(' ','');
		old_opacity_value_2 = opacity_value.replace(')','');
		opacity_value = opacity_value.replace(')','');
		opacity_value = parseFloat(opacity_value).toFixed(1)*100;
		opacity_defined = 1;
	} else {
		opacity_value = 100;
		opacity_defined = 0;
	}
	if(change_type=='minus'){
		if(opacity_value>0){
			opacity_value = opacity_value-10;
		}
	} else if(change_type=='plus'){
		if(opacity_value<100){
			opacity_value = opacity_value+10;
		}
	}
	if(opacity_defined==1){
		new_background_color = old_opacity_value_1.replace('rgb(','rgba(');
		new_background_color = new_background_color.replace(old_opacity_value_2+')',opacity_value/100+')');		
	} else {
		new_background_color = old_opacity_value_1.replace('rgb(','rgba(');
		new_background_color = new_background_color.replace(')',','+opacity_value/100+')');
	}
	jQuery(active_element).children('a').css('background-color',new_background_color);
	return opacity_value;
}
function change_button_background(value){
	jQuery(active_element).children('a').css('background',value);
}
function change_button_font(value){
	jQuery(active_element).children('a').css('color',value);
}
function change_button_border(value){
	jQuery(active_element).children('a').css('border-color',value);
}
function set_button_font(value,font_name){
	WebFont.load({
		google: {
			families: [font_name]
		}
	});
	jQuery(active_element).children('a').css('font-family',value);
}
function set_button_size(value){
	jQuery(active_element).children('a').css('font-size',value+'px');
}