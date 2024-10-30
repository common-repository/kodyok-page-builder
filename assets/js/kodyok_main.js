jQuery(document).ready(function(){
	jQuery('#iframe').css('width',(jQuery('#all_content').width()-80)+'px');
	jQuery('#settings_menu').css('left',(jQuery('#all_content').width()-300)+'px');
	jQuery(window).on('resize',function(){
		if(jQuery('#settings_menu').css('display')=='none'){
			jQuery('#iframe').css('width',(jQuery('#all_content').width()-80)+'px');
		} else {
			jQuery('#iframe').css('width',(jQuery('#all_content').width()-380)+'px');
		}
		jQuery('#settings_menu').css('left',(jQuery('#all_content').width()-300)+'px');
		if(jQuery('#settings_menu').css('display')!='none'){
			jQuery('#design_area')[0].contentWindow.select_column_type();
		}
	});
	jQuery("#save").click(function(){
		jQuery('#design_area')[0].contentWindow.run_before_save();
		jQuery("#design_area").contents().find('.kodyok-section').each(function(){
			jQuery(this).attr('style',jQuery(this).attr('style').replace('"','\'').replace('"','\''));
		});
		/*menu_style = {};
		menu_style["font"] = jQuery("#design_area").contents().find('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-family');
		menu_style["color"] = jQuery("#design_area").contents().find('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('color');
		menu_style["font_size"] = jQuery("#design_area").contents().find('nav').children('.container').children('.collapse').children('.nav').children('li').children('a').css('font-size');
		menu_style["bgcolor"] = jQuery("#design_area").contents().find('nav').css('background-color');
		menu_style["logo"] = jQuery("#design_area").contents().find('nav').children('.container').children('.navbar-header').children('.navbar-brand').children('img').attr('src');
		menu_style["logo_height"] = jQuery("#design_area").contents().find('nav').children('.container').children('.navbar-header').children('.navbar-brand').css('height');
		menu_style["padding"] = jQuery("#design_area").contents().find('nav').css('padding-top');*/
		content_html = jQuery("#design_area").contents().find('#kodyok-content-area').html();
		jQuery('#saved_content').html(content_html);
		function convert_content(element){
			jQuery(element).children().each(function(){
				if(jQuery(this).children()){
					convert_content(jQuery(this));
				}
				if(jQuery(this).prop("tagName")=="BR" || jQuery(this).prop("tagName")=="IMG" || jQuery(this).prop("tagName")=="INPUT"){
					new_element = '[KODYOK-TAG-OPEN'+jQuery(this).prop("tagName");
					jQuery.each(this.attributes,function(){
						if(this.specified){
					    	new_element += ' '+this.name+'="'+this.value+'"';
						}
					});
					new_element += 'KODYOK-TAG-CLOSE]';
				} else {
					new_element = '[KODYOK-TAG-OPEN'+jQuery(this).prop("tagName");
					jQuery.each(this.attributes,function(){
						if(this.specified){
					    	new_element += ' '+this.name+'="'+this.value+'"';
						}
					});
					new_element += 'KODYOK-TAG-CLOSE]'+jQuery(this).html()+'[KODYOK-TAG-OPEN/'+jQuery(this).prop("tagName")+'KODYOK-TAG-CLOSE]';
				}
				jQuery(this).replaceWith(new_element);
			});
		}
		convert_content(jQuery('#saved_content'));
		content_html = jQuery('#saved_content').html();
		/*jQuery('#saved_content_footer').html(jQuery("#design_area").contents().find('#footer').html());
		convert_content(jQuery('#saved_content_footer'));
		footer_html = jQuery('#saved_content_footer').html();*/
		jQuery.ajax({
			type: "POST",
			url: get_site_url+"/?do=save&id="+jQuery("#design_area").contents().find('#kodyok-content-area').attr('data-post-id'),
			//data: {content:content_html,menu:JSON.stringify(menu_style),footer:footer_html},
			data: {content:content_html},
			success: function(html){
				swal(
					'Success',
					'',
					'success'
				);
				jQuery('#saved_content').html('');
				jQuery('#design_area')[0].contentWindow.run_after_save();
			}
		});
		return false;
	});
	jQuery('.open_window').click(function(){
		if(jQuery('#'+jQuery(this).children('a').attr('id')+'_menu').css('display')=='none'){
			jQuery('.open_window').addClass('left_menu_icon');
			jQuery(this).removeClass('left_menu_icon');
			jQuery('.open_window').css('background-color','');
			jQuery(this).css('background-color','#ffcc00');
			jQuery('.open_window > a').css('color','#677888');
			jQuery(this).children('a').css('color','#000');
			jQuery('#add_menu').css('display','none');
			//jQuery('#general_settings_menu').css('display','none');
			jQuery('#'+jQuery(this).children('a').attr('id')+'_menu').css('display','');
		} else {
			jQuery('.open_window').addClass('left_menu_icon');
			jQuery('.open_window').css('background-color','');
			jQuery('.open_window > a').css('color','#677888');
			jQuery('#'+jQuery(this).children('a').attr('id')+'_menu').css('display','none');
		}
	});
	jQuery('#add_list').change(function(){
		if(jQuery(this).val()=='ready_made'){
			jQuery('#basic_elements').hide();
			jQuery('#ready_made').show();
		} else if(jQuery(this).val()=='basic_elements'){
			jQuery('#ready_made').hide();
			jQuery('#basic_elements').show();
		}
	});
	jQuery.getJSON(plugin_dir_url+'sections/list.json',function(data){
		jQuery.each(data.sections,function(i){
			jQuery('#ready_made').append('<div class="kodyok-add-section" data-section-name="'+data.sections[i]['file']+'" style="text-align:center;cursor:pointer;font-size:10px;margin-bottom:10px;box-shadow:inset 0 0 0 1px #EEE;"><img src="'+plugin_dir_url+'sections/'+data.sections[i]['file']+'.gif" alt="'+data.sections[i]['name']+'" style="width:100%;" /><br />'+data.sections[i]['name']+'</div>');
		});
	});
    jQuery("body").on("click",".select",function(){
		jQuery('#select_image').removeAttr('disabled');
		jQuery('#site_images > div').css('border','');
		jQuery(this).css('border','5px solid #00ccff');
		selected_image_id = jQuery(this).attr('data-id');
		jQuery.get(get_site_url+"/?do=get_image&size=intermediate&id="+jQuery(this).attr('data-id'),function(data){
			selected_image = data;
		});
	});
	jQuery("#select_image").click(function(){
		jQuery('#design_area')[0].contentWindow.update_image(selected_image,selected_image_id,image_type);
		jQuery('#imageModal').modal('hide');
	});
	jQuery("body").on("input","#icon_search",function(){
		if(jQuery('#icon_search').val()!=''){
			jQuery("#icons").css('display','none');
			jQuery("#icon_search_results").css('display','');
			jQuery('#icon_search_results').html('');
			jQuery("#icons > section > div > div > a:contains('"+jQuery('#icon_search').val()+"')").parent().each(function(){
				jQuery('#icon_search_results').append(jQuery(this).clone());
			});
		} else {
			jQuery("#icons").css('display','');
			jQuery("#icon_search_results").css('display','none');
		}
	});
	jQuery('.fa-hover').children('a').attr('href','#');
	jQuery("body").on("click",".fa-hover",function(){
		jQuery('#design_area')[0].contentWindow.update_icon(jQuery(this).children('a').children('i').attr('class'));
		jQuery('#iconModal').modal('hide');
		jQuery("#icons").css('display','');
		jQuery("#icon_search_results").css('display','none');
		jQuery("#icon_search").val('');
	});
	jQuery('.picker').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			if(jQuery(el).attr('data-type')=='button_border'){
				jQuery('#design_area')[0].contentWindow.change_button_border('#'+hex);
			} else if(jQuery(el).attr('data-type')=='button_font'){
				jQuery('#design_area')[0].contentWindow.change_button_font('#'+hex);
			} else if(jQuery(el).attr('data-type')=='button_background'){
				jQuery('#design_area')[0].contentWindow.change_button_background('rgba('+rgb['r']+','+rgb['g']+','+rgb['b']+','+jQuery('#button_opacity').val()/100+')');
			} else if(jQuery(el).attr('data-type')=='grid_background'){
				jQuery('#design_area')[0].contentWindow.change_grid_background('rgba('+rgb['r']+','+rgb['g']+','+rgb['b']+','+jQuery('#grid_opacity').val()/100+')');
			} else if(jQuery(el).attr('data-type')=='icon'){
				jQuery('#design_area')[0].contentWindow.change_icon_color('#'+hex);
			} else if(jQuery(el).attr('data-type')=='icon_background'){
				jQuery('#design_area')[0].contentWindow.change_icon_background_color('#'+hex);
			} else if(jQuery(el).attr('data-type')=='image_border'){
				jQuery('#design_area')[0].contentWindow.change_image_border('#'+hex);
			//} else if(jQuery(el).attr('data-type')=='menu_background'){
			//	jQuery('#design_area')[0].contentWindow.change_menu_background('rgba('+rgb['r']+','+rgb['g']+','+rgb['b']+','+jQuery('#menu_opacity').val()/100+')');
			//} else if(jQuery(el).attr('data-type')=='menu_font'){
			//	jQuery('#design_area')[0].contentWindow.change_menu_font('#'+hex);
			} else if(jQuery(el).attr('data-type')=='section_background'){
				jQuery('#design_area')[0].contentWindow.change_section_background('rgba('+rgb['r']+','+rgb['g']+','+rgb['b']+','+jQuery('#section_opacity').val()/100+')');
			} else if(jQuery(el).attr('data-type')=='text_font'){
				jQuery('#design_area')[0].contentWindow.change_text_font('#'+hex);
			//} else if(jQuery(el).attr('data-type')=='footer_background'){
			//	jQuery('#design_area')[0].contentWindow.change_footer_background('#'+hex);
			}
			jQuery(el).css('border-color','#'+hex);
			// Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
			if(!bySetColor) jQuery(el).val(hex);
		}
	}).keyup(function(){
		jQuery(this).colpickSetColor(this.value);
	});
	jQuery("body").on("click",".set_button_opacity",function(){
		opacity_value = jQuery('#design_area')[0].contentWindow.set_button_opacity(jQuery(this).attr('data-type'));
		jQuery('#button_opacity').val(opacity_value);
	});
	jQuery("body").on("click",".set_button_border",function(){
		border_value = jQuery('#design_area')[0].contentWindow.set_button_border(jQuery(this).attr('data-type'));
		jQuery('#button_border').val(border_value);
	});
	jQuery("#button_change_font").change(function(){
		if(jQuery("#button_change_font").val()!=0){
			jQuery('#design_area')[0].contentWindow.set_button_font(jQuery("#button_change_font").val(),jQuery("#button_change_font > option:selected").text());
		}
	});
	jQuery("#button_change_size").change(function(){
		if(jQuery("#button_change_size").val()!=0){
			jQuery('#design_area')[0].contentWindow.set_button_size(jQuery("#button_change_size").val());
		}
	});
	jQuery("#text_change_font").change(function(){
		if(jQuery("#text_change_font").val()!=0){
			jQuery('#design_area')[0].contentWindow.set_text_font(jQuery("#text_change_font").val(),jQuery("#text_change_font > option:selected").text());
		}
	});
	jQuery("#text_change_size").change(function(){
		if(jQuery("#text_change_size").val()!=0){
			jQuery('#design_area')[0].contentWindow.set_text_size(jQuery("#text_change_size").val());
		}
	});
	jQuery("body").on("click",".set_grid_opacity",function(){
		opacity_value = jQuery('#design_area')[0].contentWindow.set_grid_opacity(jQuery(this).attr('data-type'));
		jQuery('#grid_opacity').val(opacity_value);
	});
	jQuery("body").on("click",".set_column",function(){
		jQuery('.set_column').css('border','1px solid #EEE');
		jQuery(this).css('border','1px solid #666');
		jQuery('#design_area')[0].contentWindow.set_column(jQuery(this).attr('data-type'));
	});
	jQuery("body").on("click",".remove_grid_background",function(){
		jQuery('#design_area')[0].contentWindow.remove_grid_background();
	});
	jQuery('#imageModal').on('hidden.bs.modal',function(){
		jQuery('#design_area')[0].contentWindow.remove_last_image();
	});
	jQuery('#videoModal').on('hidden.bs.modal',function(){
		jQuery('#design_area')[0].contentWindow.remove_last_video();
	});
	jQuery("body").on("click",".set_image_border",function(){
		border_value = jQuery('#design_area')[0].contentWindow.set_image_border(jQuery(this).attr('data-type'));
		jQuery('#image_border').val(border_value);
	});
	jQuery("body").on("click",".set_shape",function(){
		jQuery('#design_area')[0].contentWindow.set_shape(jQuery(this).attr('data-type'));
	});
	jQuery("body").on("click",".set_align",function(){
		jQuery('#design_area')[0].contentWindow.set_align(jQuery(this).attr('data-type'));
	});
	jQuery("body").on("click",".set_margin",function(){
		margin_side = jQuery(this).attr('data-type').split('_');
		margin_value = jQuery('#design_area')[0].contentWindow.set_margin(jQuery(this).attr('data-type'));
		jQuery('#'+margin_side[0]+'_margin').val(margin_value);
	});
	/*jQuery("#menu_change_font").change(function(){
		if(jQuery("#menu_change_font").val()!=0){
			jQuery('#design_area')[0].contentWindow.set_menu_font(jQuery("#menu_change_font").val(),jQuery("#menu_change_font > option:selected").text());
		}
	});
	jQuery("body").on("click",".set_menu_opacity",function(){
		opacity_value = jQuery('#design_area')[0].contentWindow.set_menu_opacity(jQuery(this).attr('data-type'));
		jQuery('#menu_opacity').val(opacity_value);
	});*/
	jQuery("body").on("click",".image_edit",function(){
		image_edit();
	});
	/*menu_id = '';
	jQuery("body").on("click",".remove_menu",function(){
		menu_id = jQuery(this).parent().attr('id').split('content_menu_');
		menu_id = menu_id[1];
		jQuery('#design_area')[0].contentWindow.remove_menu(menu_id);
	});
	jQuery("body").on("click",".menu_edit_item",function(){
		menu_id = jQuery(this).parent().attr('id').split('content_menu_');
		menu_id = menu_id[1];
		item_link = jQuery('#design_area')[0].contentWindow.edit_menu(menu_id);
		jQuery('.add_menu').html('Save');
	});
	jQuery("body").on("click",".add_menu",function(){
		jQuery('#design_area')[0].contentWindow.add_menu(menu_id);
	});*/
	jQuery("body").on("click",".set_section_opacity",function(){
		jQuery('#design_area')[0].contentWindow.set_section_opacity(jQuery(this).attr('data-type'));
	});
	jQuery("body").on("click",".remove_background",function(){
		jQuery('#design_area')[0].contentWindow.remove_background();
	});
	jQuery("body").on("click",".remove_slider",function(){
		jQuery('#design_area')[0].contentWindow.remove_slider(jQuery(this).parent().index());
	});
	jQuery("body").on("click",".remove_gallery",function(){
		jQuery('#design_area')[0].contentWindow.remove_gallery(jQuery(this).parent().index());
	});
	jQuery("#link_type").change(function(){
		jQuery('#link_section').parent().hide();
		jQuery('#link_page').parent().hide();
		jQuery('#link_url').parent().hide();
		jQuery('#link_'+jQuery(this).val()).parent().show();
	});
	jQuery("#set_link").click(function(){
		jQuery('#link_type').parent().removeClass('has-error');
		jQuery('#link_section').parent().removeClass('has-error');
		jQuery('#link_page').parent().removeClass('has-error');
		jQuery('#link_url').parent().removeClass('has-error');
		if(jQuery('#link_type').val()==0){
			jQuery('#link_type').parent().addClass('has-error');
		} else {
			link = '';
			if(jQuery('#link_type').val()=='section'){
				if(jQuery('#link_section').val()==0){
					jQuery('#link_section').parent().addClass('has-error');
				} else {
					link = jQuery('#link_section').val();
					blank = 0;
					link_type = 'section';
				}
			} else if(jQuery('#link_type').val()=='page'){
				if(jQuery('#link_page').val()==0){
					jQuery('#link_page').parent().addClass('has-error');
				} else {
					link = jQuery('#link_page').val();
					blank = 0;
					link_type = 'page';
				}
			} else if(jQuery('#link_type').val()=='url'){
				if(jQuery('#link_url').val()==''){
					jQuery('#link_url').parent().addClass('has-error');
				} else {
					if(jQuery('#link_url').val().search('http://')<0 && jQuery('#link_url').val().search('https://')<0){
						jQuery('#link_url').val('http://'+jQuery('#link_url').val());
					}
					link = jQuery('#link_url').val();
					blank = 1;
					link_type = 'url';
				}
			}
			if(link!=''){
				/*if(menu_item_id!=''){
					jQuery('#design_area')[0].contentWindow.update_menu_link(menu_item_id,link,blank,link_type);
					menu_item_id = '';
				} else*/
				if(icon_item_id!=''){
					jQuery('#design_area')[0].contentWindow.update_icon_link(icon_item_id,link,blank);
					icon_item_id = '';
				} else {
					jQuery('#design_area')[0].contentWindow.update_link(link,blank);
				}
				jQuery('#linkModal').modal('hide');
			}
		}
	});
	jQuery("#set_video").click(function(){
		jQuery('#design_area')[0].contentWindow.video_url(jQuery('#video_url').val());
		jQuery('#videoModal').modal('hide');
	});
	jQuery("#remove_link").click(function(){
		/*if(menu_item_id!=''){
			jQuery('#design_area')[0].contentWindow.remove_menu_link(menu_item_id);
			menu_item_id = '';
		} else*/
		if(icon_item_id!=''){
			jQuery('#design_area')[0].contentWindow.remove_icon_link(icon_item_id);
			icon_item_id = '';
		} else {
			jQuery('#design_area')[0].contentWindow.remove_link();
		}
		jQuery('#linkModal').modal('hide');
	});
	/*menu_item_id = '';
	jQuery('body').on('click','.menu_link',function(){
		menu_item_id = jQuery(this).parent().attr('id').split('content_menu_');
		menu_item_id = menu_item_id[1];
		current_link = jQuery(this).attr('data-href');
		jQuery('#design_area')[0].contentWindow.update_section_list();
		if(current_link!='#'){
			if(jQuery('option[value="'+current_link+'"]').length==1){
				jQuery('#link_type').val(jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]);
				jQuery('#link_'+jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]).val(current_link);
				jQuery('#link_'+jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]).parent().show();
			} else {
				jQuery('#link_type').val('url');
				jQuery('#link_url').val(current_link);
				jQuery('#link_url').parent().show();
			}
		}
		jQuery('#linkModal').modal('show');
	});*/
	jQuery("body").on("click",".set_icon_size",function(){
		icon_size = jQuery('#design_area')[0].contentWindow.set_icon_size(jQuery(this).attr('data-type'));
		jQuery('#icon_size').val(icon_size);
	});
	jQuery("body").on("click",".add_form",function(){
		jQuery('#design_area')[0].contentWindow.add_form(jQuery(this).parent().index());
	});
	jQuery("body").on("input","#content_send_button",function(){
		jQuery('#design_area')[0].contentWindow.content_send_button();
	});
	jQuery("body").on("click",".remove_form",function(){
		jQuery('#design_area')[0].contentWindow.remove_form(jQuery(this).parent().index());
	});
	jQuery("body").on("click",".form_edit_item",function(){
		jQuery('#design_area')[0].contentWindow.form_edit_item(jQuery(this).parent().index());
	});
	jQuery("body").on("click",".add_id",function(){
		if(jQuery('#section_id').val()!=''){
			jQuery('#section_id').parent().removeClass('has-error');
			jQuery('#section_id').attr('placeholder','Section ID');
			regexp = /^[a-zA-Z]+$/;
			if(jQuery('#section_id').val().search(regexp)==-1){
				jQuery('#section_id').parent().addClass('has-error');
				jQuery('#section_id').val('');
				jQuery('#section_id').attr('placeholder','Only these characters; a-z A-Z');
			} else {
				jQuery('#design_area')[0].contentWindow.add_id(jQuery('#section_id').val());
				swal(
					'Success',
					'',
					'success'
				);
			}
		}
	});
	jQuery('#linkModal').on('hidden.bs.modal',function(){
		jQuery('#link_type').parent().removeClass('has-error');
		jQuery('#link_section').parent().removeClass('has-error');
		jQuery('#link_page').parent().removeClass('has-error');
		jQuery('#link_url').parent().removeClass('has-error');
		jQuery('#link_type').val(0);
		jQuery('#link_section').val(0);
		jQuery('#link_page').val(0);
		jQuery('#link_url').val('');
		jQuery('#link_section').parent().hide();
		jQuery('#link_page').parent().hide();
		jQuery('#link_url').parent().hide();
		//menu_item_id = '';
		icon_item_id = '';
	});
	jQuery("body").on("click","#set_content",function(){
		i = 0;
		categories = [];
		jQuery("#content_categories > .checkbox > label > input:checked").each(function(){
			categories[i] = jQuery(this).val();
			i++;
		});
		i = 0;
		tags = [];
		jQuery("#content_tags > .checkbox > label > input:checked").each(function(){
			tags[i] = jQuery(this).val();
			i++;
		});
		jQuery('#design_area')[0].contentWindow.set_content(categories,tags,1);
		jQuery('#contentModal').modal('hide');
	});
	/*jQuery("#menu").click(function(){
		jQuery('.open_window').addClass('left_menu_icon');
		jQuery('.open_window').css('background-color','');
		jQuery('.open_window > a').css('color','#677888');
		jQuery('#general_settings_menu').css('display','none');
		jQuery('#design_area')[0].contentWindow.get_menu_settings();
	});
	jQuery("#footer").click(function(){
		jQuery('.open_window').addClass('left_menu_icon');
		jQuery('.open_window').css('background-color','');
		jQuery('.open_window > a').css('color','#677888');
		jQuery('#general_settings_menu').css('display','none');
		jQuery('#design_area')[0].contentWindow.get_footer_settings();
	});*/
	jQuery("#save_email").click(function(){
		jQuery.get(get_site_url+"/?do=update_email&email="+jQuery('#form_email').val(),function(data){
			swal(
				'Success',
				'',
				'success'
			);
		});
	});
	jQuery(".close_panel").click(function(){
		jQuery('#settings_menu > div').hide();
		jQuery('#iframe').css('width',(jQuery('#all_content').width()-80)+'px');
		jQuery('#settings_menu').hide();
	});
	jQuery("body").on("click",".set_slider_height",function(){
		slider_height = jQuery('#design_area')[0].contentWindow.set_slider_height(jQuery(this).attr('data-type'));
		jQuery('#slider_height').val(slider_height);
	});
	jQuery("body").on("click",".set_video_width",function(){
		video_width = jQuery('#design_area')[0].contentWindow.set_video_width(jQuery(this).attr('data-type'));
		jQuery('#video_width').val(video_width);
	});
	/*jQuery("#save_seo").click(function(){
		seo_settings = {};
		seo_settings["keywords"] = jQuery("#seo_keywords").val();
		seo_settings["description"] = jQuery("#seo_description").val();
		jQuery.ajax({
			type: "POST",
			url: get_site_url+"/?do=save_seo&id="+jQuery("#design_area").contents().find('#post_id').val(),
			data: {seo_settings:JSON.stringify(seo_settings)},
			success: function(html){
				swal(
					'Success',
					'',
					'success'
				);
			}
		});
		return false;
	});*/
	jQuery('#content_type').change(function(){
		if(jQuery(this).val()=='categories'){
			jQuery('#content_tags').find('input').attr('checked',false);
			jQuery('#content_tags').hide();
			jQuery('#content_categories').show();
		} else if(jQuery(this).val()=='tags'){
			jQuery('#content_categories').find('input').attr('checked',false);
			jQuery('#content_categories').hide();
			jQuery('#content_tags').show();
		}
	});
	jQuery('#contentModal').on('hidden.bs.modal',function(){
		jQuery("#design_area").contents().find('.kodyok-element-last-grid').remove();
	});
	jQuery("body").on("click",".add_icon",function(){
		if(jQuery("#social_icon").val()!=0){
			jQuery('#design_area')[0].contentWindow.add_icon(jQuery('#social_icon').val());
		}
	});
	jQuery("body").on("click",".remove_icon",function(){
		jQuery('#design_area')[0].contentWindow.remove_icon(jQuery(this).parent().index());
		jQuery(this).parent().remove();
	});
	icon_item_id = '';
	jQuery('body').on('click','.icon_link',function(){
		icon_item_id = jQuery(this).parent().index().toString();
		current_link = jQuery('#design_area')[0].contentWindow.get_href(jQuery(this).parent().index());
		jQuery('#design_area')[0].contentWindow.update_section_list();
		if(current_link!='#'){
			if(jQuery('option[value="'+current_link+'"]').length==1){
				jQuery('#link_type').val(jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]);
				jQuery('#link_'+jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]).val(current_link);
				jQuery('#link_'+jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]).parent().show();
			} else {
				jQuery('#link_type').val('url');
				jQuery('#link_url').val(current_link);
				jQuery('#link_url').parent().show();
			}
		}
		jQuery('#linkModal').modal('show');
	});
	/*jQuery("body").on("click","#seo",function(){
		jQuery('.open_window').addClass('left_menu_icon');
		jQuery('.open_window').css('background-color','');
		jQuery('.open_window > a').css('color','#677888');
		jQuery('#general_settings_menu').css('display','none');
	});
	jQuery("body").on("click",".set_menu_height",function(){
		menu_height = jQuery('#design_area')[0].contentWindow.set_menu_height(jQuery(this).attr('data-type'));
		jQuery('#menu_height').val(menu_height);
	});
	jQuery("body").on("click",".set_logo_height",function(){
		logo_height = jQuery('#design_area')[0].contentWindow.set_logo_height(jQuery(this).attr('data-type'));
		jQuery('#logo_height').val(logo_height);
	});
	jQuery("#menu_change_size").change(function(){
		if(jQuery("#menu_change_size").val()!=0){
			jQuery('#design_area')[0].contentWindow.set_menu_size(jQuery("#menu_change_size").val());
		}
	});
	jQuery('#customize_area').load(function(){
		jQuery('#customize_area').contents().find(".draggable").draggable({
	      drag:function(event,ui){
	        if(jQuery(this).next().next().length){
	          div_left = jQuery(this).next().next().offset().left;
	          if(ui.position.left>div_left-20){
	            ui.position.left = div_left-20;
	          }
	          if(ui.position.left<=20){
	            ui.position.left = 20;
	          }
	          jQuery(this).next().css('width',(div_left-ui.position.left)+'px');
	          jQuery(this).prev().css('width',ui.position.left+'px');
	        } else {
	          if(ui.position.left<=20){
	            ui.position.left = 20;
	          }
	          jQuery(this).next().css('width',(ui.position.left)+'px');
	          jQuery(this).prev().css('width',ui.position.left+'px');
	        }
	        if(jQuery(this).prev().prev().length){
	          div_left = jQuery(this).prev().prev().offset().left;
	          if(ui.position.left<div_left+20){
	            ui.position.left = div_left+20;
	          }
	          if(ui.position.left>=220){
	            ui.position.left = 220;
	          }
	          jQuery(this).prev().css('width',(ui.position.left-div_left)+'px');
	          if(jQuery(this).next().next().length){
	            jQuery(this).next().css('width',(jQuery(this).next().next().offset().left-ui.position.left)+'px');
	          } else {
	            jQuery(this).next().css('width',(240-ui.position.left)+'px');
	          }
	        } else {
	          if(ui.position.left>=220){
	            ui.position.left = 220;
	          }
	          jQuery(this).prev().css('width',(ui.position.left)+'px');
	          if(jQuery(this).next().next().length){
	            jQuery(this).next().css('width',(jQuery(this).next().next().offset().left-ui.position.left)+'px');
	          } else {
	            jQuery(this).next().css('width',(240-ui.position.left)+'px');
	          }
	        }
	        jQuery(this).prev().html(jQuery(this).prev().width()/20);
	        jQuery(this).next().html(jQuery(this).next().width()/20);
	        columns = '';
	        jQuery('#customize_area').contents().find('body > div').children().each(function(a,b){
	          if(jQuery(this).html()!=''){
	            columns += jQuery(this).html()+',';
	          }
	        });
	        jQuery('#design_area')[0].contentWindow.change_column(columns);
	      },
	      grid:[20],
	      axis:"x",
	      containment:"parent"
	    });
    });*/
    jQuery('#view_mode').change(function(){
    	jQuery('#design_area')[0].contentWindow.select_column_type(jQuery(this).val());
    });
});
function load_add_section_drag(){
	jQuery('#design_area').contents().find('#wpadminbar').remove();
	jQuery('#design_area').contents().find('html').attr('style','margin-top:0px !important;');
	Sortable.create(document.getElementById('ready_made'), {
	    group: { name: "section-sortable", pull: "clone", put: false },
	    ghostClass: "kodyok-place-holder",
	    sort: false,
	    onChoose: function (evt) {
	    	active_section = jQuery(evt.item).attr('data-section-name');
	    },
	    onStart: function (evt) {
			jQuery('#add_menu').css('display','none');
			jQuery('.open_window').addClass('left_menu_icon');
			jQuery('.open_window').css('background-color','');
			jQuery('.open_window > a').css('color','#677888');
			jQuery('#design_area').contents().find('#kodyok-content-area').prepend('<div class="kodyok-blank-section" style="background-color:#ffcc00;color:#00ccff;"><div class="kodyok-container kodyok-section-placeholder" style="min-height:50px;font-size:40px;text-align:center;">DROP HERE</div></div>');
			jQuery('<div class="kodyok-blank-section" style="background-color:#ffcc00;color:#00ccff;"><div class="kodyok-container kodyok-section-placeholder" style="min-height:50px;font-size:40px;text-align:center;">DROP HERE</div></div>').insertAfter(jQuery('#design_area').contents().find('#kodyok-content-area > .kodyok-section'));
			sortable_id = 0;
			jQuery("#design_area").contents().find('.kodyok-section-placeholder').each(function(){
				Sortable.create(document.getElementById('design_area').contentWindow.document.getElementsByClassName('kodyok-section-placeholder')[sortable_id], {
				    group: "section-sortable",
				    filter: "div",
				    preventOnFilter: false,
				    ghostClass: "kodyok-place-holder"
				});
				sortable_id++;
			});
		},
		onEnd: function (evt) {
			jQuery.get(plugin_dir_url+"sections/"+active_section+".html",function(data){
				data = data.replace(/PATH\//g,plugin_dir_url);
				jQuery('#design_area').contents().find('.kodyok-add-section').parent().parent().replaceWith(data);
				jQuery('#design_area').contents().find('.kodyok-blank-section').remove();
				jQuery('#design_area')[0].contentWindow.load_element_panel();
				load_add_item_drag();
				if(active_section=='blog'){
					jQuery('#contentModal').modal('show');
					jQuery('#content_categories').find('input').attr('checked',false);
					jQuery('#content_tags').find('input').attr('checked',false);
				}
			});
		},
	    onMove: function (evt) {
			jQuery('.kodyok-place-holder').css('width','100%');
			jQuery('.kodyok-place-holder').html('');
			jQuery("#design_area").contents().find('.kodyok-place-holder').css('width','100%');
			jQuery("#design_area").contents().find('.kodyok-place-holder').html('');
		}
	});
	load_add_item_drag();
}
function load_add_item_drag(){
	load_sortable();
	Sortable.create(document.getElementById('basic_elements'), {
	    group: { name: "element-sortable", pull: "clone", put: false },
	    ghostClass: "kodyok-place-holder",
	    sort: false,
	    onChoose: function (evt) {
	    	active_element = jQuery(evt.item).children().attr('data-item');
	    },
	    onStart: function (evt) {
			jQuery('#add_menu').css('display','none');
			jQuery('.open_window').addClass('left_menu_icon');
			jQuery('.open_window').css('background-color','');
			jQuery('.open_window > a').css('color','#677888');
			jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-top','5px');
			jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-bottom','5px');
		},
		onEnd: function (evt) {
			jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-top','0');
			jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-bottom','0');
			if(jQuery(evt.item).parent().hasClass('kodyok-sortable-area')){
				if(active_element=='kodyok-element-button'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-button" style="text-align:center;"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-button-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-link kodyok-element-button-link" style="font-size:26px;margin:5px;"></span></div><a href="#" style="padding:0 20px;background-color:#EEE;color:#000;text-decoration:none;font-size:16px;line-height:48px;display:inline-block;">New button</a></div>');
				} else if(active_element=='kodyok-element-form'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-form"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-form-edit" style="font-size:26px;margin:5px;"></span></div><form><div class="kodyok-margin kodyok-text-center"><a class="kodyok-send-button" style="padding:0 20px;background-color:rgb(235,208,9);color:rgb(255,255,255);font-size:16px;line-height:48px;display:inline-block;">Send</a></div></form></div>');
				} else if(active_element=='kodyok-element-grid'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-grid"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-columns kodyok-element-column-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-plus kodyok-element-add-column" style="font-size:26px;margin:5px;"></span><span class="fa fa-minus kodyok-element-remove-column" style="font-size:26px;margin:5px;"></span></div><div class="kodyok-child-width-1-3@xl kodyok-child-width-1-3@l kodyok-child-width-1-2@m kodyok-child-width-1-1@s kodyok-grid-match" style="min-height:50px;" kodyok-grid><div class="kodyok-sortable-area"></div></div></div>');
				} else if(active_element=='kodyok-element-icon'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-icon" style="text-align:center;"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-icon-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-link kodyok-element-icon-link" style="font-size:26px;margin:5px;"></span></div><a href="#"><i class="fa fa-font-awesome" aria-hidden="true" style="font-size:50px;"></i></a></div>');
					jQuery('#iconModal').modal('show');
					jQuery('#design_area')[0].contentWindow.select_active_icon();
				} else if(active_element=='kodyok-element-social-icons'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-social-icons" style="text-align:left;"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span></div><a href="#" style="background-color:#EEE;display:inline-block;margin-right:5px;margin-bottom:5px;border-radius:25px;text-align:center;"><i class="fa fa-twitter" aria-hidden="true" style="width:1em;height:1em;margin:10px;font-size:20px;color:#337ab7;"></i></a><a href="#" style="background-color:#EEE;display:inline-block;margin-right:5px;margin-bottom:5px;border-radius:25px;text-align:center;"><i class="fa fa-facebook" aria-hidden="true" style="width:1em;height:1em;margin:10px;font-size:20px;color:#337ab7;"></i></a><a href="#" style="background-color:#EEE;display:inline-block;margin-right:5px;margin-bottom:5px;border-radius:25px;text-align:center;"><i class="fa fa-instagram" aria-hidden="true" style="width:1em;height:1em;margin:10px;font-size:20px;color:#337ab7;"></i></a><a href="#" style="background-color:#EEE;display:inline-block;margin-right:5px;margin-bottom:5px;border-radius:25px;text-align:center;"><i class="fa fa-linkedin" aria-hidden="true" style="width:1em;height:1em;margin:10px;font-size:20px;color:#337ab7;"></i></a></div>');
				} else if(active_element=='kodyok-element-image'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-image"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-image-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-link kodyok-element-image-link" style="font-size:26px;margin:5px;"></span></div><a href="#"><img src="'+plugin_dir_url+'assets/img/blank.gif" alt="" class="kodyok-responsive-width" /></a></div>');
					image_edit();
					jQuery('#design_area')[0].contentWindow.select_active_element();
				} else if(active_element=='kodyok-element-slider'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-slider"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span></div><div class="kodyok-position-relative kodyok-visible-toggle kodyok-light" kodyok-slideshow="animation: fade"><ul class="kodyok-slideshow-items"><li><img src="'+plugin_dir_url+'assets/img/slider-1.jpg" alt="" kodyok-cover></li><li><img src="'+plugin_dir_url+'assets/img/slider-2.jpg" alt="" kodyok-cover></li><li><img src="'+plugin_dir_url+'assets/img/slider-3.jpg" alt="" kodyok-cover></li></ul><a class="kodyok-position-center-left kodyok-position-small kodyok-hidden-hover" href="#" kodyok-slidenav-previous kodyok-slideshow-item="previous"></a><a class="kodyok-position-center-right kodyok-position-small kodyok-hidden-hover" href="#" kodyok-slidenav-next kodyok-slideshow-item="next"></a></div></div>');
				} else if(active_element=='kodyok-element-text'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-text"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-clone kodyok-element-duplicate" style="font-size:26px;margin:5px;"></span><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span><span class="fa fa-pencil kodyok-element-text-edit" style="font-size:26px;margin:5px;"></span><span class="fa fa-check kodyok-element-text-edit-done" style="font-size:26px;margin:5px;display:none;"></span></div><div class="kodyok-element-editable" style="text-align:center;font-size:20px;" spellcheck="false">Text.<br />Double click me.</div></div>');
				} else if(active_element=='kodyok-element-video'){
					jQuery(evt.item).replaceWith('<div class="kodyok-element kodyok-element-video kodyok-element-last-video" style="max-width:600px;"><div class="kodyok-element-panel" style="width:100%;text-align:center;cursor:default;display:none;"><span class="fa fa-trash kodyok-element-remove" style="font-size:26px;margin:5px;"></span><span class="fa fa-cog kodyok-element-settings" style="font-size:26px;margin:5px;"></span></div></div>');
					jQuery('#videoModal').modal('show');
				}
				load_sortable();
			}
		},
	    onMove: function (evt) {
			jQuery('.kodyok-place-holder').attr('style','width:100%;');
			jQuery('.kodyok-place-holder').html('');
			jQuery("#design_area").contents().find('.kodyok-place-holder').attr('style','width:100%;');
			jQuery("#design_area").contents().find('.kodyok-place-holder').html('');
		}
	});
}
function load_sortable(){
	sortable_id = 0;
	jQuery("#design_area").contents().find('.kodyok-sortable-area').each(function(){
		Sortable.create(document.getElementById('design_area').contentWindow.document.getElementsByClassName('kodyok-sortable-area')[sortable_id], {
		    group: "element-sortable",
		    filter: ".kodyok-element-text > .kodyok-element-editable[contenteditable=true],input,.ui-resizable-handle,.kodyok-element-video",
		    preventOnFilter: false,
		    ghostClass: "kodyok-place-holder",
		    onStart: function (evt) {
		    	margin_top = jQuery(evt.item).css('margin-top');
		    	margin_bottom = jQuery(evt.item).css('margin-bottom');
		    	jQuery(evt.item).css('margin-top',0);
		    	jQuery(evt.item).css('margin-bottom',0);
				div_content = jQuery(evt.item).html();
				jQuery(evt.item).html('');
				jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-top','5px');
				jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-bottom','5px');
			},
			onEnd: function (evt) {
				jQuery(evt.item).css('margin-top',margin_top);
		    	jQuery(evt.item).css('margin-bottom',margin_bottom);
				jQuery(evt.item).html(div_content);
				jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-top','0');
				jQuery('#design_area').contents().find('.kodyok-element-grid').css('padding-bottom','0');
				if(jQuery(evt.item).hasClass('kodyok-element-grid')){
					jQuery(evt.item).find('.kodyok-element-image').each(function(){
						jQuery(this).addClass('kodyok-element-load-resize');
						jQuery('#design_area')[0].contentWindow.image_resizable('.kodyok-element-load-resize');
					});
					load_sortable();
				} else if(jQuery(evt.item).hasClass('kodyok-element-image')){
					jQuery(evt.item).addClass('kodyok-element-load-resize');
					jQuery('#design_area')[0].contentWindow.image_resizable('.kodyok-element-load-resize');
				}
			},
			onClone: function (evt) {
				jQuery(evt.item).children('.kodyok-element-panel').hide();
		    	if(jQuery(evt.item).hasClass('kodyok-element-grid')){
					jQuery(evt.item).children('.kodyok-grid').children('div').css('box-shadow','');
				} else {
					jQuery(evt.item).css('box-shadow','');
				}
			}
		});
		sortable_id++;
	});
}
function image_edit(type){
	image_type = type;
	jQuery('#imageModal').modal('show');
	if(jQuery('#site_images').html()==''){
		jQuery.getJSON(get_site_url+'/?do=get_images',function(data){
			jQuery.each(data,function(i){
				jQuery('#site_images').append('<div class="select" data-id="'+data[i].id+'" style="width:100px;height:100px;overflow:hidden;float:left;margin:10px;"><img src="'+data[i].thumb+'" alt="" height="100" /></div>');
			});
		});
	}
}
function add_new_image(image_id){
	jQuery.get(get_site_url+"/?do=get_image&size=thumbnail&id="+image_id,function(data){
		jQuery('#site_images').prepend('<div class="select" data-id="'+image_id+'" style="width:100px;height:100px;overflow:hidden;float:left;margin:10px;"><img src="'+data+'" alt="" height="100" /></div>');
	});
}
function icon_edit(){
	jQuery('#settings_menu > div').hide();
	jQuery('#iframe').css('width',(jQuery('#all_content').width()-80)+'px');
	jQuery('#settings_menu').hide();
	jQuery('#iconModal').modal('show');
}
function link_edit(current_link){
	jQuery('#design_area')[0].contentWindow.update_section_list();
	if(current_link!='#'){
		if(jQuery('option[value="'+current_link+'"]').length==1){
			jQuery('#link_type').val(jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]);
			jQuery('#link_'+jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]).val(current_link);
			jQuery('#link_'+jQuery('option[value="'+current_link+'"]').parent().attr('id').split('_')[1]).parent().show();
		} else {
			jQuery('#link_type').val('url');
			jQuery('#link_url').val(current_link);
			jQuery('#link_url').parent().show();
		}
	}
	jQuery('#linkModal').modal('show');
}
window.onbeforeunload = function (e) {
	e = e || window.event;
	if(e){
		e.returnValue = 'Note: Any unsaved changes will be lost.';
	}
	return 'Note: Any unsaved changes will be lost.';
};