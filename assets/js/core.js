jQuery(document).ready(function(){
	/*if(jQuery('#post_content_area').length==1){
		jQuery('#add_list',window.parent.document).hide();
		jQuery('#ready_made',window.parent.document).hide();
		jQuery('#basic_elements',window.parent.document).show();
	}*/
	jQuery("body").on("click",".kodyok-element-settings",function(){
		active_element = jQuery(this).parent().parent();
		jQuery('#settings_menu > div',window.parent.document).hide();
		jQuery('#margin_settings',window.parent.document).show();
		if(jQuery(active_element).hasClass('kodyok-element-button')){
			get_button_settings();
    		jQuery('#button_settings',window.parent.document).show();
		} else if(jQuery(active_element).hasClass('kodyok-element-form')){
    		jQuery('#form_settings',window.parent.document).show();
		} else if(jQuery(active_element).hasClass('kodyok-element-grid') && !jQuery(active_element).hasClass('kodyok-element-gallery') && !jQuery(active_element).hasClass('kodyok-element-dynamic-content')){
    		get_grid_settings();
    		jQuery('#grid_settings',window.parent.document).show();
		} else if(jQuery(active_element).hasClass('kodyok-element-gallery')){
    		get_gallery_settings();
    		jQuery('#gallery_settings',window.parent.document).show();
		} else if(jQuery(active_element).hasClass('kodyok-element-dynamic-content')){
    		jQuery('#text_settings',window.parent.document).show();
		} else if(jQuery(active_element).hasClass('kodyok-element-icon')){
    		jQuery('#icon_settings',window.parent.document).show();
    		jQuery('#icon_background_color',window.parent.document).hide();
		} else if(jQuery(active_element).hasClass('kodyok-element-social-icons')){
			get_social_icons_settings();
			jQuery('#icon_settings',window.parent.document).show();
    		jQuery('#social_icons_settings',window.parent.document).show();
    		jQuery('#icon_background_color',window.parent.document).show();
		} else if(jQuery(active_element).hasClass('kodyok-element-image')){
			get_image_settings();
    		jQuery('#image_settings',window.parent.document).show();
		} else if(jQuery(active_element).hasClass('kodyok-element-slider')){
			get_slider_settings();
    		jQuery('#slider_settings',window.parent.document).show();
    		jQuery('#slider_settings > h3',window.parent.document).hide();
		} else if(jQuery(active_element).hasClass('kodyok-element-video')){
			get_video_settings();
    		jQuery('#video_settings',window.parent.document).show();
		}
		jQuery('#top_margin',window.parent.document).val(jQuery(active_element).css('margin-top'));
		jQuery('#bottom_margin',window.parent.document).val(jQuery(active_element).css('margin-bottom'));
		jQuery('#left_margin',window.parent.document).val(jQuery(active_element).css('margin-left'));
		jQuery('#right_margin',window.parent.document).val(jQuery(active_element).css('margin-right'));
		jQuery('#iframe',window.parent.document).css('width',(jQuery('#all_content',window.parent.document).width()-380)+'px');
		jQuery('#settings_menu',window.parent.document).show();
	});
	jQuery("body").on("click",".kodyok-element-remove",function(){
		if(confirm('This element will be deleted. Are you sure?')){
			jQuery(this).parent().parent().remove();
		}
	});
	jQuery("body").on("click",".kodyok-element-duplicate",function(){
		jQuery(this).parent().parent().clone().insertAfter(jQuery(this).parent().parent());
		if(jQuery(this).parent().parent().hasClass('kodyok-element-text')){
			jQuery(this).parent().parent().next().find('.kodyok-element-editable').removeAttr('id');
		}
	});
	jQuery("body").on("mouseenter",".kodyok-element",function(){
		jQuery(this).children('.kodyok-element-panel').css('display','');
		jQuery(this).children('.kodyok-element-panel').css('position','absolute');
		jQuery(this).children('.kodyok-element-panel').css('z-index','96');
		if(jQuery(this).hasClass('kodyok-element-grid')){
			jQuery(this).children('.kodyok-grid').children('div').css('box-shadow','inset 0 0 0 1px #ffcc00');
			jQuery(this).children('.kodyok-element-panel').css('background-color','rgba(255,204,0,0.8)');
			jQuery(this).children('.kodyok-element-panel').css('margin-top','-'+jQuery(this).children('.kodyok-element-panel').css('height'));
		} else {
			jQuery(this).css('box-shadow','inset 0 0 0 1px #00ccff');
			jQuery(this).children('.kodyok-element-panel').css('background-color','rgba(0,204,255,0.8)');
			jQuery(this).children('.kodyok-element-panel').css('margin-top',jQuery(this).css('height'));
		}
		jQuery(this).children('.kodyok-element-panel').css('width',jQuery(this).css('width'));
		if(jQuery(this).hasClass('kodyok-element-text')){
			if(jQuery(this).children('.kodyok-element-panel').children('.kodyok-element-text-edit-done').css('display')!='none'){
				jQuery('.kodyok-element-editor').css('display','');
			}
		}
	});
	jQuery("body").on("mouseleave",".kodyok-element",function(){
		jQuery(this).children('.kodyok-element-panel').css('display','none');
		if(jQuery(this).hasClass('kodyok-element-grid')){
			jQuery(this).children('.kodyok-grid').children('div').css('box-shadow','');
		} else {
			jQuery(this).css('box-shadow','');
		}
		if(jQuery(this).hasClass('kodyok-element-text')){
			jQuery('.kodyok-element-editor').css('display','none');
		}
	});
	load_element_panel();
});
function load_element_panel(){
	jQuery('.kodyok-element').each(function(){
		if(!jQuery(this).children('.kodyok-element-panel').length){
			if(jQuery(this).hasClass('kodyok-element-button')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-button-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-link kodyok-element-button-link" style="font-size:26px;margin:5px;"></span></div>');
			} else if(jQuery(this).hasClass('kodyok-element-form')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-form-edit" style="font-size:26px;margin:5px;"></span></div>');
			} else if(jQuery(this).hasClass('kodyok-element-grid')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-columns kodyok-element-column-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-plus kodyok-element-add-column" style="font-size:26px;margin:5px;"></span><span class="fa fa-minus kodyok-element-remove-column" style="font-size:26px;margin:5px;"></span></div>');
				if(jQuery(this).hasClass('kodyok-element-dynamic-content') || jQuery(this).hasClass('kodyok-element-gallery')){
					jQuery(this).children('.kodyok-element-panel').children('.kodyok-element-add-column').remove();
					jQuery(this).children('.kodyok-element-panel').children('.kodyok-element-remove-column').remove();
				}
			} else if(jQuery(this).hasClass('kodyok-element-icon')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-icon-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-link kodyok-element-icon-link" style="font-size:26px;margin:5px;"></span></div>');
			} else if(jQuery(this).hasClass('kodyok-element-social-icons')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span></div>');
			} else if(jQuery(this).hasClass('kodyok-element-image')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-image-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-link kodyok-element-image-link" style="font-size:26px;margin:5px;"></span></div>');
				image_resizable(jQuery(this));
			} else if(jQuery(this).hasClass('kodyok-element-slider')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span></div>');
			} else if(jQuery(this).hasClass('kodyok-element-text')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-text-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-check kodyok-element-text-edit-done" style="font-size:26px;margin:5px;display:none;"></span></div>');
			} else if(jQuery(this).hasClass('kodyok-element-video')){
				jQuery(this).prepend('<div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span></div>');
			}
		}
	});
	//jQuery('.dynamic_content').find('.text').children('.element_panel').html('<span class="fa fa-cog settings" style="font-size:26px;margin:5px;"></span>');
}
function update_link(link,blank){
	if(jQuery(active_element).hasClass('kodyok-element-text')){
		if(window.getSelection){
			currSelection = window.getSelection();
			currSelection.removeAllRanges();
			for(i=0;i<storedSelections.length;i++){
				currSelection.addRange(storedSelections[i]);
			}
		}
		document.execCommand('createLink',false,link);
	} else if(jQuery(active_element).hasClass('kodyok-element-image') || jQuery(active_element).hasClass('kodyok-element-button') || jQuery(active_element).hasClass('kodyok-element-icon')){
		jQuery(active_element).children('a').attr('href',link);
		jQuery(active_element).children('a').removeAttr('target');
		if(blank==1){
			jQuery(active_element).children('a').attr('target','_blank');
		}
	}
}
function remove_link(){
	if(jQuery(active_element).hasClass('kodyok-element-text')){
		if(window.getSelection){
			currSelection = window.getSelection();
			currSelection.removeAllRanges();
			for(i=0;i<storedSelections.length;i++){
				currSelection.addRange(storedSelections[i]);
			}
		}
		document.execCommand("unlink",false,false);
	} else if(jQuery(active_element).hasClass('kodyok-element-image') || jQuery(active_element).hasClass('kodyok-element-button') || jQuery(active_element).hasClass('kodyok-element-icon')){
		jQuery(active_element).children('a').attr('href','#');
		jQuery(active_element).children('a').removeAttr('target');
	}
}
function componentToHex(c){
    hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r,g,b){
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function set_align(value){
	if(jQuery(active_element).hasClass('kodyok-element-button')){
		jQuery(active_element).css('text-align',value);
	} else if(jQuery(active_element).hasClass('kodyok-element-icon')){
		jQuery(active_element).css('text-align',value);
	} else if(jQuery(active_element).hasClass('kodyok-element-social-icons')){
		jQuery(active_element).css('text-align',value);
	} else if(jQuery(active_element).hasClass('kodyok-element-image')){
		if(jQuery(active_element).hasClass('kodyok-element-image-in-text')){
			if(value=='center'){
				jQuery(active_element).css('margin','auto');
				element_style = jQuery(active_element).attr('style');
				element_style = element_style.replace('float: left;','');
				element_style = element_style.replace('float: right;','');
				jQuery(active_element).attr('style',element_style);
			} else if(value=='left'){
				jQuery(active_element).css('margin','0');
				jQuery(active_element).css('float','left');
			} else if(value=='right'){
				jQuery(active_element).css('margin','0');
				jQuery(active_element).css('float','right');
			}
		} else {
			if(value=='center'){
				jQuery(active_element).css('margin-left','auto');
				jQuery(active_element).css('margin-right','auto');
			} else if(value=='left'){
				jQuery(active_element).css('margin-left','0');
				jQuery(active_element).css('margin-right','auto');
			} else if(value=='right'){
				jQuery(active_element).css('margin-left','auto');
				jQuery(active_element).css('margin-right','0');
			}
		}
	} else if(jQuery(active_element).hasClass('kodyok-element-dynamic-content')){
		jQuery(active_element).find('.kodyok-card-title').css('text-align',value);
	} else if(jQuery(active_element).hasClass('kodyok-element-video')){
		if(value=='center'){
			jQuery(active_element).css('margin-left','auto');
			jQuery(active_element).css('margin-right','auto');
		} else if(value=='left'){
			jQuery(active_element).css('margin-left','0');
			jQuery(active_element).css('margin-right','auto');
		} else if(value=='right'){
			jQuery(active_element).css('margin-left','auto');
			jQuery(active_element).css('margin-right','0');
		}
	}
}
function set_margin(value){
	margin_side = value.split('_');
	margin_value = jQuery(active_element).css('margin-'+margin_side[0]);
	margin_value = margin_value.split('px');
	if(margin_side[1]=='minus'){
		margin_value = parseInt(margin_value[0])-10;
	} else if(margin_side[1]=='plus'){
		margin_value = parseInt(margin_value[0])+10;
	}
	jQuery(active_element).css('margin-'+margin_side[0],margin_value+'px');
	return margin_value+'px';
}
function update_section_list(){
	jQuery('#link_section',window.parent.document).html('<option value="0">Select section</option>');
	jQuery('.kodyok-section').each(function(){
		if(jQuery(this)[0].hasAttribute('id')){
			jQuery('#link_section',window.parent.document).append('<option value="#'+jQuery(this).attr('id')+'">'+jQuery(this).attr('id')+'</option>');
		}
	});
}
function run_before_save(){
	jQuery('.kodyok-section').css('border','0');
	jQuery('.kodyok-section').children('.kodyok-sortable-area').css('border-left','0');
	jQuery('.kodyok-section').children('.kodyok-sortable-area').css('border-right','0');
	jQuery('.kodyok-section').each(function(){
		jQuery(this).children('div:first').remove();
	});
	jQuery('.kodyok-element-grid').find('.kodyok-sortable-area').css('border','0');
	jQuery(".kodyok-element-editor").remove();
	jQuery(".kodyok-element-panel").remove();
	jQuery(".ui-resizable-handle").remove();
	jQuery('.kodyok-element-editable').removeAttr('contenteditable');
	jQuery('.kodyok-element-button').find('a').removeAttr('contenteditable');
	jQuery('.kodyok-element-dynamic-content').each(function(){
		jQuery(this).find('.kodyok-grid > div:gt(7)').remove();
		if(jQuery(this).find('.kodyok-grid').next().css('display')=='none' && jQuery(this).find('.kodyok-grid > div').length==6){
			jQuery(this).find('.kodyok-grid').next().show();
		}
	});
}
function run_after_save(){
	jQuery('.kodyok-section').css('border','1px dashed #00ccff');
	jQuery('.kodyok-section').children('.kodyok-sortable-area').css('border-left','1px dashed #ffcc00');
	jQuery('.kodyok-section').children('.kodyok-sortable-area').css('border-right','1px dashed #ffcc00');
	jQuery('.kodyok-section').each(function(){
		jQuery(this).prepend('<div style="position:absolute;z-index:97;background:rgba(255,204,0,0.8);cursor:default;"><span class="fa fa-arrow-up kodyok-section-up" style="font-size:26px;margin:5px;"></span><span class="fa fa-arrow-down kodyok-section-down" style="font-size:26px;margin:5px;"></span><span class="fa fa-clone kodyok-section-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-section-delete" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-section-settings" style="font-size:26px;margin:5px;"></span></div>');
	});
	load_element_panel();
}
/*function get_footer_settings(){
	jQuery('#iframe',window.parent.document).css('width',(jQuery('#all_content',window.parent.document).width()-380)+'px');
	jQuery('#settings_menu',window.parent.document).show();
	jQuery('#settings_menu > div',window.parent.document).hide();
	jQuery('#footer_settings',window.parent.document).show();
}
function change_footer_background(value){
	jQuery('footer').css('background-color',value);
}*/