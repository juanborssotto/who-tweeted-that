alredyAnswered = false;

sendAnswer = async(domElement, answer) => {
  if(alredyAnswered)
    return;
  alredyAnswered = true;
  const result = await $.ajax({
    method: 'POST',
    data: {
      answer
    },
    url: 'http://localhost:3000/game/answer',
    dataType: 'json'
  });
  renderResult(domElement, result);
  addNextQuestionButton();
}

renderResult = (domElement, result) => {
  if(result.result == 1) {
    $(domElement).addClass('correctAnswerAnimation');
  }
  else {
    $(domElement).addClass('incorrectAnswerAnimation');
    setTimeout(function(){
        $('[userId=' + result.correctAnswer + ']').addClass('correctAnswerAnimation');
    }, 1500);
  }
}

addNextQuestionButton = () => {
  $('#btnWrapper').append($('<button>', 
    {id: 'nextQuestionBtn', 
     class: 'btn',
     onclick: 'getNewQuestion()',
     text: 'Next'}
  ));
}

getNewQuestion = async () => {
  $('#nextQuestionBtn').remove();
  const newQuestionHtml = await $.ajax({
    method: 'GET',
    url: location.href,
    data: {'nextQuestion': true},
    dataType: 'html'
  });
  $('#friendsContainer').empty();
  $('#friendsContainer').html(newQuestionHtml);
  alredyAnswered = false;
}