const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    getwordInfo(form.elements[0].value);
});
const getwordInfo = async (word) => {
    try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0] 
    resultDiv.innerHTML =`
        <h1><strong>Word:</strong> ${data[0].word}</h1>;
        <p class="partOfSpeech">${data[0].meanings[0].partofspeech}</p>;
        <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not found" : definitions.definition}</p>
        <p><strong>Example:</strong>${definitions.example === undefined ? "Not found" : definitions.example}</p>
        <p><strong>Antonyms:</strong></p>
        `;

        //fectching Antonyms
        if(definitions.antonyms.length === 0 ){
            resultDiv.innerHTML += `<span>Not Found </span>`;
        }
        else{
            for(let i = 0; i<definitions.antonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
 
            }
        }
        
        //Adding Read More Button
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
         }
    catch (error) {
        resultDiv.innerHTML = `<p> Sorry, the word could not be found </p>`;
    }
    console.log(data);
}
