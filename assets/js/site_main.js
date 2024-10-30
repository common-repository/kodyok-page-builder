loaded_fonts = ['Montserrat'];
if(typeof get_site_url === 'undefined'){
    get_site_url = parent.get_site_url;
}
if(typeof plugin_dir_url === 'undefined'){
    plugin_dir_url = parent.plugin_dir_url;
}
jQuery(document).ready(function(){
    kodyokUIkit.container = '.uk-scope';
    jQuery('#kodyok-content-area').find('a').each(function(){
        if(loaded_fonts.indexOf(jQuery(this).css('font-family').split(',')[0].replace(/"/g,''))=='-1'){
            loaded_fonts.push(jQuery(this).css('font-family').split(',')[0].replace(/"/g,''));
            WebFont.load({
                google: {
                    families: [jQuery(this).css('font-family').split(',')[0].replace(/"/g,'')]
                }
            });
        }
    });
    jQuery('#kodyok-content-area').find('span').each(function(){
        if(loaded_fonts.indexOf(jQuery(this).css('font-family').split(',')[0].replace(/"/g,''))=='-1'){
            loaded_fonts.push(jQuery(this).css('font-family').split(',')[0].replace(/"/g,''));
            WebFont.load({
                google: {
                    families: [jQuery(this).css('font-family').split(',')[0].replace(/"/g,'')]
                }
            });
        }
    });
    jQuery("body").on("click",".kodyok-card-media-top",function(){
        window.open(jQuery(this).parent().find('a').attr('href'),'_top');
    });
    jQuery("body").on("click",".kodyok-send-button",function(){
        form_error = 0;
        jQuery(this).parent().parent().children("div").each(function(){
            if(jQuery(this).children('input').length==1){
                if(jQuery(this).children('input').val()==''){
                    form_error++;
                }
            }
        });
        if(form_error>0){
            swal(
                'This fields are required.',
                '',
                'error'
            );
        } else {
            form_content = {};
            jQuery(this).parent().parent().children("div").each(function(){
                if(jQuery(this).children('input').length==1){
                    form_content[jQuery(this).children('input').attr('placeholder')] = jQuery(this).children('input').val();
                }
            });
            jQuery.ajax({
                type: "POST",
                url: parent.get_site_url+"/?do=send_email",
                data: {content:JSON.stringify(form_content)},
                success: function(html){
                    swal(
                        'Success',
                        '',
                        'success'
                    );
                }
            });
            return false;
        }
    });
    jQuery('.kodyok-element-dynamic-content').each(function(){
        active_element = jQuery(this);
        if(jQuery(this).attr('data-categories')){
            categories = jQuery(this).attr('data-categories');
        } else {
            categories = '';
        }
        if(jQuery(this).attr('data-tags')){
            tags = jQuery(this).attr('data-tags');
        } else {
            tags = '';
        }
        set_content(categories,tags,0);
    });
    jQuery("body").on("click",".kodyok-element-load-more",function(){
        active_element = jQuery(this).parent().parent().parent().parent();
        if(jQuery(this).attr('data-categories')){
            categories = jQuery(this).attr('data-categories');
        } else {
            categories = '';
        }
        if(jQuery(this).attr('data-tags')){
            tags = jQuery(this).attr('data-tags');
        } else {
            tags = '';
        }
        load_content(categories,tags);
    });
});
function set_content(categories,tags,is_new){
    if(is_new==1){
        active_element = jQuery('.kodyok-element-last-grid');
    }
    json_url = '';
    if(categories!=''){
        jQuery(active_element).attr('data-categories',categories);
        json_url = '&categories='+categories;
    }
    if(tags!=''){
        jQuery(active_element).attr('data-tags',tags);
        json_url = '&tags='+tags;
    }
    jQuery.getJSON(parent.get_site_url+'/?do=get_content&post_count=0&limit=6'+json_url,function(data){
        if(jQuery(active_element).children('.kodyok-grid').children('div').length==0){
            text_align = 'center';
            text_font = 'Montserrat, sans-serif';
            text_size = '18px';
            text_color = '#666';
        } else {
            text_align = jQuery(active_element).find('.kodyok-card-title').css('text-align');
            text_font = jQuery(active_element).find('.kodyok-card-title').children('a').css('font-family');
            text_size = jQuery(active_element).find('.kodyok-card-title').children('a').css('font-size');
            text_color = jQuery(active_element).find('.kodyok-card-title').children('a').css('color');
        }
        jQuery(active_element).children('.kodyok-grid').children('div').remove();
        if(jQuery(active_element).children('.kodyok-grid').next().css('display')=='none'){
            jQuery(active_element).children('.kodyok-grid').next().show();
        }
        if(data.length<6){
            jQuery(active_element).children('.kodyok-grid').next().hide();
        }
        jQuery.each(data,function(i){
            jQuery(active_element).children('.kodyok-grid').append('<div><div class="kodyok-card kodyok-card-default kodyok-card-hover"><div class="kodyok-card-media-top kodyok-cover-container"><canvas width="300" height="300"></canvas><img src="'+data[i].image+'" alt="" kodyok-cover></div><div class="kodyok-card-body"><h3 class="kodyok-card-title" style="text-align:'+text_align+';"><a href="'+data[i].link+'" style="color:'+text_color+';text-decoration:none;font-size:'+text_size+';font-family:'+text_font+';">'+data[i].title+'</a></h3></div></div></div>');
        });
        if(is_new==1){
            jQuery(active_element).addClass('kodyok-element-dynamic-content');
            jQuery(active_element).removeClass('kodyok-element-last-grid');
        }
    });
}
function load_content(categories,tags){
    if(categories!=''){
        json_url = 'categories='+categories;
    }
    if(tags!=''){
        json_url = 'tags='+tags;
    }
    jQuery.get(parent.get_site_url+'/?do=get_content&post_count='+jQuery(active_element).children('.row').first().children('div').length+'&limit=3&'+json_url,function(data){
        text_align = jQuery(active_element).find('.kodyok-card-title').css('text-align');
        text_font = jQuery(active_element).find('.kodyok-card-title').children('a').css('font-family');
        text_size = jQuery(active_element).find('.kodyok-card-title').children('a').css('font-size');
        text_color = jQuery(active_element).find('.kodyok-card-title').children('a').css('color');
        if(data.length==1){
            jQuery(active_element).children('.kodyok-grid').next().hide();
        } else {
            data = jQuery.parseJSON(data);
            jQuery.each(data,function(i){
                jQuery(active_element).children('.kodyok-grid').append('<div><div class="kodyok-card kodyok-card-default kodyok-card-hover"><div class="kodyok-card-media-top kodyok-cover-container"><canvas width="300" height="300"></canvas><img src="'+data[i].image+'" alt="" kodyok-cover></div><div class="kodyok-card-body"><h3 class="kodyok-card-title" style="text-align:'+text_align+';"><a href="'+data[i].link+'" style="color:'+text_color+';text-decoration:none;font-size:'+text_size+';font-family:'+text_font+';">'+data[i].title+'</a></h3></div></div></div>');
            });
        }
    });
}