$(window).load(function(){

    function toggleFlyout(state) {

        function flyoutEvents(){
            $('body').toggleClass('flyout-active');
            $('#flyout-trigger').toggleClass('active');
            $('#site-overlay').toggleClass('visible');
        }

        if($('body').hasClass('flyout-active')) {  // is the flyout nav currently toggled?
            // yes we are
            if(state != 1) {
                flyoutEvents();
            }
        } else {
            // no, we are not
            if(state != 0) {
                flyoutEvents();
            }
        }

    } // end toggleFlyout()

    // toggle the flyout nav
    $('#flyout-trigger').click(function() {
      toggleFlyout();
    });

    $('#flyout a, .site-overlay').click(function() {
      toggleFlyout(0);
    });

}); // end window.load
