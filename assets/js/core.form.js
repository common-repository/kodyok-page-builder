jQuery(document).ready(function(){
	jQuery('body').on('click','.kodyok-element-form-edit',function(){
		active_element = jQuery(this).parent().parent();
		jQuery('#iframe',window.parent.document).css('width',(jQuery('#all_content',window.parent.document).width()-380)+'px');
		jQuery('#settings_menu',window.parent.document).show();
		jQuery('#settings_menu > div',window.parent.document).hide();
		jQuery('#form_edit_settings',window.parent.document).show();
		jQuery('#content_send_button',window.parent.document).attr('style','');
		jQuery("#content_send_button",window.parent.document).val(jQuery(active_element).find('.kodyok-send-button').html());
		jQuery("#form_inputs",window.parent.document).html('');
		jQuery(active_element).children('form').children('div').each(function(){
			if(jQuery(this).children('input').length==1){
				jQuery("#form_inputs",window.parent.document).append('<div style="border:1px solid #CCC;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+jQuery(this).children('input').attr('placeholder')+'<span class="fa fa-pencil form_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_form" style="font-size:18px;margin-left:10px;"></span></div>');
			}
		});
		jQuery("#form_inputs",window.parent.document).sortable({
			start:function(event,ui){
				first_index = ui.item.index();
			},
			update:function(event,ui){
				last_index = ui.item.index();
				if(first_index<last_index){
					jQuery(active_element).children('form').children('div').eq(first_index).insertAfter(jQuery(active_element).children('form').children('div').eq(last_index));
				} else {
					jQuery(active_element).children('form').children('div').eq(first_index).insertBefore(jQuery(active_element).children('form').children('div').eq(last_index));
				}
			},tolerance:'pointer',cursor:'move',axis:'y'
		});
	});
});
function add_form(value){
	if(jQuery('#input_name',window.parent.document).val()==''){
		jQuery('#input_name',window.parent.document).attr('placeholder','This field is required.');
		jQuery('#form_edit_settings > .input-group',window.parent.document).attr('class','input-group has-error');
	} else {
		if(jQuery('.add_form',window.parent.document).html()=='Add'){
			jQuery('<div class="kodyok-margin"><input type="text" class="kodyok-input kodyok-form-large" placeholder="'+jQuery('#input_name',window.parent.document).val()+'"></div>').insertBefore(jQuery(active_element).children('form').children('div').last());
			jQuery("#form_inputs",window.parent.document).append('<div style="border:1px solid #CCC;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+jQuery('#input_name',window.parent.document).val()+'<span class="fa fa-pencil form_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_form" style="font-size:18px;margin-left:10px;"></span></div>');
		} else if(jQuery('.add_form',window.parent.document).html()=='Save'){
			jQuery(active_element).children('form').children('div').eq(value).children('input').attr('placeholder',jQuery('#input_name',window.parent.document).val());
			jQuery("#form_inputs",window.parent.document).children('div').eq(value).html('<span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+jQuery('#input_name',window.parent.document).val()+'<span class="fa fa-pencil form_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_form" style="font-size:18px;margin-left:10px;"></span>');
			jQuery('.add_form',window.parent.document).html('Add');
		}
		jQuery('#input_name',window.parent.document).val('');
		jQuery('#input_name',window.parent.document).attr('placeholder','New input');
		jQuery('#form_edit_settings > .input-group',window.parent.document).attr('class','input-group');
		jQuery("#form_inputs",window.parent.document).sortable({
			start:function(event,ui){
				first_index = ui.item.index();
			},
			update:function(event,ui){
				last_index = ui.item.index();
				if(first_index<last_index){
					jQuery(active_element).children('form').children('div').eq(first_index).insertAfter(jQuery(active_element).children('form').children('div').eq(last_index));
				} else {
					jQuery(active_element).children('form').children('div').eq(first_index).insertBefore(jQuery(active_element).children('form').children('div').eq(last_index));
				}
			},tolerance:'pointer',cursor:'move',axis:'y'
		});
		jQuery(active_element).children('.kodyok-element-panel').css('margin-top',jQuery(active_element).css('height'));
	}
}
function content_send_button(){
	jQuery(active_element).children('form').children('div').last().children('a').html(jQuery("#content_send_button",window.parent.document).val());
}
function remove_form(value){
	jQuery(active_element).children('form').children('div').eq(value).remove();
	jQuery("#form_inputs",window.parent.document).children('div').eq(value).remove();
}
function form_edit_item(value){
	jQuery('#input_name',window.parent.document).val(jQuery(active_element).children('form').children('div').eq(value).children('input').attr('placeholder'));
	jQuery('.add_form',window.parent.document).html('Save');
}