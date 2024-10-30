<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <script type="text/javascript">
        plugin_dir_url = '<?php echo plugin_dir_url(__FILE__);?>';
        get_site_url = '<?php echo esc_url(get_site_url());?>';
    </script>
    <?php wp_head();?>
</head>
<body style="font-family:'Montserrat', sans-serif;">
	<div id="all_content" style="width:100%;height:100%;">
		<div style="position:fixed;width:80px;height:100%;float:left;background-color:#243343;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">
			<div class="open_window left_menu_icon" style="margin-top:20px;margin-bottom:20px;text-align:center;padding-top:5px;padding-bottom:5px;"><a href="#" id="add" style="color:#677888;font-weight:bold;text-decoration:none;"><span class="fa fa-plus" style="font-size:26px;margin-bottom:10px;"></span><br /><span>Add</span></a></div>
			<!--<div class="open_window left_menu_icon" style="margin-top:20px;margin-bottom:20px;text-align:center;padding-top:5px;padding-bottom:5px;"><a href="#" id="general_settings" style="color:#677888;font-weight:bold;text-decoration:none;"><span class="fa fa-cog" style="font-size:26px;margin-bottom:10px;"></span><br /><span>Settings</span></a></div>-->
			<div id="save" class="left_menu_icon" style="margin-bottom:20px;text-align:center;padding-top:5px;padding-bottom:5px;"><a href="#" style="color:#677888;font-weight:bold;text-decoration:none;"><span class="fa fa-floppy-o" style="font-size:26px;margin-bottom:10px;"></span><br /><span>Save</span></a></div>
			<div class="left_menu_icon" style="margin-bottom:20px;text-align:center;padding-top:5px;padding-bottom:5px;"><a href="<?php echo esc_attr(get_site_url());?>/wp-admin" target="_blank" style="color:#677888;font-weight:bold;text-decoration:none;"><span class="fa fa-wordpress" style="font-size:26px;margin-bottom:10px;"></span><br /><span>Admin</span></a></div>
		</div>
		<div id="iframe" style="position:fixed;left:80px;float:left;height:100%;">
			<iframe id="design_area" style="width:100%;height:100%;border:0;" src="<?php echo 'http://'.$_SERVER['HTTP_HOST'].str_replace('mode=kodyok','mode=editor',$_SERVER['REQUEST_URI']);?>" onload="load_add_section_drag()"></iframe>
			<div id="saved_content" style="display:none;"></div>
			<div id="saved_content_footer" style="display:none;"></div>
		</div>
		<div id="settings_menu" style="width:300px;height:100%;position:fixed;float:left;background-color:#243343;padding:10px;display:none;">
			<div id="margin_settings" style="display:none;">
				<h3 class="panel-title" style="color:#677888;border-bottom:2px solid #677888;padding-bottom:10px;">Settings <i class="fa fa-times close_panel" style="font-size:20px;float:right;"></i></h3>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Margin</h3>
					</div>
					<div class="panel-body">
		    			<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Top space:</td><td style="text-align:right;"><a href="#" class="set_margin" data-type="top_minus"><span class="fa fa-minus"></span></a> <input type="text" id="top_margin" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_margin" data-type="top_plus"><span class="fa fa-plus"></span></a></td>
							</tr>
							<tr>
								<td>Bottom space:</td><td style="text-align:right;"><a href="#" class="set_margin" data-type="bottom_minus"><span class="fa fa-minus"></span></a> <input type="text" id="bottom_margin" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_margin" data-type="bottom_plus"><span class="fa fa-plus"></span></a></td>
							</tr>
							<tr>
								<td>Left space:</td><td style="text-align:right;"><a href="#" class="set_margin" data-type="left_minus"><span class="fa fa-minus"></span></a> <input type="text" id="left_margin" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_margin" data-type="left_plus"><span class="fa fa-plus"></span></a></td>
							</tr>
							<tr>
								<td>Right space:</td><td style="text-align:right;"><a href="#" class="set_margin" data-type="right_minus"><span class="fa fa-minus"></span></a> <input type="text" id="right_margin" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_margin" data-type="right_plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div id="grid_settings" style="display:none;">
				<div class="panel panel-default" style="border-radius:0;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Background color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="grid_background"></td>
							</tr>
							<tr>
								<td>Opacity:</td><td style="text-align:right;"><a href="#" class="set_grid_opacity" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="grid_opacity" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_grid_opacity" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
						<br /><a href="#" class="remove_grid_background" style="color:#cc0000;">Delete background</a>
					</div>
				</div>
			</div>
			<div id="gallery_settings" style="display:none;">
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Content</h3>
					</div>
					<div class="panel-body">
						<button class="btn btn-default btn-block image_edit" type="button">Add image</button>
					    <div id="gallery_content" style="margin-top:10px;font-weight:bold;font-size:14px;"></div>
					</div>
				</div>
			</div>
			<div id="column_settings" style="display:none;">
				<h3 class="panel-title" style="color:#677888;border-bottom:2px solid #677888;padding-bottom:10px;">Settings <i class="fa fa-times close_panel" style="font-size:20px;float:right;"></i></h3>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Column</h3>
					</div>
					<div class="panel-body" style="padding-left:5px;padding-right:5px;">
						<select class="form-control" id="view_mode" style="margin-bottom:10px;">
							<option value="desktop">Desktop</option>
							<option value="tablet">Tablet</option>
							<option value="mobile">Mobile</option>
						</select>
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_01.png" alt="" class="set_column" data-type="1" style="margin:4px;border:1px solid #666;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_02.png" alt="" class="set_column" data-type="2" style="margin:4px;border:1px solid #EEE;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_03.png" alt="" class="set_column" data-type="3" style="margin:4px;border:1px solid #EEE;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_04.png" alt="" class="set_column" data-type="4" style="margin:4px;border:1px solid #EEE;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_10.png" alt="" class="set_column" data-type="10" style="margin:4px;border:1px solid #EEE;" /><br />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_05.png" alt="" class="set_column" data-type="5" style="margin:4px;border:1px solid #EEE;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_06.png" alt="" class="set_column" data-type="6" style="margin:4px;border:1px solid #EEE;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_07.png" alt="" class="set_column" data-type="7" style="margin:4px;border:1px solid #EEE;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_08.png" alt="" class="set_column" data-type="8" style="margin:4px;border:1px solid #EEE;" />
						<img src="<?php echo esc_attr(plugin_dir_url(__FILE__));?>/assets/img/column_09.png" alt="" class="set_column" data-type="9" style="margin:4px;border:1px solid #EEE;" />
						<div id="customize_layout" style="color:#677888;font-size:14px;margin-top:10px;text-align:center;display:none;">
							Customize<br /><iframe id="customize_area" src="" width="240" height="40" style="border:none;margin:4px;"></iframe>
						</div>
					</div>
				</div>
			</div>
			<div id="icon_settings" style="display:none;">
				<div class="panel panel-default" style="border-radius:0;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Align:</td><td style="text-align:right;"><a href="#" class="set_align" data-type="left"><span class="fa fa-align-left"></span></a> <a href="#" class="set_align" data-type="center"><span class="fa fa-align-center"></span></a> <a href="#" class="set_align" data-type="right"><span class="fa fa-align-right"></span></a></td>
							</tr>
							<tr>
								<td>Color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="icon"></td>
							</tr>
							<tr id="icon_background_color">
								<td>Background color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="icon_background"></td>
							</tr>
							<tr>
								<td>Size:</td><td style="text-align:right;"><a href="#" class="set_icon_size" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="icon_size" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_icon_size" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div id="social_icons_settings" style="display:none;">
				<div class="panel panel-default" style="border-radius:0;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Content</h3>
					</div>
					<div class="panel-body">
						<div class="input-group" style="margin-top:10px;">
							<select class="form-control" id="social_icon">
								<option value="0">Select icon</option>
								<option value="behance">Behance</option>
								<option value="dribbble">Dribbble</option>
								<option value="at">Email</option>
								<option value="facebook">Facebook</option>
								<option value="flickr">Flickr</option>
								<option value="foursquare">Foursquare</option>
								<option value="github">Github</option>
								<option value="google-plus">Google+</option>
								<option value="instagram">Instagram</option>
								<option value="linkedin">Linkedin</option>
								<option value="medium">Medium</option>
								<option value="pinterest">Pinterest</option>
								<option value="rss">RSS</option>
								<option value="skype">Skype</option>
								<option value="snapchat">Snapchat</option>
								<option value="soundcloud">Soundcloud</option>
								<option value="spotify">Spotify</option>
								<option value="steam">Steam</option>
								<option value="tumblr">Tumblr</option>
								<option value="twitch">Twitch</option>
								<option value="twitter">Twitter</option>
								<option value="vimeo">Vimeo</option>
								<option value="vine">Vine</option>
								<option value="vk">Vk</option>
								<option value="link">Website</option>
								<option value="whatsapp">Whatsapp</option>
								<option value="wordpress">Wordpress</option>
								<option value="youtube">Youtube</option>
							</select>
							<span class="input-group-btn">
								<button class="btn btn-default add_icon" type="button">Add</button>
							</span>
					    </div>
					    <div id="sortable_social_icons" style="margin-top:10px;font-weight:bold;font-size:14px;"></div>
					</div>
				</div>
			</div>
			<div id="image_settings" style="display:none;">
				<div class="panel panel-default" style="border-radius:0;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Align:</td><td style="text-align:right;"><a href="#" class="set_align" data-type="left"><span class="fa fa-align-left"></span></a> <a href="#" class="set_align" data-type="center"><span class="fa fa-align-center"></span></a> <a href="#" class="set_align" data-type="right"><span class="fa fa-align-right"></span></a></td>
							</tr>
							<tr>
								<td>Shape:</td><td style="text-align:right;"><a href="#" class="set_shape" data-type="circle"><span class="fa fa-circle" style="font-size:26px;"></span></a> <a href="#" class="set_shape" data-type="square"><span class="fa fa-square" style="font-size:26px;"></span></a></td>
							</tr>
							<tr>
								<td>Border:</td><td style="text-align:right;"><a href="#" class="set_image_border" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="image_border" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_image_border" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
							<tr>
								<td>Border color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="image_border"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div id="form_settings" style="display:none;">
				<div class="input-group">
					<input type="text" id="form_email" class="form-control" placeholder="Email of receiver" value="<?php echo esc_attr(get_option('kodyok_form_email'));?>">
					<span class="input-group-btn">
			    		<button class="btn btn-default" id="save_email" type="button">Save</button>
			    	</span>
			    </div>
			</div>
			<div id="form_edit_settings" style="display:none;">
				<h3 class="panel-title" style="color:#677888;border-bottom:2px solid #677888;padding-bottom:10px;">Settings <i class="fa fa-times close_panel" style="font-size:20px;float:right;"></i></h3>
				<div class="input-group" style="margin-top:10px;">
					<input type="text" id="input_name" class="form-control" placeholder="New input">
					<span class="input-group-btn">
						<button class="btn btn-default add_form" type="button">Add</button>
					</span>
			    </div>
			    <div id="form_inputs" style="margin-top:10px;color:#677888;font-weight:bold;font-size:14px;"></div>
			    <input type="text" id="content_send_button" class="form-control" value="Send" style="display:none;">
			</div>
			<div id="slider_settings" style="display:none;">
				<h3 class="panel-title" style="color:#677888;border-bottom:2px solid #677888;padding-bottom:10px;">Settings <i class="fa fa-times close_panel" style="font-size:20px;float:right;"></i></h3>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Height:</td><td style="text-align:right;"><a href="#" class="set_slider_height" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="slider_height" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_slider_height" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Content</h3>
					</div>
					<div class="panel-body">
						<button class="btn btn-default btn-block image_edit" type="button">Add image</button>
						<div class="input-group" style="margin-bottom:10px;display:none;">
							<input type="text" id="slider_caption" class="form-control" placeholder="Slider caption">
					    	<span class="input-group-btn">
					    		<button class="btn btn-default add_slider" type="button">Add</button>
					    	</span>
					    </div>
					    <div id="slider_content" style="margin-top:10px;font-weight:bold;font-size:14px;"></div>
					</div>
				</div>
		    </div>
		    <div id="button_settings" style="display:none;">
		    	<div class="panel panel-default" style="border-radius:0;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
				    	<table style="width:100%;color:#677888;font-size:14px;">
				    		<tr>
								<td>Align:</td><td style="text-align:right;"><a href="#" class="set_align" data-type="left"><span class="fa fa-align-left"></span></a> <a href="#" class="set_align" data-type="center"><span class="fa fa-align-center"></span></a> <a href="#" class="set_align" data-type="right"><span class="fa fa-align-right"></span></a></td>
							</tr>
				    		<tr>
								<td>Background color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="button_background"></td>
							</tr>
							<tr>
								<td>Opacity:</td><td style="text-align:right;"><a href="#" class="set_button_opacity" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="button_opacity" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_button_opacity" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
						<select class="form-control" id="button_change_font" style="width:50%;float:left;">
							<option value="0">Select font</option>
							<option value="Abril Fatface,cursive">Abril Fatface</option>
							<option value="Alegreya,serif">Alegreya</option>
							<option value="Alfa Slab One,cursive">Alfa Slab One</option>
							<option value="Amatic SC,cursive">Amatic SC</option>
							<option value="Amiri,serif">Amiri</option>
							<option value="Anton,sans-serif">Anton</option>
							<option value="Arimo,sans-serif">Arimo</option>
							<option value="Audiowide,cursive">Audiowide</option>
							<option value="Bangers,cursive">Bangers</option>
							<option value="Berkshire Swash,cursive">Berkshire Swash</option>
							<option value="Bevan,cursive">Bevan</option>
							<option value="Bitter,serif">Bitter</option>
							<option value="Bree Serif,serif">Bree Serif</option>
							<option value="Cabin,sans-serif">Cabin</option>
							<option value="Cardo,serif">Cardo</option>
							<option value="Catamaran,sans-serif">Catamaran</option>
							<option value="Caveat Brush,cursive">Caveat Brush</option>
							<option value="Caveat,cursive">Caveat</option>
							<option value="Cinzel,serif">Cinzel</option>
							<option value="Coda,cursive">Coda</option>
							<option value="Comfortaa,cursive">Comfortaa</option>
							<option value="Concert One,cursive">Concert One</option>
							<option value="Cormorant Garamond,serif">Cormorant Garamond</option>
							<option value="Courgette,cursive">Courgette</option>
							<option value="Crete Round,serif">Crete Round</option>
							<option value="Dancing Script,cursive">Dancing Script</option>
							<option value="Domine,serif">Domine</option>
							<option value="Dosis,sans-serif">Dosis</option>
							<option value="EB Garamond,serif">EB Garamond</option>
							<option value="Exo 2,sans-serif">Exo 2</option>
							<option value="Fira Sans,sans-serif">Fira Sans</option>
							<option value="Fjalla One,sans-serif">Fjalla One</option>
							<option value="Forum,cursive">Forum</option>
							<option value="Glegoo,serif">Glegoo</option>
							<option value="Great Vibes,cursive">Great Vibes</option>
							<option value="Hind,sans-serif">Hind</option>
							<option value="Inconsolata,monospace">Inconsolata</option>
							<option value="Josefin Sans,sans-serif">Josefin Sans</option>
							<option value="Kalam,cursive">Kalam</option>
							<option value="Kaushan Script,cursive">Kaushan Script</option>
							<option value="Lato,sans-serif">Lato</option>
							<option value="Libre Baskerville,serif">Libre Baskerville</option>
							<option value="Lobster,cursive">Lobster</option>
							<option value="Lora,serif">Lora</option>
							<option value="Marck Script,cursive">Marck Script</option>
							<option value="Merienda,cursive">Merienda</option>
							<option value="Merriweather,serif">Merriweather</option>
							<option value="Montserrat,sans-serif">Montserrat</option>
							<option value="Muli,sans-serif">Muli</option>
							<option value="Neuton,serif">Neuton</option>
							<option value="Noticia Text,serif">Noticia Text</option>
							<option value="Noto Sans,sans-serif">Noto Sans</option>
							<option value="Noto Serif,serif">Noto Serif</option>
							<option value="Nunito,sans-serif">Nunito</option>
							<option value="Old Standard TT,serif">Old Standard TT</option>
							<option value="Oleo Script,cursive">Oleo Script</option>
							<option value="Open Sans Condensed,sans-serif">Open Sans Condensed</option>
							<option value="Open Sans,sans-serif">Open Sans</option>
							<option value="Oswald,sans-serif">Oswald</option>
							<option value="Overlock,cursive">Overlock</option>
							<option value="Oxygen,sans-serif">Oxygen</option>
							<option value="Pacifico,cursive">Pacifico</option>
							<option value="Passion One,cursive">Passion One</option>
							<option value="Patrick Hand,cursive">Patrick Hand</option>
							<option value="Playball,cursive">Playball</option>
							<option value="Playfair Display SC,serif">Playfair Display SC</option>
							<option value="Playfair Display,serif">Playfair Display</option>
							<option value="Poiret One,cursive">Poiret One</option>
							<option value="Poppins,sans-serif">Poppins</option>
							<option value="Press Start 2P,cursive">Press Start 2P</option>
							<option value="PT Mono,monospace">PT Mono</option>
							<option value="PT Sans Narrow,sans-serif">PT Sans Narrow</option>
							<option value="PT Sans,sans-serif">PT Sans</option>
							<option value="PT Serif,serif">PT Serif</option>
							<option value="Quattrocento,serif">Quattrocento</option>
							<option value="Quicksand,sans-serif">Quicksand</option>
							<option value="Raleway,sans-serif">Raleway</option>
							<option value="Righteous,cursive">Righteous</option>
							<option value="Roboto Condensed,sans-serif">Roboto Condensed</option>
							<option value="Roboto Mono,monospace">Roboto Mono</option>
							<option value="Roboto Slab,serif">Roboto Slab</option>
							<option value="Roboto,sans-serif">Roboto</option>
							<option value="Rokkitt,serif">Rokkitt</option>
							<option value="Sacramento,cursive">Sacramento</option>
							<option value="Sanchez,serif">Sanchez</option>
							<option value="Shadows Into Light Two,cursive">Shadows Into Light Two</option>
							<option value="Shrikhand,cursive">Shrikhand</option>
							<option value="Sigmar One,cursive">Sigmar One</option>
							<option value="Slabo 27px,serif">Slabo 27px</option>
							<option value="Sorts Mill Goudy,serif">Sorts Mill Goudy</option>
							<option value="Source Code Pro,monospace">Source Code Pro</option>
							<option value="Source Sans Pro,sans-serif">Source Sans Pro</option>
							<option value="Source Serif Pro,serif">Source Serif Pro</option>
							<option value="Tinos,serif">Tinos</option>
							<option value="Titillium Web,sans-serif">Titillium Web</option>
							<option value="Ubuntu,sans-serif">Ubuntu</option>
							<option value="Unica One,cursive">Unica One</option>
							<option value="Vollkorn,serif">Vollkorn</option>
							<option value="VT323,monospace">VT323</option>
							<option value="Work Sans,sans-serif">Work Sans</option>
						</select>
						<select class="form-control" id="button_change_size" style="width:50%;">
							<option value="0">Size</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="14">14</option>
							<option value="16">16</option>
							<option value="18">18</option>
							<option value="20">20</option>
							<option value="22">22</option>
							<option value="24">24</option>
							<option value="26">26</option>
							<option value="28">28</option>
							<option value="36">36</option>
							<option value="48">48</option>
							<option value="72">72</option>
						</select>
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Font color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="button_font"></td>
							</tr>
							<tr>
								<td>Border:</td><td style="text-align:right;"><a href="#" class="set_button_border" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="button_border" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_button_border" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
							<tr>
								<td>Border color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="button_border"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div id="text_settings" style="display:none;">
				<div class="panel panel-default" style="border-radius:0;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
				    	<table style="width:100%;color:#677888;font-size:14px;">
				    		<tr>
								<td>Align:</td><td style="text-align:right;"><a href="#" class="set_align" data-type="left"><span class="fa fa-align-left"></span></a> <a href="#" class="set_align" data-type="center"><span class="fa fa-align-center"></span></a> <a href="#" class="set_align" data-type="right"><span class="fa fa-align-right"></span></a></td>
							</tr>
						</table>
						<select class="form-control" id="text_change_font" style="width:50%;float:left;">
							<option value="0">Select font</option>
							<option value="Abril Fatface,cursive">Abril Fatface</option>
							<option value="Alegreya,serif">Alegreya</option>
							<option value="Alfa Slab One,cursive">Alfa Slab One</option>
							<option value="Amatic SC,cursive">Amatic SC</option>
							<option value="Amiri,serif">Amiri</option>
							<option value="Anton,sans-serif">Anton</option>
							<option value="Arimo,sans-serif">Arimo</option>
							<option value="Audiowide,cursive">Audiowide</option>
							<option value="Bangers,cursive">Bangers</option>
							<option value="Berkshire Swash,cursive">Berkshire Swash</option>
							<option value="Bevan,cursive">Bevan</option>
							<option value="Bitter,serif">Bitter</option>
							<option value="Bree Serif,serif">Bree Serif</option>
							<option value="Cabin,sans-serif">Cabin</option>
							<option value="Cardo,serif">Cardo</option>
							<option value="Catamaran,sans-serif">Catamaran</option>
							<option value="Caveat Brush,cursive">Caveat Brush</option>
							<option value="Caveat,cursive">Caveat</option>
							<option value="Cinzel,serif">Cinzel</option>
							<option value="Coda,cursive">Coda</option>
							<option value="Comfortaa,cursive">Comfortaa</option>
							<option value="Concert One,cursive">Concert One</option>
							<option value="Cormorant Garamond,serif">Cormorant Garamond</option>
							<option value="Courgette,cursive">Courgette</option>
							<option value="Crete Round,serif">Crete Round</option>
							<option value="Dancing Script,cursive">Dancing Script</option>
							<option value="Domine,serif">Domine</option>
							<option value="Dosis,sans-serif">Dosis</option>
							<option value="EB Garamond,serif">EB Garamond</option>
							<option value="Exo 2,sans-serif">Exo 2</option>
							<option value="Fira Sans,sans-serif">Fira Sans</option>
							<option value="Fjalla One,sans-serif">Fjalla One</option>
							<option value="Forum,cursive">Forum</option>
							<option value="Glegoo,serif">Glegoo</option>
							<option value="Great Vibes,cursive">Great Vibes</option>
							<option value="Hind,sans-serif">Hind</option>
							<option value="Inconsolata,monospace">Inconsolata</option>
							<option value="Josefin Sans,sans-serif">Josefin Sans</option>
							<option value="Kalam,cursive">Kalam</option>
							<option value="Kaushan Script,cursive">Kaushan Script</option>
							<option value="Lato,sans-serif">Lato</option>
							<option value="Libre Baskerville,serif">Libre Baskerville</option>
							<option value="Lobster,cursive">Lobster</option>
							<option value="Lora,serif">Lora</option>
							<option value="Marck Script,cursive">Marck Script</option>
							<option value="Merienda,cursive">Merienda</option>
							<option value="Merriweather,serif">Merriweather</option>
							<option value="Montserrat,sans-serif">Montserrat</option>
							<option value="Muli,sans-serif">Muli</option>
							<option value="Neuton,serif">Neuton</option>
							<option value="Noticia Text,serif">Noticia Text</option>
							<option value="Noto Sans,sans-serif">Noto Sans</option>
							<option value="Noto Serif,serif">Noto Serif</option>
							<option value="Nunito,sans-serif">Nunito</option>
							<option value="Old Standard TT,serif">Old Standard TT</option>
							<option value="Oleo Script,cursive">Oleo Script</option>
							<option value="Open Sans Condensed,sans-serif">Open Sans Condensed</option>
							<option value="Open Sans,sans-serif">Open Sans</option>
							<option value="Oswald,sans-serif">Oswald</option>
							<option value="Overlock,cursive">Overlock</option>
							<option value="Oxygen,sans-serif">Oxygen</option>
							<option value="Pacifico,cursive">Pacifico</option>
							<option value="Passion One,cursive">Passion One</option>
							<option value="Patrick Hand,cursive">Patrick Hand</option>
							<option value="Playball,cursive">Playball</option>
							<option value="Playfair Display SC,serif">Playfair Display SC</option>
							<option value="Playfair Display,serif">Playfair Display</option>
							<option value="Poiret One,cursive">Poiret One</option>
							<option value="Poppins,sans-serif">Poppins</option>
							<option value="Press Start 2P,cursive">Press Start 2P</option>
							<option value="PT Mono,monospace">PT Mono</option>
							<option value="PT Sans Narrow,sans-serif">PT Sans Narrow</option>
							<option value="PT Sans,sans-serif">PT Sans</option>
							<option value="PT Serif,serif">PT Serif</option>
							<option value="Quattrocento,serif">Quattrocento</option>
							<option value="Quicksand,sans-serif">Quicksand</option>
							<option value="Raleway,sans-serif">Raleway</option>
							<option value="Righteous,cursive">Righteous</option>
							<option value="Roboto Condensed,sans-serif">Roboto Condensed</option>
							<option value="Roboto Mono,monospace">Roboto Mono</option>
							<option value="Roboto Slab,serif">Roboto Slab</option>
							<option value="Roboto,sans-serif">Roboto</option>
							<option value="Rokkitt,serif">Rokkitt</option>
							<option value="Sacramento,cursive">Sacramento</option>
							<option value="Sanchez,serif">Sanchez</option>
							<option value="Shadows Into Light Two,cursive">Shadows Into Light Two</option>
							<option value="Shrikhand,cursive">Shrikhand</option>
							<option value="Sigmar One,cursive">Sigmar One</option>
							<option value="Slabo 27px,serif">Slabo 27px</option>
							<option value="Sorts Mill Goudy,serif">Sorts Mill Goudy</option>
							<option value="Source Code Pro,monospace">Source Code Pro</option>
							<option value="Source Sans Pro,sans-serif">Source Sans Pro</option>
							<option value="Source Serif Pro,serif">Source Serif Pro</option>
							<option value="Tinos,serif">Tinos</option>
							<option value="Titillium Web,sans-serif">Titillium Web</option>
							<option value="Ubuntu,sans-serif">Ubuntu</option>
							<option value="Unica One,cursive">Unica One</option>
							<option value="Vollkorn,serif">Vollkorn</option>
							<option value="VT323,monospace">VT323</option>
							<option value="Work Sans,sans-serif">Work Sans</option>
						</select>
						<select class="form-control" id="text_change_size" style="width:50%;">
							<option value="0">Size</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="14">14</option>
							<option value="16">16</option>
							<option value="18">18</option>
							<option value="20">20</option>
							<option value="22">22</option>
							<option value="24">24</option>
							<option value="26">26</option>
							<option value="28">28</option>
							<option value="36">36</option>
							<option value="48">48</option>
							<option value="72">72</option>
						</select>
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Font color:</td><td style="text-align:right;"># <input type="text" class="picker" data-type="text_font"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<!--<div id="menu_settings" style="height:100%;overflow:scroll;display:none;">
				<h3 class="panel-title" style="color:#677888;border-bottom:2px solid #677888;padding-bottom:10px;">Settings <i class="fa fa-times close_panel" style="font-size:20px;float:right;"></i></h3>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<a href="#" class="image_edit" style="color:#cc0000;">Select logo</a>
						<table style="width:100%;margin-top:15px;margin-bottom:15px;color:#677888;font-size:14px;">
							<tr>
								<td>Background color:</td>
								<td style="text-align:right;"># <input type="text" class="picker" data-type="menu_background"></td>
							</tr>
							<tr>
								<td>Opacity:</td><td style="text-align:right;"><a href="#" class="set_menu_opacity" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="menu_opacity" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_menu_opacity" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
							<tr>
								<td>Height:</td><td style="text-align:right;"><a href="#" class="set_menu_height" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="menu_height" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_menu_height" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
							<tr>
								<td>Logo height:</td><td style="text-align:right;"><a href="#" class="set_logo_height" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="logo_height" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_logo_height" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
						<select class="form-control" id="menu_change_font" style="width:50%;float:left;">
							<option value="0">Select font</option>
							<option value="Abril Fatface,cursive">Abril Fatface</option>
							<option value="Alegreya,serif">Alegreya</option>
							<option value="Alfa Slab One,cursive">Alfa Slab One</option>
							<option value="Amatic SC,cursive">Amatic SC</option>
							<option value="Amiri,serif">Amiri</option>
							<option value="Anton,sans-serif">Anton</option>
							<option value="Arimo,sans-serif">Arimo</option>
							<option value="Audiowide,cursive">Audiowide</option>
							<option value="Bangers,cursive">Bangers</option>
							<option value="Berkshire Swash,cursive">Berkshire Swash</option>
							<option value="Bevan,cursive">Bevan</option>
							<option value="Bitter,serif">Bitter</option>
							<option value="Bree Serif,serif">Bree Serif</option>
							<option value="Cabin,sans-serif">Cabin</option>
							<option value="Cardo,serif">Cardo</option>
							<option value="Catamaran,sans-serif">Catamaran</option>
							<option value="Caveat Brush,cursive">Caveat Brush</option>
							<option value="Caveat,cursive">Caveat</option>
							<option value="Cinzel,serif">Cinzel</option>
							<option value="Coda,cursive">Coda</option>
							<option value="Comfortaa,cursive">Comfortaa</option>
							<option value="Concert One,cursive">Concert One</option>
							<option value="Cormorant Garamond,serif">Cormorant Garamond</option>
							<option value="Courgette,cursive">Courgette</option>
							<option value="Crete Round,serif">Crete Round</option>
							<option value="Dancing Script,cursive">Dancing Script</option>
							<option value="Domine,serif">Domine</option>
							<option value="Dosis,sans-serif">Dosis</option>
							<option value="EB Garamond,serif">EB Garamond</option>
							<option value="Exo 2,sans-serif">Exo 2</option>
							<option value="Fira Sans,sans-serif">Fira Sans</option>
							<option value="Fjalla One,sans-serif">Fjalla One</option>
							<option value="Forum,cursive">Forum</option>
							<option value="Glegoo,serif">Glegoo</option>
							<option value="Great Vibes,cursive">Great Vibes</option>
							<option value="Hind,sans-serif">Hind</option>
							<option value="Inconsolata,monospace">Inconsolata</option>
							<option value="Josefin Sans,sans-serif">Josefin Sans</option>
							<option value="Kalam,cursive">Kalam</option>
							<option value="Kaushan Script,cursive">Kaushan Script</option>
							<option value="Lato,sans-serif">Lato</option>
							<option value="Libre Baskerville,serif">Libre Baskerville</option>
							<option value="Lobster,cursive">Lobster</option>
							<option value="Lora,serif">Lora</option>
							<option value="Marck Script,cursive">Marck Script</option>
							<option value="Merienda,cursive">Merienda</option>
							<option value="Merriweather,serif">Merriweather</option>
							<option value="Montserrat,sans-serif">Montserrat</option>
							<option value="Muli,sans-serif">Muli</option>
							<option value="Neuton,serif">Neuton</option>
							<option value="Noticia Text,serif">Noticia Text</option>
							<option value="Noto Sans,sans-serif">Noto Sans</option>
							<option value="Noto Serif,serif">Noto Serif</option>
							<option value="Nunito,sans-serif">Nunito</option>
							<option value="Old Standard TT,serif">Old Standard TT</option>
							<option value="Oleo Script,cursive">Oleo Script</option>
							<option value="Open Sans Condensed,sans-serif">Open Sans Condensed</option>
							<option value="Open Sans,sans-serif">Open Sans</option>
							<option value="Oswald,sans-serif">Oswald</option>
							<option value="Overlock,cursive">Overlock</option>
							<option value="Oxygen,sans-serif">Oxygen</option>
							<option value="Pacifico,cursive">Pacifico</option>
							<option value="Passion One,cursive">Passion One</option>
							<option value="Patrick Hand,cursive">Patrick Hand</option>
							<option value="Playball,cursive">Playball</option>
							<option value="Playfair Display SC,serif">Playfair Display SC</option>
							<option value="Playfair Display,serif">Playfair Display</option>
							<option value="Poiret One,cursive">Poiret One</option>
							<option value="Poppins,sans-serif">Poppins</option>
							<option value="Press Start 2P,cursive">Press Start 2P</option>
							<option value="PT Mono,monospace">PT Mono</option>
							<option value="PT Sans Narrow,sans-serif">PT Sans Narrow</option>
							<option value="PT Sans,sans-serif">PT Sans</option>
							<option value="PT Serif,serif">PT Serif</option>
							<option value="Quattrocento,serif">Quattrocento</option>
							<option value="Quicksand,sans-serif">Quicksand</option>
							<option value="Raleway,sans-serif">Raleway</option>
							<option value="Righteous,cursive">Righteous</option>
							<option value="Roboto Condensed,sans-serif">Roboto Condensed</option>
							<option value="Roboto Mono,monospace">Roboto Mono</option>
							<option value="Roboto Slab,serif">Roboto Slab</option>
							<option value="Roboto,sans-serif">Roboto</option>
							<option value="Rokkitt,serif">Rokkitt</option>
							<option value="Sacramento,cursive">Sacramento</option>
							<option value="Sanchez,serif">Sanchez</option>
							<option value="Shadows Into Light Two,cursive">Shadows Into Light Two</option>
							<option value="Shrikhand,cursive">Shrikhand</option>
							<option value="Sigmar One,cursive">Sigmar One</option>
							<option value="Slabo 27px,serif">Slabo 27px</option>
							<option value="Sorts Mill Goudy,serif">Sorts Mill Goudy</option>
							<option value="Source Code Pro,monospace">Source Code Pro</option>
							<option value="Source Sans Pro,sans-serif">Source Sans Pro</option>
							<option value="Source Serif Pro,serif">Source Serif Pro</option>
							<option value="Tinos,serif">Tinos</option>
							<option value="Titillium Web,sans-serif">Titillium Web</option>
							<option value="Ubuntu,sans-serif">Ubuntu</option>
							<option value="Unica One,cursive">Unica One</option>
							<option value="Vollkorn,serif">Vollkorn</option>
							<option value="VT323,monospace">VT323</option>
							<option value="Work Sans,sans-serif">Work Sans</option>
						</select>
						<select class="form-control" id="menu_change_size" style="width:50%;">
							<option value="0">Size</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="14">14</option>
							<option value="16">16</option>
							<option value="18">18</option>
							<option value="20">20</option>
							<option value="22">22</option>
							<option value="24">24</option>
							<option value="26">26</option>
							<option value="28">28</option>
							<option value="36">36</option>
							<option value="48">48</option>
							<option value="72">72</option>
						</select>
						<table style="width:100%;margin-top:15px;color:#677888;font-size:14px;">
							<tr>
								<td>Font color:</td>
								<td style="text-align:right;"># <input type="text" class="picker" data-type="menu_font"></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Content</h3>
					</div>
					<div class="panel-body">
						<div class="input-group" style="margin-bottom:10px;">
							<input type="text" id="button_name" class="form-control" placeholder="New button">
							<span class="input-group-btn">
					    		<button class="btn btn-default add_menu" type="button">Add</button>
					    	</span>
					    </div>
						<div id="sortable" style="margin-top:10px;font-weight:bold;font-size:14px;"></div>
					</div>
				</div>
			</div>-->
			<div id="section_settings" style="display:none;">
				<h3 class="panel-title" style="color:#677888;border-bottom:2px solid #677888;padding-bottom:10px;">Settings <i class="fa fa-times close_panel" style="font-size:20px;float:right;"></i></h3>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<a href="#" class="image_edit" style="color:#cc0000;">Background image</a>
						<table style="width:100%;margin-top:15px;margin-bottom:15px;color:#677888;font-size:14px;">
							<tr>
								<td>Background color:</td>
								<td style="text-align:right;"># <input type="text" class="picker" data-type="section_background"></td>
							</tr>
							<tr>
								<td>Opacity:</td><td style="text-align:right;"><a href="#" class="set_section_opacity" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="section_opacity" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_section_opacity" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
						<a href="#" class="remove_background" style="color:#cc0000;">Delete background</a>
					</div>
				</div>
				<div class="input-group" style="margin-top:10px;">
					<input type="text" id="section_id" class="form-control" placeholder="Section ID">
					<span class="input-group-btn">
			    		<button class="btn btn-default add_id" type="button">Save</button>
			    	</span>
			    </div>
			</div>
			<div id="video_settings" style="display:none;">
				<div class="panel panel-default" style="border-radius:0;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Align:</td><td style="text-align:right;"><a href="#" class="set_align" data-type="left"><span class="fa fa-align-left"></span></a> <a href="#" class="set_align" data-type="center"><span class="fa fa-align-center"></span></a> <a href="#" class="set_align" data-type="right"><span class="fa fa-align-right"></span></a></td>
							</tr>
							<tr>
								<td>Width:</td><td style="text-align:right;"><a href="#" class="set_video_width" data-type="minus"><span class="fa fa-minus"></span></a> <input type="text" id="video_width" size="5" style="text-align:center;" disabled="disabled"> <a href="#" class="set_video_width" data-type="plus"><span class="fa fa-plus"></span></a></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<!--<div id="footer_settings" style="display:none;">
				<h3 class="panel-title" style="color:#677888;border-bottom:2px solid #677888;padding-bottom:10px;">Settings <i class="fa fa-times close_panel" style="font-size:20px;float:right;"></i></h3>
				<div class="panel panel-default" style="border-radius:0;margin-top:10px;margin-bottom:10px;">
					<div class="panel-heading">
						<h3 class="panel-title" style="color:#677888;">Style</h3>
					</div>
					<div class="panel-body">
						<table style="width:100%;color:#677888;font-size:14px;">
							<tr>
								<td>Background color:</td>
								<td style="text-align:right;"># <input type="text" class="picker" data-type="footer_background"></td>
							</tr>
						</table>
					</div>
				</div>
			</div>-->
		</div>
		<div id="add_menu" style="width:300px;height:100%;overflow:scroll;padding:10px;position:fixed;left:80px;float:left;background-color:#FFF;border-left:5px solid #ffcc00;box-shadow:5px 0px 5px 0px rgba(0,0,0,0.2);display:none;">
			<select id="add_list" class="form-control" style="margin-bottom:10px;">
				<option value="ready_made">Sections</option>
				<option value="basic_elements">Elements</option>
			</select>
			<div id="ready_made"></div>
			<div id="basic_elements" style="display:none;">
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-grid" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="fa fa-th" style="font-size:26px;margin-bottom:10px;"></span><br />Grid</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-text" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="fa fa-font" style="font-size:26px;margin-bottom:10px;"></span><br />Text</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-image" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="fa fa-picture-o" style="font-size:26px;margin-bottom:10px;"></span><br />Image</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-video" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="fa fa-youtube" style="font-size:26px;margin-bottom:10px;"></span><br />Video</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-icon" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="fa fa-font-awesome" style="font-size:26px;margin-bottom:10px;"></span><br />Icon</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-button" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="fa fa-square-o" style="font-size:26px;margin-bottom:10px;"></span><br />Button</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-slider" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="glyphicon glyphicon-option-horizontal" style="font-size:26px;margin-bottom:10px;"></span><br />Slider</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-form" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;"><span class="fa fa-check-square-o" style="font-size:26px;margin-bottom:10px;"></span><br />Form</div></div>
				<div style="width:50%;float:left;margin-bottom:15px;"><div class="add_item" data-item="kodyok-element-social-icons" style="width:100px;padding:10px;background-color:#EEE;border-radius:5px;text-align:center;border:1px solid #CCC;cursor:pointer;margin:auto;letter-spacing:-0.4px;"><span class="fa fa-font-awesome" style="font-size:26px;margin-bottom:10px;"></span><br />Social Icons</div></div>
			</div>
		</div>
		<!--<div id="general_settings_menu" style="width:300px;height:100%;overflow:scroll;padding:10px;position:fixed;left:80px;float:left;background-color:#FFF;border-left:5px solid #ffcc00;box-shadow:5px 0px 5px 0px rgba(0,0,0,0.2);display:none;">
			<button class="btn btn-default btn-block" id="menu" type="button" style="margin-bottom:10px;">Menu</button>
			<button class="btn btn-default btn-block" id="footer" type="button" style="margin-bottom:10px;">Footer</button>
			<button class="btn btn-default btn-block" id="seo" type="button" data-toggle="modal" data-target="#seoModal">SEO</button>
		</div>-->
	</div>
	<div class="modal fade" id="linkModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" style="width:400px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Define link</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<select id="link_type" class="form-control">
							<option value="0">Select link type</option>
							<option value="section">Link to section</option>
							<option value="page">Link to page</option>
							<option value="url">Link to URL</option>
						</select>
					</div>
					<div class="form-group" style="display:none;">
						<select id="link_section" class="form-control">
							<option value="0">Select section</option>
						</select>
					</div>
					<div class="form-group" style="display:none;">
						<select id="link_page" class="form-control">
							<option value="0">Select page</option>
							<?php
							$pages = get_pages();
							foreach($pages as $page){
							?>
							<option value="<?php echo esc_attr(get_page_link($page->ID));?>"><?php echo esc_html($page->post_title);?></option>
							<?php
							}
							?>
						</select>
					</div>
					<div class="form-group" style="display:none;">
						<input type="text" id="link_url" class="form-control" placeholder="Link URL">
					</div>
					<button type="button" class="btn btn-default" id="set_link" style="width:100%;margin-bottom:10px;">Save</button>
					<a href="#" id="remove_link" style="color:#cc0000;">Remove link</a>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" style="width:1000px;">
			<div class="modal-content">
				<div class="modal-header">
					<iframe src="<?php echo esc_attr(get_site_url());?>/?do=upload_screen" style="width:100%;height:40px;border:0;"></iframe>
				</div>
				<div id="site_images" class="modal-body" style="height:500px;overflow:scroll;"></div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" id="select_image" disabled="disabled">Select</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="iconModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" style="width:1000px;">
			<div class="modal-content">
				<div class="modal-body" style="height:500px;overflow:scroll;">
					<div class="form-group form-group-lg">
						<input type="text" id="icon_search" class="form-control" placeholder="Search">
					</div>
					<?php load_template(dirname(__FILE__).'/assets/icons.html');?>
					<div id="icon_search_results" class="row fontawesome-icon-list"></div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" style="width:400px;">
			<div class="modal-content">
				<div class="modal-body">
					<div class="form-group">
						<input type="text" id="video_url" class="form-control" placeholder="Youtube video id">
					</div>
					<button type="button" class="btn btn-default" id="set_video" style="width:100%;margin-bottom:10px;">Save</button>
				</div>
			</div>
		</div>
	</div>
	<?php
	/*if(metadata_exists('post',get_the_ID(),'seo_settings')){
		$seo_settings = get_post_meta(get_the_ID(),'seo_settings');
		$seo_settings = json_decode($seo_settings[0]);
		$keywords = $seo_settings->keywords;
		$description = $seo_settings->description;
	} else {
		$keywords = '';
		$description = '';
	}*/
	?>
	<!--<div class="modal fade" id="seoModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body">
					<div class="form-group">
						<input type="text" id="seo_keywords" class="form-control" placeholder="Keywords" value="<?php echo esc_attr($keywords);?>">
					</div>
					<div class="form-group">
						<textarea class="form-control" rows="3" id="seo_description" placeholder="Description"><?php echo esc_html($description);?></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary" id="save_seo">Save</button>
				</div>
			</div>
		</div>
	</div>-->
	<div class="modal fade" id="contentModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog" style="width:400px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Content source</h4>
				</div>
				<div class="modal-body">
					<select class="form-control" id="content_type">
						<option value="categories">Get content from selected categories</option>
						<option value="tags">Get content from selected tags</option>
					</select>
					<div id="content_categories">
					<?php
					$categories = get_categories();
					foreach($categories as $category){
					?>
					<div class="checkbox"><label><input type="checkbox" value="<?php echo esc_attr($category->term_id);?>"> <?php echo esc_html($category->name);?></label></div>
					<?php
					}
					?>
					</div>
					<div id="content_tags" style="display:none;">
					<?php
					$tags = get_tags();
					foreach($tags as $tag){
					?>
					<div class="checkbox"><label><input type="checkbox" value="<?php echo esc_attr($tag->term_id);?>"> <?php echo esc_html($tag->name);?></label></div>
					<?php
					}
					?>
					</div>
					<button type="button" class="btn btn-default" id="set_content" style="width:100%;margin-bottom:10px;">Save</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>