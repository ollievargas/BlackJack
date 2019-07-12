var cards = [];
        var playerCard = [];
        var dealerCard = [];
        var cardCounter = 0;
        var mydollars = 100;
        var suits = ["spades", "hearts", "clubs", "diams"];
        var suitNum = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

        var message = document.getElementById("message");
        var output = document.getElementById("output");
        var dealerHolder = document.getElementById("dealerHolder");
        var playerHolder = document.getElementById("playerHolder");
        var pValue = document.getElementById("pValue");
        var dValue = document.getElementById("dValue");





        for (s in suits) {
            var suit = suits[s][0].toUpperCase();
            var bgcolor = (suit == "S" || suit == "C") ? "black" : "red";
            for (n in suitNum) {
                // output.innerHTML += "<span style='color:" + bgcolor + " '>&" + suits[s] + ";" + suitNum[n] + "</span> ";
                var cardValue = (n > 9) ? 10 : parseInt(n) + 1
                var card = {
                    suit: suit,
                    icon: suits[s],
                    bgcolor: bgcolor,
                    cardnum: suitNum[n],
                    cardValue: cardValue
                }
                cards.push(card);
            }           
        }

        


        function Start(){
            shuffleDeck(cards)
            dealNew();
            document.getElementById('start').style.display = 'none';
            document.getElementById('dollars').innerHTML = mydollars;


        // var randomNum = Math.floor((Math.random() * 52) );
        // output.innerHTML += "<span style='color:" + cards [randomNum].bgcolor +
        // " '>&" + cards [randomNum].icon + ";" + cards [randomNum].cardnum + 
        // "</span>  ";
        }

        function dealNew() {
            playerCard = [];
            dealerCard = [];
            dealerHolder.innerHTML = "";
            playerHolder.innerHTML = "";


            var betvalue = document.getElementById('mybet').value;
            mydollars = mydollars - betvalue;
            document.getElementById('dollars').innerHTML = mydollars;
            document.getElementById('myactions').style.display = 'block';
            message.innerHTML = "Current bet is $"+betvalue;
            document.getElementById('mybet').disabled= true;
            document.getElementById('maxbet').disabled= true;
            deal();








        

        }

        function deal() {
            console.log(cards);
            for (x = 0; x < 2; x++) {
                dealerCard.push(cards[cardCounter]);
                dealerHolder.innerHTML += cardOutput(cardCounter, x);
                if(x === 0) {
                    dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
            }
                cardCounter++
                playerCard.push(cards[cardCounter]);
                playerHolder.innerHTML += cardOutput(cardCounter, x);
                cardCounter++
        }
            console.log(dealerCard);
            console.log(playerCard);

        }



        function cardOutput(n, x) {
            var hpos = (x>0) ? x * 60 + 100 : 100;
            return '<div class="card '+ cards[n].icon +' " style="left: '+ hpos+'px"> <div class="top-card suit">'+ cards[n].cardnum +'<br></div> <div class="content-cardsuit"></div> <div class="bottom-card suit">'+ cards[n].cardnum +'<br></div> </div>'

        }

        function cardAction(a) {
            console.log(a);
            switch(a) {
                case 'hit':
                    playcard();
                    break;
                case 'hold':
                    playend();
                    break;
                case 'double':
                    playcard();
                    playend();
                    break;
                default:
                    console.log('done');
                    playend();
            }
        }

        function playcard() {
            playerCard.push(cards[cardCounter]);
            playerHolder.innerHTML += cardOutput(cardCounter, (playerCard.length -1));
            cardCounter++
            var rValu = checktotal(playerCard);
            pValue.innerHTML = rValu;


        }

        function checktotal(arr) {
            var rValue = 0;
            var aceAdjust =  false;
            for(var i in arr) {
                if(arr[i].cardnum == 'A' && !aceAdjust) {
                    aceAdjust = true;
                    rValue = rValue + 10;
                }
                rValue = rValue + arr[i].cardvalue;
            }
            if(aceAdjust && rValue > 21) {
                rValue = rValue - 10;
            }
            return rValue;
        }

        function shuffleDeck(array) {
            for(var i = array.length -1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;

            }
            return array;

        }

        function outputCard() {
            output.innerHTML += "<span style='color:" + cards[cardCounter].bgcolor + " '>" +
            cards[cardCounter].cardnum + "&" + cards[cardCounter].icon + ";</span> "
        } 