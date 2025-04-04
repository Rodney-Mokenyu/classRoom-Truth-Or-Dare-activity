

// EVENT LISTENERS FOR THE BUTTONS //
const truth_button = document.getElementById('truth-button');
const clear_button = document.getElementById('clear-Button');
const dare_button = document.getElementById('dare-Button');
const display_section = document.getElementById('section1');
const question = document.getElementById('question');
const questionImage = document.getElementById('question-image');

// Function to handle image display
function displayImages(questionData, imageElement) {
  if (questionData.image) {
      if (Array.isArray(questionData.image)) {
          let imageHTML = "";
          questionData.image.forEach(image => {
              imageHTML += `<img src="${image}" alt="Question Image" style="max-width: 150px; margin: 5px;" onerror="this.onerror=null; this.src='placeholder.png';">`;
          });
          document.getElementById('question').innerHTML += imageHTML;
          imageElement.src = ""; // Clear the single image element
          imageElement.style.display = 'none'; //hide single image element
      } else {
          imageElement.src = questionData.image;
          imageElement.style.display = 'block';
          document.getElementById('question').innerHTML = document.getElementById('question').textContent; //remove multiple images if there were any
      }
  } else {
      imageElement.src = "";
      imageElement.style.display = 'none';
      document.getElementById('question').innerHTML = document.getElementById('question').textContent; //remove multiple images if there were any
  }
}

// REMOVE THE CLEAR BUTTON
clear_button.remove();


// Get the json data //
fetch('T or D.json')
  .then(response => response.json())
  .then(data => {
      const truths = data.filter(item => item.category === "Truth");
      const dares = data.filter(item => item.category === "Dare");

      // Clear button
      clear_button.addEventListener('click', () => {
          clear_button.style.backgroundColor = 'red';
          // Clear the question text
          if (question) {
              question.textContent = "";
          }
          // Clear the image
          if (questionImage) {
              questionImage.src = "";
              questionImage.style.display = 'none';
          }
      });

      // Truth button
      truth_button.addEventListener('click', () => {
          
          const index = Math.floor(Math.random() * truths.length); // Random index to access the truth array
          let truthText = truths[index];

          // Set the question text
          question.textContent = truthText.text;

          // Handling the image(s)
          displayImages(truthText, questionImage);
      });

      // Dare button
      dare_button.addEventListener('click', () => {
         
          const index = Math.floor(Math.random() * dares.length); // Random index to access the dares array
          let dareText = dares[index];

          // Set the dare text
          question.textContent = dareText.text;

          // Handling the image(s)
          displayImages(dareText, questionImage);
      });
  })
  .catch(error => {
      console.error('Error fetching JSON:', error);
  });