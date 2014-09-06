//Custom JS for Saw chart
//@rdarling

$(document).ready(function(){

	var high = Number($("#high").html());

	var low = Number($("#low").html());
    
    $(".component").draggable({
            revert: 'invalid',            
            snap: '.snap, .original'
        });
    
    $(".snap").droppable({
            drop: function(event, ui){
        		
        		var comp_high = Number($(".high").val());
        		
        		var comp_low = Number($(".low").val());
        		
        		high += comp_high;

        		low += comp_low;

        		$("#high").html(high);

        		$("#low").html(low);
            }

    });

    $(".original").droppable({

         drop: function(event, ui){
                
                var comp_high = Number($(".high").val());
                
                var comp_low = Number($(".low").val());
                
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

    $("#save").click(function(){
        //save the project

        var title = $("#title").val();
        
        var fin_high = $("#high_est").val();
        
        var fin_low = $("#low_est").val();
        
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
                    date_saved: date_saved
                },
                success:function(html_response){
                    $("#save_response").html(html_response);
                }
            });
        }  
    });

    $(".delete").click(function() {
        
        var id = $(this).attr("id");

        $.ajax({
                url: '/remove/'+id,
                type: 'DELETE',
                data: {
                    id: id
                },
                success:function(html_response){
                    $("#save_response").html(html_response);
                }
            });

    });    

});