console.log('hello from main.js')
var $add = $('#add');
var $submit = $('.submit');

// adds new data from db to table
function renderRow() {
    $.get('/data', function(data) {
      console.log(data);
      for (i=data.length-1; i<data.length; i++){
        $('.details').append('<tr>' + '<td>' + data[i].project + '</td>' + '<td>' + data[i].deadline + '</td>' + '<td>' + data[i].materials + '</td>' + '<td>' + data[i].notes + '</td>' + '<td><button class="edit">Edit</button><br><button class="delete">Delete</button></td></tr>');
      };
    });
  };

// adds data to db
$submit.click(function(evt) {
  $.post('/insert', $('#form').serialize());
  renderRow();
});

// on page load, it will load existing data to table
$(document).ready(function() {
  $.get('/data', function(data) {
      console.log(data);
      if (data.length === 0) {
        console.log('array empty')
      } else {
        for (i=0; i<data.length; i++){
          $('.details').append('<tr>' + '<td>' + data[i].project + '</td>' + '<td>' + data[i].deadline + '</td>' + '<td>' + data[i].materials + '</td>' + '<td>' + data[i].notes + '</td>' + '<td><button class="edit">Edit</button><br><button class="delete">Delete</button></td></tr>');
        };
      }
    });
});
