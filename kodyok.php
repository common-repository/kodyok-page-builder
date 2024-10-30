<?php
/*
Plugin Name: Kodyok Page Builder
Plugin URI: https://kodyok.com
Author: Kodyok
Author URI: http://kodyok.com
Description: Kodyok Page Builder plugin adds drag and drop page builder functionality to the all themes.
Version: 1.0
License: GNU General Public License v3
License URI: http://www.gnu.org/licenses/gpl-3.0.html
Text Domain: kodyok-page-builder
*/

function kodyok_content_filter(){
	return '<div id="kodyok-content-area" class="uk-scope" data-post-id="'.get_the_ID().'">'.convert_html(get_the_content()).'</div>';
}

function kodyok_scripts(){
	global $wp_styles;
    foreach($wp_styles->queue as $style){
        wp_deregister_style($style);
    }
    global $wp_scripts;
    foreach($wp_scripts->queue as $script){
    	if($script!='jquery'){
        	wp_deregister_script($script);
    	}
    }
	wp_enqueue_style( 'bootstrap', plugin_dir_url(__FILE__).'assets/bootstrap/css/bootstrap.min.css' );
	wp_enqueue_style( 'bootstrap-theme', plugin_dir_url(__FILE__).'assets/bootstrap/css/bootstrap-theme.min.css' );
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'bootstrap', plugin_dir_url(__FILE__).'assets/bootstrap/js/bootstrap.min.js' );
	wp_enqueue_script( 'jquery-ui', plugin_dir_url(__FILE__).'assets/js/jquery-ui.min.js' );
	wp_enqueue_style( 'jquery-ui', plugin_dir_url(__FILE__).'assets/css/jquery-ui.min.css' );
	wp_enqueue_style( 'font-awesome', plugin_dir_url(__FILE__).'assets/font-awesome/css/font-awesome.min.css' );
	wp_enqueue_script( 'sweetalert', plugin_dir_url(__FILE__).'assets/swal/sweetalert.min.js' );
	wp_enqueue_style( 'sweetalert', plugin_dir_url(__FILE__).'assets/swal/sweetalert.css' );
	wp_enqueue_style( 'montserrat', 'http://fonts.googleapis.com/css?family=Montserrat' );

	wp_enqueue_script( 'sortable', plugin_dir_url(__FILE__).'assets/js/Sortable.min.js' );
	wp_enqueue_script( 'colpick', plugin_dir_url(__FILE__).'assets/js/colpick.js' );
	wp_enqueue_style( 'colpick', plugin_dir_url(__FILE__).'assets/css/colpick.css' );
	wp_enqueue_script( 'kodyok-main', plugin_dir_url(__FILE__).'assets/js/kodyok_main.js' );
	wp_enqueue_style( 'style', plugin_dir_url(__FILE__).'assets/css/kodyok_style.css' );
}

function kodyok_editor_scripts(){
	wp_enqueue_style( 'kodyok-uikit', plugin_dir_url(__FILE__).'assets/uikit/css/uikit.min.css' );
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'kodyok-uikit', plugin_dir_url(__FILE__).'assets/uikit/js/uikit.min.js' );
	wp_enqueue_script( 'jquery-ui', plugin_dir_url(__FILE__).'assets/js/jquery-ui.min.js' );
	wp_enqueue_style( 'jquery-ui', plugin_dir_url(__FILE__).'assets/css/jquery-ui.min.css' );
	wp_enqueue_style( 'font-awesome', plugin_dir_url(__FILE__).'assets/font-awesome/css/font-awesome.min.css' );
	wp_enqueue_script( 'sweetalert', plugin_dir_url(__FILE__).'assets/swal/sweetalert.min.js' );
	wp_enqueue_style( 'sweetalert', plugin_dir_url(__FILE__).'assets/swal/sweetalert.css' );
	wp_enqueue_style( 'montserrat', 'http://fonts.googleapis.com/css?family=Montserrat' );

	wp_enqueue_script( 'webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' );
	wp_enqueue_script( 'site-main', plugin_dir_url(__FILE__).'assets/js/site_main.js' );
	wp_enqueue_script( 'editor-main', plugin_dir_url(__FILE__).'assets/js/editor_main.js' );
	wp_enqueue_script( 'core', plugin_dir_url(__FILE__).'assets/js/core.js' );
	wp_enqueue_script( 'core-button', plugin_dir_url(__FILE__).'assets/js/core.button.js' );
	wp_enqueue_script( 'core-form', plugin_dir_url(__FILE__).'assets/js/core.form.js' );
	wp_enqueue_script( 'core-grid', plugin_dir_url(__FILE__).'assets/js/core.grid.js' );
	wp_enqueue_script( 'core-icon', plugin_dir_url(__FILE__).'assets/js/core.icon.js' );
	wp_enqueue_script( 'core-image', plugin_dir_url(__FILE__).'assets/js/core.image.js' );
	wp_enqueue_script( 'core-menu', plugin_dir_url(__FILE__).'assets/js/core.menu.js' );
	wp_enqueue_script( 'core-section', plugin_dir_url(__FILE__).'assets/js/core.section.js' );
	wp_enqueue_script( 'core-slider', plugin_dir_url(__FILE__).'assets/js/core.slider.js' );
	wp_enqueue_script( 'core-text', plugin_dir_url(__FILE__).'assets/js/core.text.js' );
	wp_enqueue_script( 'core-video', plugin_dir_url(__FILE__).'assets/js/core.video.js' );
	wp_enqueue_script( 'tiny-mce', includes_url().'js/tinymce/tinymce.min.js' );
	wp_enqueue_style( 'kodyok-style', plugin_dir_url(__FILE__).'assets/css/style.css' );
}

