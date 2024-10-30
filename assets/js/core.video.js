function video_url(id){
	jQuery('.kodyok-element-last-video').append('<iframe src="https://www.youtube.com/embed/'+id+'?rel=0&amp;showinfo=0" width="560" height="315" frameborder="0" allowfullscreen kodyok-responsive></iframe>');
	jQuery('.kodyok-element-last-video').removeClass('kodyok-element-last-video');
}
function remove_last_video(){
	jQuery('.kodyok-element-last-video').remove();
}
function get_video_settings(){
	jQuery('#video_width',window.parent.document).val(jQuery(active_element).css('max-width'));
}
function set_video_width(value){
	video_width = jQuery(active_element).css('max-width');
	video_width = video_width.split('px');
	if(value=='minus'){
		video_width = parseInt(video_width[0])-20;
	} else if(value=='plus'){
		video_width = parseInt(video_width[0])+20;
	}
	jQuery(active_element).css('max-width',video_width+'px');
	return video_width+'px';
}