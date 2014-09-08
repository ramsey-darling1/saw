//Custom JS for Saw chart
//@rdarling

$(document).ready(function(){

    $("#view_estimates").click(function() {
        $.ajax({
                url: '/estimates',
                type: 'GET',
                data: {},
                success:function(res){
                    $("#estimate_list").html(res);
                    $("#estimate_list").slideDown();
                    $("#component_list").slideUp();
                }
            });        
    });

});

$("body").on("click",".delete",function() {
        
        var est_id = $(this).attr("id");

        var authenticity_token = $("#authenticity_token").val();

        $.ajax({
                url: '/estimate',
                type: 'DELETE',
                data: {
                    est_id: est_id,
                    authenticity_token: authenticity_token
                },
                success:function(html_response){
                    $("#save_response").html(html_response);
                    $("."+est_id).fadeOut();
                }
            });

});

$('body').on('click','.view-components',function() {
    
    var est_id = $(this).attr("id");

    est_id = est_id.replace('view_','');
    
    if (est_id !== '') {

       $.ajax({
            url: '/single-estimate',
            type: 'GET',
            data: {est_id:est_id},
            success:function(res){
                $("#component_list").html(res);
                $("#component_list").slideDown();
                $("#estimate_list").slideUp();
            }
        }); 
    }else{
        $("#component_list").html('<div class="alert alert-danger">Sorry, we can load the components at this time</div>');
    }

});