jQuery(document).ready(function(){
	jQuery("body").on("click",".kodyok-element-image-edit",function(){
		if(jQuery(this).parent().parent().hasClass('image')){
			active_element = jQuery(this).parent().parent();
		}
		parent.image_edit();
	});
	jQuery('body').on('click','.kodyok-element-image-link',function(){
		active_element = jQuery(this).parent().parent();
		parent.link_edit(jQuery(active_element).children('a').attr('href'));
	});
});
function get_image_settings(){
	jQuery('#image_border',window.parent.document).val(jQuery(active_element).children('a').children('img').css('border-width'));
}
function select_active_element(){
	active_element = jQuery('img[src="'+parent.plugin_dir_url+'assets/img/blank.gif"]').parent().parent();
}
function update_image(selected_image,id,type){
	if(type=='text'){
		img = new Image();
		img.onload = function(){
			document.execCommand("insertHTML", false, '<img src="'+selected_image+'" class="kodyok-responsive-width kodyok-element-last-image" />');
			jQuery('.kodyok-element-last-image').replaceWith('<div class="kodyok-element kodyok-element-image kodyok-element-image-in-text kodyok-element-last-image" style="max-width:'+this.width+'px;max-height:'+this.height+'px;margin:auto;"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-image-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-link kodyok-element-image-link" style="font-size:26px;margin:5px;"></span></div><a href="#"><img src="'+selected_image+'" class="kodyok-responsive-width" /></a></div>');
			image_resizable('.kodyok-element-last-image');
		}
		img.src = selected_image;
	} else {
		if(jQuery(active_element).hasClass('kodyok-section')){
			rgb_value = jQuery(active_element).css('background-color').split(',');
			if(rgb_value.length==4){
				r = rgb_value[0].replace('rgba(','');
				g = rgb_value[1];
				b = rgb_value[2];
				opacity_value = rgb_value[3].replace(' ','');
				opacity_value = opacity_value.replace(')','');
				if(r==0 && g==0 && b==0 && opacity_value==0){
					r = 255;
					g = 255;
					b = 255;
				}
				opacity_value = parseFloat(opacity_value).toFixed(1)*100;
			} else {
				r = rgb_value[0].replace('rgb(','');
				g = rgb_value[1];
				b = rgb_value[2].replace(')','');
				opacity_value = 0;
			}
			jQuery(active_element).attr('style','background-image:linear-gradient(rgba('+r+','+g+','+b+','+opacity_value/100+') 0%,rgba('+r+','+g+','+b+','+opacity_value/100+') 100%),url('+selected_image+');background-attachment:scroll;background-size:cover;background-position:50% 50%;background-repeat:no-repeat;border:1px dashed #00ccff;');
		//} else if(jQuery(active_element).hasClass('navbar')){
		//	jQuery(active_element).children('.container').children('.navbar-header').children('.navbar-brand').html('<img src="'+selected_image+'" height="50" />');
		} else if(jQuery(active_element).hasClass('kodyok-element-image')){
			/*if(jQuery(active_element).children('a').attr('data-lightbox')){
				jQuery.get(get_site_url+"/?do=get_image&size=medium&id="+id,function(data){
					jQuery(active_element).children('a').children('img').attr('src',data);
				});
				jQuery(active_element).children('a').attr('href',selected_image);
			} else {*/
				jQuery(active_element).children('a').children('img').attr('src',selected_image);
			//}
			img = new Image();
			img.onload = function(){
				jQuery(active_element).css('max-width',this.width+'px');
				jQuery(active_element).css('max-height',this.height+'px');
				jQuery(active_element).css('width','auto');
				jQuery(active_element).css('height','auto');
				image_resizable(jQuery(active_element));
			}
			img.src = selected_image;
		} else if(jQuery(active_element).hasClass('kodyok-element-slider')){
			add_slider(selected_image);
		} else if(jQuery(active_element).hasClass('kodyok-element-gallery')){
			add_gallery(selected_image);
		}
	}
}
function remove_last_image(){
	jQuery('img[src="'+parent.plugin_dir_url+'assets/img/blank.gif"]').parent().parent().remove();
}
function change_image_border(value){
	jQuery(active_element).children('a').children('img').css('border-color',value);
}
function set_image_border(value){
	border_value = jQuery(active_element).children('a').children('img').css('border-width');
	border_value = border_value.split('px');
	if(value=='minus'){
		border_value = parseInt(border_value[0])-1;
	} else if(value=='plus'){
		border_value = parseInt(border_value[0])+1;
	}
	jQuery(active_element).children('a').children('img').css('border-style','solid');
	jQuery(active_element).children('a').children('img').css('border-width',border_value+'px');
	return border_value+'px';
}
function set_shape(value){
	if(value=='circle'){
		jQuery(active_element).find('a > img').addClass('kodyok-border-circle');
	} else if(value=='square'){
		jQuery(active_element).find('a > img').removeClass('kodyok-border-circle');
	}
}
function image_resizable(resize_element){
	if(resize_element=='.kodyok-element-load-resize'){
		jQuery(resize_element).find('.ui-resizable-handle').remove();
	}
	jQuery(resize_element).resizable({
		aspectRatio: true,
		handles: 'e,s,se'
	});
	jQuery(resize_element).removeClass('kodyok-element-load-resize');
	jQuery(resize_element).removeClass('kodyok-element-last-image');
}