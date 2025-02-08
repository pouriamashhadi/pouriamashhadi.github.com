const colors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];

let widthBoxPapers = 100;

function addPaper() {
  const paper = document.createElement("div");
  paper.classList.add("paper");
  document.body.appendChild(paper);

  // Color
  const randColor = colors[Math.floor(Math.random() * colors.length)];
  paper.style.backgroundColor = randColor;

  // Generate random position and motion values

  const randX = (Math.random() - 0.5) * widthBoxPapers;
  const randZ = Math.random() * 20 - 30;

  // Generate random rotations

  const randRorateX = Math.random() * 720;
  const randRorateY = Math.random() * 360;

  widthBoxPapers += 5;

  paper.style.setProperty("--x", `${randX}px`);
  paper.style.setProperty("--z", `${randZ}px`);
  paper.style.setProperty("--rotateX", `${randRorateX}deg`);
  paper.style.setProperty("--rotateY", `${randRorateY}deg`);

  paper.style.left = `${window.innerWidth / 2 + randX}px`;

  //set animation

  paper.style.animation = `fall ${0.8 + Math.random() * 1}s linear forwards`;

  //Randomly select between square and rectangle
  if (Math.random() > 0.5) {
    let rnadWH = Math.random() * (30 - 20) + 10;
    paper.style.width = `${rnadWH}px`;
    paper.style.height = `${rnadWH}px`;
  } else {
    paper.style.width = `${Math.random() * (30 - 20) + 5}px`;
    paper.style.height = `${Math.random() * (20 - 20) + 30}px`;
  }

  //Remove

  setTimeout(() => {
    paper.remove();
  }, 3000);
}

function startAddPaper() {
  const _music = document.getElementById("music");
  _music.play();

  let counter = 0;

  let interval = setInterval(() => {
    counter++;
    if (counter == 20) {
      clearInterval(interval);
      return false;
    }
    for (let i = 0; i < 8; i++) {
      addPaper();
    }
  }, 100);
}