function kodyok_site_scripts(){
	wp_enqueue_style( 'kodyok-uikit', plugin_dir_url(__FILE__).'assets/uikit/css/uikit.min.css' );
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'kodyok-uikit', plugin_dir_url(__FILE__).'assets/uikit/js/uikit.min.js' );
	wp_enqueue_style( 'font-awesome', plugin_dir_url(__FILE__).'assets/font-awesome/css/font-awesome.min.css' );
	wp_enqueue_script( 'sweetalert', plugin_dir_url(__FILE__).'assets/swal/sweetalert.min.js' );
	wp_enqueue_style( 'sweetalert', plugin_dir_url(__FILE__).'assets/swal/sweetalert.css' );
	wp_enqueue_style( 'montserrat', 'http://fonts.googleapis.com/css?family=Montserrat' );

	wp_enqueue_script( 'webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js' );
	wp_register_script( 'site-main', plugin_dir_url(__FILE__).'assets/js/site_main.js' );
	wp_localize_script( 'site-main', 'get_site_url', get_site_url() );
	wp_localize_script( 'site-main', 'plugin_dir_url', plugin_dir_url(__FILE__) );
	wp_enqueue_script( 'site-main' );
	wp_enqueue_style( 'kodyok-style', plugin_dir_url(__FILE__).'assets/css/style.css' );
}

