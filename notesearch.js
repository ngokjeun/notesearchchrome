// ==UserScript==
// @name         Note Search Tool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Search and display notes based on highlighted text
// @author       Ngok
// @match        insert your own url here
// @grant        none
// ==/UserScript==

function showSearchResult(msg) {
    let resultDiv = document.createElement('div');
    resultDiv.innerHTML = msg;
    resultDiv.style.position = 'fixed';
    resultDiv.style.bottom = '10%';
    resultDiv.style.left = '10%';
    resultDiv.style.background = 'rgba(0,0,0,0.7)';
    resultDiv.style.color = 'white';
    resultDiv.style.padding = '10px';
    resultDiv.style.borderRadius = '5px';
    resultDiv.style.maxWidth = '80%';
    resultDiv.style.zIndex = '9999'; // Ensures it appears above other content

    document.body.appendChild(resultDiv);

    setTimeout(() => {
        document.body.removeChild(resultDiv);
    }, 8000); // Result disappears after 5 seconds
}

(function() {
    'use strict';
    
    const notesDatabase =  // insert your own notes database here

    function getHighlightedText() {
        let text = "";
        if (typeof window.getSelection !== "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection !== "undefined" && document.selection.type === "Text") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function processText(inputText) {
        return inputText.replace(/\W+/g, '').toLowerCase(); // Removing non-word characters and converting to lowercase
    }

    function searchNotesDB(text) {
        const processedText = processText(text);
        for (let week in notesDatabase) {
            for (let note of notesDatabase[week]) {
                if (processText(note.Text).includes(processedText)) {
                    return note;
                }
            }
        }
        return null;
    }

    document.addEventListener('mouseup', function() {
        const selectedText = getHighlightedText();
        if (selectedText) {
            const noteResult = searchNotesDB(selectedText);
            if (noteResult) {
                showSearchResult(JSON.stringify(noteResult, null, 2));
            }
        }
    });
})();
