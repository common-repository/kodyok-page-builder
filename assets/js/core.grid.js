jQuery(document).ready(function(){
	jQuery('body').on('click','.kodyok-element-column-settings',function(){
		active_element = jQuery(this).parent().parent();
		jQuery('#iframe',window.parent.document).css('width',(jQuery('#all_content',window.parent.document).width()-380)+'px');
		jQuery('#settings_menu',window.parent.document).show();
		jQuery('#settings_menu > div',window.parent.document).hide();
		jQuery('#column_settings',window.parent.document).show();
		//if(jQuery(active_element).hasClass('dynamic_content')){
			jQuery('.set_column[data-type=5]',window.parent.document).hide();
			jQuery('.set_column[data-type=6]',window.parent.document).hide();
			jQuery('.set_column[data-type=7]',window.parent.document).hide();
			jQuery('.set_column[data-type=8]',window.parent.document).hide();
			jQuery('.set_column[data-type=9]',window.parent.document).hide();
		//}
		select_column_type();
	});
	jQuery("body").on("click",".kodyok-element-add-column",function(){
		clone_element = jQuery(this).parent().parent().children('.kodyok-grid').children('div:last').clone();
		if(clone_element.hasClass('kodyok-sortable-area')){
			clone_element.html('');
		} else {
			clone_element.children('.kodyok-sortable-area').html('');
		}
		clone_element.insertAfter(jQuery(this).parent().parent().children('.kodyok-grid').children('div:last'));
		parent.load_add_item_drag();
	});
	jQuery("body").on("click",".kodyok-element-remove-column",function(){
		if(jQuery(this).parent().parent().children('.kodyok-grid').children('div').length>1){
			jQuery(this).parent().parent().children('.kodyok-grid').children('div:last').remove();
		}
	});
});
/*function change_column(columns){
	row = jQuery(active_element).children('.row').length;
	column = jQuery(active_element).children('.row:first').children('div').length;
	layout_type = columns.split(',');
	for(a=0;a<row;a++){
		for(b=0;b<column;b++){
			if(jQuery(active_element).hasClass('dynamic_content')){
				jQuery(active_element).children('.row').eq(a).children('div').eq(b).attr('class','col-md-'+layout_type[b]);
			} else {
				jQuery(active_element).children('.row').eq(a).children('div').eq(b).attr('class','col-md-'+layout_type[b]+' sortable');
			}
		}
	}
	parent.load_add_item_drag();
}*/
function get_grid_settings(){
	opacity_value = jQuery(active_element).children(".kodyok-grid").css('background-color').split(',');
	if(opacity_value.length==4){
		opacity_value = opacity_value[3].replace(' ','');
		opacity_value = opacity_value.replace(')','');
		jQuery('#grid_opacity',window.parent.document).val(parseFloat(opacity_value).toFixed(1)*100);
	} else {
		jQuery('#grid_opacity',window.parent.document).val(100);
	}
}
function change_grid_background(value){
	jQuery(active_element).children('.kodyok-grid').css('background-color',value);
}
function set_grid_opacity(value){
	opacity_value = jQuery(active_element).children('.kodyok-grid').css('background-color');
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
		jQuery(active_element).children('.kodyok-grid').css('background-color',new_background_color);
	} else {
		new_background_color = old_opacity_value_1.replace('rgb(','rgba(');
		new_background_color = new_background_color.replace(')',','+opacity_value/100+')');
		jQuery(active_element).children('.kodyok-grid').css('background-color',new_background_color);
	}
	return opacity_value;
}
function set_column(value){
	columns = [];
	columns[1] = '1,';
	columns[2] = '2,';
	columns[3] = '3,';
	columns[4] = '4,';
	columns[5] = '3,9,';
	columns[6] = '9,3,';
	columns[7] = '3,6,3,';
	columns[8] = '2,3,5,2,';
	columns[9] = '2,2,2,4,2,';
	columns[10] = '6,';
	column_type = columns[value].split(',');
	if(jQuery('#view_mode',window.parent.document).val()=='desktop'){
		col_type = '@l';
	} else if(jQuery('#view_mode',window.parent.document).val()=='tablet'){
		col_type = '@m';
	} else if(jQuery('#view_mode',window.parent.document).val()=='mobile'){
		col_type = '@s';
	}
	current_class = jQuery(active_element).children('.kodyok-grid').attr('class');
	all_classes = current_class.split(' ');
	for(i=0;i<all_classes.length;i++){
		if(all_classes[i].search(col_type)>0){
			one_class = all_classes[i].split('-');
			one_class = one_class[4].replace(col_type,'');
			current_class = current_class.replace('kodyok-child-width-1-'+one_class+col_type,'kodyok-child-width-1-'+column_type[0]+col_type);
			if(col_type=='@l'){
				current_class = current_class.replace('kodyok-child-width-1-'+one_class+'@xl','kodyok-child-width-1-'+column_type[0]+'@xl');
			}
		}
	}
	jQuery(active_element).children('.kodyok-grid').attr('class',current_class);
	jQuery(active_element).children('.kodyok-grid').html(jQuery(active_element).children('.kodyok-grid').html());
	if(jQuery(active_element).find('.kodyok-sortable-area').length>0){
		parent.load_add_item_drag();
	}
	/*if(value==1){
		jQuery('#customize_layout',window.parent.document).hide();
	} else {
		if(jQuery(active_element).hasClass('dynamic_content')){
			jQuery('#customize_layout',window.parent.document).hide();
		} else {
			jQuery('#customize_layout',window.parent.document).show();
			window.parent.document.getElementById('customize_area').src = get_site_url+'/?do=column_settings&id='+value;
		}
	}*/
}
function remove_grid_background(){
	jQuery(active_element).children('.kodyok-grid').css('background-color','transparent');
}
function select_column_type(view_mode){
	if(jQuery(active_element).hasClass('kodyok-element-grid')){
		if(view_mode=='desktop'){
			col_type = '@l';
		} else if(view_mode=='tablet'){
			col_type = '@m';
		} else if(view_mode=='mobile'){
			col_type = '@s';
		} else {
			if(jQuery('#iframe',window.parent.document).width()<960){
				col_type = '@s';
				jQuery('#view_mode',window.parent.document).val('mobile');
			} else if(jQuery('#iframe',window.parent.document).width()>=960 && jQuery('#iframe',window.parent.document).width()<1200){
				col_type = '@m';
				jQuery('#view_mode',window.parent.document).val('tablet');
			} else if(jQuery('#iframe',window.parent.document).width()>=1200 && jQuery('#iframe',window.parent.document).width()<1600){
				col_type = '@l';
				jQuery('#view_mode',window.parent.document).val('desktop');
			} else if(jQuery('#iframe',window.parent.document).width()>=1600){
				col_type = '@xl';
				jQuery('#view_mode',window.parent.document).val('desktop');
			}
		}
		current_class = jQuery(active_element).children('.kodyok-grid').attr('class');
		all_classes = current_class.split(' ');
		for(i=0;i<all_classes.length;i++){
			if(all_classes[i].search(col_type)>0){
				one_class = all_classes[i].split('-');
				one_class = one_class[4].replace(col_type,'');
				jQuery('.set_column',window.parent.document).css('border','1px solid #EEE');
				if(one_class=='1'){
					jQuery('.set_column[data-type=1]',window.parent.document).css('border','1px solid #666');
				} else if(one_class=='2'){
					jQuery('.set_column[data-type=2]',window.parent.document).css('border','1px solid #666');
				} else if(one_class=='3'){
					jQuery('.set_column[data-type=3]',window.parent.document).css('border','1px solid #666');
				} else if(one_class=='4'){
					jQuery('.set_column[data-type=4]',window.parent.document).css('border','1px solid #666');
				} else if(one_class=='6'){
					jQuery('.set_column[data-type=10]',window.parent.document).css('border','1px solid #666');
				}
			}
		}
	}
}
function get_gallery_settings(){
	jQuery('#gallery_content',window.parent.document).html('');
	jQuery(active_element).children('.kodyok-grid').children('div').each(function(){
		jQuery("#gallery_content",window.parent.document).append('<div style="border:1px solid #CCC;padding-left:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span><img src="'+jQuery(this).children('a').children('img').attr('src')+'" height="42"><span class="fa fa-trash remove_gallery" style="font-size:18px;margin-left:10px;"></span></div>');
	});
	gallery_sortable();
}
function add_gallery(selected_image){
	clone_element = jQuery(active_element).children('.kodyok-grid').children('div:last').clone();
	clone_element.children('a').attr('href',selected_image);
	clone_element.children('a').children('img').attr('src',selected_image);
	clone_element.insertAfter(jQuery(active_element).children('.kodyok-grid').children('div:last'));
	jQuery(active_element).children('.kodyok-grid').html(jQuery(active_element).children('.kodyok-grid').html());
	jQuery("#gallery_content",window.parent.document).append('<div style="border:1px solid #CCC;padding-left:10px;"><span class="fa fa-sort" style="font-size:18px;margin-right:10px;"></span><img src="'+selected_image+'" height="42"><span class="fa fa-trash remove_gallery" style="font-size:18px;margin-left:10px;"></span></div>');
	gallery_sortable();
}
function remove_gallery(index){
	if(jQuery(active_element).children('.kodyok-grid').children('div').length>1){
		jQuery(active_element).children('.kodyok-grid').children('div').eq(index).remove();
		jQuery("#gallery_content",window.parent.document).children('div').eq(index).remove();
	}
}
function gallery_sortable(){
	jQuery("#gallery_content",window.parent.document).sortable({
		start:function(event,ui){
			first_index = ui.item.index();
		},
		update:function(event,ui){
			last_index = ui.item.index();
			if(first_index<last_index){
				jQuery(active_element).children('.kodyok-grid').children('div').eq(first_index).insertAfter(jQuery(active_element).children('.kodyok-grid').children('div').eq(last_index));
			} else {
				jQuery(active_element).children('.kodyok-grid').children('div').eq(first_index).insertBefore(jQuery(active_element).children('.kodyok-grid').children('div').eq(last_index));
			}
		},tolerance:'pointer',cursor:'move',axis:'y'
	});
}