function kodyok_init(){
	if(isset($_GET['do'])){
	    if($_GET['do']=='save' && is_super_admin()){
	    	if(isset($_GET['id'],$_POST['content'])){
	    	//if(isset($_GET['id'],$_POST['content'],$_POST['menu'],$_POST['footer'])){
				$my_post = array('ID'=>intval($_GET['id']),'post_content'=>sanitize_text_field($_POST['content']));
				wp_update_post($my_post);
				add_post_meta(intval($_GET['id']),'kodyok_content','1',true);
				//update_option('kodyok_menu_style',sanitize_text_field($_POST['menu']));
				//update_option('kodyok_footer',sanitize_text_field($_POST['footer']));
			}
			exit;
	    } else if($_GET['do']=='get_content'){
	    	if(isset($_GET['limit'],$_GET['post_count'])){
		    	$args = array(
					'numberposts' => intval($_GET['limit']),
					'offset' => intval($_GET['post_count'])
				);
		    	if(isset($_GET['categories'])){
			    	$categories = explode(',',sanitize_text_field($_GET['categories']));
					$args = array(
						'numberposts' => intval($_GET['limit']),
						'offset' => intval($_GET['post_count']),
						'category__in' => $categories
					);
				} else if(isset($_GET['tags'])){
					$tags = explode(',',sanitize_text_field($_GET['tags']));
					$args = array(
						'numberposts' => intval($_GET['limit']),
						'offset' => intval($_GET['post_count']),
						'tag__in' => $tags
					);
				}
				$posts = get_posts($args);
				$i = 0;
				foreach($posts as $post){
					$new_posts[$i]['title'] = esc_html($post->post_title);
					if(has_post_thumbnail()){
						$new_posts[$i]['image'] = get_the_post_thumbnail_url($post->ID,'medium_large');
					} else {
						$new_posts[$i]['image'] = plugin_dir_url(__FILE__).'assets/img/300x300.gif';
					}
					if(get_permalink($post->ID)){
						$new_posts[$i]['link'] = esc_url(get_permalink($post->ID));
					} else {
						$new_posts[$i]['link'] = esc_url(get_site_url().'/?p='.$post->ID);
					}
					$i++;
				}
				if(isset($new_posts)){
					echo json_encode($new_posts);
				}
			}
			exit;
	    } else if($_GET['do']=='get_images'){
	    	$query_images_args = array(
				'post_type' => 'attachment',
				'post_mime_type' => 'image',
				'post_status' => 'inherit',
				'posts_per_page' => -1,
			);
			$query_images = new WP_Query($query_images_args);
			$images = array();
			$i = 0;
			foreach($query_images->posts as $image){
				$images[$i]['id'] = intval($image->ID);
				$images[$i]['thumb'] = esc_url(wp_get_attachment_thumb_url($image->ID));
				$i++;
			}
			echo json_encode($images);
			exit;
	    } else if($_GET['do']=='get_image'){
	    	if(isset($_GET['size'],$_GET['id'])){
	    		$image = wp_get_attachment_image_src(intval($_GET['id']),esc_html($_GET['size']));
	    		echo esc_url($image[0]);
	    	}
	    	exit;
	    } else if($_GET['do']=='upload_screen' && is_super_admin()){
	    	?>
	    	<body style="margin:0;padding:0;">
		    	<form id="featured_upload" method="post" action="<?php echo esc_attr(esc_url(get_site_url()));?>/?do=upload_image" enctype="multipart/form-data" style="margin-bottom:0;">
					<input type="file" name="my_image_upload" id="my_image_upload" multiple="false" />
					<input type="hidden" name="post_id" id="post_id" value="0" />
					<?php wp_nonce_field('my_image_upload','my_image_upload_nonce');?>
					<input id="submit_my_image_upload" name="submit_my_image_upload" type="submit" value="Upload" style="width:150px;padding:5px;font-size:20px;text-align:center;background:#666;color:#fff;" />
				</form>
			</body>
	    	<?php
	    	exit;
	    } else if($_GET['do']=='upload_image' && is_super_admin()){
			if(isset($_POST['my_image_upload_nonce'],$_POST['post_id']) && wp_verify_nonce(sanitize_text_field($_POST['my_image_upload_nonce']),'my_image_upload')){
				require_once(ABSPATH.'wp-admin/includes/image.php');
				require_once(ABSPATH.'wp-admin/includes/file.php');
				require_once(ABSPATH.'wp-admin/includes/media.php');
				$attachment_id = media_handle_upload('my_image_upload',intval($_POST['post_id']));
				if(!is_wp_error($attachment_id)){
					?>
					<script type="text/javascript">
				        parent.add_new_image(<?php echo intval($attachment_id);?>);
				        window.location.href = '<?php echo esc_url(get_site_url());?>/?do=upload_screen';
				    </script>
					<?php
				} else {
					echo $attachment_id->errors['upload_error'][0];
				}
			}
			exit;
	    } else if($_GET['do']=='send_email'){
	    	$message = "";
	    	$datas = json_decode(sanitize_text_field($_POST['content']));
	    	foreach($datas as $key => $val){
				$message .= $key.': '.$val."\r\n<br /><br />";
			}
			$headers  = 'MIME-Version: 1.0'."\r\n";
			$headers .= 'Content-type: text/html; charset=utf-8'."\r\n";
			wp_mail(esc_html(get_option('kodyok_form_email')),'Contact Form',$message,$headers);
			exit;
	    } else if($_GET['do']=='update_email' && is_super_admin()){
	    	if(isset($_GET['email'])){
	    		update_option('kodyok_form_email',sanitize_email($_GET['email']));
	    	}
	    	exit;
	    /*} else if($_GET['do']=='save_seo' && is_super_admin()){
	    	if(isset($_GET['id'],$_POST['seo_settings'])){
	    		add_post_meta(intval($_GET['id']),'seo_settings',sanitize_text_field($_POST['seo_settings']),true);
	    	}
	    	exit;
	    } else if($_GET['do']=='remove_menu' && is_super_admin()){
	    	wp_delete_post(intval($_GET['id']));
	    	$items = wp_get_nav_menu_items('top');
	    	$i = 1;
			foreach($items as $item){
				$my_post = array('ID'=>intval($item->db_id),'menu_order'=>intval($i));
				wp_update_post($my_post);
		        $i++;
			}
	    	exit;
	    } else if($_GET['do']=='update_menu' && is_super_admin()){
	    	if(isset($_GET['menu_id'],$_GET['item_id'],$_GET['title'],$_GET['link'],$_GET['target'],$_GET['position'],$_GET['type'])){
	    		if($_GET['link']==''){
	    			$_GET['link'] = '#';
	    		} else {
		    		if($_GET['type']=='section'){
		    			$_GET['link'] = '#'.sanitize_text_field($_GET['link']);
		    		}
	    		}
		    	wp_update_nav_menu_item(intval($_GET['menu_id']), intval($_GET['item_id']), array(
		            'menu-item-title' => sanitize_text_field($_GET['title']),
		            'menu-item-url' => esc_url_raw($_GET['link']),
		            'menu-item-target' => sanitize_text_field($_GET['target']),
		            'menu-item-position' => intval($_GET['position']),
		            'menu-item-status' => 'publish'
		        ));
	    	}
	        exit;
	    } else if($_GET['do']=='update_menu_list' && is_super_admin()){
	    	if(isset($_GET['items'])){
		    	$items = explode(',',sanitize_text_field($_GET['items']));
		    	$i = 1;
				foreach($items as $item){
					if($item!=''){
						$my_post = array('ID'=>intval($item),'menu_order'=>intval($i));
						wp_update_post($my_post);
				        $i++;
			    	}
				}
			}
	    	exit;
	    } else if($_GET['do']=='add_menu_item' && is_super_admin()){
	    	if(isset($_GET['menu_id'],$_GET['title'],$_GET['position'])){
		    	echo wp_update_nav_menu_item(intval($_GET['menu_id']), 0, array(
		            'menu-item-title' => sanitize_text_field($_GET['title']),
		            'menu-item-url' => '#',
		            'menu-item-target' => '',
		            'menu-item-position' => intval($_GET['position']),
		            'menu-item-status' => 'publish'
		        ));
	    	}
	    	exit;
		} else if($_GET['do']=='column_settings' && is_super_admin()){
			?>
			<body style="margin:0;padding:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;">
			  <?php
			  if($_GET['id']==2){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:120px;float:left;text-align:center;padding-top:10px;">6</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:120px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:120px;float:left;text-align:center;padding-top:10px;">6</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==3){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:80px;float:left;text-align:center;padding-top:10px;">4</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:80px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:80px;float:left;text-align:center;padding-top:10px;">4</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:160px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:80px;float:left;text-align:center;padding-top:10px;">4</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==4){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:60px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:120px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:180px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==5){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:60px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:180px;float:left;text-align:center;padding-top:10px;">9</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==6){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:180px;float:left;text-align:center;padding-top:10px;">9</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:180px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==7){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:60px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:120px;float:left;text-align:center;padding-top:10px;">6</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:180px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==8){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:40px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:60px;float:left;text-align:center;padding-top:10px;">3</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:100px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:100px;float:left;text-align:center;padding-top:10px;">5</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:200px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==9){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:40px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:80px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:120px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:80px;float:left;text-align:center;padding-top:10px;">4</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:200px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			  </div>
			  <?php
			  }
			  ?>
			  <?php
			  if($_GET['id']==10){
			  ?>
			  <div style="width:240px;height:40px;background-color:#EEE;">
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:40px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:80px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:120px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:160px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			    <div class="draggable" style="width:5px;height:40px;background-color:#6699cc;float:left;left:200px;position:absolute;cursor:col-resize;"></div>
			    <div style="width:40px;float:left;text-align:center;padding-top:10px;">2</div>
			  </div>
			  <?php
			  }
			  ?>
			</body>
	    	<?php
	    	exit;*/
	    }
	}
	add_filter('the_content','kodyok_content_filter');
	if(isset($_GET['mode']) && $_GET['mode']=='kodyok'){
		add_action('wp_enqueue_scripts','kodyok_scripts');
		include(plugin_dir_path(__FILE__).'editor.php');
		exit;
	} else if(isset($_GET['mode']) && $_GET['mode']=='editor'){
		add_action('wp_enqueue_scripts','kodyok_editor_scripts');
	} else {
		add_action('wp_enqueue_scripts','kodyok_site_scripts');
	}
}
add_action('init','kodyok_init');

function convert_html($content){
	$content = str_replace('[KODYOK-TAG-OPEN','<',$content);
	$content = str_replace('KODYOK-TAG-CLOSE]','>',$content);
	return $content;
}

function kodyok_button(){
if(isset($_GET['post'])){
?>
<script type="text/javascript">
jQuery("#postdivrich").prepend('<br /><br /><a href="<?php echo esc_attr(esc_url(get_site_url())).'/?p='.intval($_GET['post']);?>&mode=kodyok" style="background-color:#00ccff;color:#333;font-size:20px;padding:15px;border:2px solid #ffcc00;text-decoration:none;">Edit with Kodyok</a><br /><br />');
</script>
<?php
}
}
add_action('admin_footer','kodyok_button');

function kodyok_custom_toolbar_link($wp_admin_bar){
	if(get_the_ID()!=''){
		$args = array(
			'id' => 'kodyok',
			'title' => 'Edit with Kodyok',
			'href' => esc_attr(esc_url(get_site_url()).'/?p='.intval(get_the_ID()).'&mode=kodyok')
		);
		$wp_admin_bar->add_node($args);
	}
}
add_action('admin_bar_menu','kodyok_custom_toolbar_link',999);
?>