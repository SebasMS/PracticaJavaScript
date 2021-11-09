(function(){
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            //elements.push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Ball = function(x, y, radius, board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;
        board.ball = this;
        this.kind = "circle";
    }
})();

(function(){
    self.Bar = function(x, y, width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 5;
    }

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;

        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + " y: " + this.y;
        }
    }
})();

(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.context = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        clean: function(){
            this.context.clearRect(0, 0, this.board.width, this.board.height);
        },
        draw: function(){
            for(var i = this.board.elements.length - 1; i >= 0; i--){
                var element = this.board.elements[i];

                draw(this.context, element);
            };
        },
        play: function(){
            this.clean();
            this.draw();
        }
    }

    function draw(context, element){
        switch(element.kind){
            case "rectangle":
                context.fillRect(element.x, element.y, element.width, element.height);
                break;

            case "circle":
                context.beginPath();
                context.arc(element.x, element.y, element.radius, 0, 7);
                context.fill();
                context.closePath();
                break;
        }
    }
})();

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(740, 100, 40, 100, board);
var canvas = document.getElementById('canvas', board);
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);

document.addEventListener("keydown", function(event){
    event.preventDefault();

    if(event.keyCode === 38){
        bar.up();
    }
    else if(event.keyCode === 40){
        bar.down();
    }
    else if(event.keyCode === 87){ // W
        bar_2.up();
    }
    else if(event.keyCode === 83){ // S
        bar_2.down();
    }
});

window.requestAnimationFrame(controller);

function controller() {
    board_view.play();
    window.requestAnimationFrame(controller);
}