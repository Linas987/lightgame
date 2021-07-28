const allcels = document.querySelectorAll(".cell");

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
let clickSound = new sound("click.mp3");
let victorySound = new sound("victory.mp3");
let colarr = [
  "red",
  "blue",
  "purple",
  "cyan",
  "orange",
  "yellow",
  "red",
  "lime",
];

const randColor = () => {
  let hexColor = colarr[Math.floor(Math.random() * colarr.length)];
  return hexColor;
};

const win = () => {
  var lightcount = 0;
  allcels.forEach((square) => {
    if (square.style.backgroundColor) {
      ++lightcount;
    }
  });
  if (lightcount == 25) {
    console.log("win");
    document.body.classList.add("wrapper");
    document.getElementById("task").innerHTML = "You win!";
    victorySound.play();
  } else {
    document.body.classList.remove("wrapper");
    document.getElementById("task").innerHTML = "Light on all the tiles!";
  }
};

var i = 0;
allcels.forEach((square) => {
  square.setAttribute("id", i);
  i++;
  square.addEventListener("mouseenter", (e) => {
    //console.log(e);
    square.style.outline = "2px solid cyan";
  });
  square.addEventListener("mouseleave", (e) => {
    //console.log(e);
    square.style.outline = "";
  });
  var id = parseInt(square.id);
  let color = randColor();
  square.addEventListener("click", (e) => {
    clickSound.play();
    //console.log(square.id);
    //console.log("Current", id);
    //current
    if (square.style.backgroundColor) {
      square.style.backgroundColor = "";
    } else {
      square.style.backgroundColor = `${color}`;
    }
    //left
    if (id - 1 >= 0) {
      if (id % 5 != 0) {
        if (document.getElementById(id - 1).style.backgroundColor) {
          document.getElementById(id - 1).style.backgroundColor = "";
        } else {
          document.getElementById(id - 1).style.backgroundColor = `${color}`;
        }
      }
    }
    //right
    if (id + 1 <= 24) {
      if ((id + 1) % 5 != 0) {
        if (document.getElementById(id + 1).style.backgroundColor) {
          document.getElementById(id + 1).style.backgroundColor = "";
        } else {
          document.getElementById(id + 1).style.backgroundColor = `${color}`;
        }
      }
    }
    //up
    if (id - 5 >= 0) {
      //if ((id - 4) % 5 != 0) {
      if (document.getElementById(id - 5).style.backgroundColor) {
        document.getElementById(id - 5).style.backgroundColor = "";
      } else {
        document.getElementById(id - 5).style.backgroundColor = `${color}`;
      }
      //}
    }
    //down
    if (id + 5 <= 24) {
      //if ((id + 5) % 5 != 0) {
      if (document.getElementById(id + 5).style.backgroundColor) {
        document.getElementById(id + 5).style.backgroundColor = "";
      } else {
        document.getElementById(id + 5).style.backgroundColor = `${color}`;
      }
      //}
    }
    win();
  });
});

const body = document.body;
body.addEventListener("keydown", (event) => {
  // event.code holds the current key pressed
  console.log(event.code);
  if (event.code === "KeyD") {
    body.style.backgroundColor === ""
      ? (body.style.backgroundColor = `#${randColor()}`)
      : (body.style.backgroundColor = "");
  }
});
