// dwFilter
(function( $ ){

    // Public methods
    var api = {
      init : function(options) {
        console.log("dwFilter init... ");
        var $el = $(this);
        // deploy component structure
        methods.deployComponent($el, options);
        // init events
        events.start($el, options);
      },
      destroy: function(){
        var $el = $(this);
        $el.empty();
        $el.removeClass('dw-filter');
      },
      val: function(){
        var $el = $(this);
        var result = [];
        var $options = $('.dw-options');
        var type = $el.data('type');
        // builds each modified object
        switch(type) {
          case 'checkbox':
            $.each($options.find('.dw-option') , function(i, opt){
              var $opt = $(opt);
              if( $opt.is(':checked') ){
                // arm
                result.push($opt.data('value'));
              }
            });
            return result
            break;
        }
      }
    };

    // Private methods
    var methods = {
      deployComponent: function($el, options){
        // convert the div into a dw-filter component
        $el.addClass('dw-filter');
        // get filter template
        methods.setTemplate($el, options);
        // inject options according to filter type
        methods.setOptionTemplate($el, options);
      },
      setTemplate : function($el, options){
        $el.html('<header><div class="left">' + options.title + '</div><div class="right"><i class="toggle-icon">-</i></div></header><content><div class="search"></div><div class="dw-options"></div></content>');
      },
      setOptionTemplate: function($el, options){
        switch(options.type) {
          case 'checkbox':
            methods.setCheckboxTemplate($el, options);
            break;
        }
      },
      setCheckboxTemplate: function($el, options){
        var key = options.config['key_attr'];
        var value = options.config['value_attr'];
        $el.data({
          type: options.type
        });
        $.each(options.data, function(i, data){
          $el.find('.dw-options').append('<input type="checkbox" name="' + data[value] + '" data-value="' + data[key] + '" id="' + data[value] + '" class="dw-option"><label for="' + data[value] + '">' + data[value] + '</label> <br>');
        });
      }
    }

    // Events
    var events = {
      start: function($el, options){
        events.toggleContent($el, options);
      },
      toggleContent: function($el, options){
        var $header = $el.find('header');
        var $content = $el.find('content');
        var $icon = $el.find('.toggle-icon');
        $header.on({
          click: function(){
            $content.slideToggle('fast', function(){
              if($icon.html() == '-'){
                $icon.html('+');
              }else{
                $icon.html('-');
              }
            });
          }
        });
      }
    }


    // jquery component stuff
    $.fn.dwFilter = function(methodOrOptions) {
        if ( api[methodOrOptions] ) {
            return api[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return api.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.dwFilter' );
        }
    };

})( jQuery );
