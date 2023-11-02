// Element Selector
const dice1 = document.getElementById('dice-1')
const dice2 = document.getElementById('dice-2')
const rollButton = document.getElementById('rollButton')
 
 
// Execute Dice Roll
const rollDice = () =>{
    // Animate Dices to Roll
    if(!dice1.classList.contains('rolling'))
        dice1.classList.add('rolling')
    if(!dice2.classList.contains('rolling'))
        dice2.classList.add('rolling')
 
    // Get Random values for dices
    var dice1Val = Math.floor( (Math.random() * 6) + 1 )
    var dice2Val = Math.floor( (Math.random() * 6) + 1 )
    setTimeout(()=>{
        // set dices to random values after certain duration of rolling
        dice1.dataset.face = dice1Val
        dice2.dataset.face = dice2Val
 
        // remove rolling animation
        if(dice1.classList.contains('rolling'))
            dice1.classList.remove('rolling')
        if(dice2.classList.contains('rolling'))
            dice2.classList.remove('rolling')
    }, 3000)
}
 
 
// Trigger Dices to Roll
rollButton.addEventListener('click', function(e){
    e.preventDefault()
    rollDice()
})