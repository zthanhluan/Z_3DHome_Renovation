import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Dropdown, Form, Button, InputGroup } from 'react-bootstrap';
import './custome.css';
//import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { event } from 'jquery';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import { environments } from './utils/environments.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

function CustomDesign() {
  const [color, setColor] = useState("#ffffff");
  const canvasRef = useRef(null);
  let loader;
  var scene;
  var renderer;
  var camera;
  var controls;
  var floor;
  var floorPosition;
  var movingObject;
  var obj;
  var rightwall;
  var lefttwall;
  var opositewall;
  var doorandwindows;
  var otherObjects = true;
  var deleteObjects = [];
  var light5;
  var roofColorObj;
  var frontWallBox;
  var lefttwallBox;
  var rightwallBox;
  var opositewallBox;
  var frontWallCheck = true;
  var lefttwallCheck = false;
  var rightwallCheck = false;
  var opositewallCheck = false;
  let stats;
  let addObjects = [];

  let allFurniture = {};

  let pmremGenerator;
  let neutralEnvironment;

  // Create a clock
  const clock = new THREE.Clock();
  clock.start();

  let callOnce = true;

  let state = {
    bgColor: 0xcccccc,
  }
  let backgroundColor = new THREE.Color(state.bgColor);

  const highlightedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  var setContent = (object) => {

    object.updateMatrixWorld(); // donmccurdy/three-gltf-viewer#330

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    controls.reset();

    // object.position.x += (object.position.x - center.x);
    // object.position.y += (object.position.y - center.y);
    // object.position.z += (object.position.z - center.z);
    controls.maxDistance = size * 10;
    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();


    camera.position.copy(center);
    camera.position.x += size;
    camera.position.y += size / 2.0;
    camera.position.z += size / 1.0;
    camera.lookAt(center);


    controls.saveState();
    addObjects.push(object);
  }

  var traverseMaterials = (object, callback) => {
    object.traverse((node) => {
      if (!node.isMesh) return;
      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];
      materials.forEach(callback);
    });
  }

  const doorItems = [
    {
      name: "Double Side Steel Door",
      clickHandler: loadDoor.bind(null, 'Models/door/1.gltf', 0.2, 0.2, 0.3)
    },
    {
      name: "Double Side Glass Door",
      clickHandler: loadDoor.bind(null, 'Models/door/2.gltf', 0.2, 0.2, 0.3)
    },
    {
      name: "Double Side Wood Door",
      clickHandler: loadDoor.bind(null, 'Models/door/3.gltf', 0.2, 0.2, 0.3)
    },
    {
      name: "Painted Wood Door",
      clickHandler: loadDoor.bind(null, 'Models/door/4.gltf', 0.4, 0.2, 0.3)
    },
    {
      name: "Wood Door",
      clickHandler: loadDoor.bind(null, 'Models/door/5.gltf', 0.4, 0.2, 0.3)
    }
  ];

  const windowItems = [
    {
      name: "Woodpaper Window",
      clickHandler: loadWindow.bind(null, 'Models/window/1/Project Name.gltf', 4, 4, 5, 0.1)
    },
    {
      name: "Woodpaper Grey Window",
      clickHandler: loadWindow.bind(null, 'Models/window/2/Project Name.gltf', 4, 4, 5, 0.1)
    },
    {
      name: "Updown Window",
      clickHandler: loadWindow.bind(null, 'Models/window/3/Project Name/Project Name.gltf', 0.2, 0.2, 0.2, -0.1)
    },
    {
      name: "Black Glass Window",
      clickHandler: loadWindow.bind(null, 'Models/window/4/Project Name.gltf', 44, 44, 50, 0.1)
    },
    {
      name: "Brown Glass Window",
      clickHandler: loadWindow.bind(null, 'Models/window/5/Project Name/Project Name.gltf', 44, 44, 50, 0.1)
    }
  ];

  const chairItems = [
    {
      name: "Blue Cushion Chair",
      clickHandler: loadChair.bind(null, 'Models/Chairs/Project chair1.gltf.glb', 50, 50, 50)
    },
    {
      name: "Black Cushion Chair",
      clickHandler: loadChair.bind(null, 'Models/Chairs/Project chair2.gltf.glb', 50, 50, 50)
    },
    {
      name: "Sofa Inherited Chair",
      clickHandler: loadChair.bind(null, 'Models/Chairs/Project chair 3.gltf.glb', 5, 5, 5)
    },
    {
      name: "Relaxing Wood Chair",
      clickHandler: loadChair.bind(null, 'Models/Chairs/Project chair 4/Project Name.gltf', 50, 40, 50)
    },
    {
      name: "Couple Chairs",
      clickHandler: loadChair.bind(null, 'Models/Chairs/Project chair_5/Project Name.gltf', 500, 500, 500)
    }
  ];

  const tableItems = [
    {
      name: "Dark Brown Wood Table",
      clickHandler: loadTable.bind(null, 'Models/table/table 1/Project Name.gltf', 8, 8, 6)
    },
    {
      name: "Painted Table",
      clickHandler: loadTable.bind(null, 'Models/table/table 2/Project Name.gltf', 0.1, 0.1, 0.1)
    },
    {
      name: "Blue Plan Table",
      clickHandler: loadTable.bind(null, 'Models/table/table 3/Project Name.gltf', 28, 28, 28)
    },
    {
      name: "Dark Blue Plan Table",
      clickHandler: loadTable.bind(null, 'Models/table/table 4/Project Name.gltf', 28, 28, 28)
    },
    {
      name: "Glass Plan Table",
      clickHandler: loadTable.bind(null, 'Models/table/table 5/Project Name.gltf', 28, 28, 28)
    }
  ];

  const dinningTableItems = [
    {
      name: "Blue Dinning Table With Light",
      clickHandler: loadDinningTable.bind(null, 'Models/dinning table/1/Project Name.gltf', 3.5, 3.5, 3.5)
    },
    {
      name: "4 Person Dinning Table",
      clickHandler: loadDinningTable.bind(null, 'Models/dinning table/2/Project Name.gltf', 22, 22, 22)
    },
    {
      name: "Dark Blue 4 Person Dinning Table",
      clickHandler: loadDinningTable.bind(null, 'Models/dinning table/3/Project Name.gltf', 22, 22, 22)
    },
    {
      name: "Adjustible Dinning Table",
      clickHandler: () => {
        // Không có hàm tải nào được thực hiện ở đây
      }
    },
    {
      name: "4 Person Plan Dinning Table",
      clickHandler: loadDinningTable.bind(null, 'Models/dinning table/5/Project Name.gltf', 3.5, 3.5, 3.5)
    }
  ];

  const cupboardItems = [
    {
      name: "Green Shaded Cupboard",
      clickHandler: loadCupboard.bind(null, 'Models/cupboard/1/Project Name/Project Name.gltf', 25, 25, 25)
    },
    {
      name: "Green Shaded Plan Cupboard",
      clickHandler: loadCupboard.bind(null, 'Models/cupboard/2/Project Name.gltf', 900, 900, 900)
    },
    {
      name: "Parrot Shaded Cupboard",
      clickHandler: loadCupboard.bind(null, 'Models/cupboard/3/Project Name/Project Name.gltf', 30, 30, 30)
    },
    {
      name: "Black Shaded Cupboard",
      clickHandler: loadCupboard.bind(null, 'Models/cupboard/4/Project Name (1)/Project Name.gltf', 30, 30, 30)
    },
    {
      name: "Dark Blue Shaded Cupboard",
      clickHandler: loadCupboard.bind(null, 'Models/cupboard/5/Project Name/Project Name.gltf', 30, 30, 30)
    }
  ];
  const bedItems = [
    {
      name: "Couple Small Bed",
      clickHandler: loadBed.bind(null, 'Models/bed/1/Project Name/Project Name.gltf', 900, 900, 900)
    },
    {
      name: "Couple Comfort Bed",
      clickHandler: loadBed.bind(null, 'Models/bed/2/Project Name.gltf', 900, 900, 900)
    },
    {
      name: "Small Wided Bed",
      clickHandler: loadBed.bind(null, 'Models/bed/3/Project Name.gltf', 900, 900, 900)
    },
    {
      name: "Brown Long Bed",
      clickHandler: loadBed.bind(null, 'Models/bed/4/Project Name.gltf', 900, 900, 900)
    },
    {
      name: "Long White Bed",
      clickHandler: loadBed.bind(null, 'Models/bed/5/Project Name/Project Name.gltf', 700 * 5, 700 * 5, 650 * 5)
    }
  ];

  const floorItems = [
    {
      name: "Sky Blue Floor",
      clickHandler: loadFloor.bind(null, 'Models/floor/1/Project Name/Project Name.gltf', 0x9EDED8)
    },
    {
      name: "Black Sheet Patern Floor",
      clickHandler: loadFloor.bind(null, 'Models/floor/2/Project Name/Project Name.gltf', 0x9EDED8)
    },
    {
      name: "Brown Tiled Floor",
      clickHandler: loadFloor.bind(null, 'Models/floor/3/Project Name/Project Name.gltf', 0x9EDED8)
    },
    {
      name: "Plan Floor",
      clickHandler: loadFloor.bind(null, 'Models/floor/4/Project Name/Project Name.gltf', 0x9EDED8)
    },
    {
      name: "Blue Wood Patern Floor",
      clickHandler: loadFloor.bind(null, 'Models/floor/5/Project Name.gltf', 0x9EDED8)
    }
  ];

  const roofItems = [
    {
      name: "Plan Pattern Roof",
      clickHandler: loadRoof.bind(null, 'Models/roof1/Project Name/Project Name.gltf', 0x6d998f)
    }
  ];

  function loadDoor(url, scaleX, scaleY, scaleZ) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      otherObjects = false;
      doorandwindows = temp;
      obj.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under Door");
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        const windowMesh = gltf.scene;
        //Console.log("windowmesh:" + windowMesh);
        windowMesh.scale.set(scaleX, scaleY, scaleZ);
        windowMesh.position.set(0, 0, 0.1);
        const window2 = windowMesh.clone();
        window2.position.z = -0.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        doorandwindows = group;
        otherObjects = false;
        obj.add(group);
        setContent(doorandwindows);
        allFurniture[tablekey] = doorandwindows.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }

  function loadWindow(url, scaleX, scaleY, scaleZ, positionY) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      otherObjects = false;
      doorandwindows = temp;
      obj.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under window");
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        const windowMesh = gltf.scene;
        //Console.log("windowmesh:" + windowMesh);
        windowMesh.scale.set(scaleX, scaleY, scaleZ);
        windowMesh.position.set(0, positionY, 0.1);
        const window2 = windowMesh.clone();
        window2.position.z = -0.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        doorandwindows = group;
        otherObjects = false;
        obj.add(group);
        setContent(doorandwindows);
        allFurniture[tablekey] = doorandwindows.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }

  function loadChair(url, scaleX, scaleY, scaleZ) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      movingObject = temp;
      otherObjects = true;
      scene.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under Chair");
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        //Console.log(gltf);
        var chair = gltf.scene;
        chair.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        chair.scale.set(scaleX, scaleY, scaleZ);
        chair.position.z += 10;
        chair.rotateY(-Math.PI / 2);
        movingObject = chair;
        otherObjects = true;
        scene.add(chair);
        setContent(chair);
        allFurniture[tablekey] = chair.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }


  function loadTable(url, scaleX, scaleY, scaleZ) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      movingObject = temp;
      otherObjects = true;
      scene.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else 
    {
      clock.start();
      //Console.log("Loading Item under Table");
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        //Console.log(gltf);
        var table = gltf.scene;
        table.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        table.scale.set(scaleX, scaleY, scaleZ);
        table.position.z += 10;
        table.rotateY(-Math.PI / 2);
        movingObject = table;
        otherObjects = true;
        scene.add(table);
        setContent(table);
        allFurniture[tablekey] = table.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }

  function loadDinningTable(url, scaleX, scaleY, scaleZ) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      movingObject = temp;
      otherObjects = true;
      scene.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under Dinning Table");
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        //Console.log(gltf);
        var dinningTable = gltf.scene;
        dinningTable.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        dinningTable.scale.set(scaleX, scaleY, scaleZ);
        dinningTable.position.z += 10;
        dinningTable.rotateY(-Math.PI / 2);
        movingObject = dinningTable;
        otherObjects = true;
        scene.add(dinningTable);
        setContent(dinningTable);
        allFurniture[tablekey] = dinningTable.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }

  function loadCupboard(url, scaleX, scaleY, scaleZ) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      movingObject = temp;
      otherObjects = true;
      scene.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under cubboard");
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        //Console.log(gltf);
        var cupboard = gltf.scene;
        cupboard.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        cupboard.scale.set(scaleX, scaleY, scaleZ);
        cupboard.position.z += 10;
        cupboard.rotateY(-Math.PI / 2);
        movingObject = cupboard;
        otherObjects = true;
        scene.add(cupboard);
        setContent(cupboard);
        allFurniture[tablekey] = cupboard.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }

  function loadBed(url, scaleX, scaleY, scaleZ) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      movingObject = temp;
      otherObjects = true;
      scene.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under bed");
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        //Console.log(gltf);
        var bed = gltf.scene;
        bed.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        bed.scale.set(scaleX, scaleY, scaleZ);
        bed.position.z += 10;
        bed.rotateY(-Math.PI / 2);
        movingObject = bed;
        otherObjects = true;
        scene.add(bed);
        setContent(bed);
        allFurniture[tablekey] = bed.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }


  function loadFloor(url, floorColor) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      otherObjects = true;
      scene.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under floor")
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        //Console.log(gltf);
        floor = gltf.scene;
        floor.position.z = floorPosition + 4;
        floor.scale.x = floorPosition + 1;
        floor.scale.y = 0.3;
        floor.scale.z = floorPosition - 2;
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(floorColor);
          }
        });
        otherObjects = true;
        scene.add(floor);
        setContent(floor);
        allFurniture[tablekey] = floor.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }

  function loadRoof(url, roofColor) {
    const tablekey = `${url}`;
    if (allFurniture[tablekey]) {
      clock.start();
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      const temp = allFurniture[tablekey].clone();
      otherObjects = true;
      roofColorObj = temp;
      scene.add(temp);
      setContent(temp);
      // Print the loading time to the console
      console.log(`GLTF object loaded clone in ${elapsedTime.toFixed(2)} seconds.`);
    } else {
      clock.start();
      //Console.log("Loading Item under roof")
      loader.load(url, function (gltf) {
        // Calculate the elapsed time
        const elapsedTime = clock.getElapsedTime();
        //Console.log(gltf);
        const roof = gltf.scene;
        roof.position.z = floorPosition;
        roof.scale.x = floorPosition + 1;
        roof.scale.y = 0.3;
        roof.scale.z = floorPosition - 2;
        roof.position.y = obj.scale.y / 2;
        roof.position.z += 4;
        roof.rotateY(-Math.PI);
        roof.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(roofColor);
          }
        });
        otherObjects = true;
        roofColorObj = roof;
        scene.add(roof);
        setContent(roof);
        allFurniture[tablekey] = roof.clone();

        // Print the loading time to the console
        console.log(`GLTF object loaded in ${elapsedTime.toFixed(2)} seconds.`);
      });
    }
  }


  const arr = [

    {
      name: "Doors",
      items: doorItems
    },
    {
      name: "Windows",
      items: windowItems
    },
    {
      name: "Chair",
      items: chairItems
    },
    {
      name: "Table",
      items: tableItems
    },
    {
      name: "Dinning Table",
      items: dinningTableItems
    },
    {
      name: "Cupboard",
      items: cupboardItems
    },
    {
      name: "bed",
      items: bedItems
    },
    {
      name: "floor",
      items: floorItems
    },
    {
      name: "Roof",
      items: roofItems
    },
  ]

  useEffect(() => {
    if (!callOnce) return;

    callOnce = false;

    document.addEventListener("DOMContentLoaded", function () {
      const sidebar = document.querySelector(".sidebar");
      const toggleButton = document.querySelector(".sidebar-toggle");

      toggleButton?.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-collapsed");
        toggleButton.querySelector(".sidebar-toggle-icon").classList.toggle("arrow-up");
        toggleButton.querySelector(".sidebar-toggle-icon").classList.toggle("arrow-down");
      });

    });


    var canvas = document.querySelector('.webgl');
    scene = new THREE.Scene();
    scene.background = backgroundColor;
    var width = 0;
    var length = 0;


    // adding lights
    const light = new THREE.DirectionalLight(0xEDE4E2, 1);
    light.position.set(2, 2, 5);
    scene.add(light);

    const light1 = new THREE.DirectionalLight(0xEDE4E2, 1);
    light1.position.set(-2, -2, -5);
    scene.add(light1);


    const light2 = new THREE.DirectionalLight(0xEDE4E2, 1);
    light2.position.set(0, 2, 0);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xEDE4E2, 1);
    light3.position.set(2, 2, 0);
    scene.add(light3);

    const light4 = new THREE.DirectionalLight(0xEDE4E2, 1);
    light4.position.set(-2, 2, 0);
    scene.add(light4);

    light5 = new THREE.DirectionalLight(0xEDE4E2, 1);
    light5.position.set(0, 1, 0);
    light5.position.copy(new THREE.Vector3(0.5, -37, 8));
    scene.add(light5);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 1000);
    //camera.fov = 100;
    camera.position.set(0, 30, 30);
    camera.updateProjectionMatrix();
    scene.add(camera);

    // const light1 = new THREE.AmbientLight(0xFFFFFF, 0.3);
    // camera.add(light1);

    // const light2 = new THREE.DirectionalLight(0xFFFFFF, 0.8 * Math.PI);
    // light2.position.set(0.5, 0, 0.866); // ~60º
    // camera.add(light2);


    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });

    renderer.useLegacyLights = false;
    //renderer.setClearColor(0xcccccc);
    renderer.setSize(sizes.width / 1.55, sizes.height / 1.55);
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.shadowMap.enabled = true;
    //renderer.gammaOutput = true;
    //renderer.render(scene,camera);

    pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    neutralEnvironment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

    updateEnvironment(1);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.screenSpacePanning = true;
    controls.addEventListener('change', function () { });



    loader = new GLTFLoader();
    //const loader = useLoader(GLTFLoader, "src/Models/Walls/scene.glb" );
    loader.load('Models/Walls/Scene.glb', function (gltf) {
      // Calculate the elapsed time
      const elapsedTime = clock.getElapsedTime();
      //Console.log(gltf);
      obj = gltf.scene;
      // assigning dummy values
      //obj.scale.x = (localStorage.getItem('width')/10)*12;
      obj.scale.x = 12 * 12 / 10;
      floorPosition = obj.scale.x;
      //obj.scale.y = (localStorage.getItem('height')/10)*15;
      obj.scale.y = 12 * 15 / 10;
      obj.scale.z = obj.scale.z * 4;
      obj.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(0xb69090);
        }
      });
      // getting width of object inorder make room structure
      const boundingBox = new THREE.Box3().setFromObject(obj);
      width = boundingBox.getSize(new THREE.Vector3()).x;
      ////Console.log("width of wall is :"+width);
      const boundingBox1 = new THREE.Box3().setFromObject(obj);
      length = boundingBox1.getSize(new THREE.Vector3()).y;
      // //diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(length, 2));
      // // cloning other 3 walls for room
      rightwall = obj.clone();
      lefttwall = obj.clone();
      opositewall = obj.clone();
      // // rotation of walls with respect to there positions
      rightwall.rotateY(Math.PI / 2);
      lefttwall.rotateY(-Math.PI / 2);
      opositewall.rotateY(Math.PI);
      // // posstions of walls with respect to x, y, and z
      rightwall.position.x += width / 2;
      rightwall.position.z += width / 2;
      lefttwall.position.x -= width / 2;
      lefttwall.position.z += width / 2;
      opositewall.position.z += width;
      // //alert("Leftwall points("+lefttwall.position.x+","+lefttwall.position.y+")\nRightwall points("+rightwall.position.x+","+rightwall.position.y+")");
      // //floorx = distance(lefttwall.position.x,lefttwall.position.y,rightwall.position.x,rightwall.position.y);
      //width=Math.abs(lefttwall.position.x-rightwall.position.x);
      //length=Math.abs(obj.position.z-opositewall.position.z);
      frontWallBox = new THREE.Box3().setFromObject(obj);
      lefttwallBox = new THREE.Box3().setFromObject(lefttwall);
      rightwallBox = new THREE.Box3().setFromObject(rightwall);
      opositewallBox = new THREE.Box3().setFromObject(opositewall);

      scene.add(obj);
      scene.add(rightwall);
      scene.add(lefttwall);
      scene.add(opositewall);
      // Print the loading time to the console
      console.log(`GLTF object loaded in ${elapsedTime.toFixed(4)} seconds.`);
    });

    // add mouse listener here
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        for (let i = 0; i < deleteObjects.length; i++) {
          // traverseMaterials(deleteObjects[i], (material) => {
          //   material.wireframe = false;
          // });
          deleteObjects[i].traverse((node) => {
            if (node.isMesh) {
              node.material = node.userData.material;
            }
          })
        }
        deleteObjects = [];
      }

      if (otherObjects === true) {
        if (movingObject) {
          if (event.keyCode === 65) {
            movingObject.position.x -= 0.5;

          }
          if (event.keyCode === 68) {
            movingObject.position.x += 0.5;

          }
          if (event.keyCode === 87) {
            movingObject.position.z -= 0.5;

          }
          if (event.keyCode === 83) {
            movingObject.position.z += 0.5;

          }
          if (event.keyCode === 76) {
            movingObject.rotation.y += 0.05;

          }
          if (event.keyCode === 82) {
            movingObject.rotation.y -= 0.05;

          }
        }
      } else {
        if (doorandwindows) {
          const doorAndWindowBox = new THREE.Box3().setFromObject(doorandwindows);
          if (frontWallCheck) {
            if (event.keyCode === 65) {
              doorandwindows.position.x -= 0.05;
              if (doorAndWindowBox.intersectsBox(lefttwallBox)) {
                ////Console.log("Collision with left wall detected");
                frontWallCheck = false;
                lefttwallCheck = true;
                obj.remove(doorandwindows);
                lefttwall.add(doorandwindows);
                doorandwindows.rotateY(Math.PI);
                doorandwindows.position.x += 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 68) {
              doorandwindows.position.x += 0.05;
              if (doorAndWindowBox.intersectsBox(rightwallBox)) {
                ////Console.log("Collision with right wall detected");
                frontWallCheck = false;
                rightwallCheck = true;
                obj.remove(doorandwindows);
                rightwall.add(doorandwindows);
                doorandwindows.rotateY(Math.PI);
                doorandwindows.position.x -= 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 87) {
              doorandwindows.position.y += 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }
            if (event.keyCode === 83) {
              doorandwindows.position.y -= 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }

          }
          if (rightwallCheck) {
            if (event.keyCode === 65) {
              doorandwindows.position.x += 0.05;
              if (doorAndWindowBox.intersectsBox(frontWallBox)) {
                ////Console.log("Collision with front wall detected");
                rightwallCheck = false;
                frontWallCheck = true;
                rightwall.remove(doorandwindows);
                obj.add(doorandwindows);
                doorandwindows.rotateY(Math.PI);
                doorandwindows.position.x -= 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 68) {
              doorandwindows.position.x -= 0.05;
              if (doorAndWindowBox.intersectsBox(opositewallBox)) {
                ////Console.log("Collision with opposite wall detected");
                rightwallCheck = false;
                opositewallCheck = true;
                rightwall.remove(doorandwindows);
                opositewall.add(doorandwindows);
                doorandwindows.rotateY(Math.PI);
                doorandwindows.position.x += 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 87) {
              doorandwindows.position.y += 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }
            if (event.keyCode === 83) {
              doorandwindows.position.y -= 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }
          }
          if (opositewallCheck) {
            if (event.keyCode === 65) {
              doorandwindows.position.x -= 0.05;
              if (doorAndWindowBox.intersectsBox(rightwallBox)) {
                ////Console.log("Collision with right wall detected");
                opositewallCheck = false;
                rightwallCheck = true;
                opositewall.remove(doorandwindows);
                rightwall.add(doorandwindows);
                doorandwindows.rotateY(Math.PI);
                doorandwindows.x += 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 68) {
              doorandwindows.position.x += 0.05;
              if (doorAndWindowBox.intersectsBox(lefttwallBox)) {
                ////Console.log("Collision with left wall detected");
                opositewallCheck = false;
                lefttwallCheck = true;
                opositewall.remove(doorandwindows);
                lefttwall.add(doorandwindows);
                doorandwindows.rotateY(Math.PI);
                doorandwindows.x -= 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 87) {
              doorandwindows.position.y += 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }
            if (event.keyCode === 83) {
              doorandwindows.position.y -= 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }
          }
          if (lefttwallCheck) {
            if (event.keyCode === 65) {
              doorandwindows.position.x += 0.05;
              if (doorAndWindowBox.intersectsBox(opositewallBox)) {
                ////Console.log("Collision with oposite wall detected");
                lefttwallCheck = false;
                opositewallCheck = true;
                lefttwall.remove(doorandwindows);
                opositewall.add(doorandwindows);
                doorandwindows.rotateY(Math.PI);
                doorandwindows.position.x -= 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 68) {
              doorandwindows.position.x -= 0.05;
              if (doorAndWindowBox.intersectsBox(frontWallBox)) {
                ////Console.log("Collision with front wall detected");
                lefttwallCheck = false;
                frontWallCheck = true;
                lefttwall.remove(doorandwindows);
                obj.add(doorandwindows);
                doorandwindows.rotateY(-Math.PI);
                doorandwindows.position.x += 0.05;

              }
              ////Console.log("door and window position :"+ doorandwindows.position.x);

            }
            if (event.keyCode === 87) {
              doorandwindows.position.y += 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }
            if (event.keyCode === 83) {
              doorandwindows.position.y -= 0.05;
              ////Console.log("door and window position :"+ doorandwindows.position.y);

            }
          }
        }


      }
    }



    // object detection
    // Create a new Raycaster
    const raycaster = new THREE.Raycaster();

    // Add a click event listener to the renderer
    renderer.domElement.addEventListener('click', onObjectClick, false);

    function onObjectClick(event) {
      // Calculate mouse position in normalized device coordinates
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / (sizes.width)) * 2 - 1;
      mouse.y = -(event.clientY / (sizes.height)) * 2 + 1;

      // Set the raycaster's position and direction
      raycaster.setFromCamera(mouse, camera);

      // Get the intersected objects
      const intersects = raycaster.intersectObjects(addObjects, true);

      // Check if any objects were intersected
      if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
          const clickedObject = intersects[0].object;

          const completeObject = clickedObject.parent;
          // traverseMaterials(clickedObject, (material) => {
          //   material.wireframe = true;
          // });
          completeObject.traverse((node) => {
            if (node.isMesh) {
              if (!node.userData.material)
                node.userData.material = node.material.clone();
              node.material = highlightedMaterial;
            }
          })
          movingObject = completeObject;
          //Console.log(completeObject);
          deleteObjects.push(completeObject);
        }
      }
    }


    // detele event listener
    // Get the delete button element
    const deleteButton = document.getElementById('delete');

    // Add a click event listener to the delete button
    deleteButton.addEventListener('click', onDeleteButtonClick);

    function onDeleteButtonClick(event) {
      // Do something when the delete button is clicked
      //Console.log("delete is clicked");
      //deleteObject.removeFromParent();
      for (let i = 0; i < deleteObjects.length; i++) {
        deleteObjects[i].removeFromParent();
        movingObject = null;
      }
      deleteObjects = [];

    }

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width / 1.55, sizes.height / 1.55);
    }

    //stats setup
    stats = new Stats();
    document.body.appendChild(stats.dom);

    animate();

    document.addEventListener('keydown', onKeyDown, false);

    function handleChangeColor(event) {
      var colorValue = event.target.value;
      //Console.log('Selected color:', colorValue);
      //Console.log(colorValue[0]);
      colorValue = "0x" + colorValue.substring(1);
      //Console.log(colorValue);
      obj.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(colorValue);
        }
      });
      lefttwall.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(colorValue);
        }
      });
      rightwall.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(colorValue);
        }
      });
      opositewall.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(colorValue);
        }
      });

    }

    // const picker = document.getElementById('color-picker');
    // picker.addEventListener('change', handleChangeColor);   

    // var favcolor = document.getElementById('favcolor');
    // favcolor.addEventListener('input', function () {
    //   //Console.log(favcolor.value);
    //   backgroundColor.setHex(favcolor.value);
    //   scene.background = 0xff0000;
    //   scene.environment = '';
    // });

    var bgrco = document.getElementById('favcolor');
    // Add an event listener to the color picker
    bgrco.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = bgrco.value;
      // Do something with the hex color value
      scene.background = new THREE.Color(hexColor);
    });

    var colorPickerWall = document.getElementById('color-picker-wall');
    // Add an event listener to the color picker
    colorPickerWall.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerWall.value;
      // Do something with the hex color value
      //Console.log('Selected color:', hexColor);
      obj.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(new THREE.Color(hexColor));
        }
      });

    });

    var colorPickerRoof = document.getElementById('color-picker-roof');
    // Add an event listener to the color picker
    colorPickerRoof.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerRoof.value;
      // Do something with the hex color value
      //Console.log('Selected color:', hexColor);
      if (roofColorObj == null) {
        //Console.log("Roof is not added");
      } else {
        roofColorObj.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(new THREE.Color(hexColor));
          }
        });
      }

    });


    var colorPickerObject = document.getElementById('color-picker-object');
    // Add an event listener to the color picker
    colorPickerObject.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerObject.value;
      // Do something with the hex color value
      //Console.log('Selected color:', hexColor);
      if (otherObjects === true) {
        if (deleteObjects.length === 0) {
          //Console.log("Object is not selected");
        } else {
          for (let i = 0; i < deleteObjects.length; i++) {
            deleteObjects[i].traverse((object) => {
              if (object.isMesh) {
                object.material.color.set(new THREE.Color(hexColor));
              }
            });
          }
        }
      } else {
        if (doorandwindows === null) {
          //Console.log("Object is not selected ");
        } else {
          doorandwindows.traverse((object) => {
            if (object.isMesh) {
              object.material.color.set(new THREE.Color(hexColor));
            }
          });
        }
      }

    });


    var colorPickerFloor = document.getElementById('color-picker-floor');
    // Add an event listener to the color picker
    colorPickerFloor.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerFloor.value;
      // Do something with the hex color value
      //Console.log('Selected color:', hexColor);
      if (floor == null) {
        //Console.log("Floor is not added");
      } else {
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(new THREE.Color(hexColor));
          }
        });
      }

    });

    var downloadButton = document.getElementById('download');
    downloadButton.addEventListener('click', downloadScene);

    // Function to download the scene
    function downloadScene() {
      // Create a GLTFExporter instance
      var exporter = new GLTFExporter();

      // Export the scene to GLTF format
      exporter.parse(scene, function (result) {
        var output = JSON.stringify(result, null, 2);

        // Create a download link
        var downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([output], { type: 'application/octet-stream' }));
        downloadLink.download = 'room.gltf'; // Set the desired file name and extension

        // Trigger the download
        downloadLink.click();
      }, { binary: true });
    }

    // add env here
    const group = document.querySelector("#group");
    group.innerHTML = environments.map((env) => `<div>
                <label htmlFor="${env}">${env.name} :</label>
                <input type="radio" name="env" value="${env.index}">
            </div>`).join('');

    // add an event listener for the change event
    const radioButtons = document.querySelectorAll('input[name="env"]');
    for (const radioButton of radioButtons) {
      radioButton.addEventListener('change', showSelected);
    }

    function showSelected(e) {
      if (this.checked) {
        updateEnvironment(this.value);
      }
    }

    function updateEnvironment(index) {

      const environment = environments[index];

      getCubeMapTexture(environment).then(({ envMap }) => {

        scene.environment = envMap;
        scene.background = (index !== 3) ? envMap : backgroundColor;

      });

    }

    function getCubeMapTexture(environment) {
      const { id, path } = environment;

      // neutral (THREE.RoomEnvironment)
      if (id === 'neutral') {

        return Promise.resolve({ envMap: neutralEnvironment });

      }

      // none
      if (id === '') {

        return Promise.resolve({ envMap: null });

      }

      return new Promise((resolve, reject) => {

        new EXRLoader()
          .load(path, (texture) => {

            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
            pmremGenerator.dispose();

            resolve({ envMap });

          }, undefined, reject);

      });

    }
  }, []);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    stats.update();
    renderer.render(scene, camera);
  }

  return (
    <Container fluid>
      <Row>
        {/* Left Sidebar */}
        <Col md={3} lg={2} className="left-sidebar">
          <div className="left-sidebar-container">
            <div className="arrow-icon"></div>
            <div className="search-container">
              <Form>
                <Form.Control type="text" placeholder="Search" className="search-box" />
                <Button variant="light" className="search-btn">
                  Search
                </Button>
              </Form>
              <hr className="search-hr" />
              {arr.map((item, i) => (
                <Dropdown key={i} className="dropdown">
                  <Dropdown.Toggle variant="secondary">
                    {item.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {item.items.map((dropItem, ind) => (
                      <Dropdown.Item key={ind} onClick={() => { dropItem.clickHandler(item) }}> {dropItem.name}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ))}
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col md={6} lg={8} className="main-content">
          <div className="main-content-container">
            <Button variant="light" id="download" className="reset-btn">Download</Button>
            <Button variant="light" id="delete" className="delete-btn">Delete</Button>
            <label className="label-info"> Left click to select object, Esc to unselect, AWSD to move, LR to turn</label>
            <div id="scene"> <canvas className="webgl"  ></canvas> </div>
          </div>
        </Col>

        {/* Right Sidebar */}
        <Col md={3} lg={2} className="right-sidebar">
          <div className="right-sidebar-container">
            <h1>Change Background</h1>
            <div id="group"></div>
            <label htmlFor="favcolor">Select your favorite color:</label>
            <Form.Control type="color" defaultValue="#ffffff" id="favcolor" name="favcolor" />
            <h1>Change Color</h1>
            <label>Walls Color</label>
            <hr className="right-hr" />
            <Form.Control type="color" defaultValue="#ffffff" id="color-picker-wall" />
            <label>Roof Color</label>
            <hr className="right-hr" />
            <Form.Control type="color" defaultValue="#ffffff" id="color-picker-roof" />
            <label>Objects Color</label>
            <hr className="right-hr" />
            <Form.Control type="color" defaultValue="#ffffff" id="color-picker-object" />
            <label>Floor Color</label>
            <hr className="right-hr" />
            <Form.Control type="color" defaultValue="#ffffff" id="color-picker-floor" />
          </div>
        </Col>
      </Row>
    </Container >



  );
}
export default CustomDesign;