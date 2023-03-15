const summaryItemElements = document.querySelectorAll('.summary-item');
const averageScoreElement = document.querySelector('.results__score span');

// Get the json data from the file, calling the function to apply it to html when fetched
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => matchSummaryData(json));

// Calculate the average score from the passed list of scores
const getAverageScore = (scores) => {
    const sum = scores.reduce((prev, curr) => prev + curr, 0);
    return Math.floor(sum / scores.length);
}

// Loops through the json data and matches the score to the relevent field in the html
// applies the score and then calculates the average
const matchSummaryData = (json) => {
    // Loop through objects in the parsed json data and for each, match the relevent summary-item
    // and update the text content to reflect the value form the json data.
    json.forEach(object => Array.from(summaryItemElements)
            .find(summaryItem => summaryItem.querySelector('.summary-item__title').textContent === object.category)
            .querySelector('.summary-item__score span').textContent = object.score
    );
    // Calculate the averate score and set the text content of the averge score element
    averageScoreElement.textContent = getAverageScore(json.map(object => object.score))
}