function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
    this.soruMetni = soruMetni;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap) {
    return cevap === this.dogruCevap
}

let sorular = [
    new Soru("1-Hangisi JavaScript paket yönetim uygulamasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" , d: "Nuget" }, "c"),
    new Soru("2-Hangisi .Net paket yönetim uygulamasıdır?", { a: "Node.js", b: "Typescript", c: "Npm", d: "Nuget" }, "d"),
    new Soru("3-Hangisi Front-End kapsamında değerlendirilmez?", { a: "CSS", b: "HTML", c: "JavaScript", d: "SQL" }, "d"),
    new Soru("4-Hangisi Back-End kapsamında değerlendirilir?", { a: "ASP.NET", b: "Angular", c: "VueJs", d: "React" }, "a")
];

function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
    this.dogruCevapSayisi = 0;
}

Quiz.prototype.soruGetir = function() {
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);

document.querySelector(".btn-start").addEventListener("click", function() {
    document.querySelector(".quiz-box").classList.add("active");
    startTimer(10);
    startTimerLine();
    soruGoster(quiz.soruGetir());
    soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    document.querySelector(".next-btn").classList.remove("show");
});

document.querySelector(".next-btn").addEventListener("click", function() {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex += 1;
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(10);
        startTimerLine();
        soruGoster(quiz.soruGetir());
        soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
        document.querySelector(".next-btn").classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        document.querySelector(".quiz-box").classList.remove("active");
        document.querySelector(".score-box").classList.add("active");
        skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});

document.querySelector(".btn-quit").addEventListener("click", function(){
    window.location.reload(); // reload page
});

document.querySelector(".btn-replay").addEventListener("click", function(){
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;
    document.querySelector(".btn-start").click();
    document.querySelector(".score-box").classList.remove("active");
});

const option_list = document.querySelector(".option-list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>'
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>'


function soruGoster(soru) {
    let question = `<span>${soru.soruMetni}</span>`;
    let options = '';

    for(let cevap in soru.cevapSecenekleri) {
        options += 
            `
                <div class="option"> 
                    <span><b>${cevap}</b>: ${soru.cevapSecenekleri[cevap]}</span>
                </div>
            `;
    }


    document.querySelector(".question-text").innerHTML = question;
    option_list.innerHTML = options;

    const option = option_list.querySelectorAll(".option");

    for(let opt of option){
        opt.setAttribute("onclick", "optionSelected(this)")
    }
    
}

function optionSelected(option){
    clearInterval(counter);
    clearInterval(counterLine);
    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    if(soru.cevabiKontrolEt(cevap)){
        quiz.dogruCevapSayisi += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon);
    }

    for(let i=0; i < option_list.children.length; i++){
        option_list.children[i].classList.add("disabled");
    }
    document.querySelector(".next-btn").classList.add("show");
}

function soruSayisiniGoster(soruSirasi, toplamSoru){
    let tag = `<span class="badge bg-warning">${soruSirasi} / ${toplamSoru}</span>
    `;
    document.querySelector(".quiz-box .question-index").innerHTML = tag;
}

function skoruGoster(toplamSoru, dogruCevap){
    let tag = `Toplam ${toplamSoru} sorudan ${dogruCevap} doğru cevap verdiniz.`;
    document.querySelector(".score-text").innerHTML = tag;
}

let counter;

function startTimer(time){
    counter = setInterval(timer ,1000);

    function timer() {
        document.querySelector(".time-second").textContent = time;
        time--;

        if(time < 0){
            clearInterval(counter);

            document.querySelector(".time-text").textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;

            for(let option of option_list.children){
                if(option.querySelector("span b").textContent == cevap){
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", correctIcon);
                }

                option.classList.add("disabled");
            }

            document.querySelector(".next-btn").classList.add("show");
        }
    }
}

let counterLine;

function startTimerLine(){
    let line_width = 0;

    counterLine = setInterval(timer , 20);
    
    function timer(){
        line_width += 1;
        document.querySelector(".time-line").style.width = line_width + "px";
        
        if(line_width > 548){
            clearInterval(counterLine);
        }
    }
}

   