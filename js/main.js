var mainModule = (function() {

    var shellLines = document.getElementsByClassName("shell-line");
    var commandTextSpans = document.getElementsByClassName("command-text");
    var currentCommandIndex = 0;
    var wordTypingInProcess = false;
    var shellIntervalID;
    var shellCommandsList = [
        "usrinfo",
        "usrskills",
        "usrexp",
        "usredu",
        "usrlinks",
        "usrcontacts"
    ];

    var removeCursor = function(commandNumber) {
        var cursor = shellLines[commandNumber].getElementsByClassName("typed-cursor")[0];
        cursor.parentNode.removeChild(cursor);
    };

    var typeShellCommand = function(shellCommandsList, commandIndex) {
        wordTypingInProcess = true;
        Typed.new('#' + shellCommandsList[commandIndex], {
            strings: [shellCommandsList[commandIndex]],
            typeSpeed: 50,
            startDelay: 2000,
            callback: function() {
                removeCursor(currentCommandIndex);
                currentCommandIndex++;
                wordTypingInProcess = false;

                if (currentCommandIndex === shellCommandsList.length) {
                    clearInterval(shellIntervalID);
                }
            }
        });
    };

    var startShellCircle = function() {
        if (!wordTypingInProcess) {
            typeShellCommand(shellCommandsList, currentCommandIndex);
        }
    };

    return {
        startShell: function() {
            shellIntervalID = setInterval(startShellCircle.bind(this), 100);
        }
    }

}());

mainModule.startShell();