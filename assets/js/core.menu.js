/*function change_menu_background(value){
	jQuery('nav').css('background-color',value);
}
function change_menu_font(value){
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('color',value);
}
function set_menu_font(value,font_name){
	WebFont.load({
		google: {
			families: [font_name]
		}
	});
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-family',value);
}
function set_menu_opacity(value){
	opacity_value = jQuery('nav').css('background-color');
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
		jQuery('nav').css('background-color',new_background_color);
	} else {
		new_background_color = old_opacity_value_1.replace('rgb(','rgba(');
		new_background_color = new_background_color.replace(')',','+opacity_value/100+')');
		jQuery('nav').css('background-color',new_background_color);
	}
	return opacity_value;
}
function remove_menu(value){
	jQuery('#sortable',window.parent.document).children('div').eq(value).remove();
	jQuery.get(get_site_url+"/?do=remove_menu&id="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).attr('data-item-id'));
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).remove();
	a = 0;
	jQuery('#sortable',window.parent.document).html('');
	jQuery('nav').children('.container').children('.collapse').children('.nav').children().each(function(){
		jQuery('#sortable',window.parent.document).append('<div id="content_menu_'+a+'" style="border:1px solid #677888;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+jQuery(this).text()+'<span class="fa fa-link menu_link" data-href="'+jQuery(this).children('a').attr('href')+'" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-pencil menu_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_menu" style="font-size:18px;margin-left:10px;"></span></div>');
		a++;
	});
}
function edit_menu(value){
	jQuery('#button_name',window.parent.document).val(jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).text());
	return jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).children('a').attr('href');
}
function add_menu(value){
	button_name = jQuery('#button_name',window.parent.document).val();
	jQuery('#button_name',window.parent.document).attr('placeholder','New button');
	jQuery('#button_name',window.parent.document).attr('style','');
	if(button_name==''){
		jQuery('#button_name',window.parent.document).attr('placeholder','This field is required.');
		jQuery('#button_name',window.parent.document).attr('style','border:1px solid #a94442;');
	} else {
		if(jQuery('.add_menu',window.parent.document).html()=='Add'){
			next_item_id = jQuery('#sortable',window.parent.document).children().length;
			jQuery.get(get_site_url+"/?do=add_menu_item&title="+button_name+"&position="+(next_item_id+1)+"&menu_id="+jQuery('nav').children('.container').children('.collapse').children('.nav').attr('data-menu-id'),function(data){
				jQuery('nav').children('.container').children('.collapse').children('.nav').append('<li data-item-id="'+parseInt(data)+'" data-position="'+(next_item_id+1)+'"><a href="#">'+button_name+'</a></li>');
				jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').last().children('a').css('font-family',jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').first().children('a').css('font-family'));
				jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').last().children('a').css('color',jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').first().children('a').css('color'));
			});
			jQuery('#sortable',window.parent.document).append('<div id="content_menu_'+next_item_id+'" style="border:1px solid #677888;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+button_name+'<span class="fa fa-link menu_link" data-href="#" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-pencil menu_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_menu" style="font-size:18px;margin-left:10px;"></span></div>');
		} else if(jQuery('.add_menu',window.parent.document).html()=='Save'){
			jQuery.get(get_site_url+"/?do=update_menu&menu_id="+jQuery('nav').children('.container').children('.collapse').children('.nav').attr('data-menu-id')+"&item_id="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).attr('data-item-id')+"&link="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).children('a').attr('href')+"&target="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).children('a').attr('target')+"&title="+button_name+"&position="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).attr('data-position'));
			jQuery('#sortable',window.parent.document).children('div').eq(value).html('<span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+button_name+'<span class="fa fa-link menu_link" data-href="'+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).children('a').attr('href')+'" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-pencil menu_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_menu" style="font-size:18px;margin-left:10px;"></span>');
			jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(value).children('a').text(button_name);
			jQuery('.add_menu',window.parent.document).html('Add');
		}
		jQuery('#button_name',window.parent.document).val('');
		jQuery('#button_name',window.parent.document).attr('placeholder','New button');
		jQuery('#button_name',window.parent.document).attr('style','');
		menu_sortable();
	}
}
function update_menu_link(item_id,link,blank,link_type){
	jQuery('#content_menu_'+item_id+' > .menu_link',window.parent.document).attr('data-href',link);
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).children('a').attr('href',link);
	if(link_type=='section'){
		link = link.replace('#','');
	}
	target = '';
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).children('a').removeAttr('target');
	if(blank==1){
		jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).children('a').attr('target','_blank');
		target = '_blank';
	}
	jQuery.get(get_site_url+"/?do=update_menu&menu_id="+jQuery('nav').children('.container').children('.collapse').children('.nav').attr('data-menu-id')+"&item_id="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).attr('data-item-id')+"&link="+link+"&target="+target+"&title="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).text()+"&position="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).attr('data-position')+'&type='+link_type);
}
function remove_menu_link(item_id){
	jQuery('#content_menu_'+item_id+' > .menu_link',window.parent.document).attr('data-href','#');
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).children('a').attr('href','#');
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).children('a').removeAttr('target');
	jQuery.get(get_site_url+"/?do=update_menu&menu_id="+jQuery('nav').children('.container').children('.collapse').children('.nav').attr('data-menu-id')+"&item_id="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).attr('data-item-id')+"&link=&target=&title="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).text()+"&position="+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(item_id).attr('data-position'));
}
function get_menu_settings(){
	active_element = jQuery('nav');
	jQuery('#iframe',window.parent.document).css('width',(jQuery('#all_content',window.parent.document).width()-380)+'px');
	jQuery('#settings_menu',window.parent.document).show();
	jQuery('#settings_menu > div',window.parent.document).hide();
	jQuery('#menu_settings',window.parent.document).show();
	opacity_value = jQuery('nav').css('background-color');
	opacity_value = opacity_value.split(',');
	if(opacity_value.length==4){
		opacity_value = opacity_value[3].replace(' ','');
		opacity_value = opacity_value.replace(')','');
		jQuery('#menu_opacity',window.parent.document).val(parseFloat(opacity_value).toFixed(1)*100);
	} else {
		jQuery('#menu_opacity',window.parent.document).val(100);
	}
	if(jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('color')){
		font_color = jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('color');
		font_color = font_color.split('rgb(');
		font_color = font_color[1].split(')');
		font_color = font_color[0].split(', ');
		font_color = rgbToHex(parseInt(font_color[0]),parseInt(font_color[1]),parseInt(font_color[2]));
		jQuery(".picker[data-type='menu_font']",window.parent.document).val(font_color);
		jQuery(".picker[data-type='menu_font']",window.parent.document).css('border-color','#'+font_color);
	}
	if(jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-family')){
		jQuery("#menu_change_font option[value='"+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-family')+"']",window.parent.document).attr('selected','selected');
	}
	a = 0;
	jQuery('#sortable',window.parent.document).html('');
	jQuery('nav').children('.container').children('.collapse').children('.nav').children().each(function(){
		jQuery('#sortable',window.parent.document).append('<div id="content_menu_'+a+'" style="border:1px solid #677888;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+jQuery(this).text()+'<span class="fa fa-link menu_link" data-href="'+jQuery(this).children('a').attr('href')+'" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-pencil menu_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_menu" style="font-size:18px;margin-left:10px;"></span></div>');
		a++;
	});
	menu_sortable();
}
function menu_sortable(){
	jQuery("#sortable",window.parent.document).sortable({
		start:function(event,ui){
			current_font = jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-family');
			current_color = jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('color');
		},
		update:function(event,ui){
			order = jQuery("#sortable",window.parent.document).sortable('toArray').toString().split(',');
    		item_list = '';
    		menu_content = '';
    		menu_content_content = '';
    		for(a=0;a<order.length;a++){
    			menu_id = order[a].split('content_menu_');
    			item_list += jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).attr('data-item-id')+',';
    			target = '';
    			if(jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).children('a').attr('target')){
    				target = ' target="'+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).children('a').attr('target')+'"';
    			}
    			menu_content += '<li data-item-id="'+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).attr('data-item-id')+'" data-position="'+(a+1)+'"><a href="'+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).children('a').attr('href')+'"'+target+'>'+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).text()+'</a></li>';
    			menu_content_content += '<div id="content_menu_'+a+'" style="border:1px solid #677888;padding:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span>'+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).text()+'<span class="fa fa-link menu_link" data-href="'+jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').eq(menu_id[1]).children('a').attr('href')+'" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-pencil menu_edit_item" style="font-size:18px;margin-left:10px;"></span><span class="fa fa-trash remove_menu" style="font-size:18px;margin-left:10px;"></span></div>';
    		}
    		jQuery.get(get_site_url+"/?do=update_menu_list&items="+item_list);
    		jQuery('nav').children('.container').children('.collapse').children('.nav').html(menu_content);
    		jQuery('#sortable',window.parent.document).html(menu_content_content);
    		jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('color',current_color);
			jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-family',current_font);
		},tolerance:'pointer',cursor:'move',axis:'y'
	});
}
function set_menu_height(value){
	menu_height = jQuery(active_element).css('padding-top').split('px');
	menu_height = parseInt(menu_height[0]);
	if(value=='minus'){
		if(menu_height>0){
			menu_height = menu_height-5;
		}
	} else if(value=='plus'){
		menu_height = menu_height+5;
	}
	jQuery(active_element).css('padding-top',menu_height+'px');
	jQuery(active_element).css('padding-bottom',menu_height+'px');
	return jQuery(active_element).css('height');
}
function set_logo_height(value){
	logo_height = jQuery(active_element).find('.navbar-brand').css('height').split('px');
	logo_height = parseInt(logo_height[0]);
	if(value=='minus'){
		if(logo_height>0){
			logo_height = logo_height-10;
		}
	} else if(value=='plus'){
		logo_height = logo_height+10;
	}
	jQuery(active_element).find('.navbar-brand').css('height',logo_height+'px');
	if(logo_height<50){
		jQuery('.navbar-brand').css('margin-top',((50-logo_height)/2)+'px');
	} else if(logo_height==50){
		jQuery('.navbar-brand').css('margin-top','0px');
	}
	if(jQuery('.nav').height()<jQuery('.navbar-brand').height()){
		jQuery('.nav').css('margin-top',((jQuery('.navbar-brand').height()-jQuery('.nav').height())/2)+'px');
	} else if(jQuery('.nav').height()==jQuery('.navbar-brand').height()){
		jQuery('.nav').css('margin-top','0px');
	}
	return logo_height+'px';
}
function set_menu_size(value){
	jQuery('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-size',value+'px');
}*/