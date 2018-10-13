var yes = document.getElementById("affirmative");
var no = document.getElementById("negative");
var ask = document.getElementById("question");
var firstOption = document.getElementById("questionOne");
var secondOption = document.getElementById("questionTwo");
var thirdOption = document.getElementById("questionThree");
var answers = document.querySelectorAll(".answers");
let life = 6;
var dragonLife = 5;
var inventory = document.getElementById("inventory");
var imagePlaceholder = document.getElementById("imageWrap");

var imageRotate = false;

function setBackground() {
    window.setTimeout("setBackground()", 700);
    newImage = imageRotate ? 'url(img/dragon2.png)' : 'url(img/dragon.png)';
    imageRotate = !imageRotate;
    imagePlaceholder.style.backgroundImage = newImage;
}

function displayLife() {
    document.getElementById("life").innerHTML = "Your Life: " + life;
}

function sphinxQuestions() {
    firstOption.innerHTML = "47.4 m/s";
    secondOption.innerHTML = "Potato?!";
    thirdOption.innerHTML = "Big!";
    imagePlaceholder.style.background = 'url("img/statue.png") 100%/cover';
    thirdOption.style.display = "block";
}

function correctAnswer() {
    ask.innerHTML = "Yes, that is correct you may pass. You passed the sphinx and you see a small chest and a door. Are you going to open the chest? There is a 33% chance that something might go wrong!";
    firstOption.innerHTML = "Open chest";
    secondOption.innerHTML = "Ignore the chest and go through the door in front of you";
    thirdOption.style.display = "none";
    imagePlaceholder.style.background = 'url("img/chest.png") 100%/cover';
}

function wrongAnswer() {
    ask.innerHTML = "`It seems you have an intellect only rivaled by garden tools. Fate has been cruel enough with you so I'm going to give you a hand and let you pass` the statue says. You see a small chest and a door. Are you going to open the chest? There is a 33% chance that something might go wrong!"
    firstOption.innerHTML = "Open chest";
    secondOption.innerHTML = "Ignore the chest and go through the door in front of you";
    thirdOption.style.display = "none";
    imagePlaceholder.style.background = 'url("img/chest.png") 100%/cover';
}

function dragonFight() {

    if (dragonLife > 0 && life > 0) {
        let damageToDragon = (Math.floor(Math.random() * 3) + 1);
        document.getElementById("damageToDragon").innerHTML = "You did: " + damageToDragon + " damage";
        dragonLife = dragonLife - damageToDragon;
        let damageFromDragon = Math.floor(Math.random() * 2) + 1;
        life = life - damageFromDragon;
        document.getElementById("damageFromDragon").innerHTML = "Dragon did: " + damageFromDragon + " damage";
        displayLife();
        document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
        imagePlaceholder.classList.add("dragonAnimation");
        const repeatAnim = document.querySelector(".dragonAnimation");
        repeatAnim.style.animation = "none";
        repeatAnim.offsetHeight;
        repeatAnim.style.animation = null;

        if (dragonLife <= 0 || life <= 0) {
            if (dragonLife <= 0 && life > 0) {
                ask.innerHTML = "Congratulations you have beaten the dragon. You found the exit!";
                setBackground = undefined; //garbage collection -> asign the result of setBackground() to undefined so it stops
                imagePlaceholder.style.background = 'url("img/dragon_dead.png") 100%/cover';

            } else if (life <= 0) {
                ask.innerHTML = "You lost!";
            }
            ask.style.fontSize = "30px";
            inventory.remove();
            document.getElementById("life").remove();
            document.getElementById("inventoryTitle").remove();
            document.getElementById("dragonLife").remove();
            document.getElementById("damageToDragon").remove();
            document.getElementById("damageFromDragon").remove();
            document.getElementById("paragraphSword").remove();
            let para = document.createElement("p");
            let node = document.createTextNode("Play Again!");
            para.appendChild(node);
            document.querySelector(".wrap").appendChild(para);
            para.setAttribute("id", "paragraphAgain");
            para.addEventListener("click", function () {
                window.location.reload();
            })
        }
    }
}

