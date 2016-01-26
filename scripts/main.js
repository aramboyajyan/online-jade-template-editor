(function() {
  $(function() {

    // Necessary vars.
    var isFixed, jade2html, navTop, update;
    var input  = $('#input');
    var output = $('#output');
    var textareas = $('textarea');

    // Function for compiling the Jade markup.
    jade2html = function(input, data) {
      return jade.compile(input, {
        pretty: true,
        doctype: '5'
      })(data);
    };

    // Function for updating the output.
    update = function($jade) {
      console.log('Updating');
      var data, html;
      textareas.removeClass('error');
      try {
        html = jade2html(input.val(), data);
      }
      catch (error) {
        input.addClass('error');
        output.val('[jade] ' + error.message).addClass('error');
        return;
      }
      return output.val(html.trim());
    };

    // Whenever something is entered in the source textarea, update the output
    // automatically.
    input.on('keyup', function() {
      return update($(this));
    });

    // Override the tabs in editor textareas.
    $.fn.tabOverride.autoIndent = true;
    $.fn.tabOverride.tabSize(2);
    $('textarea').tabOverride();

    // Remove the info box.
    $('#info-close').click(function() {
      $('#info').remove();
    });

  });
}).call(this);
