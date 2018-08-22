let typingTimer;
const doneTypingInterval = 200;
const usersListSize = 5;

$(function() {
  $('#iSearchTwitterMatchesInput').keyup(searchTwitterMatchesInputKeyUp);
  $('#iSearchTwitterMatchesInput').keydown(searchTwitterMatchesInputKeyDown);
});

searchTwitterMatchesInputKeyUp = async() => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(searchTwitterMatches, doneTypingInterval);
}

searchTwitterMatchesInputKeyDown = async() => {
  clearTimeout(typingTimer);
}

searchTwitterMatches = async(text, count) => {
  if($('#iSearchTwitterMatchesInput').val().trim().length == 0)
    return $('#iSearchTwitterMatchesList').html('');
  const users = await $.ajax({
    method: 'GET',
    data: {
      'text': $('#iSearchTwitterMatchesInput').val().trim(),
      'count': usersListSize
    },
    url: 'http://localhost:3000/login/match-users',
    dataType: 'html'
  });
  $('#iSearchTwitterMatchesList').html(users);
}