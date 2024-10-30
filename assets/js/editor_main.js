jQuery(document).ready(function(){
    jQuery("body").on("click","a",function(e){
        if(jQuery(this).attr('href') && jQuery(this).attr('href')[0]!='#' && jQuery(this).attr('target')!='_blank' && !jQuery(this).hasClass('kodyok-inline')){
            e.preventDefault();
            window.open(jQuery(this).attr('href')+'?mode=kodyok','_top');
        }
    });
    jQuery("#commentform").submit(function(e){
        e.preventDefault();
        swal(
            'You can\'t submit this form in edit mode.',
            '',
            'error'
        );
    });
});