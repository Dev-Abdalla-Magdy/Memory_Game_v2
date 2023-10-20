// add onclick event on splash screen to start game
document.querySelector('.splash-screen span').onclick = () => {
  // take a value from prompt and assign it inside variable
  let yourName = prompt('Enter Your Name: ');
  // check if prompt is empty or not
  if(yourName == null || yourName == ""){
    // if prompt is empty set a default value (Guest) to Header
    document.querySelector('.name span').innerHTML = 'Guest';
  } else {
    // else set a name to Header
    document.querySelector('.name span').innerHTML = yourName;
  }
  // in all status remove splash screen from DOM
  document.querySelector('.splash-screen').remove();
}

// set default duration variable
let duration = 1000;

// handle blocks container
let blocksContainer = document.querySelector('.blocks-container');

// make array of blocks container Array.from()
let blocks = Array.from(blocksContainer.children);

// set blocks length
let blocksLength = blocks.length;

// make an empty array and set keys in it to use it in randomly order
// and Extract with ... inside this array
// Second Way to make array of keys
// let orderRange = Array.from(Array(blocksLength).keys());
let orderRange = [...Array(blocksLength).keys()];

// Trigger Shuffle Function
shuffle(orderRange);

// loop through blocks
blocks.forEach((block, index) => {
  // Advanced Way to shuffle array randomly
  // let randomly = Math.floor(Math.random() * (orderRange.length - 1));
  block.style.order = orderRange[index];

  // Add click event to every card
  block.addEventListener('click', function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  })
})

function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flippedBlock => 
    flippedBlock.classList.contains('is-flipped')
  );
  
  // Check if allFlippedBlocks has 2 length
  if (allFlippedBlocks.length == 2){

    // trigger stop clicking function
    stopClicking();

    // trigger match function
    checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// trigger stop clicking function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add('no-clicking');
  // Wait Duration
  setTimeout(() => {
    // Remove Class No Clicking After The Duration
    blocksContainer.classList.remove('no-clicking');
  }, duration)
}

// Set match function
function checkMatchBlocks(firstBlock, secondBlock) {

  let triesEl = document.querySelector('.tries span');

  if (firstBlock.dataset.img === secondBlock.dataset.img) {

    // sound effect
    document.querySelector('#right').play();
    
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

  let allMatchedBlocks = blocks.filter(matchedBlock => 
    matchedBlock.classList.contains('has-match')
  );

    // Check if you finished the game
    if (allMatchedBlocks.length === 20) {

      document.querySelector('.finished-screen').style.display = 'block';
      document.querySelector('.finished-screen .window button').onclick = function () {
        document.querySelector('.finished-screen .finished').remove();
      }

      document.querySelector('.ask-user .yes').onclick = function () {
        setInterval(() => {
          window.location.reload();
        }, duration);
      }

      document.querySelector('.ask-user .no').onclick = function () {
        window.close();
      }

      // document.querySelector('.finished-screen').remove();

    }
    
  } else {
    
    // sound effect
    document.querySelector('#wrong').play();

    // increase wrong tries
    triesEl.innerHTML = parseInt(triesEl.innerHTML) + 1;

    // set timeout to flipped 
    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

    }, duration)

  }

}


// Set Shuffle Function
function shuffle(array) {
  // Setting variables
  let current = array.length,
    temp,
    random;

    while (current > 0) {
      // get random number and set it in random variables
      random = Math.floor(Math.random() * current);
      // Decrease Length By One
      current--;
      // [1] Save Current Element in Stash
      temp = array[current];
      // [2] Current Element = Random Element
      array[current] = array[random];
      // [3] Random Element = Get Element From Stash
      array[random] = temp;
    }

    return array;
}
// New Array     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
/*
  [1] Save Current Element in Stash
  [2] Current Element = Random Element
  [3] Random Element = Get Element From Stash
*/
