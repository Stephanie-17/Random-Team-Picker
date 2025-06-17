const textarea = document.getElementById('textarea')
const playersElement = document.querySelector('.players');
const teamNumber = document.getElementById('team-number')
let numberOfArrays = 0;
let playersArray;

textarea.focus()
textarea.addEventListener('keyup',(e)=>{
  createPlayers(e.target.value)
  if (e.key === 'Enter' && teamNumber.value === '' ) {
     alert('Please enter team number')
  }
})
teamNumber.addEventListener('keyup',(e)=>{
    
    if (e.key ==='Enter') {
        textarea.value = ''
        randomSelectPlayers(e.target.value);
        teamNumber.value = ''
    }
})

function createPlayers(input) {
    const players = input.split(',').filter(player=> player.trim())
    playersElement.innerHTML =''
    players.forEach(player => {
        const playerEl = document.createElement('span')
        playerEl.classList.add('player');
        playerEl.innerText = player;
        playersElement.appendChild(playerEl)
    });

    playersArray = players;
}

function randomSelectPlayers(teamNumber) {
   
   const interval = setInterval(() => {
       const randomPlayer = pickRandomPlayer()
       
       randomPlayer.classList.add('highlight')
       setTimeout(()=>{
       randomPlayer.classList.remove('highlight')

       },100)
    }, 100);

    setTimeout(() => {
        pickTeams(teamNumber)
        clearInterval(interval)
        document.querySelector('.reshuffle').classList.remove('hidden')
    }, 30*100);
}

function pickRandomPlayer() {
    const players = document.querySelectorAll('.player')
    return players[Math.floor(Math.random()*players.length)]
}

function pickTeams(teamNumber) {
    const players = playersArray;
    const numberOfArrays = teamNumber;
    const numberOfPlayers = players.length/numberOfArrays 
    const arrayHolder = {};

    for (let i = 0; i < numberOfArrays; i++) {
    const letter = String.fromCharCode(65+i);
    arrayHolder[`Team${letter}`] = [];
    }

    const shuffledPlayers = [...players].sort(()=> Math.random() - 0.5);

    shuffledPlayers.forEach(name=>{

        for (const team in arrayHolder) {
            if (arrayHolder[team].length < numberOfPlayers) {
                arrayHolder[team].push(name);
              
                 break;
            } 
        }
    })

   displayTeams(arrayHolder)
}

function displayTeams(arrayHolder) {
    const teamsEl = document.querySelector('.teams')
    const entries = Object.entries(arrayHolder);
    teamsEl.innerHTML = ''
    entries.forEach((entry)=>{
        const team = document.createElement('div');
        team.classList.add('team');
        teamsEl.appendChild(team)
        
        const teamHeader = document.createElement('h3')
        teamHeader.innerHTML = entry[0]
        team.appendChild(teamHeader);

        entry[1].forEach(player=>{
            const teamPlayer = document.createElement('span')
            teamPlayer.innerHTML = player
            team.appendChild(teamPlayer)
        
        })
  })
}