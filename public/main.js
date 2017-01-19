console.log('hello from main.js')
var $add = $('#add');
var $submit = $('.submit');

$add.click(function(evt) {
  window.location.href = '/add.html';
});

$submit.click(function(evt) {
  console.log('clicked');
  $.post('/add', $('#form').serialize(), function(data) {
    $('.details').append('<tr>' + '<td>' + data.project + '</td>' + '<td>' + data.deadline + '</td>' + '<td>' + data.materials + '</td>' + '<td>' + data.notes + '</td>' + '<td><button class="edit">Edit</button><br><button class="delete">Delete</button></td></tr>');
  })
});
