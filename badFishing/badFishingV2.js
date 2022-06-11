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
  // Svg = Matter.Svg,
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
    element: document.getElementById("canvasContainer"),
    engine: engine,
    canvas: fishCanvas,
    options: {
      width: 800,
      height: 600,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true,
      wireframes: false,
      background: "#03a6e1",
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
    netCategory = 0x0004,
    dolphinCategory = 0x0008;
    turtleCategory = 0x0010;
    sharkCategory = 0x0020;
    stingrayCategory = 0x0040;
    whalesharkCategory = 0x0040;

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

  
  /////////////// TENTACLES ///////////////

  group = Body.nextGroup(true);

  var numSegments = 25;
  var startPoint = {
    x: render.canvas.width / 2,
    y: render.canvas.height + 10,
  };

  var tentacleComposite = Composites.stack(
    startPoint.x,
    startPoint.y,
    numSegments,
    1,
    10,
    0,
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

  var tentacleTip = Bodies.rectangle(
    startPoint.x + 50 * numSegments + 100,
    startPoint.y,
    50,
    20,
    {
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
    }
  );

  Composite.add(tentacleComposite, tentacleTip);

  var tentacleEnd = Bodies.circle(
    startPoint.x + 50 * numSegments + 100 + 50,
    startPoint.y,
    5,
    {
      collisionFilter: {
        category: tentacleCategory,
        group: group,
      },
      render: {
        strokeStyle: "#ffffff",
        visible: false,
      },
    }
  );

  Composite.add(tentacleComposite, tentacleEnd);

  Composites.chain(tentacleComposite, 0.3, 0, -0.3, 0, {
    stiffness: 1,
    length: 0,
  });

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


  /////////////// NET ///////////////

  var net = Bodies.rectangle(
    render.canvas.width / 2 - 200,
    render.canvas.height / 2 - 30,
    render.canvas.width,
    20,
    {
      collisionFilter: {
        category: netCategory,
        group: group,
      },
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        sprite: {
          texture: "../assets/images/netTexture.png",
          xScale: 1.6,
          yScale: 1.8,
        },
      },
    }
  );


  /////////////// FISH ///////////////

  var dolphin = Bodies.rectangle(
    render.canvas.width / 2 - 200,
    render.canvas.height / 2 - 30,
    50,
    50,
    {
      collisionFilter: {
        category: dolphinCategory,
        group: group,
      },
      isStatic: true,
      render: {
        fillStyle: "#36c247",
        strokeStyle: "green",
        lineWidth: 0,
        sprite: {
          texture: "../assets/images/dolphin.png",
          xScale: 0.5,
          yScale: 0.5,
        },
      },
    }
  );

  /////////////// EVENTS ///////////////

  Events.on(engine, "collisionStart", function (event) {

    var pairs = event.pairs;

  });

  Events.on(engine, "collisionEnd", function (event) {
    var pairs = event.pairs;

  });

  Events.on(mouseConstraint, "mousedown", function (event) {

  });

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) {
      return;
    }


    if (
      Math.abs(mouse.position.x - tentacleEnd.position.x) < 10 &&
      Math.abs(mouse.position.y - tentacleEnd.position.y) < 10
    ) {
      Body.setVelocity(tentacleEnd, {
        x: 0,
        y: 0,
      });


    } else {
      Body.setVelocity(tentacleEnd, {
        x: (mouse.position.x - tentacleEnd.position.x) * 0.1,
        y: (mouse.position.y - tentacleEnd.position.y) * 0.1,
      });
    }
  });

  // add all of the bodies to the world
  World.add(engine.world, [
    // ground,
    // ceiling,
    // leftWall,
    // rightWall,
    tentacleComposite,
    net,
    // dolphin,
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
