window.onload=function(){
    function updatePlayerStats() {
        var playerStats = document.getElementById('playerStats');
        playerStats.textContent = `You: Hp:${you.hp}, Atk:${you.atk}, Def:${you.def}, Luck:${you.luck}`;
    }
    function updateBossStats() {
        var bossStats = document.getElementById('bossStats');
        bossStats.textContent = `Boss: Hp:${oct.hp}, Ak:${oct.ak}, Df:${oct.df}`;
    }
    var win=false;
    function updateBossHealthBar() {
        var bossHealthBar = document.getElementById('bossHealthBar');
        bossHealthBar.style.width = (oct.hp / 570) * 100 + '%';
    }
    function updatePlayerHealthBar() {
        var playerHealthBar = document.getElementById('playerHealthBar');
        playerHealthBar.style.width = (you.hp / 135) * 100 + '%'; /* 플레이어의 현재 체력에 비례 */
    }
    function player_att(){
        const dam = you.att();
        oct.damage(dam);
        you.damage(oct.ak);
        updatePlayerStats();
        updateBossStats();
        //if(oct.hp<=0){
        //  oct.hp=0;
            //win = true;
            //boss.style.display = 'none';
            //boss.classList.add('fadeOut');
            /*boss.addEventListener('animationend', function() {
                boss.style.display = 'none';
            });*/
        //}
    }
    function player_act(){
        const num = Math.floor(Math.random()*12);
        console.log(num);
        switch(num){
            case 0://사기
                oct.df-=10;
                break;
            case 1:
                you.atk += Math.floor(Math.random()*5);
                break;
            case 2:
                you.def += Math.floor(Math.random()*5);
                break;
            case 3:
                const plus=Math.floor(Math.random()*10)+10;
                you.hp += plus;
                showDamage2(`+${plus}`);
                if(you.hp >= 135){
                    you.hp = 135;
                }
                break;
            case 4:
                you.luck += 7.5;
                if(you.luck >= 75){
                    you.luck = 75;
                }//밸런스 조정
                break;
            case 5:
                oct.hp -= 30;
                showDamage(30);
                break;
            case 6:
                oct.hp += 20;
                if(oct.hp>=570){
                    oct.hp=570;
                }
                try{
                    showDamage('+20');
                }catch(err){}//pass
                break;
            case 6:
                oct.ak-=0.5;
                if(oct.ak <= 4){
                    oct.ak=5;
                }
                break;
            case 7:
                oct.ak -= 3;
                if(oct.ak<=10){
                    oct.ak = 10;
                }
                break;
            case 8:
                you.hp -= 5;
                showDamage2(5);
                break;
            case 9:
                oct.ak--;
                if(oct.ak <= 4){
                    oct.ak=5;
                }
                break;
            default:
                for(let i=0;i<=20;i++){
                    const dam=Math.floor(Math.random()*3);
                    if(dam == 0){
                        oct.hp++;
                        showDamage('+1');
                        continue;
                    }
                    oct.hp-=dam;
                    showDamage(dam);
                }oct.df--;
        }
        you.damage(oct.ak);
        updatePlayerStats();
        updateBossStats();
        updateBossHealthBar();
        updatePlayerHealthBar();
        if(oct.hp<=0){
            oct.hp=0;
            win=true;
            alert("You Won!!");
            setTimeout(function(){
                window.close();
            },2000);
            boss.style.display = 'none';
        }
    }
    function player_def(){
        you.def +=Math.floor( Math.random()*10);
        you.damage(oct.ak);
        updatePlayerStats();
        updateBossStats();
    }
    function showDamage(damage) {
        // 데미지 텍스트를 포함하는 div 요소를 만듭니다
        var damageText = document.createElement('div');
        damageText.id = 'damageText';
        damageText.textContent = damage;
    
        // 보스 이미지의 크기와 위치를 정의합니다
        var bossWidth = 250;
        var bossHeight = 450;
        var bossTop = 100;
        var bossLeft = (window.innerWidth - bossWidth) / 2; // 보스 이미지의 좌측 위치
    
        // 데미지 텍스트의 위치를 무작위로 설정합니다
        var left = bossLeft + Math.random() * bossWidth;  // 보스 이미지의 좌측 위치를 고려
        var top = bossTop + Math.random() * bossHeight;
        damageText.style.left = `${left}px`;
        damageText.style.top = `${top}px`;
    
        // 보스 요소에 데미지 텍스트를 추가합니다
        var boss = document.getElementById('boss');
        boss.appendChild(damageText);
    
        // 1초 후에 데미지 텍스트를 제거합니다
        setTimeout(function() {
            boss.removeChild(damageText);
        }, 2000);
    }
    function showDamage2(damage){
        var damageText = document.createElement('div');
        damageText.id = 'damageText2';
        damageText.textContent = damage;
    
        // 데미지 텍스트의 위치를 무작위로 설정합니다
        var left = (window.innerWidth) / 2;  // 보스 이미지의 좌측 위치를 고려
        var top = (window.innerHeight - 150);
        damageText.style.left = `${left}px`;
        damageText.style.top = `${top}px`;
    
        // 보스 요소에 데미지 텍스트를 추가합니다
        var boss = document.getElementById('boss');
        boss.appendChild(damageText);
    
        // 1초 후에 데미지 텍스트를 제거합니다
        setTimeout(function() {
            boss.removeChild(damageText);
        }, 2000);
    }
    var boss = document.getElementById('boss');
    var player = document.getElementById('player');
    var attackButton = document.getElementById('attack');
    var actionButton = document.getElementById('action');
    var defendButton = document.getElementById('defend');
    class Player{
        constructor(name,hp,atk,def,luck){
            this.name = name;
            this.hp = hp;
            this.atk = atk;
            this.def = def;
            this.luck = luck;
        }
        get_luck(plus_luck){
            this.luck += plus_luck;
        }
        att(){
            const random_atk = Math.random();
            if(0.5 <= random_atk){
                return this.atk + Math.floor(Math.random()*10);
            }else{
                return this.atk - Math.floor(Math.random()*10);
            }
        }
        damage(dam){//missed->회피 성공 가능성
            const dam_=+dam;
            const miss=Math.floor(Math.random()*100);
            if(miss < this.luck){//회피 성공
                showDamage2("Miss");
                //player.classList.add('moveLeft');
                //player.addEventListener('animationend', function() {
                    //player.classList.remove('moveLeft');
                //});
                return true;
            }
            const old_hp=this.hp;
            const dama=dam_+Math.floor(Math.random()*15)-this.def
            this.hp -= (dama);//회피 실패
            if(old_hp<=this.hp){
                //고정 딜
                showDamage2(5);
                this.hp=old_hp-5;
            }else{
                showDamage2(dama);
            }
            updatePlayerStats();
            updateBossStats();
            updatePlayerHealthBar();
            if(this.hp<=0){
                this.hp=0;
                alert("You Lost!");
                you.hp=135;
                you.atk=20;
                you.def=5;
                you.luck=20;
                oct.hp=570;
                oct.ak=5;
                oct.df=20;
                updateBossHealthBar();
                updatePlayerHealthBar();
            }
            return false;
        }
        isalive(){
            return this.hp <= 0 ? false : true;
        }
    }
    class Boss{
        constructor(name,hp,ak,df){
            this.name = name;
            this.hp = hp;
            this.ak = ak;
            this.df = df;
        }
        att(){
            const random_atk = Math.random();
            if(0.5 <= random_atk){
                return this.ak + Math.floor(Math.random()*5);
            }else{
                return this.ak - Math.floor(Math.random()*5);
            }
        }
        damage(dam){
            const old_hp=this.hp;
            this.hp -= dam;
            this.hp += this.df;
            if(old_hp<=this.hp){
                this.hp=old_hp-5;//최소 데미지
                showDamage(5);
            }else{
                console.log(old_hp,this.hp);
                showDamage(dam-this.df);
            }
            updateBossHealthBar();
            //
            if(this.hp<=0){
                this.hp=0;
                win=true;
                alert("You Won!!");
                setTimeout(function(){
                    window.close();
                },2000);
                boss.style.display = 'none';
            }
            //
        }
        isalive(){
            return this.hp <= 0 ? false : true;
        }
    }
    var you = new Player("Ulbcusofu",135,15,5,20);
    var oct = new Boss("Oct",570,10,20);
    updateBossHealthBar();
    updatePlayerHealthBar();
    attackButton.addEventListener('click', player_att);
    actionButton.addEventListener('click', player_act);
    defendButton.addEventListener('click', player_def);
}
