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
         // $(projectRow.children()).eq(0).html(`<input type="text" style="width:75%" class="project-input">`)
         // $(projectRow.children()).eq(1).html(`<input type="text" style="width:75%" class="deadline-input">`)
         // $(projectRow.children()).eq(2).html(`<input type="text" style="width:75%" class="materials-input">`)
         // $(projectRow.children()).eq(3).html(`<input type="text" style="width:75%" class="notes-input">`)
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
          event.preventDefault()
          // updateProject = $('.project-input').val();
          // updateDeadline = $('.deadline-input').val();
          // updateMaterials = $('.materials-input').val();
          // updateNotes = $('.notes-input').val();
          var updateProject = projectInput.text();
          var updateDeadline = deadlineInput.text();
          var updateMaterials = materialsInput.text();
          var updateNotes = notesInput.text();
          // var updateData = `project=${updateProject}&deadline=${updateDeadline}&materials=${updateMaterials}&notes=${updateNotes}`
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

