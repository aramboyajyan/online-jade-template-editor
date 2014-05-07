(function() {

  $(function() {
    var isFixed, jade2html, navTop, update;
    jade2html = function(input, data) {
      return jade.compile(input, {
        pretty: true,
        doctype: '5'
      })(data);
    };
    update = function($jade) {
      var $data, $html, data, html, input, json;
      $data = $jade.siblings('.json');
      json = $data.val() || '{}';
      $html = $jade.closest('.row').find('textarea.html');
      $jade.closest('.row').find('textarea').removeClass('error');
      try {
        data = JSON.parse(json);
      } catch (error) {
        $data.addClass('error');
        $html.val('[json] ' + error.message).addClass('error');
        return;
      }
      input = $jade.val();
      try {
        html = jade2html(input, data);
      } catch (error) {
        $jade.addClass('error');
        $html.val('[jade] ' + error.message).addClass('error');
        return;
      }
      html = html.trim();
      return $html.val(html);
    };
    $('textarea.jade').each(function() {
      return update($(this).on('keyup', function() {
        return update($(this));
      }));
    });
    $.fn.tabOverride.autoIndent = true;
    $.fn.tabOverride.tabSize(2);
    $('textarea').tabOverride();
  });

}).call(this);
