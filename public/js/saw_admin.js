//Custom JS for Saw chart
//@rdarling

$(document).ready(function(){

    $(".delete").click(function() {
        
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

    $("#view_estimates").click(function() {
        $.ajax({
                url: '/estimates',
                type: 'GET',
                data: {},
                success:function(res){
                    $("#estimate_list").html(res);
                }
            });        
    });

});