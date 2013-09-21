function initSearch() {
    'use strict';
    
    var $grid = $('#grid')
        , $filterOptions = $('.js-filter-options')
        // , $sizer = $grid.find('.js-shuffle__sizer');
        
  // Set up button clicks
  function setupFilters() {
    var $btns = $filterOptions.children();
    $btns.on('click', function() {
      var $this = $(this),
          isActive = $this.hasClass( 'active' ),
          group = isActive ? 'all' : $this.data('group');

      // Hide current label, show current label in title
      if ( !isActive ) {
        $('.js-filter-options .active').removeClass('active');
      }

      $this.toggleClass('active');

      // Filter elements
      $grid.shuffle( 'shuffle', group );
    });

    $btns = null;
  }

  function setupSorting() {
    // Sorting options
    $('.js-sort-options').on('change', function() {
      var sort = this.value,
          opts = {};

      // We're given the element wrapped in jQuery
      if ( sort === 'updated' ) {
        opts = {
          reverse: true,
          by: function($el) {
            return $el.data('updated');
          }
        };
      } else if ( sort === 'title' ) {
        opts = {
          by: function($el) {
            return $el.data('title').toLowerCase();
          }
        };
      }

      // Filter elements
      $grid.shuffle('sort', opts);
    });
  }

  function setupSearching() {
    // Advanced filtering
    $('.js-shuffle-search').on('keyup change', function() {
      var val = this.value.toLowerCase();
      $grid.shuffle('shuffle', function($el, shuffle) {

        // Only search elements in the current group
        if (shuffle.group !== 'all' && $.inArray(shuffle.group, $el.data('groups')) === -1) {
          return false;
        }

        var text = $.trim( $el.find('.name').text() ).toLowerCase();
        return text.indexOf(val) !== -1;
      });
    });
  }

    // None of these need to be executed synchronously
    setTimeout(function() {
        // setupFilters();
        setupSorting();
        setupSearching();
    }, 100);

    // You can subscribe to custom events. To receive the loading and done events,
    // you must subscribe to them before initializing the plugin, otherwise they will
    // fire before you have subscribed to them
    // shrink, shrunk, filter, filtered, sorted, load, done
    $grid.on('loading.shuffle done.shuffle shrink.shuffle shrunk.shuffle filter.shuffle filtered.shuffle sorted.shuffle layout.shuffle', function(evt, shuffle) {
      // Make sure the browser has a console
      if ( window.console && window.console.log && typeof window.console.log === 'function' ) {
        console.log( 'Shuffle:', evt.type );
      }
    });

    // instantiate the plugin
    $grid.shuffle({
      itemSelector: '.task-card',
      // sizer: $sizer
    });

    // Destroy it! o_O
    // $grid.shuffle('destroy');
}

$(document).ready(function() {
  initSearch();
});
