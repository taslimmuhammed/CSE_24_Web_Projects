//DOM elements
const DOMStrings = {
    rules: '.cs61-rules',
    ruleBox: '.cs61-rules-overlay',
    closeBtn: '.cs61-cross-btn',
};

//fade rules box
document.querySelector(DOMStrings.rules).addEventListener('click', () => {
    document.querySelector(DOMStrings.ruleBox).classList.add('active');
});

//close rules box
document.querySelector(DOMStrings.closeBtn).addEventListener('click', () => {
    document.querySelector(DOMStrings.ruleBox).classList.remove('active');
});
