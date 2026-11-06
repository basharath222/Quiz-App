let questionDiv = document.querySelector("#question p");
let optionsDiv = document.querySelector("#options");
let answerDiv = document.querySelector("#answer");
let nextBtn = document.querySelector("#next");
let backBtn = document.querySelector("#back")
let answer = document.querySelector("#answer p")


let currQuesIndex = 0;
let score = 0;
let selected = new Array(questionList.length).fill("")
let feedback = new Array(questionList.length).fill("");
let isAnswered = false;

const quizCard = () =>{
    questionDiv.innerText = questionList[currQuesIndex].question; 
    optionsDiv.innerText = ""
    if(feedback[currQuesIndex] != ""){
        answer.innerText = feedback[currQuesIndex];
    }
    else{
        answer.innerText = ""
    }
  
    answer.classList.remove("incorrect");
    answer.classList.remove("correct")
    for(let [opt, val] of Object.entries(questionList[currQuesIndex].options)){
        let option = document.createElement("p");
        option.innerText = opt + ". "+val;
        optionsDiv.append(option)
        
        option.addEventListener("click",()=>{
            if(selected[currQuesIndex]){
               return;
            }
            // let select = opt;
            isAnswered = true;
            if(opt === questionList[currQuesIndex].answer){
                answer.innerText = "Correct" 
                answer.classList.add("correct")
                selected[currQuesIndex] = true;
                feedback[currQuesIndex] = answer.innerText;
                score++
            }
            else{
                answer.innerText = "Incorrect. Correct Option is " + questionList[currQuesIndex].answer;
                answer.classList.add("incorrect")
                selected[currQuesIndex] = true;
                feedback[currQuesIndex] = answer.innerText;
                
            }
            
        })
        
        
    }
}

const finalPage = () =>{
    questionDiv.remove()
    optionsDiv.remove()
    backBtn.remove()
    nextBtn.remove()
    answer.classList.remove("incorrect");
    answer.classList.remove("correct");
    answer.classList.add("finalScore")
    answer.innerText = `Your Final Score is ${score}`
}

const nextQuestion = () =>{
    if(currQuesIndex < questionList.length-1){
        currQuesIndex++;
        quizCard()
    }
    else{
        finalPage()
    }
    
}

const backQuestion = () =>{
    if(currQuesIndex >=1){
        currQuesIndex--
        quizCard()
    }
}

quizCard()

nextBtn.addEventListener("click", ()=>{
    nextQuestion()
})

backBtn.addEventListener("click", () =>{
    backQuestion()
})