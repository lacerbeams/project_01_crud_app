console.log('hello from main.js')
var $add = $('#add');
var $submit = $('.submit');

function renderTable(evt) {
  $('input').val('');
  $.get('/data', function(items) {
      var chunkOfHtml = $("#projects-template").html();
      var template = Handlebars.compile(chunkOfHtml);
      var html = template({items: items});
      $('.details').append(html);
      $('.delete').click(function(evt){
        // get the id from the button that we clicked on
        var button = $(this);
        var id = button.attr('id');
        var tr = button.closest('tr');
        // do an AJAX post to '/projects/[id]/delete'
        $.post('/projects/' + id + '/delete', function(res) {
          // remove whole row
          tr.remove();
        });
      });
      $('.update').click(function(evt) {
        var button = $(this);
        var id = button.attr('id');
        console.log(id);
      });
  });
}

$submit.click(function(evt) {
  $.post('/insert', $('#form').serialize());
  renderTable();
});

$(document).ready(renderTable);

