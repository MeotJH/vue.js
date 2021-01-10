new Vue({
    el: '#app',
    data:{
        myChoice: null,
        count: 3,
        comChoice: null,
        winner : null,
        lifeOfMe: 3,
        lifeOfCom:3,
        isSelectable: true,
        logs:[]
    },
    watch: {
        count: function(newVal){
            
            if(newVal ===0 ){
                
                //컴퓨터가 가위바위보선택 메소드
                this.selectCom()
                
                //가위바위보 승패 결정 및 몫 차감 메소드
                this.whoIsWin()
                
                //가위바위보 한판 끝나고 초가 다시 3으로 변하는 변수 게임 리셋 담당
                this.count = 3
                this.isSelectable = true

                //로그가 업데이트 되는 메소드
                this.updateLogs()

                
            }
        },
        lifeOfMe: function(newVal){
            if(newVal === 0)
            //게임을종료
            this.endGame('안타깝네요. 당신이 패배하였습니다.')
        },
        lifeOfCom: function(){
            if(newVal === 0)
            //게임을종료
            this.endGame('축하합니다. 당신이 승리하였습니다.')
        }
    },
    methods:{
        startGame : function() {
            this.isSelectable = false
            if(this.myChoice === null){
                alert('가위 바위 보 중 하나를 선택해 주세요.')
            }else{
                //애로우 어쩌구가 뭔지 찾아보기
                let countDown = setInterval(()=>{
                    this.count --
                    if(this.count ===0){
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        },
        selectCom : function(){
            //컴퓨터가 스스로의 가위바위보를 선택하게 하는 함수
            let number = Math.random()
                if(number < 0.33){
                    this.comChoice = 'scissor'
                }else if (number <0.66){
                    this.comChoice = 'rock'
                }else {
                    this.comChoice = 'paper'
                }
        },
        whoIsWin : function(){
            //누가 이기는지 판단하는 메소드
            if(this.myChoice === this.comChoice) 'no one'
            else if(this.myChoice ==='rock' && this.comChoice === 'scissor') this.winner = 'me'
            else if(this.myChoice ==='scissor' && this.comChoice === 'paper') this.winner = 'me'
            else if(this.myChoice ==='paper' && this.comChoice === 'rock') this.winner = 'me'
            else if(this.myChoice ==='scissor' && this.comChoice === 'rock') this.winner = 'com'
            else if(this.myChoice ==='paper' && this.comChoice === 'scissor') this.winner = 'com'
            else if(this.myChoice ==='rock' && this.comChoice === 'paper') this.winner = 'com'
            else this.winner = 'error'

            if(this.winner === 'me'){
                this.lifeOfCom --
            }
            else if(this.winner === 'com'){
                this.lifeOfMe --
            }
        },
        updateLogs : function(){
            //로그를 업데이트하는 메소드
            let log = {
                messege: 'you: '+this.myChoice+', Computer: '+this.comChoice,
                winner: this.winner
            }
            this.logs.unshift(log)
        },
        endGame: function(msg){
            setTimeout(() => {
                confirm(msg)
                this.lifeOfMe = 3
                this.lifeOfCom = 3
                this.myChoice = null
                this.comChoice = null
                this.winner = null
                this.logs = []
            }, 500)
        }
    }
})