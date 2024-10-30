jQuery(document).ready(function(){
	jQuery('.kodyok-section').css('border','1px dashed #00ccff');
	jQuery('.kodyok-section > .kodyok-sortable-area').css('border-left','1px dashed #ffcc00');
	jQuery('.kodyok-section > .kodyok-sortable-area').css('border-right','1px dashed #ffcc00');
	jQuery('.kodyok-section').each(function(){
		jQuery(this).prepend('<div style="position:absolute;z-index:97;background:rgba(255,204,0,0.8);cursor:default;"><span class="fa fa-arrow-up kodyok-section-up" style="font-size:26px;margin:5px;"></span><span class="fa fa-arrow-down kodyok-section-down" style="font-size:26px;margin:5px;"></span><span class="fa fa-clone kodyok-section-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-section-delete" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-section-settings" style="font-size:26px;margin:5px;"></span></div>');
	});
	jQuery("body").on("click",".kodyok-section-up",function(){
		jQuery(this).parent().parent().insertBefore(jQuery(this).parent().parent().prev());
	});
	jQuery("body").on("click",".kodyok-section-down",function(){
		jQuery(this).parent().parent().insertAfter(jQuery(this).parent().parent().next());
	});
	jQuery("body").on("click",".kodyok-section-duplicate",function(){
		jQuery(this).parent().parent().clone().insertAfter(jQuery(this).parent().parent());
		jQuery(this).parent().parent().next().find('.kodyok-element-editable').removeAttr('id');
		jQuery(this).parent().parent().next().removeAttr('id');
		parent.load_add_item_drag();
	});
	jQuery("body").on("click",".kodyok-section-delete",function(){
		if(confirm('This section will be deleted with all content. Are you sure?')){
			jQuery(this).parent().parent().remove();
		}
	});
	jQuery('body').on('click','.kodyok-section-settings',function(){
		active_element = jQuery(this).parent().parent();
		jQuery('#iframe',window.parent.document).css('width',(jQuery('#all_content',window.parent.document).width()-380)+'px');
		jQuery('#settings_menu',window.parent.document).show();
		jQuery('#settings_menu > div',window.parent.document).hide();
		if(jQuery(active_element).children('div:last').hasClass('kodyok-element-slider')){
			active_element = jQuery(this).parent().next();
			jQuery('#slider_settings',window.parent.document).show();
			jQuery('#slider_settings > h3',window.parent.document).show();
			get_slider_settings();
		} else {
			jQuery('#section_settings',window.parent.document).show();
			get_section_settings();
		}
	});
});
function get_section_settings(){
	if(jQuery(active_element).css('background-image').split('0%')[0].split('linear-gradient(')[1]){
		opacity_value = jQuery(active_element).css('background-image').split('0%')[0].split('linear-gradient(')[1].split(',');
	} else {
		opacity_value = jQuery(active_element).css('background-color').split(',');
	}
	if(opacity_value.length==4){
		opacity_value = opacity_value[3].replace(' ','');
		opacity_value = opacity_value.replace(')','');
		jQuery('#section_opacity',window.parent.document).val(parseFloat(opacity_value).toFixed(1)*100);
	} else {
		jQuery('#section_opacity',window.parent.document).val(100);
	}
	jQuery('#section_id',window.parent.document).val(jQuery(active_element).attr('id'));
}
function change_section_background(value){
	if(jQuery(active_element).css('background-image').split('0%')[0].split('linear-gradient(')[1]){
		opacity_value = jQuery(active_element).css('background-image').split('0%')[0].split('linear-gradient(')[1];
		old_opacity_value_1 = opacity_value;
		opacity_value = opacity_value.split(',');
		if(opacity_value.length==4){
			r = opacity_value[0].replace('rgba(','');
			g = opacity_value[1];
			b = opacity_value[2];
			opacity_value = opacity_value[3].replace(' ','');
			opacity_value = opacity_value.replace(')','');
			opacity_value = parseFloat(opacity_value).toFixed(1)*100;
		} else {
			r = opacity_value[0].replace('rgb(','');
			g = opacity_value[1];
			b = opacity_value[2].replace(')','');
			opacity_value = 100;
		}
		new_background_color = jQuery(active_element).css('background-image').replace(old_opacity_value_1,value+' ');
		new_background_color = new_background_color.replace(old_opacity_value_1,value+' ');
		jQuery(active_element).css('background-image',new_background_color);
	} else {
		opacity_value = jQuery(active_element).css('background-color').split(',');
		if(opacity_value.length==4){
			r = opacity_value[0].replace('rgba(','');
			g = opacity_value[1];
			b = opacity_value[2];
			opacity_value = opacity_value[3].replace(' ','');
			opacity_value = opacity_value.replace(')','');
			if(r==0 && g==0 && b==0 && opacity_value==0){
				opacity_value = 100;
			} else {
				opacity_value = parseFloat(opacity_value).toFixed(1)*100;
			}
		} else {
			opacity_value = 100;
		}
		jQuery(active_element).css('background-color',value);
	}
}
function set_section_opacity(value){
	if(jQuery(active_element).css('background-image').split('0%')[0].split('linear-gradient(')[1]){
		opacity_value = jQuery(active_element).css('background-image').split('0%')[0].split('linear-gradient(')[1];
		old_opacity_value_1 = opacity_value;
		opacity_value = opacity_value.split(',');
		if(opacity_value.length==4){
			r = opacity_value[0].replace('rgba(','');
			g = opacity_value[1];
			b = opacity_value[2];
			opacity_value = opacity_value[3].replace(' ','');
			opacity_value = opacity_value.replace(')','');
			opacity_value = parseFloat(opacity_value).toFixed(1)*100;
		} else {
			r = opacity_value[0].replace('rgb(','');
			g = opacity_value[1];
			b = opacity_value[2].replace(')','');
			opacity_value = 100;
		}
		if(value=='minus'){
			if(opacity_value>0){
				opacity_value = opacity_value-10;
			}
		} else if(value=='plus'){
			if(opacity_value<100){
				opacity_value = opacity_value+10;
			}
		}
		new_background_color = jQuery(active_element).css('background-image').replace(old_opacity_value_1,'rgba('+r+','+g+','+b+','+opacity_value/100+') ');
		new_background_color = new_background_color.replace(old_opacity_value_1,'rgba('+r+','+g+','+b+','+opacity_value/100+') ');
		jQuery(active_element).css('background-image',new_background_color);
		jQuery('#section_opacity',window.parent.document).val(opacity_value);
	} else {
		opacity_value = jQuery(active_element).css('background-color');
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
		if(value=='minus'){
			if(opacity_value>0){
				opacity_value = opacity_value-10;
			}
		} else if(value=='plus'){
			if(opacity_value<100){
				opacity_value = opacity_value+10;
			}
		}
		if(opacity_defined==1){
			new_background_color = old_opacity_value_1.replace('rgb(','rgba(');
			new_background_color = new_background_color.replace(old_opacity_value_2+')',opacity_value/100+')');
			jQuery(active_element).css('background-color',new_background_color);
		} else {
			new_background_color = old_opacity_value_1.replace('rgb(','rgba(');
			new_background_color = new_background_color.replace(')',','+opacity_value/100+')');
			jQuery(active_element).css('background-color',new_background_color);
		}
		jQuery('#section_opacity',window.parent.document).val(opacity_value);
	}
}
function remove_background(){
	jQuery(active_element).css('background-color','transparent');
	jQuery(active_element).css('background-image','none');
	jQuery(active_element).css('background-attachment','scroll');
	jQuery(active_element).css('background-size','cover');
	jQuery(active_element).css('background-position','center center');
	jQuery(active_element).css('background-repeat','no-repeat');
}
function add_id(value){
	error = 0;
	jQuery('.kodyok-section').each(function(){
		if(jQuery(this).attr('id')==value){
			error = 1;
		}
	});
	if(error==0){
		jQuery(active_element).attr('id',value);
	} else {
		jQuery('#section_id',window.parent.document).parent().addClass('has-error');
		jQuery('#section_id',window.parent.document).val('');
		jQuery('#section_id',window.parent.document).attr('placeholder','Type different ID');
	}
}