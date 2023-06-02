 
$(document).ready(function(){
    $('#submit').click(function(){
        window.alert("An error occurred, try other contact methods.");
    });
    $('#resumeBtn').click(function(){
        $('#resumePDF').toggle(800);
    })
    $(function(){
        $("#container1").twentytwenty();
        $("#container2").twentytwenty();
    });
});

