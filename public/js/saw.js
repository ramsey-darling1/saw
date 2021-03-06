//Custom JS for Saw chart
//@rdarling

$(document).ready(function(){

	var high = Number($("#high").html());

	var low = Number($("#low").html());
    
    var components = [];

    var comp = $(".component").draggable({
            revert: 'invalid',            
            snap: '.snap, .original'
        });
    
    $(".snap").droppable({
            drop: function(event, ui){
        		
        		var comp_high = Number($("div.ui-draggable-dragging .high").val());
        		
        		var comp_low = Number($("div.ui-draggable-dragging .low").val());
                
                var component = $("div.ui-draggable-dragging p.component-title").html();
        		
                components.push(component);

        		high += comp_high;

        		low += comp_low;

        		$("#high").html(high);

        		$("#low").html(low);
            }

    });

    $(".original").droppable({

         drop: function(event, ui){
                
                var comp_high = Number($("div.ui-draggable-dragging .high").val());
                
                var comp_low = Number($("div.ui-draggable-dragging .low").val());
                
                var component = $("div.ui-draggable-dragging p.component-title").html();

                $(components).each(function(index,value){
                    
                    if (value == component) {
                        components.splice(index,1);
                    }

                });

                high -= comp_high;

                low -= comp_low;

                $("#high").html(high);

                $("#low").html(low);
            }
    });

    $("#save_prev").click(function(){

        $("#overlay").removeClass("disappear");

        $("#high_est").val(high);

        $("#low_est").val(low);

    });

    $("#close").click(function(){
        $("#overlay").addClass("disappear");
    });

    $("#show_key").click(function(){

        $("#overlay_key").removeClass("disappear");    

    });

    $("#hide_key").click(function(){
        $("#overlay_key").addClass("disappear");
    });

    $("#save").click(function(){
        //save the project

        var title = $("#title").val();
        
        var fin_high = $("#high_est").val();
        
        var fin_low = $("#low_est").val();

        var authenticity_token = $("#authenticity_token").val();

        if(title === '' || fin_high === '' || fin_low === ''){
            $("#save_response").html('<div class="alert alert-warning">Please make sure all required information is complete before saving</div>');
        }else{

            var date_saved = Date.now();

            $.ajax({
                url: '/save',
                type: 'POST',
                data: {
                    title:title,
                    high_end:fin_high,
                    low_end:fin_low,
                    date_saved: date_saved,
                    components: components,
                    authenticity_token: authenticity_token
                },
                success:function(html_response){
                    $("#save_response").html(html_response);
                }
            });
        }  
    });

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

