console.log('hello from main.js');
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
        console.log('clicked')
         var button = $(evt.target);
         var id = button.attr('id');
         console.log(id);
         var projectRow = button.parent().closest('#' + id);
         console.log(projectRow)
         var projectInput = $(projectRow.children()).eq(0);
         var deadlineInput = $(projectRow.children()).eq(1);
         var materialsInput = $(projectRow.children()).eq(2);
         var notesInput = $(projectRow.children()).eq(3);
         projectInput.attr('contenteditable', 'true').css('background', 'white');
         deadlineInput.attr('contenteditable', 'true').css('background', 'white');
         materialsInput.attr('contenteditable', 'true').css('background', 'white');
         notesInput.attr('contenteditable', 'true').css('background', 'white');
         button.text('Submit');
         button.click(function(event) {
          var updateProject = projectInput.text();
          var updateDeadline = deadlineInput.text();
          var updateMaterials = materialsInput.text();
          var updateNotes = notesInput.text();
          updateData = {
            project:updateProject,
            deadline:updateDeadline,
            materials:updateMaterials,
            notes:updateNotes
          }
          console.log(updateData)
         $.post(`/projects/${id}/update`, updateData);
         location.reload();
         });
       });
   });
}


$submit.click(function(evt) {
  console.log($('#form').serialize())
  $.post('/insert', $('#form').serialize());
  location.reload();
});


$(document).ready(renderTable);

