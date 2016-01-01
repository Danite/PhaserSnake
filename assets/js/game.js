var snake, apple, squareSize, score, speed,
    updateDelay, direction, newDirection,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyleKey, textStyleValue;

var Game = {
    
    preload: function() {
        
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
        
    },
    
    create: function() {
        
        snake = [];
        apple = {};
        squareSize = 15;
        score = 0;
        speed = 0;
        updateDelay = 0;
        direction = 'right';
        newDirection = null;
        addNew = false;
        
        cursors = game.input.keyboard.createCursorKeys();
        
        game.stage.backgroundColor = '#061f27';
        
        for (var i = 0; i < 10; i++) 
        {
            
            snake[i] = game.add.sprite(150 + i * squareSize, 150, 'snake');
            
        }
        
        
        this.generateApple();
        
        textStyleKey = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyleValue = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
        
        //Score
        game.add.text(30, 20, "SCORE", textStyleKey);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyleValue);
        
        //Speed
        game.add.text(500, 20, "SPEED", textStyleKey);
        speedTextValue = game.add.text(558, 18, speed.toString(), textStyleValue);
        
    },
    
    update: function() {
        
        if (cursors.right.isDown && direction != 'left')
        {
            newDirection = 'right';
        }
        else if (cursors.left.isDown && direction != 'right')
        {
            newDirection = 'left';
        }
        else if (cursors.up.isDown && direction != 'down')
        {
            newDirection = 'up';
        }
        else if (cursors.down.isDown && direction != 'up') 
        {
            newDirection = 'down';
        }
        
        //Calculate the game speed based on the score
        speed = Math.min(10, Math.floor(score/5));
        
        //Update speed value in the screen
        speedTextValue.text = '' + speed;
        
        //increase a counter on every update call
        updateDelay++;
        
        if (updateDelay % (10 - speed) == 0)
        {
            
            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellX = lastCell.x,
                oldLastCellY = lastCell.y;
            
            if (newDirection) 
            {
                direction = newDirection;
                newDirection = null;
            }
        
        if (direction == 'right')
        {
            lastCell.x = firstCell.x + 15;
            lastCell.y = firstCell.y;
        }
        else if (direction == 'left')
        {
            lastCell.x = firstCell.x -15;
            lastCell.y = firstCell.y;
        }
        else if (direction == 'up')
        {
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y - 15;
        }
        else if (direction == 'down')
        {
            lastCell.x = firstCell.x;
            lastCell.y = firstCell.y + 15;
        }
        
        
        snake.push(lastCell);
        firstCell = lastCell;
            
        if (addNew)
        {
            snake.unshift(game.add.sprite(oldLastCellX, oldLastCellY, 'snake'));
            addNew = false;
        }
        
        // Check for apple Collision
        this.appleCollision();
        
        //Check for collision whith self from head
        this.selfCollision(firstCell);
        
        //Check for collision whith the wall
        this.wallCollision(firstCell);
        
        }
                  
    },
    
    generateApple: function() {
        
        var randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;
        
        apple = game.add.sprite(randomX, randomY, 'apple');
        
    },
    
    appleCollision: function() {
        
        for (var i = 0; i < snake.length; i++)
        {
            if (snake[i].x == apple.x && snake[i].y == apple.y)
            {
                addNew = true;
                
                apple.destroy();
                
                this.generateApple;
                
                score++
                
                scoreTextValue.text = score.toString();
            }
        }
    },
    
    selfCollision: function(head) {
        
        for(var i = 0; i < snake.length - 1; i++)
        {
            if (head.x == snake[i].x && head.y == snake[i].y)
            {
                game.state.start('GameOver');
            }
        }
    },
    
    wallCollision: function(head) {
        
        if (head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0)
        {
            game.state.start('GameOver');
        }
    }          
    
};
        
        
        
        
        
        
        
        
        