function takePotion() {
    window.addEventListener('keypress', function (e) {
        if (e.key === 'p' || 'P') {
            life++;
            displayLife();
            document.getElementById("potion").style.background = "none";
        }
    }, {
        once: true
    });
}

function tryAgain() {
    firstOption.innerHTML = "Try again";
    firstOption.style.fontSize = "30px";
    firstOption.addEventListener("click", function () {
        window.location.reload();
    }, {
        once: true
    })
}

function gameCodeBlock() {
    answers.forEach(answer => {
        answer.addEventListener("click", function () {
            if (answer.innerHTML === "Open chest") {
                if (Math.floor(Math.random() * 3) + 1 === 3) {
                    ask.innerHTML = "You found a sword and you put it in your inventory, but fate wasn't in your favor! A trap was activated and you lost 1 life, you continue your journey and open the door and you see a large man. What do you do?";
                    life--;
                    displayLife();

                } else {
                    ask.innerHTML = "You found a sword and you put it in your inventory, you also got lucky and nothing else happened. You continue your journey and open the door and you see a large man. What do you do?";
                }
                var sword = document.querySelectorAll(".inventory")[1];;
                sword.setAttribute("id", "sword");
                document.getElementById("sword").addEventListener("mouseover", function () {
                    let para = document.createElement("p");
                    let node = document.createTextNode("Damage: 1-3");
                    para.appendChild(node);
                    document.querySelector(".wrap").appendChild(para);
                    para.setAttribute("id", "paragraphSword");
                })
                document.getElementById("sword").addEventListener("mouseout", function () {
                    document.getElementById("paragraphSword").remove();
                })
                firstOption.innerHTML = "Attack him before he realizes you are there";
                secondOption.innerHTML = "Try to talk with him";
                imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                answers.forEach(answer => {
                    answer.addEventListener("click", function () {

                        if (answer.innerHTML === "Attack him before he realizes you are there") {
                            ask.innerHTML = "You manage to catch him by surprise and knock him unconscious with the stick but as a result in the struggle you got hurt a bit and also the stick broke! What now ?";
                            imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                            life--;
                            displayLife();
                            document.getElementById("stick").style.background = "none";
                            firstOption.innerHTML = "Search the man";
                            secondOption.innerHTML = "Keep trying to find an exit";
                            answers.forEach(answer => {
                                answer.addEventListener("click", function () {
                                    if (answer.innerHTML === "Search the man") {
                                        var potion = document.querySelectorAll(".inventory")[2];
                                        potion.setAttribute("id", "potion");
                                        takePotion();
                                        ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)";
                                        setBackground();
                                        document.getElementById("sword").addEventListener("click", function () {
                                            dragonFight();
                                        });
                                        document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                        firstOption.remove();
                                        secondOption.remove();
                                    } else if (answer.innerHTML === "Keep trying to find an exit") {
                                        ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)"
                                        setBackground();
                                        document.getElementById("sword").addEventListener("click", function () {
                                            dragonFight();
                                        });
                                        document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                        firstOption.remove();
                                        secondOption.remove();
                                    }
                                }, {
                                    once: true
                                })
                            })

                        } else if (answer.innerHTML === "Try to talk with him") {
                            ask.innerHTML = "The man asks if you could give him the stick and he would give you a life potion. You're a good person and you accept the deal. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)";
                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                            var potion = document.querySelectorAll(".inventory")[2];
                            potion.setAttribute("id", "potion");

                            document.getElementById("stick").style.background = "none";

                            takePotion();

                            setBackground();
                            document.getElementById("sword").addEventListener("click", function () {
                                dragonFight();

                            });
                            firstOption.remove();
                            secondOption.remove();
                        }
                    }, {
                        once: true
                    })
                })
            } else if (answer.innerHTML === "Ignore the chest and go through the door in front of you") {
                ask.innerHTML = "You continue your journey and open the door and you see a large man. What do you do?";
                firstOption.innerHTML = "Attack him before he realizes you are there";
                secondOption.innerHTML = "Try to talk with him";
                imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                answers.forEach(answer => {
                    answer.addEventListener("click", function () {

                        if (answer.innerHTML === "Attack him before he realizes you are there") {
                            ask.innerHTML = "You manage to catch him by surprise and knock him unconscious with the stick but as a result in the struggle you got hurt a bit and also the stick broke! What now ?";
                            imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                            life--;
                            document.getElementById("stick").style.background = "none";
                            displayLife();
                            firstOption.innerHTML = "Search the man";
                            secondOption.innerHTML = "Keep trying to find an exit";
                            answers.forEach(answer => {
                                answer.addEventListener("click", function () {
                                    if (answer.innerHTML === "Search the man") {
                                        var potion = document.querySelectorAll(".inventory")[2];
                                        potion.setAttribute("id", "potion");
                                        secondOption.remove();
                                        life = 0;
                                        displayLife();
                                        setBackground();
                                        ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears.You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                    } else if (answer.innerHTML === "Keep trying to find an exit") {
                                        ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                        life = 0;
                                        displayLife();
                                        setBackground();
                                        secondOption.remove();
                                    }
                                    tryAgain();
                                }, {
                                    once: true
                                })
                            })

                        } else if (answer.innerHTML === "Try to talk with him") {
                            ask.innerHTML = "The man asks if you could give him the stick and he would give you a life potion. You're a good person and you accept the deal. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                            document.getElementById("stick").style.background = "none";
                            var potion = document.querySelectorAll(".inventory")[2];
                            potion.setAttribute("id", "potion");
                            life = 0;
                            displayLife();
                            setBackground();
                            secondOption.remove();
                            tryAgain();
                        }
                    }, {
                        once: true
                    })
                })
            }
        }, {
            once: true
        })
    })
}

