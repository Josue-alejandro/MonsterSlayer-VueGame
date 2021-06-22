//funcion para sacar un valor random en el ataque
function randomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};


//Aplicacion de Vue
const app = Vue.createApp({
	data(){
		return{
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			winner: null,
			logMessages: []
		};
	},
	computed: {
		monsterBar(){
			if (this.monsterHealth < 0) {
				return {width: '0%'}
			}
			return {width: this.monsterHealth + '%'};
		},
		playerBar(){
			if (this.playerHealth < 0) {
				return {width: '0%'}
			}
			return {width: this.playerHealth + '%'};
		},
		canUseSpecialAttack(){
			return this.currentRound % 3 !== 0;
		}
	},
	watch: {
		playerHealth(value){
			if (value <= 0 && this.monsterHealth <= 0) {
				//empate
				this.winner = 'draw';
			}else if(value <= 0){
				//perdiste
				this.winner = 'monster';
			}
		},
		monsterHealth(value){
			if (value <= 0 && this.playerHealth <= 0){
				//empate
				this.winner = 'draw';
			}else if (value <= 0){
				//ganaste
				this.winner = 'player';
			}
		}
	},
	methods:{
		startGame(){
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.currentRound = 0;
			this.winner = null;
			this.logMessages = [];
		},
		attackMonster(){
			this.currentRound++;
			const attackValue = randomValue(5, 12);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
			console.log(this.currentRound);
			this.addLogMessage('Player', 'attack', attackValue)
		},
		attackPlayer(){
			const attackValue = randomValue(8, 15);
			this.playerHealth -= attackValue;
			this.addLogMessage('Monster', 'attack', attackValue);
		},
		specialAttackMonster(){
			this.currentRound++;
			const attackValue = randomValue(10, 25);
			this.monsterHealth -= attackValue;
			this.attackPlayer();
			this.addLogMessage('Player', 'special-attack', attackValue);
		},
		healPlayer(){
			this.currentRound++;
			const healValue = randomValue(8, 20);
				if (this.playerHealth + healValue > 100) {
					this.playerHealth = 100;
				}else {
			this.playerHealth += healValue;
		 }
		 this.attackPlayer();
		 this.addLogMessage('Player', 'Heal', healValue);
		},
		surrender(){
			this.winner = 'monster';
		},
		addLogMessage(who, what, value){
			this.logMessages.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value
			});
		}
	}
});

app.mount('#game');