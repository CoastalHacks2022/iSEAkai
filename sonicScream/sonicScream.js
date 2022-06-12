// CONSTANTS

// VARIABLES
var gameStats = {
  playerHealth: 100,
  enemyHealth: 100,
};

// MATTER JS

// define constants for matter.js
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Vector = Matter.Vector,
  // Svg = Matter.Svg,
  Events = Matter.Events;

window.onload = function () {
  // create an engine
  var engine = Engine.create();

  console.log(window.innerWidth, window.innerHeight);

  fishCxt = fishCanvas.getContext("2d");

  // first render variable
  var render = Render.create({
    element: document.getElementById("canvasContainer"),
    engine: engine,
    canvas: fishCanvas,
    options: {
      width: 800,
      height: 600,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true,
      // wireframes: false,
      background: "#2475bd",
    },
  });

  //////////////// COLLISION FILTERING ////////////////
  var defaultCategory = 0x0001,
    shipBodyCategory = 0x0002,
    rozxieBodyCategory = 0x0004,
    playerCategory = 0x0008,
    waveCategory = 0x0010;

  //////////////// MOUSE ////////////////

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.9,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(engine.world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  /////////////// BORDERS ///////////////

  // define a static ground (the *2 for width is cause canvas width is half the actual thing apparently)
  var ground = Bodies.rectangle(
    render.canvas.width / 2 - 50,
    render.canvas.height,
    render.canvas.width,
    50,
    {
      collisionFilter: {
        category: playerCategory,
        mask: playerCategory,
      },
      isStatic: true,
      friction: 0.5,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        // visible: false,
      },
    }
  );

  var ceiling = Bodies.rectangle(
    render.canvas.width / 2 - 50,
    0,
    render.canvas.width,
    50,
    {
      collisionFilter: {
        category: playerCategory,
        mask: playerCategory,
      },
      friction: 0.5,
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        // visible: false,
      },
    }
  );

  var leftWall = Bodies.rectangle(
    -50,
    render.canvas.height / 2,
    50,
    render.canvas.height,
    {
      collisionFilter: {
        category: playerCategory,
        mask: playerCategory,
      },
      friction: 0.5,
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        // visible: false,
      },
    }
  );

  var rightWall = Bodies.rectangle(
    render.canvas.width - 50,
    render.canvas.height / 2,
    50,
    render.canvas.height,
    {
      collisionFilter: {
        category: playerCategory,
        mask: playerCategory,
      },
      friction: 0.5,
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        // visible: false,
      },
    }
  );

  /////////////// SHIP ///////////////

  var ship = Bodies.rectangle(
    render.canvas.width / 2,
    render.canvas.height / 2,
    20,
    20,
    {
      collisionFilter: {
        category: shipBodyCategory,
        mask: shipBodyCategory,
      },
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        sprite: {
          texture: "../assets/images/netTexture.png",
          xScale: 1.6,
          yScale: 2,
        },
      },
    }
  );

  /////////////// WAVES ///////////////

  var waves = Bodies.rectangle(
    render.canvas.width / 2 - 50,
    render.canvas.height / 2 - 150,
    10,
    10,
    {
      collisionFilter: {
        category: waveCategory,
        mask: waveCategory,
      },
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        sprite: {
          texture: "../assets/images/sonicScream/waves.png",
          xScale: 1.5,
          yScale: 1.5,
        },
      },
    }
  );

  /////////////// ROZXIE ///////////////

  var rozxie = Bodies.rectangle(
    render.canvas.width / 2 + 150,
    render.canvas.height / 2,
    50,
    50,
    {
      collisionFilter: {
        category: rozxieBodyCategory | defaultCategory | playerCategory,
        mask: rozxieBodyCategory | defaultCategory | playerCategory,
      },
      chamfer: {
        radius: 25 * 0.5,
      },
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        sprite: {
          texture: "../assets/images/sonicScream/originalHair.png",
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    }
  );

  /////////////// SHIP PROJECTILES ///////////////

  /////////////// EVENTS ///////////////

  Events.on(engine, "collisionStart", function (event) {
    var pairs = event.pairs;

    // https://stackoverflow.com/questions/47207541/matter-js-how-to-remove-bodies-after-collision

    // for (var i = 0, j = pairs.length; i != j; ++i) {
    //   var pair = pairs[i];
    //   if (pair.bodyA === rightTrigger || pair.bodyB === rightTrigger) {
    //     if (pair.bodyA === dolphin || pair.bodyB === dolphin) {
    //       animalFree.dolphin = true;
    //     } else if (pair.bodyA === turtle || pair.bodyB === turtle) {
    //       animalFree.turtle = true;
    //     } else if (pair.bodyA === stingray || pair.bodyB === stingray) {
    //       animalFree.stingray = true;
    //     } else if (pair.bodyA === shark || pair.bodyB === shark) {
    //       animalFree.shark = true;
    //     } else if (pair.bodyA === whaleshark || pair.bodyB === whaleshark) {
    //       animalFree.whaleshark = true;
    //     }
    //   }
    // }

    // if (checkAllFree()) {
    //   alert("You win!");
    // }
  });

  // Events.on(engine, "collisionEnd", function (event) {
  //   var pairs = event.pairs;
  // });

  // Events.on(mouseConstraint, "mousedown", function (event) {});

  Events.on(engine, "afterUpdate", function () {
    Body.setAngularVelocity(rozxie, rozxie.angle * -0.02);

    Body.setVelocity(rozxie, {
      x: rozxie.velocity.x,
      y: rozxie.velocity.y - 0.25 * gravity.y,
    });

    if (!mouse.position.x) {
      return;
    }
  });

  gravity = engine.world.gravity;

  var maxSpeed = {
    x: 10,
    y: 10,
  };

  document.addEventListener("keypress", function (e) {
    var addedVelocity = {
      x: 0,
      y: 0,
    };

    if (e.key === "w") {
      addedVelocity.y = -4;
    }

    if (e.key === "s") {
      addedVelocity.y = 4;
    }

    if (e.key === "a") {
      addedVelocity.x = -4;
    }

    if (e.key === "d") {
      addedVelocity.x = 4;
    }

    if (e.key === " ") {
      // shoot projectile
    }

    finalVelocity = {
      x: 0,
      y: 0,
    };

    if (rozxie.velocity.x + addedVelocity.x > maxSpeed.x) {
      finalVelocity.x = maxSpeed.x;
    } else if (rozxie.velocity.x + addedVelocity.x < -maxSpeed.x) {
      finalVelocity.x = -maxSpeed.x;
    } else {
      finalVelocity.x = rozxie.velocity.x + addedVelocity.x;
    }

    if (rozxie.velocity.y + addedVelocity.y > maxSpeed.y) {
      finalVelocity.y = maxSpeed.y;
    } else if (rozxie.velocity.y + addedVelocity.y < -maxSpeed.y) {
      finalVelocity.y = -maxSpeed.y;
    } else {
      finalVelocity.y = rozxie.velocity.y + addedVelocity.y;
    }

    Body.setVelocity(rozxie, {
      x: finalVelocity.x,
      y: finalVelocity.y,
    });
  });

  // add all of the bodies to the world
  World.add(engine.world, [
    ground,
    ceiling,
    leftWall,
    rightWall,
    waves,
    rozxie,
  ]);

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 },
  });

  // run the engine
  Runner.run(engine);

  // run the renderer
  Render.run(render);

  console.log("All loaded!");
};
