 
$(document).ready(function(){
    $('#submit').click(function(){
        window.alert("An error occurred, try other contact methods.");
    });
    $('#resumeBtn').click(function(){
        $('#resumePDF').toggle(800);
    })
});
