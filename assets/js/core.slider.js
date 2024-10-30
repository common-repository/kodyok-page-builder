function get_slider_settings(){
	jQuery('#slider_content',window.parent.document).html('');
	jQuery(active_element).find('ul').children('li').each(function(){
		jQuery("#slider_content",window.parent.document).append('<div style="border:1px solid #CCC;padding-left:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span><img src="'+jQuery(this).children('img').attr('src')+'" height="42"><span class="fa fa-trash remove_slider" style="font-size:18px;margin-left:10px;"></span></div>');
	});
	slider_sortable();
	jQuery('#slider_height',window.parent.document).val(jQuery(active_element).find('ul').css('height'));
}
function add_slider(selected_image){
	jQuery(active_element).find('ul').children('li:last').clone().insertAfter(jQuery(active_element).find('ul').children('li:last'));
	jQuery(active_element).find('ul').children('li:last').children('img').attr('src',selected_image);
	jQuery("#slider_content",window.parent.document).append('<div style="border:1px solid #CCC;padding-left:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span><img src="'+selected_image+'" height="42"><span class="fa fa-trash remove_slider" style="font-size:18px;margin-left:10px;"></span></div>');
	//jQuery('#slider_caption',window.parent.document).val('');
	slider_sortable();
}
function remove_slider(value){
	jQuery("#slider_content",window.parent.document).children('div').eq(value).remove();
	jQuery(active_element).find('ul').children('li').eq(value).remove();
}
function slider_sortable(){
	jQuery("#slider_content",window.parent.document).sortable({
		start:function(event,ui){
			first_index = ui.item.index();
		},
		update:function(event,ui){
			last_index = ui.item.index();
			if(first_index<last_index){
				jQuery(active_element).find('ul').children('li').eq(first_index).insertAfter(jQuery(active_element).find('ul').children('li').eq(last_index));
			} else {
				jQuery(active_element).find('ul').children('li').eq(first_index).insertBefore(jQuery(active_element).find('ul').children('li').eq(last_index));
			}
		},tolerance:'pointer',cursor:'move',axis:'y'
	});
}
function set_slider_height(value){
	slider_height = jQuery(active_element).find('ul').css('height');
	slider_height = slider_height.split('px');
	if(value=='minus'){
		slider_height = parseInt(slider_height[0])-20;
	} else if(value=='plus'){
		slider_height = parseInt(slider_height[0])+20;
	}
	jQuery(active_element).find('ul').css('height',slider_height+'px');
	return slider_height+'px';
}