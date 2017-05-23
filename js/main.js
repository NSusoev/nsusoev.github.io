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

    var makeContentBlockIdByCommandNumber = function(commandNumber) {
        return shellCommandsList[commandNumber] + "_content";
    };

    var makeContentBlockVisible = function(commandNumber) {
        var block = document.getElementById(makeContentBlockIdByCommandNumber(commandNumber));
        block.className = block.className.split(" ")[0];
    };

    var makeShellLineVisible = function(commandNumber) {
        var line = shellLines[commandNumber];
        var classes = line.className.split(" ");
        line.className = classes[0] + " " + classes[1];
    };

    var typeShellCommand = function(shellCommandsList, commandIndex) {
        wordTypingInProcess = true;
        Typed.new('#' + shellCommandsList[commandIndex], {
            strings: [shellCommandsList[commandIndex]],
            typeSpeed: 50,
            startDelay: 2000,
            callback: function() {
                removeCursor(currentCommandIndex);
                makeContentBlockVisible(currentCommandIndex);
                currentCommandIndex++;
                wordTypingInProcess = false;
                makeShellLineVisible(currentCommandIndex);

                if (currentCommandIndex === shellCommandsList.length) {
                    clearInterval(shellIntervalID);
                    Typed.new('#end', {
                        strings: [""],
                        typeSpeed: 50
                    });
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