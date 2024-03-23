$(document).ready(function() {
  $('#addTaskBtn').click(function() {
      var taskText = $('#taskInput').val().trim();
      if (taskText !== '') {
          var taskItem = $('<li>').addClass('task').text(taskText);
          var editButton = $('<button>').addClass('edit-btn').text('Edit');
          var deleteButton = $('<button>').addClass('delete-btn').text('Delete');
          taskItem.append(editButton, deleteButton);
          $('#taskList').append(taskItem);
          $('#taskInput').val('');
      }
  });

  $(document).on('click', '.edit-btn', function() {
      var taskItem = $(this).parent();
      var newText = prompt('Edit task:', taskItem.text().trim());
      if (newText !== null) {
          taskItem.text(newText.trim());
      }
  });

  $(document).on('click', '.delete-btn', function() {
      $(this).parent().remove();
  });

  $(document).on('click', '.task', function() {
      $(this).toggleClass('completed');
  });
});
