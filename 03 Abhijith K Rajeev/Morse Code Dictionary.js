// Morse Code Dictionary
const cs03MorseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
};

// Reverse the cs03MorseCode dictionary to get a lookup for Morse code to letters and numbers
const cs03ReverseMorseCode = {};
for (const key in cs03MorseCode) {
  if (cs03MorseCode.hasOwnProperty(key)) {
    const value = cs03MorseCode[key];
    cs03ReverseMorseCode[value] = key;
  }
}

const cs03InputField = document.getElementById("cs03-input");
const cs03TranslateButton = document.getElementById("cs03-translate");
const cs03OutputField = document.getElementById("cs03-output");

cs03TranslateButton.addEventListener("click", () => {
  const cs03InputText = cs03InputField.value.trim().toUpperCase();
  if (cs03InputText === "") {
    cs03OutputField.textContent = "No Input Provided";
    return;
  }

  if (cs03InputText.includes(".")) {
    // Input contains dots, assuming it's Morse code and translating to text
    const cs03MorseWords = cs03InputText.split("/");
    const cs03TranslatedWords = cs03MorseWords.map((cs03MorseWord) => {
      const cs03MorseChars = cs03MorseWord.split(" ");
      return cs03MorseChars
        .map((cs03MorseChar) => {
          return cs03ReverseMorseCode[cs03MorseChar] || cs03MorseChar;
        })
        .join("");
    });
    cs03OutputField.textContent = cs03TranslatedWords.join(" ");
  } else {
    // Input is text, translating to Morse Code
    const cs03Words = cs03InputText.split(" ");
    const cs03TranslatedWords = cs03Words.map((cs03Word) => {
      const cs03Chars = cs03Word.split("");
      const cs03MorseChars = cs03Chars.map((cs03Char) => {
        return cs03MorseCode[cs03Char] || cs03Char;
      });
      return cs03MorseChars.join(" ");
    });
    cs03OutputField.textContent = cs03TranslatedWords.join("/");
  }
});
