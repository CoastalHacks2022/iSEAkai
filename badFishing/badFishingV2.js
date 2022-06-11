// CONSTANTS

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
  Events = Matter.Events;

window.onload = function () {
  // create an engine
  var engine = Engine.create();
  engine.world.gravity.y = 0;

  // get the canvas items from the document
  // fishCanvas = document.getElementById("fishCanvas");
  // fishCanvas.width = window.innerWidth;
  // fishCanvas.height = window.innerHeight;

  console.log(window.innerWidth, window.innerHeight);

  fishCxt = fishCanvas.getContext("2d");

  // first render variable
  var render = Render.create({
    element: document.body,
    engine: engine,
    canvas: fishCanvas,
    options: {
      width: 800,
      height: 600,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true,
      wireframes: true,
    },
    // options: {
    //     width: window.innerWidth - 20,
    //     height: window.innerHeight,
    //     wireframes: false,
    //     showAngleIndicator: false,
    // }
  });

  var defaultCategory = 0x0001,
    tentacleCategory = 0x0002,
    greenCategory = 0x0004,
    blueCategory = 0x0008;

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


  // BORDERS
  // define a static ground (the *2 for width is cause canvas width is half the actual thing apparently)
  var ground = Bodies.rectangle(
    render.canvas.width / 2,
    render.canvas.height - 25,
    render.canvas.width,
    50,
    {
      collisionFilter: {
        mask: defaultCategory | tentacleCategory
      },
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
      },
    }
  );

  var ceiling = Bodies.rectangle(
    render.canvas.width / 2,
    10,
    render.canvas.width,
    50,
    {
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
      },
    }
  );

  var leftWall = Bodies.rectangle(
    10,
    render.canvas.height / 2,
    50,
    render.canvas.height,
    {
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
      },
    }
  );

  var rightWall = Bodies.rectangle(
    render.canvas.width,
    render.canvas.height / 2,
    70,
    render.canvas.height,
    {
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
      },
    }
  );

  // TENTACLES

  group = Body.nextGroup(true);

  var numSegments = 14;

  var tentacleComposite = Composites.stack(
    100,
    50,
    numSegments,
    1,
    10,
    10,
    function (x, y) {
      return Bodies.rectangle(x - 20, y, 50, 20, {
        collisionFilter: {
          category: tentacleCategory,
          group: group,
        },
        render: {
          strokeStyle: "#ffffff",
          sprite: {
            texture: "../assets/images/tentacleSegmentRotated.png",
            xScale: 0.2,
            yScale: 0.2,
          },
        },
      });
    }
  );

  var tentacleTip = Bodies.rectangle(100 + 50 * numSegments + 100, 50, 50, 20, {
    collisionFilter: {
          category: tentacleCategory,
          group: group,
    },
    render: {
      strokeStyle: "#ffffff",
      sprite: {
        texture: "../assets/images/tentacleTipRotated.png",
        xScale: 0.15,
        yScale: 0.2,
      },
    },
    chamfer: 5,
  });

  Composite.add(tentacleComposite, tentacleTip);

  var tentacleEnd = Bodies.circle(
    100 + 50 * numSegments + 100 + 50,
    50,
    10,
    {
        collisionFilter: {
            category: tentacleCategory,
            group: group,
        },
        render: {
            strokeStyle: "#ffffff",
            // visible: false,
        }
    }
  )

  Composite.add(tentacleComposite, tentacleEnd);


  ///////// JUNK CODE /////////

//   staticBody = Bodies.circle(100 + 50 * numSegments + 300, 0, 30, {
//     isSensor: true,
//     isStatic: true,
//     collisionFilter: {
//         category: tentacleCategory,
//         group: group,
//       },

//     // collisionFilter: {
//     //   group: group,
//     // },
//     render: {
//       fillStyle: "#fabcfe",
//       visible: true,
//     },
//   });

//   var constraintTip = Constraint.create({
//     bodyA: tentacleComposite.bodies[tentacleComposite.bodies.length - 1],
//     pointA: { x: 0, y: 0 },
//     bodyB: staticBody,
//     pointB: { x: 0, y: 0 },
//     options: {
//       length: 0,
//       damping: 0.1,
//       stiffness: 0.9,
//       render: {
//         visible: true,
//       },
//     },
//     angularStiffness: 0,
//     angularDamping: 0,
//   });

