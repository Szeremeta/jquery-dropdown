/*
 * jQuery dropdown: A simple dropdown plugin
 *
 * Inspired by Bootstrap: http://twitter.github.com/bootstrap/javascript.html#dropdowns
 *
 * Copyright 2011 Cory LaViska for A Beautiful Site, LLC. (http://abeautifulsite.net/)
 *
 * Dual licensed under the MIT or GPL Version 2 licenses
 *
*/
if(jQuery) (function($) {
  
  $.extend($.fn, {
    dropdown2: function(method, data) {
      
      switch( method ) {
        case 'hide':
          hideDropdowns();
          return $(this);
        case 'attach':
          return $(this).attr('data-dropdown2', data);
        case 'detach':
          hideDropdowns();
          return $(this).removeAttr('data-dropdown2');
        case 'disable':
          return $(this).addClass('dropdown-disabled');
        case 'enable':
          hideDropdowns();
          return $(this).removeClass('dropdown-disabled');
      }
      
    }
  });
  
  function showMenu(event) {
    
    var trigger = $(this),
      dropdown = $( $(this).attr('data-dropdown2') ),
      isOpen = trigger.hasClass('dropdown-open');
    
    event.preventDefault();
    event.stopPropagation();
    
    hideDropdowns();
    
    if( isOpen || trigger.hasClass('dropdown-disabled') ) return;
    
    dropdown
      .css({
        left: dropdown.hasClass('anchor-right') ? 
          trigger.offset().left - (dropdown.outerWidth() - trigger.outerWidth()) : trigger.offset().left,
        top: trigger.offset().top + trigger.outerHeight()
      })
      .show();
    
    trigger.addClass('dropdown-open');
    
  };
  
  function hideDropdowns(event) {
    
    var targetGroup = event ? $(event.target).parents().andSelf() : null;
    if( targetGroup && targetGroup.is('.dropdown-menu') && !targetGroup.is('A') ) return;
    
    $('BODY')
      .find('.dropdown-menu').hide().end()
      .find('[data-dropdown2]').removeClass('dropdown-open');
  };
  
  $(function () {
    $('BODY').on('click.dropdown', '[data-dropdown2]', showMenu);
    $('HTML').on('click.dropdown', hideDropdowns)
  });
  
})(jQuery);