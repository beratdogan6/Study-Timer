$(document).ready(function () {
    var timerInterval;
    var studyTime = parseInt($('#study-time').val()) * 60 || 25 * 60;
    var breakTime = parseInt($('#break-time').val()) * 60 || 5 * 60;
    var todoList = ['Study', 'Break'];
    var currentTodoIndex = 0;

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
        $('#start').prop('disabled', true);
        $('#stop').prop('disabled', false);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        $('#start').prop('disabled', false);
        $('#stop').prop('disabled', true);
    }

    function resetTimer() {
        stopTimer();
        studyTime = parseInt($('#study-time').val()) * 60 || 25 * 60;
        breakTime = parseInt($('#break-time').val()) * 60 || 5 * 60;
        currentTodoIndex = 0;
        updateTimerDisplay();
    }

    function updateTimer() {
        if (studyTime > 0 || breakTime > 0) {
            if (studyTime > 0) {
                studyTime--;
                if (studyTime === 0) {
                    nextTodo();
                }
            } else if (breakTime > 0) {
                breakTime--;
                if (breakTime === 0) {
                    nextTodo();
                }
            }
        }

        updateTimerDisplay();
    }

    function nextTodo() {
        currentTodoIndex++;
        if (currentTodoIndex >= todoList.length) {
            currentTodoIndex = 0;
        }

        if (todoList[currentTodoIndex] === 'Study') {
            $('#currentTask').text('Study Time');
            studyTime = parseInt($('#study-time').val()) * 60;
        } else if (todoList[currentTodoIndex] === 'Break') {
            $('#currentTask').text('Break Time');
            breakTime = parseInt($('#break-time').val()) * 60;
        }
    }

    function updateTimerDisplay() {
        var minutes, seconds;
        if (studyTime > 0) {
            minutes = Math.floor(studyTime / 60);
            seconds = studyTime % 60;
        } else if (breakTime > 0) {
            minutes = Math.floor(breakTime / 60);
            seconds = breakTime % 60;
        }

        var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        $('#timer').text(formattedMinutes + ":" + formattedSeconds);
    }

    $('#start').click(startTimer);
    $('#stop').click(stopTimer);
    $('#reset').click(resetTimer);

    $('#saveBtn').click(() => {
        $('.settings-container').css('display', 'none');
        $('.timer-container').css('display', 'flex');
        resetTimer();
    });

    $('#cancelBtn').click(() => {
        $('.settings-container').css('display', 'none');
        $('.timer-container').css('display', 'flex');
    });

    $('#settingsBtn').click(() => {
        $('.settings-container').css('display', 'flex');
        $('.timer-container').css('display', 'none');
    });

    updateTimerDisplay();
});