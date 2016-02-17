// dwFilter
(function( $ ){

    // Public methods
    var api = {
      init : function(options) {
        var $el = $(this);
        // deploy component structure
        methods.deployComponent($el, options);
      },
      destroy: function(){
        var $el = $(this);
        $el.empty();
        $el.removeClass('dw-filter');
      },
      val: function(){
        var $el = $(this);
        var type = $el.data('type');

        // builds each modified object
        switch(type) {
          case 'checkbox':
            return methods.valCheckbox($el);
            break;
          case 'selectChain':
            return methods.valSelectChain($el);
            break;
          case undefined:
            return 'No type defined in this $el data'
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
        methods.getTemplate($el, options);
      },
      getTemplate: function($el, options){
        $.get("./component/templates/dw-filter.html", function( result ) {
          templateContent = result;
          methods.setTemplate($el, templateContent, options);
        });
      },
      setTemplate : function($el, templateContent, options){
        if (typeof options !== 'undefined') {
          if (typeof options.title === 'undefined') {
            var titleVal = '';
          }else{
            var titleVal = options.title;
          }
          var template = _.template(templateContent);
          $el.html( template({titleVal: titleVal}) );
        }else{
          var template = _.template(templateContent);
          $el.html( template({titleVal: ''}) );
          $el.find('content').css('display','none');
        }

        if (typeof options !== 'undefined') {
          // inject options according to filter type
          methods.setOptionTemplate($el, options);
          // show search input
          methods.showSearch($el, options);
          // init events
          events.start($el, options);
        }

      },
      setOptionTemplate: function($el, options){
        switch(options.type) {
          case 'checkbox':
            methods.checkboxTemplate($el, options);
            break;
          case 'selectChain':
            methods.selectChainTemplate($el, options);
            break;
        }
      },
      checkboxTemplate: function($el, options){
        $el.data({
          type: options.type
        });
        var key = options.config['key_attr'];
        var value = options.config['value_attr'];

        $.get("./component/templates/checkbox.html", function( result ) {
          var template = _.template(result);
          $.each(options.data, function(i, data){
            var contentHtml = template({
              key: data[key],
              value: data[value]
            });
            $el.find('.dw-options').append(contentHtml);
          });
        });
      },
      selectChainTemplate: function($el, options){
        $el.data({
          type: options.type
        });
        // var key = options.config['key_attr'];
        // var value = options.config['value_attr'];

        // $.get("./component/templates/checkbox.html", function( result ) {
        //   var template = _.template(result);
        //   $.each(options.data, function(i, data){
        //     var contentHtml = template({
        //       key: data[key],
        //       value: data[value]
        //     });
        //     $el.find('.dw-options').append(contentHtml);
        //   });
        // });
        console.log("selectChain template ... ");
      },
      showSearch: function($el, options){
        var $search = $el.find('.search input');
        if( options.search == 'inner' || options.search == 'outer' ){
          $search.toggleClass('hide');
        }
      },
      valCheckbox: function($el){
        var result = {
          search: '',
          data: []
        };
        var $options = $el.find('.dw-options');
        $.each($options.find('.dw-option') , function(i, opt){
          var $opt = $(opt);
          var $optInput = $opt.find('input');
          if( $optInput.is(':checked') ){
            // arm
            result.data.push($opt.data('value'));
          }
        });
        // outerSearch
        var outerSearch = methods.getOuterSearch($el);
        if(typeof outerSearch !== 'undefined'){
          result.search = outerSearch;
        }
        return result;
      },
      valSelectChain: function($el){
        var result = {
          search: '',
          data: []
        };
        var $options = $el.find('.dw-options');
        // options


        // outerSearch
        var outerSearch = methods.getOuterSearch($el);
        if(typeof outerSearch !== 'undefined'){
          result.search = outerSearch;
        }
        return result;
      },
      innerSearch: function($el, inputData, options){
        methods.hideOptions($el, inputData, options);
      },
      outerSearch: function($el, inputData, options){
        $el.data({
          dataSearch: inputData
        });
      },
      getOuterSearch: function($el){
        var dataSearch = $el.data('dataSearch');
        return dataSearch;
      },
      hideOptions: function($el, data, options){
        $.each($el.find('.dw-option') , function(i, opt){
          var $opt = $(opt);
          var temp = $opt.data('content');
          temp = temp.toLowerCase();
          data = data.toLowerCase();
          if( temp.indexOf(data) != -1 ) {
            $opt.show();
          }else{
            $opt.hide();
          }
        });
      }
    }

    // Events
    var events = {
      start: function($el, options){
        events.toggleContent($el, options);
        events.onSearch($el, options);
      },
      toggleContent: function($el, options){
        var $header = $el.find('header');
        var $content = $el.find('content');
        var $icon = $el.find('.icon-toggle');
        $header.on({
          click: function(){
            $content.slideToggle('fast', function(){
              if( $icon.hasClass('open') ){
                $icon.toggleClass('open');
                $icon.toggleClass('close');
              }else{
                $icon.toggleClass('open');
                $icon.toggleClass('close');
              }
            });
          }
        });
      },
      onSearch: function($el, options){
        var $search = $el.find('.search input');
        $search.on({
          keyup: function(event){
            var inputData = $search.val();
            switch(options.search){
              case 'inner':
                methods.innerSearch($el, inputData, options)
                break;
              case 'outer':
                methods.outerSearch($el, inputData, options)
                break;
            }
          },
          focus: function(event){
            $search.removeClass('glass');
          },
          focusout: function(event){
            if($search.val().length > 0){
              $search.removeClass('glass');
            }else{
              $search.addClass('glass');
            }
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
