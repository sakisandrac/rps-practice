# Rock, Paper, Scissors

## Abstract:
Rock, Paper, Scissors is a web based game application that allows users to play the classic game of rock, paper, scissors, *but with a twist!* Users can select to play in classic mode, or to play a bit more challenging came with 5 fighters in the difficult mode, with rock, paper, scissors, heart and star. The user can also input their name before playing the game so that their name can be displayed while playing. Users will play against the computer, and win counts will be automatically displayed following each turn. If the user chooses to change the game, the win count will be continued.

## Installation Instructions:
- Fork this repository.
- Clone the repository down into your local machine.
- Run `open index.html`
OR
- Use this link to view the [project](https://sakisandrac.github.io/rps-solo-final-project/). 

## Preview of App:
![](/assets/Apr-22-2023%2009-42-19.gif)
## Context:
- I am currently in Mod 1, week 5 of the Turing School for Software Engineering Front End Development, at the time of this project.
- This project took about 15 hours to complete.

## Contributors:
- [Saki Chatphatthanasiri](https://github.com/sakisandrac)

## Learning Goals:
- Demonstrate understanding of writing DRY ('Do Not Repeat Yourself') JavaScript and using event delegation
- Use the data model to display data on the DOM
- Practice problem solving 

## Wins + Challenges:
### Wins:
- My biggest win was being able to figure out a way to render everything from the data model, including the fighter icons. At first I had the icons hard coded into the HTML, but after seeing how I would need to manipulate them and select them through the DOM anyway, I removed the hard coding and was able to render the icons from the data model. After this change I believe that all of the info being diplayed in my app are being rendered from the data model and the fact that I was able to do this felt like a big win for me.

### Challenges:
- My biggest challenge was coming up with a way to check who wins after each turn. In the beginning, I had several conditionals and if statements to check every possible outcome to determine the winnter for each round. I knew that I wanted to refactor this somehow because the large block of conditionals seemed redundant, so I ended up refactoring it into an object in which the keys are choices the player could make, and the values were the choices the computer has to make in order for the player to win. I then created a function to just check the players choice within the object keys and the computer's choice in the key's values and determined the winner that way instead. This made my code a lot cleaner and it turned about 20 lines of code into a single object and function.