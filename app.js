let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let p1 = document.querySelector(".hide1");
let p2 = document.querySelector(".hide2");

let turnO = true; //playerX, playerO
let count = 0; //To track draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    p1.classList.add("hide1");
    p2.classList.add("hide2");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) // playerO
        {
            box.style.color = "#8e5572";
            box.innerText = "O";
            turnO = false;
            p2.classList.remove("hide2");
            p1.classList.add("hide1");
        }
        else // playerX
        {
            box.innerText = "X";
            turnO = true;
            p1.classList.remove("hide1");
            p2.classList.add("hide2");
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if(count == 9 && !isWinner)
          gameDraw();
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratilations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val===pos2Val && pos2Val===pos3Val)
            {
                showWinner(pos1Val)
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);