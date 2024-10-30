jQuery(document).ready(function(){
	jQuery("body").on("click",".kodyok-element-icon-edit",function(){
		active_element = jQuery(this).parent().parent();
		parent.icon_edit();
	});
	jQuery('body').on('click','.kodyok-element-icon-link',function(){
		active_element = jQuery(this).parent().parent();
		parent.link_edit(jQuery(active_element).children('a').attr('href'));
	});
});
function update_icon(icon){
	jQuery(active_element).children('a').children('i').attr('class',icon);
}
function change_icon_color(value){
	jQuery(active_element).children('a').children('i').css('color',value);
}
function change_icon_background_color(value){
	jQuery(active_element).children('a').css('background-color',value);
}
function select_active_icon(){
	active_element = jQuery('i[class="fa fa-font-awesome"]').parent().parent();
}
function set_icon_size(value){
	icon_size = jQuery(active_element).children('a').children('i').css('font-size');
	icon_size = icon_size.split('px');
	if(value=='minus'){
		icon_size = parseInt(icon_size[0])-2;
	} else if(value=='plus'){
		icon_size = parseInt(icon_size[0])+2;
	}
	jQuery(active_element).children('a').children('i').css('font-size',icon_size+'px');
	return icon_size+'px';
}
function get_social_icons_settings(){
	jQuery('#sortable_social_icons',window.parent.document).html('');
	jQuery(active_element).children('a').each(function(){
		jQuery('#sortable_social_icons',window.parent.document).append('<div style="border:1px solid #677888;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+jQuery(this).children('i').attr('class').split('fa fa-')[1]+'<span class="fa fa-link icon_link" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_icon" style="font-size:18px;margin-left:10px;"></span></div>');
	});
	social_icons_sortable();
}
function social_icons_sortable(){
	jQuery("#sortable_social_icons",window.parent.document).sortable({
		start:function(event,ui){
			first_index = ui.item.index();
		},
		update:function(event,ui){
			last_index = ui.item.index();
			if(first_index<last_index){
				jQuery(active_element).children('a').eq(first_index).insertAfter(jQuery(active_element).children('a').eq(last_index));
			} else {
				jQuery(active_element).children('a').eq(first_index).insertBefore(jQuery(active_element).children('a').eq(last_index));
			}
		},tolerance:'pointer',cursor:'move',axis:'y'
	});
}
function add_icon(icon){
	jQuery(active_element).append('<a href="#" style="background-color:'+jQuery(active_element).children('a').css('background-color')+';display:inline-block;margin-right:5px;margin-bottom:5px;border-radius:25px;text-align:center;"><i class="fa fa-'+icon+'" aria-hidden="true" style="width:1em;height:1em;margin:10px;font-size:'+jQuery(active_element).children('a').children('i').css('font-size')+';color:'+jQuery(active_element).children('a').children('i').css('color')+';"></i></a>');
	jQuery('#sortable_social_icons',window.parent.document).append('<div style="border:1px solid #677888;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+icon+'<span class="fa fa-link icon_link" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_icon" style="font-size:18px;margin-left:10px;"></span></div>');
	social_icons_sortable();
}
function remove_icon(index){
	jQuery(active_element).children('a').eq(index).remove();
}
function update_icon_link(item_id,link,blank){
	jQuery(active_element).children('a').eq(item_id).attr('href',link);
	jQuery(active_element).children('a').eq(item_id).removeAttr('target');
	if(blank==1){
		jQuery(active_element).children('a').eq(item_id).attr('target','_blank');
	}
}
function remove_icon_link(item_id){
	jQuery(active_element).children('a').eq(item_id).attr('href','#');
	jQuery(active_element).children('a').eq(item_id).removeAttr('target');
}
function get_href(index){
	return jQuery(active_element).children('a').eq(index).attr('href');
}