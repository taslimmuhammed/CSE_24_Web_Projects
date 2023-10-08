function convertToUppercase(event) {
    event.preventDefault()
    var textArea1 = document.getElementById("textArea1");
    var textArea2 = document.getElementById("textArea2");
    var inputValue = textArea1.value;
    var capitalizedValue = inputValue.toUpperCase();
    textArea2.value = capitalizedValue;
}

function convertToLowercase(event) {
    event.preventDefault()
    var textArea1 = document.getElementById("textArea1");
    var textArea2 = document.getElementById("textArea2");
    var inputValue = textArea1.value;
    var capitalizedValue = inputValue.toLowerCase();
    textArea2.value = capitalizedValue;
}

function convertToFormal(event){
    event.preventDefault()
    var inputElement = document.getElementById("textArea1");
    var outputElement = document.getElementById("textArea2");
    var inputValue = inputElement.value;
    var sentences = inputValue.replace(/\n/g, ' ');
    var sentences = sentences.split('.');
        for (var i = 0; i < sentences.length; i++) {
            sentences[i] = sentences[i].trim();
            if (sentences[i].length > 0) {
                sentences[i] = sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
                }
            }
            var formalText = sentences.join('. ');
            outputElement.value = formalText;
}

function convertToFirstCap(event){
    event.preventDefault()
    var inputElement = document.getElementById("textArea1");
    var outputElement = document.getElementById("textArea2");
    var inputValue = inputElement.value;
    var words = inputValue.split(' ');


    for (var i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
    }

    var capitalizedText = words.join(' ');
    outputElement.value = capitalizedText;
}

function RemoveLineBreak(event) {
    event.preventDefault()
    var textArea1 = document.getElementById("textArea1");
    var textArea2 = document.getElementById("textArea2");
    var inputValue = textArea1.value;
    var capitalizedValue = inputValue.replace(/\n/g, ' ');
    textArea2.value = capitalizedValue;
}

function RemoveWhiteSpace(event) {
    event.preventDefault()
    var textArea1 = document.getElementById("textArea1");
    var textArea2 = document.getElementById("textArea2");
    var inputValue = textArea1.value;
    var capitalizedValue = inputValue.replace(/\s+/g, ' ').trim();
    textArea2.value = capitalizedValue;
}

function RandomCase(event) {
    event.preventDefault()
    var textArea1 = document.getElementById("textArea1");
    var textArea2 = document.getElementById("textArea2");
    var inputValue = textArea1.value;
    function randomizeCharCase(char) {
        return Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
    }
    var randomizedText = inputValue.split('').map(randomizeCharCase).join('');
    textArea2.value = randomizedText;
}