// Composite.add(tentacleComposite, staticBody);

  ///////// JUNK CODE /////////


  Composites.chain(tentacleComposite, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });

  Composite.add(
    tentacleComposite,
    Constraint.create({
      bodyB: tentacleComposite.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: {
        x: tentacleComposite.bodies[0].position.x,
        y: tentacleComposite.bodies[0].position.y,
      },
      stiffness: 0.5,
    //   angularStiffness: 1,
    // angularDamping: 1,
    })
  );



//   Composite.add(tentacleComposite, constraintTip);
  

  Events.on(engine, "collisionStart", function (event) {
    // console.log(mouseConstraint)

    var pairs = event.pairs;

    // for (var i = 0, j = pairs.length; i != j; ++i) {
    //     var pair = pairs[i];
    //     if (pair.bodyA === collider || pair.bodyB === collider) {
    //         if (pair.bodyA === ballHTML || pair.bodyB === ballHTML) {
    //             inBucket.html = true;
    //             console.log("html")
    //         } else if (pair.bodyA === ballCSS || pair.bodyB === ballCSS) {
    //             inBucket.css = true;
    //             console.log("css")
    //         } else if (pair.bodyA === ballJS || pair.bodyB === ballJS) {
    //             inBucket.js = true;
    //             console.log("js")
    //         }
    //     }
    // }

    // if (checkAllIn()) {
    //     console.log("all in!");
    //     // alert("all in!");
    //     if (!spawnedBtn) {
    //         spawnedBtn = true;
    //         World.add(engine.world, [nextBtn]);

    //         var msg = new SpeechSynthesisUtterance();
    //         msg.text = "Now stir the soup to create the game";
    //         msg.volume = 0.4;
    //         window.speechSynthesis.speak(msg);
    //     }

    // }
  });

  Events.on(engine, "collisionEnd", function (event) {
    var pairs = event.pairs;

    // for (var i = 0, j = pairs.length; i != j; ++i) {
    //     var pair = pairs[i];
    //     if (pair.bodyA === collider || pair.bodyB === collider) {
    //         if (pair.bodyA === ballHTML || pair.bodyB === ballHTML) {
    //             inBucket.html = true;
    //             console.log("not html")
    //         } else if (pair.bodyA === ballCSS || pair.bodyB === ballCSS) {
    //             inBucket.css = true;
    //             console.log("not css")
    //         } else if (pair.bodyA === ballJS || pair.bodyB === ballJS) {
    //             inBucket.js = true;
    //             console.log("not js")
    //         }
    //     }
    // }
  });

  Events.on(mouseConstraint, "mousedown", function (event) {
    // if (mouseConstraint.body === nextBtn && checkAllIn()) {
    //     location.replace("../intro/index.html");
    // }
    // if (textNotSpoken) {
    //     textNotSpoken = false;
    //     // play the audio
    //     var msg = new SpeechSynthesisUtterance();
    //     msg.text = "Sugar, spice and everything nice. \
    //         These are the ingredients to make a perfect little game. \
    //         Help us add the 3 items into the soup to create the game";
    //     msg.volume = 0.4;
    //     window.speechSynthesis.speak(msg);
    //     var startAudio = new Audio('../bgm/duck.mp3');
    //     startAudio.volume = 0.1;
    //     startAudio.loop = true;
    //     startAudio.play();
    //     musicNotStarted = false;
    // }
  });

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) {
      return;
    }

    // Body.applyForce(tentacleEnd, tentacleEnd.position, {
    //     x: (mouse.position.x - tentacleEnd.position.x) * 0.1,
    //     y: (mouse.position.y - tentacleEnd.position.y) * 0.1,
    // });

    Body.setVelocity(tentacleEnd, {
        x: (mouse.position.x - tentacleEnd.position.x) * 0.1,
        y: (mouse.position.y - tentacleEnd.position.y) * 0.1,
    });
    
  });

  // add all of the bodies to the world
  World.add(engine.world, [
    ground,
    ceiling,
    leftWall,
    rightWall,
    tentacleComposite,
    // circle,
    // constraintTip,
    // staticBody,
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
