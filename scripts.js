function init(){
	canvas = document.getElementById('mycanvas');
	W = canvas.width = 1000;
	H = canvas.height = 700;
	pen = canvas.getContext('2d');
	cs = 30; //snake width
	game_over = false;
	score = 0;

	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "images/apple.png";

	trophy = new Image();
	trophy.src = "images/trophy.png";

	food = getRandomFood();

	last_x = Math.round(W/cs);
	last_y = Math.round(H/cs);

	snake = {
		init_len:2,
		color:"blue",
		cells:[{x:0,y:last_y-1},{x:1,y:last_y-1},{x:2,y:last_y-1}],
		direction:"",
		// cells:[],
		// direction:"right",

		// createSnake:function(){
		// 	for(var i=this.init_len;i>0;i--){
		// 		this.cells.push({x:i,y:0});
		// 	}
		// },
		drawSnake:function(){
			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
			}
		},

		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;
			}
			else{
				this.cells.pop();
			}

			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else if(this.direction=="up"){
				nextX = headX;
				nextY = headY - 1;
			}
			else{
				//during start direction=""
				nextX = headX;
				nextY = headY;
			}

			this.cells.unshift({x: nextX,y:nextY});

			/*Write a Logic that prevents snake from going out*/
			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
				start_pressed = false;
			}

		}

	};

	// snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else if(e.key=="ArrowUp"){
			snake.direction = "up";
		}
		//starting game on pressing enter
		else if(e.key=="Enter"){
			start();
		}


		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed);
	
}


function draw(){
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color; //snake color
	pen.drawImage(food_img, food.x*cs-5, food.y*cs-5, 40, 40);
	//40,40 represent size of apple
	//since cs=30 and size of apple = 40, so apple should extend 5 in both side of a call
	//that is why draw the pic at food.x*cs-5, food.y*cs-5

	pen.drawImage(trophy,18,20,70,70); //70,70 represent size of trophy
	pen.fillStyle = "black";
	pen.font = "30px Roboto"
	pen.fillText(score,45,55);

	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food

}

function gameloop(){
	if(game_over==true){
		//clearInterval(f);
		// alert("Game Over");

		document.getElementById("message1").value = "Press Enter to start again!";
		document.getElementById("message3").value = "Game over!!!";
		return;
	}
	draw();
	if(start_pressed){
		update();
	}
	document.getElementById("message2").value = `Score: ${score}`;

}

function start(){
	start_pressed = true;
	console.log("clicked");
	// init();
	score = 0;
	game_over=false;
	if(!first_game){
		food = getRandomFood();
	}
	first_game = false;
	// snake.cells = [];
	// snake.createSnake();
	snake.cells = [{x:0,y:last_y-1},{x:1,y:last_y-1},{x:2,y:last_y-1}];
	snake.direction = "right";
	document.getElementById("message3").value ="";
}


init();
start_pressed = false;
first_game = true;

var f = setInterval(gameloop,100);