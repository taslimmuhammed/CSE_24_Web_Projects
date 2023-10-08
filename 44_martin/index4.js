/* JavaScript */
const cs044btn = document.getElementById("cs044btn");
let cs044result = document.getElementById("cs044result");

cs044btn.addEventListener("click", () => {
    // Get user input from the input field
    const cs044word1 = document.getElementById("cs044word1Input").value.toLowerCase();
    const cs044word2 = document.getElementById("cs044word2Input").value.toLowerCase();

    // Remove spaces and punctuation from both words
    const cs044cleanedWord1 = cs044word1.replace(/[^\w]/g, "");
    const cs044cleanedWord2 = cs044word2.replace(/[^\w]/g, "");

    // Check if the lengths are the same
    if (cs044cleanedWord1.length !== cs044cleanedWord2.length) {
        cs044result.textContent = "Not an anagram";
        cs044result.classList.remove("success");
        cs044result.classList.add("error");
        return;
    }

    // Count letter occurrences in the first word
    const cs044letterCount1 = {};
    for (const char of cs044cleanedWord1) {
        cs044letterCount1[char] = (cs044letterCount1[char] || 0) + 1;
    }

    // Count letter occurrences in the second word
    const cs044letterCount2 = {};
    for (const char of cs044cleanedWord2) {
        cs044letterCount2[char] = (cs044letterCount2[char] || 0) + 1;
    }

    // Compare letter counts
    for (const char in cs044letterCount1) {
        if (cs044letterCount1[char] !== cs044letterCount2[char]) {
            cs044result.textContent = "Not an anagram";
            cs044result.classList.remove("success");
            cs044result.classList.add("error");
            return;
        }
    }

    // If all letter counts are the same, it's an anagram
    cs044result.textContent = "It's an anagram!";
    cs044result.classList.remove("error");
    cs044result.classList.add("success");
});
