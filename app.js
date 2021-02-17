/* global webrtcPhone */

$(function () {
    $('#hangup-btn,#answer-btn, #hold-btn, #unhold-btn').hide();
    $('#unhold-btn').attr('disabled');
    $('#hangup-btn,#answer-btn').removeAttr('disabled');

    $(document).on('registered', function (ev) {
        $('#login-btn, #server-address, #name, #exten, #password').attr('disabled', 'disabled');
        $('#logout-btn,#call-to,#call-btn').removeAttr('disabled');
        $('#call-to').focus();
        $('#output-lbl').attr('class', 'label label-success');
        $('#output-lbl').text('Online');
    });

    $(document).on('unregistered', function (ev) {
        $('#login-btn,#server-address, #name, #exten, #password').removeAttr('disabled');
        $('#logout-btn,#call-to,#call-btn').attr('disabled', 'disabled');
        $('#call-btn,#call-to').attr('disabled', 'disabled');
        console.log("Not registered");
        $('#output-lbl').attr('class', 'class="label label-danger');
        $('#output-lbl').text('Offline');
    });

    $(document).on('calling', function (ev) {
        $('#hangup-btn').show();
        $('call-audio-btn','#call-to').attr('disabled', 'disabled');
        $('#output-lbl').attr('class', 'label label-warning');
        $('#output-lbl').text('Dialling'  + '........');//webrtcPhone.getCounterpartNum()
//        $('#hangup-btn').text("Hang up");
    });

    $(document).on('incomingcall', function (ev, from) {
        $('#hangup-btn,#answer-btn').show();
        $('#call-btn,#call-to').attr('disabled', 'disabled');        
        $('#output-lbl').text('incoming call from ' + from + "......");
        $('#output-lbl').attr('class', 'label label-warning');
    });

    $(document).on('callaccepted', function (ev) {
        $('#hold-btn').show();
        $('#hangup-btn').show();
        $('#call-btn,#call-to').attr('disabled', 'disabled');
        $('#answer-btn').hide();                
        $('#output-lbl').text('On the line /  ' + webrtcPhone.getCounterpartNum() );
        $('#output-lbl').attr('class', 'label label-warning');        
    });

    $(document).on('hangup', function (ev) {
        
        $('#hangup-btn').attr('disabled');
        $('#hangup-btn,#answer-btn,#hold-btn,#unhold-btn').hide();
        $('#call-btn,#call-to').removeAttr('disabled');
        $('#output-lbl').attr('class', 'label label-success');
        $('#output-lbl').text('Online');
    });
    
    $(document).on('holding', function (ev) {
        console.log('It is holding my Friend');
        $('#answer-btn,#hold-btn').hide();
        $('#call-btn,#call-to,#unhold-btn').removeAttr('disabled');
        $('#unhold-btn').show();
        $('#output-lbl').text('On Hold /' + webrtcPhone.getCounterpartNum());
    });
    
    $(document).on('unhold', function() {
        console.log('Unholded Successfully');
        $('#unhold-btn').hide();
        $('#hold-btn').show();
        $('#hangup-btn').show();
        $('#call-btn,#call-to').attr('disabled', 'disabled');
        $('#answer-btn').hide();
        $('#output-lbl').text('On the line /' + webrtcPhone.getCounterpartNum());
    });
    
    $('#hangup-btn').click(function () {
        webrtcPhone.hangup();
    });

    $('#answer-btn').click(function () {
        webrtcPhone.answer();
    });
    
    $('#hold-btn').click(function() {
       webrtcPhone.hold();
    });

    $('#unhold-btn').click(function () {
        console.log('This should resume the call');
        webrtcPhone.unhold();
    });
    
    $('#call-audio-btn').click(function () {
        var to = $('#call-to').val();
        webrtcPhone.call(to, false);
    });
    $(".pll").hide();
});