yes.addEventListener("click", function () {
    ask.innerHTML = "You just woke up  and you realize that you are in a tunnel and you can see in the distance a possible exit. What will you do now?";
    yes.remove();
    no.remove();
    displayLife();
    document.getElementById("life").style.display = "block";
    document.getElementById("options").style.display = "block";
    document.getElementById("inventory").style.display = "grid";
    document.getElementById("inventoryTitle").style.display = "block";
    document.getElementById("gameName").remove();
    firstOption.innerHTML = "Look around";
    secondOption.innerHTML = "Go towards the exit";
    thirdOption.innerHTML = "Shout, maybe someone will hear you";
    imagePlaceholder.style.display = "block";
})
no.addEventListener("click", function () {
    ask.innerHTML = "That's sad :(";
    yes.remove();
    no.remove();
});
answers.forEach(answer => {
    answer.addEventListener("click", function () {
        if (answer.innerHTML === "Look around") {
            ask.innerHTML = "You found a stick. Maybe you can find some use for it. What now?";
            var stick = document.querySelectorAll(".inventory")[0];
            stick.setAttribute("id", "stick");
            firstOption.innerHTML = "Continue towards the exit";
            secondOption.innerHTML = "Look some more";
            thirdOption.style.display = "none";
            answers.forEach(answer => {
                answer.addEventListener("click", function () {
                    if (answer.innerHTML === "Continue towards the exit") {
                        ask.innerHTML = "You continue towards the exit and you end up at a statue. It asks you a simple question and it shall let you pass withouth any consequences if you give the correct answer. An archer pulls back 0.75 m on a bow which has a stiffness of 200 N/m. The arrow weighs 50 g. What is the velocity of the arrow immediately after release?";
                        sphinxQuestions();
                        answers.forEach(answer => {
                            answer.addEventListener("click", function () {
                                if (answer.innerHTML === "47.4 m/s") {
                                    correctAnswer();
                                    gameCodeBlock();
                                } else if (answer.innerHTML === "Potato?!" || answer.innerHTML === "Big!") {
                                    wrongAnswer();
                                    gameCodeBlock();
                                }
                            }, {
                                once: true
                            })
                        })

                    } else if (answer.innerHTML === "Look some more") {
                        ask.innerHTML = "You didn't find anything else. You continue towards the exit and you end up at a statue. It asks you a simple question and it shall let you pass withouth any consequences if you give the correct answer. An archer pulls back 0.75 m on a bow which has a stiffness of 200 N/m. The arrow weighs 50 g. What is the velocity of the arrow immediately after release?";
                        sphinxQuestions();
                        answers.forEach(answer => {
                            answer.addEventListener("click", function () {
                                if (answer.innerHTML === "47.4 m/s") {
                                    correctAnswer();
                                    gameCodeBlock();
                                } else if (answer.innerHTML === "Potato?!" || answer.innerHTML === "Big!") {
                                    wrongAnswer();
                                    gameCodeBlock();

                                }
                            }, {
                                once: true
                            })
                        })
                    }
                }, {
                    once: true
                })
            });

        } else if (answer.innerHTML === "Go towards the exit") {
            ask.innerHTML = "You run scared towards the exit and you realize that you cut yourself on something: -1 LIFE, but you keep moving and you end up at a statue. It asks you a simple question and it shall let you pass withouth any consequences if you give the correct answer. An archer pulls back 0.75 m on a bow which has a stiffness of 200 N/m. The arrow weighs 50 g. What is the velocity of the arrow immediately after release?";
            life--;
            displayLife();
            sphinxQuestions();
            answers.forEach(answer => {
                answer.addEventListener("click", function () {
                    if (answer.innerHTML === "47.4 m/s") {
                        correctAnswer();
                        answers.forEach(answer => {
                            answer.addEventListener("click", function () {
                                if (answer.innerHTML === "Open chest") {
                                    if (Math.floor(Math.random() * 3) + 1 === 3) {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, but fate wasn't in your favor! A trap was activated and you lost 1 life, you continue your journey and open the door and you see a large man. What do you do?";
                                        life--;
                                        displayLife();

                                    } else {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, you also got lucky and nothing else happened. You continue your journey and open the door and you see a large man. What do you do?";
                                    }
                                    var sword = document.querySelectorAll(".inventory")[1];;
                                    sword.setAttribute("id", "sword");
                                    document.getElementById("sword").addEventListener("mouseover", function () {
                                        var para = document.createElement("p");
                                        var node = document.createTextNode("Damage: 1-3");
                                        para.appendChild(node);
                                        document.querySelector(".wrap").appendChild(para);
                                        para.setAttribute("id", "paragraphSword");
                                    })
                                    document.getElementById("sword").addEventListener("mouseout", function () {
                                        document.getElementById("paragraphSword").remove();
                                    })
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now ?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life--;
                                                displayLife();

                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            takePotion();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)";
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)";
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        }
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him)";

                                                document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;

                                                setBackground();
                                                document.getElementById("sword").addEventListener("click", function () {
                                                    dragonFight();

                                                });
                                                firstOption.remove();
                                                secondOption.remove();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                } else if (answer.innerHTML === "Ignore the chest and go through the door in front of you") {
                                    ask.innerHTML = "You continue your journey and open the door and you see a large man. What do you do?";
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now ?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life = life - 2;
                                                displayLife();
                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            secondOption.remove();
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears.You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            secondOption.remove();
                                                        }
                                                        tryAgain();
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";

                                                life = 0;
                                                displayLife();
                                                setBackground();
                                                secondOption.remove();
                                                tryAgain();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                }
                            }, {
                                once: true
                            })
                        })
                    } else if (answer.innerHTML === "Potato?!" || answer.innerHTML === "Big!") {
                        wrongAnswer();
                        answers.forEach(answer => {
                            answer.addEventListener("click", function () {
                                if (answer.innerHTML === "Open chest") {
                                    if (Math.floor(Math.random() * 3) + 1 === 3) {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, but fate wasn't in your favor! A trap was activated and you lost 1 life, you continue your journey and open the door and you see a large man. What do you do?";
                                        life--;
                                        displayLife();

                                    } else {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, you also got lucky and nothing else happened. You continue your journey and open the door and you see a large man. What do you do?";
                                    }
                                    var sword = document.querySelectorAll(".inventory")[1];;
                                    sword.setAttribute("id", "sword");
                                    document.getElementById("sword").addEventListener("mouseover", function () {
                                        var para = document.createElement("p");
                                        var node = document.createTextNode("Damage: 1-3");
                                        para.appendChild(node);
                                        document.querySelector(".wrap").appendChild(para);
                                        para.setAttribute("id", "paragraphSword");
                                    })
                                    document.getElementById("sword").addEventListener("mouseout", function () {
                                        document.getElementById("paragraphSword").remove();
                                    })
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life = life - 2;
                                                displayLife();
                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            takePotion();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)";
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)"
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        }
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him)";
                                                document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;


                                                setBackground();
                                                document.getElementById("sword").addEventListener("click", function () {
                                                    dragonFight();

                                                });
                                                firstOption.remove();
                                                secondOption.remove();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                } else if (answer.innerHTML === "Ignore the chest and go through the door in front of you") {
                                    ask.innerHTML = "You continue your journey and open the door and you see a large man. What do you do?";
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now ?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life = life - 2;
                                                displayLife();
                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            secondOption.remove();
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears.You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            secondOption.remove();
                                                        }
                                                        tryAgain();
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";

                                                life = 0;
                                                displayLife();
                                                setBackground();
                                                secondOption.remove();
                                                tryAgain();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                }
                            }, {
                                once: true
                            })
                        })
                    }
                }, {
                    once: true
                })
            })
        } else if (answer.innerHTML === "Shout, maybe someone will hear you") {
            ask.innerHTML = "Nothing happens. What a surprise...You continue towards the exit and you end up at a statue. It asks you a simple question and it shall let you pass withouth any consequences if you give the correct answer. An archer pulls back 0.75 m on a bow which has a stiffness of 200 N/m. The arrow weighs 50 g. What is the velocity of the arrow immediately after release?";
            sphinxQuestions();
            answers.forEach(answer => {
                answer.addEventListener("click", function () {
                    if (answer.innerHTML === "47.4 m/s") {
                        correctAnswer();
                        answers.forEach(answer => {
                            answer.addEventListener("click", function () {
                                if (answer.innerHTML === "Open chest") {
                                    if (Math.floor(Math.random() * 3) + 1 === 3) {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, but fate wasn't in your favor! A trap was activated and you lost 1 life, you continue your journey and open the door and you see a large man. What do you do?";
                                        life--;
                                        displayLife();

                                    } else {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, you also got lucky and nothing else happened. You continue your journey and open the door and you see a large man. What do you do?";
                                    }
                                    var sword = document.querySelectorAll(".inventory")[1];;
                                    sword.setAttribute("id", "sword");
                                    document.getElementById("sword").addEventListener("mouseover", function () {
                                        var para = document.createElement("p");
                                        var node = document.createTextNode("Damage: 1-3");
                                        para.appendChild(node);
                                        document.querySelector(".wrap").appendChild(para);
                                        para.setAttribute("id", "paragraphSword");
                                    })
                                    document.getElementById("sword").addEventListener("mouseout", function () {
                                        document.getElementById("paragraphSword").remove();
                                    })
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now ?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life = life - 2;
                                                displayLife();
                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            takePotion();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)";
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him)"
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        }
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him)";
                                                document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;

                                                setBackground();
                                                document.getElementById("sword").addEventListener("click", function () {
                                                    dragonFight();

                                                });
                                                firstOption.remove();
                                                secondOption.remove();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                } else if (answer.innerHTML === "Ignore the chest and go through the door in front of you") {
                                    ask.innerHTML = "You continue your journey and open the door and you see a large man. What do you do?";
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now ?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life = life - 2;
                                                displayLife();
                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            secondOption.remove();
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears.You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            secondOption.remove();
                                                        }
                                                        tryAgain();
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";

                                                life = 0;
                                                displayLife();
                                                setBackground();
                                                secondOption.remove();
                                                tryAgain();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                }
                            }, {
                                once: true
                            })
                        })
                    } else if (answer.innerHTML === "Potato?!" || answer.innerHTML === "Big!") {
                        wrongAnswer();
                        answers.forEach(answer => {
                            answer.addEventListener("click", function () {
                                if (answer.innerHTML === "Open chest") {
                                    if (Math.floor(Math.random() * 3) + 1 === 3) {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, but fate wasn't in your favor! A trap was activated and you lost 1 life, you continue your journey and open the door and you see a large man. What do you do?";
                                        life--;
                                        displayLife();

                                    } else {
                                        ask.innerHTML = "You found a sword and you put it in your inventory, you also got lucky and nothing else happened. You continue your journey and open the door and you see a large man. What do you do?";
                                    }
                                    var sword = document.querySelectorAll(".inventory")[1];;
                                    sword.setAttribute("id", "sword");
                                    document.getElementById("sword").addEventListener("mouseover", function () {
                                        var para = document.createElement("p");
                                        var node = document.createTextNode("Damage: 1-3");
                                        para.appendChild(node);
                                        document.querySelector(".wrap").appendChild(para);
                                        para.setAttribute("id", "paragraphSword");
                                    })
                                    document.getElementById("sword").addEventListener("mouseout", function () {
                                        document.getElementById("paragraphSword").remove();
                                    })
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now ?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life = life - 2;
                                                displayLife();
                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            takePotion();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him and press P to drink the potion)";
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him)"
                                                            setBackground();
                                                            document.getElementById("sword").addEventListener("click", function () {
                                                                dragonFight();
                                                            });
                                                            document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;
                                                            firstOption.remove();
                                                            secondOption.remove();
                                                        }
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. This is the final fight and you are free (Click on your sword to attack him)";
                                                document.getElementById("dragonLife").innerHTML = "Dragon Life: " + dragonLife;


                                                setBackground();
                                                document.getElementById("sword").addEventListener("click", function () {
                                                    dragonFight();

                                                });
                                                firstOption.remove();
                                                secondOption.remove();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                } else if (answer.innerHTML === "Ignore the chest and go through the door in front of you") {
                                    ask.innerHTML = "You continue your journey and open the door and you see a large man. What do you do?";
                                    firstOption.innerHTML = "Attack him before he realizes you are there";
                                    secondOption.innerHTML = "Try to talk with him";
                                    imagePlaceholder.style.background = 'url("img/man.png") 100%/cover';
                                    answers.forEach(answer => {
                                        answer.addEventListener("click", function () {

                                            if (answer.innerHTML === "Attack him before he realizes you are there") {
                                                ask.innerHTML = "You manage to catch him by surprise and knock him unconscious but as a result in the struggle you got hurt a bit! What now ?";
                                                imagePlaceholder.style.background = 'url("img/man2.png") 100%/cover';
                                                life = life - 2;
                                                displayLife();
                                                firstOption.innerHTML = "Search the man";
                                                secondOption.innerHTML = "Keep trying to find an exit";
                                                answers.forEach(answer => {
                                                    answer.addEventListener("click", function () {
                                                        if (answer.innerHTML === "Search the man") {
                                                            var potion = document.querySelectorAll(".inventory")[2];
                                                            potion.setAttribute("id", "potion");
                                                            secondOption.remove();
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            ask.innerHTML = "You found a potion tucked away in his coat. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears.You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                        } else if (answer.innerHTML === "Keep trying to find an exit") {
                                                            ask.innerHTML = "You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";
                                                            life = 0;
                                                            displayLife();
                                                            setBackground();
                                                            secondOption.remove();
                                                        }
                                                        tryAgain();
                                                    }, {
                                                        once: true
                                                    })
                                                })

                                            } else if (answer.innerHTML === "Try to talk with him") {
                                                ask.innerHTML = "The man asks if you could give him something in return for a life potion. You have nothing of value so tough luck. You move on and you feel that something is watching. You see in the distance a light shinning brightly and you realize that this is it, the EXIT. You start running towards it but suddenly a wild dragon appears. You didn't manage to find a weapon to defend yourself with. The dragon kills you easily. GAME OVER";

                                                life = 0;
                                                displayLife();
                                                setBackground();
                                                secondOption.remove();
                                                tryAgain();
                                            }
                                        }, {
                                            once: true
                                        })
                                    })
                                }
                            }, {
                                once: true
                            })
                        })
                    }
                }, {
                    once: true
                })
            })
        }
    }, {
        once: true
    })
})