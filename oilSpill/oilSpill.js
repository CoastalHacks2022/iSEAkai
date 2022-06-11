window.onload = function () {
    // Play sounds
    const bloop = document.getElementById("bloop");
    
    const canvas = document.getElementById("gameContainer");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext("2d");

    const scoreText = document.getElementById("score");
    let score = 0;

    const mouse = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        click: false,
    };
    let gameFrame = 0;

    canvas.addEventListener("mousemove", function (e) {
        mouse.click = true;
        mouse.x = e.clientX - canvas.offsetLeft
        mouse.y = e.clientY - canvas.offsetTop
    });

    // Make oil droplets
    const oilArray = [];
    const oil = new Image();
    oil.src = "../Assets/images/oil.svg";
    oil.style.objectFit = "contain";

    class Oil {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0 - 50 - (Math.random() * canvas.height) / 2;
            this.radius = 65;
            this.speed = Math.random() * -5 + -1;
            this.distance;
            this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
            this.counted = false;
            this.frameX = 0;
            this.spriteWidth = 130;
            this.spriteHeight = 101; 
            this.pop = false;
            this.counted = false;
        }
        update() {
            this.y -= this.speed;
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            this.distance = Math.sqrt(dx * dx + dy * dy);
        }
        draw() {
            ctx.drawImage(oil, this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x - 68,
                this.y - 68,
                this.spriteWidth,
                this.spriteHeight
            );
            ctx.imageSmoothingEnabled = false;
        }
    }

    function handleOil() {
        for (let i = 0; i < oilArray.length; i++) {
            if (oilArray[i].y > canvas.height * 2) {
                oilArray.splice(i, 1);
            }
        }
        for (let i = 0; i < oilArray.length; i++) {
            if (oilArray[i].distance < oilArray[i].radius + player.radius) {
                popAndRemove(i);
            }
        }
        for (let i = 0; i < oilArray.length; i++) {
            oilArray[i].update();
            oilArray[i].draw();
        }
        if (gameFrame % 50 == 0) {
            oilArray.push(new Oil());
        }
    }
    function popAndRemove(i) {
        if (oilArray[i]) {
            if (!oilArray[i].counted) score++;
            bloop.play();
            scoreText.innerText = `Score : ${score}`;
            oilArray[i].counted = true;
            oilArray[i].frameX++;
            if (oilArray[i].frameX > 7) oilArray[i].pop = true;
            if (oilArray[i].pop) oilArray.splice(i, 1);
            requestAnimationFrame(popAndRemove);
        }
    }

    // animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleOil();
        player.update();
        player.draw();
        gameFrame += 1;
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        mouse.x = canvas.width / 2;
        mouse.y = canvas.height / 2;
    });
};
