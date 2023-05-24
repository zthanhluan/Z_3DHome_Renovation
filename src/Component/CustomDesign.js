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
  var deleteObject;
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
  let arrayMeshs = [];
  let furnitures = {};
  let modelReady = false;

  const addnewFur = (clone) => {
    frontWallCheck = true;
    lefttwallCheck = false;
    rightwallCheck = false;
    opositewallCheck = false;
    doorandwindows = null;
    doorandwindows = clone;
    clone.visible = true;
    otherObjects = false;
    obj.add(clone);
  }
  const arr = [

    {
      name: "Doors",
      items: [{
        name: "Double Side Steel Door",
        clickHandler: () => {
          addnewFur(furnitures.door1.clone());
        },
      },
      {
        name: "Double Side Glass Door",
        clickHandler: () => {
          addnewFur(furnitures.door2.clone());
        },
      },
      {
        name: "Double Side Wood Door",
        clickHandler: () => {
          addnewFur(furnitures.door3.clone());

        },
      },
      {
        name: "Painted Wood Door",
        clickHandler: () => {
          addnewFur(furnitures.door4.clone());

        },
      },
      {
        name: "Wood Door",
        clickHandler: () => {
          addnewFur(furnitures.door5.clone());

        },
      },
      ]
    },
    {
      name: "Windows",
      items: [{
        name: "Woodpaper Window",
        clickHandler: () => {
          addnewFur(furnitures.window1.clone());

        },
      },
      {
        name: "Woodpaper Grey Window",
        clickHandler: () => {
          addnewFur(furnitures.window2.clone());

        },
      },
      {
        name: "Updown Window",
        clickHandler: () => {
          addnewFur(furnitures.window3.clone());

        },
      },
      {
        name: "Black Glass Window",
        clickHandler: () => {
          addnewFur(furnitures.window4.clone());

        },
      },
      {
        name: "Brown Glass Window",
        clickHandler: () => {
          addnewFur(furnitures.window5.clone());

        },
      },
      ]
    },
    {
      name: "Chair",
      items: [{
        name: "Blue Cushion Chair",
        clickHandler: () => {
          var clone = furnitures.chair1.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      {
        name: "Black Cushion Chair",
        clickHandler: () => {
          var clone = furnitures.chair2.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      {
        name: "Sofa Inherited Chair",
        clickHandler: () => {
          var clone = furnitures.chair3.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      {
        name: "Relaxing Wood Chair",
        clickHandler: () => {
          var clone = furnitures.chair4.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      {
        name: "Couple Chairs",
        clickHandler: () => {
          var clone = furnitures.chair5.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      ]
    },
    {
      name: "Table",
      items: [{
        name: "Dark Brown Wood Table",
        clickHandler: () => {
          var clone = furnitures.table1.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      {
        name: "Painted Table",
        clickHandler: () => {
          var clone = furnitures.table2.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Blue Plan Table",
        clickHandler: () => {
          var clone = furnitures.table3.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Dark Blue Plan Table",
        clickHandler: () => {
          var clone = furnitures.table4.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Glass Plan Table",
        clickHandler: () => {
          var clone = furnitures.table5.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      ]
    },
    {
      name: "Dinning Table",
      items: [{
        name: "Blue Dinning Table With Light",
        clickHandler: () => {
          var clone = furnitures.dinningtable1.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "4 Person Dinning Table",
        clickHandler: () => {
          var clone = furnitures.dinningtable2.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Dark Blue 4 Person Dinning Table",
        clickHandler: () => {
          var clone = furnitures.dinningtable3.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Adjustible Dinning Table",
        clickHandler: () => {
          var clone = furnitures.dinningtable4.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "4 Person Plan Dinning Table",
        clickHandler: () => {
          var clone = furnitures.dinningtable5.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      ]
    },
    {
      name: "Cupboard",
      items: [{
        name: "Green Shaded Cupboard",
        clickHandler: () => {
          var clone = furnitures.cupboard1.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Green Shaded Plan Cupboard",
        clickHandler: () => {
          var clone = furnitures.cupboard2.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Parrot Shaded Cupboard",
        clickHandler: () => {
          var clone = furnitures.cupboard3.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Black Shaded Cupboard",
        clickHandler: () => {
          var clone = furnitures.cupboard4.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Dark Blue Shaded Cupboard",
        clickHandler: () => {
          var clone = furnitures.cupboard5.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      ]
    },
    {
      name: "bed",
      items: [{
        name: "Couple Small Bed",
        clickHandler: () => {
          var clone = furnitures.bed1.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Couple Comfort Bed",
        clickHandler: () => {
          var clone = furnitures.bed2.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Small Wided Bed",
        clickHandler: () => {
          var clone = furnitures.bed3.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Brown Long Bed",
        clickHandler: () => {
          var clone = furnitures.bed4.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);

        },
      },
      {
        name: "Long White Bed",
        clickHandler: () => {
          var clone = furnitures.bed5.clone();
          clone.visible = true;
          movingObject = clone;
          otherObjects = true;
          scene.add(clone);
        },
      },
      ]
    },
    {
      name: "floor",
      items: [{
        name: "Sky Blue Floor",
        clickHandler: () => {
          furnitures.floor1.visible = true;
          furnitures.floor2.visible = false;
          furnitures.floor3.visible = false;
          furnitures.floor4.visible = false;
          furnitures.floor5.visible = false;
          otherObjects = true;
          scene.add(furnitures.floor1);
        },
      },
      {
        name: "Black Sheet Patern Floor",
        clickHandler: () => {
          furnitures.floor2.visible = true;
          furnitures.floor1.visible = false;
          furnitures.floor3.visible = false;
          furnitures.floor4.visible = false;
          furnitures.floor5.visible = false;
          otherObjects = true;
          scene.add(furnitures.floor2);

        },
      },
      {
        name: "Brown Tiled Floor",
        clickHandler: () => {
          furnitures.floor3.visible = true;
          furnitures.floor2.visible = false;
          furnitures.floor1.visible = false;
          furnitures.floor4.visible = false;
          furnitures.floor5.visible = false;
          otherObjects = true;
          scene.add(furnitures.floor3);
        },
      },
      {
        name: "Plan Floor",
        clickHandler: () => {
          furnitures.floor4.visible = true;
          furnitures.floor2.visible = false;
          furnitures.floor3.visible = false;
          furnitures.floor1.visible = false;
          furnitures.floor5.visible = false;
          otherObjects = true;
          scene.add(furnitures.floor4);

        },
      },
      {
        name: "Blue Wood Patern Floor",
        clickHandler: () => {
          furnitures.floor5.visible = true;
          furnitures.floor2.visible = false;
          furnitures.floor3.visible = false;
          furnitures.floor4.visible = false;
          furnitures.floor1.visible = false;
          otherObjects = true;
          scene.add(furnitures.floor5);
        },
      },
      ]
    },
    {
      name: "Roof",
      items: [{
        name: "Plan Pattern Roof",
        clickHandler: () => {
          furnitures.roof1.visible = true;
          otherObjects = true;
          roofColorObj = furnitures.roof1;
          scene.add(furnitures.roof1);

        },
      },

      ]
    },


  ]


  useEffect(() => {


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
    scene.background = new THREE.Color(0xdddddd);
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

    camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000);
    camera.fov = 100;
    camera.position.set(0, 6, 6);
    camera.updateProjectionMatrix();
    scene.add(camera);

    // const axesHelper = new THREE.AxesHelper(10);
    // scene.add( axesHelper );

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });

    renderer.setSize(800, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.gammaOutput = true;
    renderer.render(scene, camera);

    controls = new OrbitControls(camera, renderer.domElement);
    //controls.target.set(0, 0, 0);
    controls.addEventListener('change', function () { });

    modelReady = false;
    initFurniture();

    //stats setup
    stats = new Stats();
    document.body.appendChild(stats.dom);

    animate();

    // add mouse listener here
    function onKeyDown(event) {
      if (otherObjects === true) {
        if (event.keyCode === 65) {
          movingObject.position.x -= 0.5;
          //animate();
        }
        if (event.keyCode === 68) {
          movingObject.position.x += 0.5;
          //animate();
        }
        if (event.keyCode === 87) {
          movingObject.position.z -= 0.5;
          //animate();
        }
        if (event.keyCode === 83) {
          movingObject.position.z += 0.5;
          //animate();
        }
        if (event.keyCode === 76) {
          movingObject.rotation.y += 0.05;
          //animate();
        }
        if (event.keyCode === 82) {
          movingObject.rotation.y -= 0.05;
          //animate();
        }
      } else {
        const doorAndWindowBox = new THREE.Box3().setFromObject(doorandwindows);
        if (frontWallCheck) {
          if (event.keyCode === 65) {
            doorandwindows.position.x -= 0.05;
            if (doorAndWindowBox.intersectsBox(lefttwallBox)) {
              //console.log("Collision with left wall detected");
              frontWallCheck = false;
              lefttwallCheck = true;
              obj.remove(doorandwindows);
              lefttwall.add(doorandwindows);
              doorandwindows.rotateY(Math.PI);
              doorandwindows.position.x += 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 68) {
            doorandwindows.position.x += 0.05;
            if (doorAndWindowBox.intersectsBox(rightwallBox)) {
              //console.log("Collision with right wall detected");
              frontWallCheck = false;
              rightwallCheck = true;
              obj.remove(doorandwindows);
              rightwall.add(doorandwindows);
              doorandwindows.rotateY(Math.PI);
              doorandwindows.position.x -= 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 87) {
            doorandwindows.position.y += 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
          }
          if (event.keyCode === 83) {
            doorandwindows.position.y -= 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
          }

        }
        if (rightwallCheck) {
          if (event.keyCode === 65) {
            doorandwindows.position.x += 0.05;
            if (doorAndWindowBox.intersectsBox(frontWallBox)) {
              //console.log("Collision with front wall detected");
              rightwallCheck = false;
              frontWallCheck = true;
              rightwall.remove(doorandwindows);
              obj.add(doorandwindows);
              doorandwindows.rotateY(Math.PI);
              doorandwindows.position.x -= 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 68) {
            doorandwindows.position.x -= 0.05;
            if (doorAndWindowBox.intersectsBox(opositewallBox)) {
              //console.log("Collision with opposite wall detected");
              rightwallCheck = false;
              opositewallCheck = true;
              rightwall.remove(doorandwindows);
              opositewall.add(doorandwindows);
              doorandwindows.rotateY(Math.PI);
              doorandwindows.position.x += 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 87) {
            doorandwindows.position.y += 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
          }
          if (event.keyCode === 83) {
            doorandwindows.position.y -= 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
          }
        }
        if (opositewallCheck) {
          if (event.keyCode === 65) {
            doorandwindows.position.x -= 0.05;
            if (doorAndWindowBox.intersectsBox(rightwallBox)) {
              //console.log("Collision with right wall detected");
              opositewallCheck = false;
              rightwallCheck = true;
              opositewall.remove(doorandwindows);
              rightwall.add(doorandwindows);
              doorandwindows.rotateY(Math.PI);
              doorandwindows.x += 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 68) {
            doorandwindows.position.x += 0.05;
            if (doorAndWindowBox.intersectsBox(lefttwallBox)) {
              //console.log("Collision with left wall detected");
              opositewallCheck = false;
              lefttwallCheck = true;
              opositewall.remove(doorandwindows);
              lefttwall.add(doorandwindows);
              doorandwindows.rotateY(Math.PI);
              doorandwindows.x -= 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 87) {
            doorandwindows.position.y += 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
          }
          if (event.keyCode === 83) {
            doorandwindows.position.y -= 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
          }
        }
        if (lefttwallCheck) {
          if (event.keyCode === 65) {
            doorandwindows.position.x += 0.05;
            if (doorAndWindowBox.intersectsBox(opositewallBox)) {
              //console.log("Collision with oposite wall detected");
              lefttwallCheck = false;
              opositewallCheck = true;
              lefttwall.remove(doorandwindows);
              opositewall.add(doorandwindows);
              doorandwindows.rotateY(Math.PI);
              doorandwindows.position.x -= 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 68) {
            doorandwindows.position.x -= 0.05;
            if (doorAndWindowBox.intersectsBox(frontWallBox)) {
              //console.log("Collision with front wall detected");
              lefttwallCheck = false;
              frontWallCheck = true;
              lefttwall.remove(doorandwindows);
              obj.add(doorandwindows);
              doorandwindows.rotateY(-Math.PI);
              doorandwindows.position.x += 0.05;
              //animate();
            }
            //console.log("door and window position :"+ doorandwindows.position.x);
            //animate();
          }
          if (event.keyCode === 87) {
            doorandwindows.position.y += 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
          }
          if (event.keyCode === 83) {
            doorandwindows.position.y -= 0.05;
            //console.log("door and window position :"+ doorandwindows.position.y);
            //animate();
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
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Set the raycaster's position and direction
      raycaster.setFromCamera(mouse, camera);

      // Get the intersected objects
      const intersects = raycaster.intersectObjects(scene.children, true);

      // Check if any objects were intersected
      if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
          const clickedObject = intersects[i].object;
          const completeObject = clickedObject.parent;
          //console.log(completeObject);
          deleteObject = completeObject;
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
      console.log("delete is clicked");
      deleteObject.removeFromParent();
      //animate();
    }





    document.addEventListener('keydown', onKeyDown, false);

    function handleChangeColor(event) {
      var colorValue = event.target.value;
      console.log('Selected color:', colorValue);
      console.log(colorValue[0]);
      colorValue = "0x" + colorValue.substring(1);
      console.log(colorValue);
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
      //animate();
    }

    // const picker = document.getElementById('color-picker');
    // picker.addEventListener('change', handleChangeColor);    

    var colorPickerWall = document.getElementById('color-picker-wall');
    // Add an event listener to the color picker
    colorPickerWall.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerWall.value;
      // Do something with the hex color value
      console.log('Selected color:', hexColor);
      obj.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(new THREE.Color(hexColor));
        }
      });
      //animate();
    });

    var colorPickerRoof = document.getElementById('color-picker-roof');
    // Add an event listener to the color picker
    colorPickerRoof.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerRoof.value;
      // Do something with the hex color value
      console.log('Selected color:', hexColor);
      if (roofColorObj == null) {
        console.log("Roof is not added");
      } else {
        roofColorObj.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(new THREE.Color(hexColor));
          }
        });
      }
      //animate();
    });


    var colorPickerObject = document.getElementById('color-picker-object');
    // Add an event listener to the color picker
    colorPickerObject.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerObject.value;
      // Do something with the hex color value
      console.log('Selected color:', hexColor);
      if (otherObjects === true) {
        if (deleteObject === null) {
          console.log("Object is not selected");
        } else {
          deleteObject.traverse((object) => {
            if (object.isMesh) {
              object.material.color.set(new THREE.Color(hexColor));
            }
          });
        }
      } else {
        if (doorandwindows === null) {
          console.log("Object is not selected ");
        } else {
          doorandwindows.traverse((object) => {
            if (object.isMesh) {
              object.material.color.set(new THREE.Color(hexColor));
            }
          });
        }
      }
      //animate();
    });


    var colorPickerFloor = document.getElementById('color-picker-floor');
    // Add an event listener to the color picker
    colorPickerFloor.addEventListener('input', function () {
      // Retrieve the selected color value
      var hexColor = colorPickerFloor.value;
      // Do something with the hex color value
      console.log('Selected color:', hexColor);
      if (floor == null) {
        console.log("Floor is not added");
      } else {
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(new THREE.Color(hexColor));
          }
        });
      }
      //animate();
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

    function autoFit() {
      const FIT_OFFSET = 0.8;

      if (arrayMeshs.length < 1) {
        camera.near = 0.1;
        camera.far = 1000;
        camera.position.set(0, 4, 6);
        camera.updateProjectionMatrix();
        controls.maxDistance = Infinity;
        controls.minDistance = 0;
        return;
      }

      const checkLastValueInArray = [arrayMeshs[arrayMeshs.length - 1]];
      let { minX = 0, minY = 0, minZ = 0, maxX = 0, maxY = 0, maxZ = 0 } = {};
      let isFirst = true;
      let isExistBox = false;
      for (const localMesh of checkLastValueInArray) {
        if (localMesh instanceof THREE.Mesh) {
          const posAttr = localMesh.geometry.getAttribute("position");
          if (posAttr.count == 0) continue;

          localMesh.geometry.computeBoundingBox()

          if (localMesh.geometry.boundingBox.isBox3) {
            var bBox = new THREE.Box3().copy(localMesh.geometry.boundingBox);
            bBox.applyMatrix4(localMesh.matrixWorld);
            isExistBox = true;

            if (isFirst) {
              minX = bBox.min.x;
              minY = bBox.min.y;
              minZ = bBox.min.z;
              maxX = bBox.max.x;
              maxY = bBox.max.y;
              maxZ = bBox.max.z;
              isFirst = false;
            }
            // compute overall bbox (bbox contains the origin)
            minX = Math.min(minX, bBox.min.x);
            minY = Math.min(minY, bBox.min.y);
            minZ = Math.min(minZ, bBox.min.z);
            maxX = Math.max(maxX, bBox.max.x);
            maxY = Math.max(maxY, bBox.max.y);
            maxZ = Math.max(maxZ, bBox.max.z);
          }
        }
      }

      if (!isExistBox) return;
      const bBox_min = new THREE.Vector3(minX, minY, minZ);
      const bBox_max = new THREE.Vector3(maxX, maxY, maxZ);
      const box = new THREE.Box3(bBox_min, bBox_max);

      const center = box.getCenter(new THREE.Vector3());

      const maxSize = bBox_min.distanceTo(bBox_max);
      const fitHeightDistance =
        maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
      const fitWidthDistance = fitHeightDistance / camera.aspect;
      const distance =
        FIT_OFFSET * Math.max(fitHeightDistance, fitWidthDistance);

      const direction = controls.target
        .clone()
        .sub(camera.position)
        .normalize()
        .multiplyScalar(distance);

      // Set value max zoom in and zoom out
      controls.maxDistance = distance * 10;
      //controls.minDistance = distance / 10;
      controls.target.copy(center);

      camera.near = distance / 100;
      camera.far = distance * 100;
      camera.updateProjectionMatrix();

      camera.position.copy(controls.target).sub(direction);

      controls.update();
    }

    async function initFurniture() {
      loader = new GLTFLoader();

      const [...model] = await Promise.all([
        loader.loadAsync('Models/Walls/Scene.glb'),
        loader.loadAsync('Models/Chairs/Project chair1.gltf.glb'),
        loader.loadAsync('Models/Chairs/Project chair2.gltf.glb'),
        loader.loadAsync('Models/Chairs/Project chair 3.gltf.glb'),
        loader.loadAsync('Models/Chairs/Project chair 4/Project Name.gltf'),
        loader.loadAsync('Models/Chairs/Project chair_5/Project Name.gltf'),
        loader.loadAsync('Models/table/table 1/Project Name.gltf'),
        loader.loadAsync('Models/table/table 2/Project Name.gltf'),
        loader.loadAsync('Models/table/table 3/Project Name.gltf'),
        loader.loadAsync('Models/table/table 4/Project Name.gltf'),
        loader.loadAsync('Models/table/table 5/Project Name.gltf'),
        loader.loadAsync('Models/dinning table/1/Project Name.gltf'),
        loader.loadAsync('Models/dinning table/2/Project Name.gltf'),
        loader.loadAsync('Models/dinning table/3/Project Name.gltf'),
        loader.loadAsync('Models/dinning table/4/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/dinning table/5/Project Name.gltf'),
        loader.loadAsync('Models/cupboard/1/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/cupboard/2/Project Name.gltf'),
        loader.loadAsync('Models/cupboard/3/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/cupboard/4/Project Name (1)/Project Name.gltf'),
        loader.loadAsync('Models/cupboard/5/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/bed/1/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/bed/2/Project Name.gltf'),
        loader.loadAsync('Models/bed/3/Project Name.gltf'),
        loader.loadAsync('Models/bed/4/Project Name.gltf'),
        loader.loadAsync('Models/bed/5/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/floor/1/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/floor/2/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/floor/3/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/floor/4/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/floor/5/Project Name.gltf'),
        loader.loadAsync('Models/roof1/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/door/1.gltf'),
        loader.loadAsync('Models/door/2.gltf'),
        loader.loadAsync('Models/door/3.gltf'),
        loader.loadAsync('Models/door/4.gltf'),
        loader.loadAsync('Models/door/5.gltf'),
        loader.loadAsync('Models/window/1/Project Name.gltf'),
        loader.loadAsync('Models/window/2/Project Name.gltf'),
        loader.loadAsync('Models/window/3/Project Name/Project Name.gltf'),
        loader.loadAsync('Models/window/4/Project Name.gltf'),
        loader.loadAsync('Models/window/5/Project Name/Project Name.gltf'),
      ]);
      //const loader = useLoader(GLTFLoader, "src/Models/Walls/scene.glb" );
      //loader.load('Models/Walls/Scene.glb', function (gltf) {
      obj = model[0].scene;
      // assigning dummy values
      obj.scale.x = (localStorage.getItem('width') / 10) * 12;
      floorPosition = obj.scale.x;
      obj.scale.y = (localStorage.getItem('height') / 10) * 15;
      obj.scale.z = obj.scale.z * 4;
      obj.traverse((object) => {
        if (object.isMesh) {
          object.material.color.set(0xb69090);
          arrayMeshs.push(object);
        }
      });
      // getting width of object inorder make room structure
      const boundingBox = new THREE.Box3().setFromObject(obj);
      width = boundingBox.getSize(new THREE.Vector3()).x;
      //console.log("width of wall is :" + width);
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
      autoFit();
      //});
      //chair1
      //loader.load('Models/Chairs/Project chair1.gltf.glb', function (gltf) {
      {
        //console.log("Chair1 loaded");
        var chair = model[1].scene;
        chair.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        chair.scale.x = 50;
        chair.scale.y = 50;
        chair.scale.z = 50;
        chair.position.z += 10;
        chair.rotateY(-Math.PI / 2);
        chair.visible = false;
        furnitures['chair1'] = chair;
      }

      //});
      //chair2
      //loader.load('Models/Chairs/Project chair2.gltf.glb', function (gltf) {
      {
        var chair = model[2].scene;
        chair.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        chair.scale.x = 50;
        chair.scale.y = 50;
        chair.scale.z = 50;
        chair.position.z += 10;
        chair.rotateY(-Math.PI / 2);
        chair.visible = false;
        furnitures['chair2'] = chair;
      }
      //});
      //chair3
      //loader.load('Models/Chairs/Project chair 3.gltf.glb', function (gltf) {
      {
        var chair = model[3].scene;
        chair.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        chair.scale.x = 5;
        chair.scale.y = 5;
        chair.scale.z = 5;
        chair.position.z += 10;
        chair.rotateY(-Math.PI / 2);
        chair.visible = false;
        furnitures['chair3'] = chair;
      }
      //});
      //chair4
      //loader.load('Models/Chairs/Project chair 4/Project Name.gltf', function (gltf) {
      {
        var chair = model[4].scene;
        chair.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        chair.scale.x = 50;
        chair.scale.y = 40;
        chair.scale.z = 50;
        chair.position.z += 10;
        chair.rotateY(-Math.PI / 2);
        chair.visible = false;
        furnitures['chair4'] = chair;
      }
      //});
      //chair5
      //loader.load('Models/Chairs/Project chair_5/Project Name.gltf', function (gltf) {
      {
        var chair = model[5].scene;
        chair.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        chair.scale.x = 500;
        chair.scale.y = 500;
        chair.scale.z = 500;
        chair.position.z += 10;
        chair.rotateY(-Math.PI / 2);
        chair.visible = false;
        furnitures['chair5'] = chair;
      }
      //});

      //table1
      {
        //loader.load('Models/table/table 1/Project Name.gltf', function (gltf) {
        var table = model[6].scene;
        table.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        table.scale.x = 8;
        table.scale.y = 8;
        table.scale.z = 6;
        table.position.z += 10;
        table.rotateY(-Math.PI / 2);
        table.visible = false;
        furnitures['table1'] = table;
        //});
      }
      //table2
      {
        //loader.load('Models/table/table 2/Project Name.gltf', function (gltf) {
        var table = model[7].scene;
        table.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        table.scale.x = .1;
        table.scale.y = .1;
        table.scale.z = .1;
        table.position.z += 10;
        table.rotateY(-Math.PI / 2);
        table.visible = false;
        furnitures['table2'] = table;
        //});
      }
      //table3
      {
        //loader.load('Models/table/table 3/Project Name.gltf', function (gltf) {
        var table = model[8].scene;
        table.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        table.scale.x = 28;
        table.scale.y = 28;
        table.scale.z = 28;
        table.position.z += 10;
        table.rotateY(-Math.PI / 2);
        table.visible = false;
        furnitures['table3'] = table;
        //});
      }
      //table4
      {
        //loader.load('Models/table/table 4/Project Name.gltf', function (gltf) {
        var table = model[9].scene
        table.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        table.scale.x = 28;
        table.scale.y = 28;
        table.scale.z = 28;
        table.position.z += 10;
        table.rotateY(-Math.PI / 2);
        table.visible = false;
        furnitures['table4'] = table;
        //});
      }
      //table5
      {
        //loader.load('Models/table/table 5/Project Name.gltf', function (gltf) {
        var table = model[10].scene
        table.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        table.scale.x = 28;
        table.scale.y = 28;
        table.scale.z = 28;
        table.position.z += 10;
        table.rotateY(-Math.PI / 2);
        table.visible = false;
        furnitures['table5'] = table;
        //});
      }
      //dinningtable1
      {
        //loader.load('Models/dinning table/1/Project Name.gltf', function (gltf) {
        var dinningTable = model[11].scene
        dinningTable.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        dinningTable.scale.x = 3.5;
        dinningTable.scale.y = 3.5;
        dinningTable.scale.z = 3.5;
        dinningTable.position.z += 10;
        dinningTable.rotateY(-Math.PI / 2);
        dinningTable.visible = false;
        furnitures['dinningtable1'] = dinningTable;
        //});
      }

      //dinningtable2
      {
        //loader.load('Models/dinning table/2/Project Name.gltf', function (gltf) {
        var dinningTable = model[12].scene
        dinningTable.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        dinningTable.scale.x = 22;
        dinningTable.scale.y = 22;
        dinningTable.scale.z = 22;
        dinningTable.position.z += 10;
        dinningTable.rotateY(-Math.PI / 2);
        dinningTable.visible = false;
        furnitures['dinningtable2'] = dinningTable;
        //});
      }

      //dinningtable3
      {
        //loader.load('Models/dinning table/3/Project Name.gltf', function (gltf) {
        var dinningTable = model[13].scene
        dinningTable.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        dinningTable.scale.x = 22;
        dinningTable.scale.y = 22;
        dinningTable.scale.z = 22;
        dinningTable.position.z += 10;
        dinningTable.rotateY(-Math.PI / 2);
        dinningTable.visible = false;
        furnitures['dinningtable3'] = dinningTable;
        //});
      }

      //dinningtable4
      {
        //loader.load('Models/dinning table/4/Project Name/Project Name.gltf', function (gltf) {
        var dinningTable = model[14].scene
        dinningTable.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        dinningTable.scale.x = 22;
        dinningTable.scale.y = 22;
        dinningTable.scale.z = 22;
        dinningTable.position.z += 10;
        dinningTable.rotateY(-Math.PI / 2);
        dinningTable.visible = false;
        furnitures['dinningtable4'] = dinningTable;
      }
      //dinningtable5
      {
        //loader.load('Models/dinning table/5/Project Name.gltf', function (gltf) {
        var dinningTable = model[15].scene
        dinningTable.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        dinningTable.scale.x = 3.5;
        dinningTable.scale.y = 3.5;
        dinningTable.scale.z = 3.5;
        dinningTable.position.z += 10;
        dinningTable.rotateY(-Math.PI / 2);
        dinningTable.visible = false;
        furnitures['dinningtable5'] = dinningTable;
        //});
      }

      //cupboard1
      {
        //loader.load('Models/cupboard/1/Project Name/Project Name.gltf', function (gltf) {
        var cupboard = model[16].scene
        cupboard.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        cupboard.scale.x = 25;
        cupboard.scale.y = 25;
        cupboard.scale.z = 25;
        cupboard.position.z += 10;
        cupboard.rotateY(-Math.PI / 2);
        cupboard.visible = false;
        furnitures['cupboard1'] = cupboard;
        //});
      }
      //cupboard2
      {
        //loader.load('Models/cupboard/2/Project Name/Project Name.gltf', function (gltf) {
        var cupboard = model[17].scene
        cupboard.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        cupboard.scale.x = 900;
        cupboard.scale.y = 900;
        cupboard.scale.z = 900;
        cupboard.position.z += 10;
        cupboard.rotateY(-Math.PI / 2);
        cupboard.visible = false;
        furnitures['cupboard2'] = cupboard;
        //});
      }
      //cupboard3
      {
        //loader.load('Models/cupboard/3/Project Name/Project Name.gltf', function (gltf) {
        var cupboard = model[18].scene
        cupboard.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        cupboard.scale.x = 30;
        cupboard.scale.y = 30;
        cupboard.scale.z = 30;
        cupboard.position.z += 10;
        cupboard.rotateY(-Math.PI / 2);
        cupboard.visible = false;
        furnitures['cupboard3'] = cupboard;
        //});
      }
      //cupboard4
      {
        //loader.load('Models/cupboard/4/Project Name/Project Name.gltf', function (gltf) {
        var cupboard = model[19].scene
        cupboard.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        cupboard.scale.x = 30;
        cupboard.scale.y = 30;
        cupboard.scale.z = 30;
        cupboard.position.z += 10;
        cupboard.rotateY(-Math.PI / 2);
        cupboard.visible = false;
        furnitures['cupboard4'] = cupboard;
        //});
      }
      //cupboard5
      {
        //loader.load('Models/cupboard/5/Project Name/Project Name.gltf', function (gltf) {
        var cupboard = model[20].scene
        cupboard.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        cupboard.scale.x = 30;
        cupboard.scale.y = 30;
        cupboard.scale.z = 30;
        cupboard.position.z += 10;
        cupboard.rotateY(-Math.PI / 2);
        cupboard.visible = false;
        furnitures['cupboard5'] = cupboard;
        //});
      }
      //bed1
      {
        //loader.load('Models/bed/1/Project Name/Project Name.gltf', function (gltf) {
        var bed = model[21].scene
        bed.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        bed.scale.x = 900;
        bed.scale.y = 900;
        bed.scale.z = 900;
        bed.position.z += 10;
        bed.rotateY(-Math.PI / 2);
        bed.visible = false;
        furnitures['bed1'] = bed;
        //});
      }
      //bed2
      {
        //loader.load('Models/bed/2/Project Name.gltf', function (gltf) {
        var bed = model[22].scene
        bed.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        bed.scale.x = 900;
        bed.scale.y = 900;
        bed.scale.z = 900;
        bed.position.z += 10;
        bed.rotateY(-Math.PI / 2);
        bed.visible = false;
        furnitures['bed2'] = bed;
        //});
      }
      //bed3
      {
        //loader.load('Models/bed/3/Project Name.gltf', function (gltf) {
        var bed = model[23].scene
        bed.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        bed.scale.x = 900;
        bed.scale.y = 900;
        bed.scale.z = 900;
        bed.position.z += 10;
        bed.rotateY(-Math.PI / 2);
        bed.visible = false;
        furnitures['bed3'] = bed;
        //});
      }
      //bed4
      {
        //loader.load('Models/bed/4/Project Name.gltf', function (gltf) {
        var bed = model[24].scene
        bed.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        bed.scale.x = 900;
        bed.scale.y = 900;
        bed.scale.z = 900;
        bed.position.z += 10;
        bed.visible = false;
        furnitures['bed4'] = bed;
        //});
      }
      //bed5
      {
        //loader.load('Models/bed/5/Project Name/Project Name.gltf', function (gltf) {
        var bed = model[25].scene
        bed.traverse(function (child) {
          child.userData.selectable = true;
          child.layers.set(0);
        });
        bed.scale.x = 700 * 5;
        bed.scale.y = 700 * 5;
        bed.scale.z = 650 * 5;
        bed.position.z += 10;
        bed.visible = false;
        furnitures['bed5'] = bed;
        //});
      }
      //floor1
      {
        //loader.load('Models/floor/1/Project Name/Project Name.gltf', function (gltf) {
        floor = model[26].scene
        floor.position.z = floorPosition + 4;
        floor.scale.x = floorPosition + 1;
        floor.scale.y = .3;
        floor.scale.z = floorPosition - 2;
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(0xff0000);
          }
        });
        floor.visible = false;
        furnitures['floor1'] = floor;
        //});
      }
      //floor2
      {
        //loader.load('Models/floor/2/Project Name/Project Name.gltf', function (gltf) {
        floor = model[27].scene
        floor.position.z = floorPosition + 4;
        floor.scale.x = floorPosition + 1;
        floor.scale.y = .3;
        floor.scale.z = floorPosition - 2;
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(0x9EDED8);
          }
        });
        floor.visible = false;
        furnitures['floor2'] = floor;
        //});
      }
      //floor3
      {
        //loader.load('Models/floor/3/Project Name/Project Name.gltf', function (gltf) {
        floor = model[28].scene
        floor.position.z = floorPosition + 4;
        floor.scale.x = floorPosition + 1;
        floor.scale.y = .3;
        floor.scale.z = floorPosition - 2;
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(0x9EDED8);
          }
        });
        floor.visible = false;
        furnitures['floor3'] = floor;
        //});
      }
      //floor4
      {
        //loader.load('Models/floor/4/Project Name/Project Name.gltf', function (gltf) {
        floor = model[29].scene
        floor.position.z = floorPosition + 4;
        floor.scale.x = floorPosition + 1;
        floor.scale.y = .3;
        floor.scale.z = floorPosition - 2;
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(0x9EDED8);
          }
        });
        floor.visible = false;
        furnitures['floor4'] = floor;
        //});
      }
      //floor5
      {
        //loader.load('Models/floor/5/Project Name.gltf', function (gltf) {
        floor = model[30].scene;
        floor.position.z = floorPosition + 4;
        floor.scale.x = floorPosition + 1;
        floor.scale.y = .3;
        floor.scale.z = floorPosition - 2;
        floor.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(0x9EDED8);
          }
        });
        floor.visible = false;
        furnitures['floor5'] = floor;
        //});
      }
      //roof1
      {
        //loader.load('Models/roof1/Project Name/Project Name.gltf', function (gltf) {
        const roof = model[31].scene;
        roof.position.z = floorPosition;
        roof.scale.x = floorPosition + 1;
        roof.scale.y = .3;
        roof.scale.z = floorPosition - 2;
        roof.position.y = obj.scale.y / 2;
        roof.position.z += 4;
        roof.rotateY(-Math.PI);
        roof.traverse((object) => {
          if (object.isMesh) {
            object.material.color.set(0x6d998f);
          }
        });
        roofColorObj = roof;
        roof.visible = false;
        furnitures['roof1'] = roof;
        //});
      }
      //door1
      {
        //loader.load('Models/door/1.gltf', function (gltf) {
        const windowMesh = model[32].scene;
        windowMesh.scale.x = .2;
        windowMesh.scale.y = .2;
        windowMesh.scale.z = .3;
        windowMesh.position.x = 0;
        windowMesh.position.y = 0;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['door1'] = group;
      }
      //door2
      {
        //loader.load('Models/door/2.gltf', function (gltf) {
        const windowMesh = model[33].scene;
        windowMesh.scale.x = .2;
        windowMesh.scale.y = .2;
        windowMesh.scale.z = .3;
        windowMesh.position.x = 0;
        windowMesh.position.y = 0;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['door2'] = group;
      }
      //door3
      {
        //loader.load('Models/door/3.gltf', function (gltf) {
        const windowMesh = model[34].scene;
        windowMesh.scale.x = .2;
        windowMesh.scale.y = .2;
        windowMesh.scale.z = .3;
        windowMesh.position.x = 0;
        windowMesh.position.y = 0;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['door3'] = group;
      }
      //door4
      {
        //loader.load('Models/door/4.gltf', function (gltf) {
        const windowMesh = model[35].scene;
        windowMesh.scale.x = .4;
        windowMesh.scale.y = .2;
        windowMesh.scale.z = .3;
        windowMesh.position.x = 0;
        windowMesh.position.y = 0;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['door4'] = group;
      }
      //door5
      {
        //loader.load('Models/door/5.gltf', function (gltf) {
        const windowMesh = model[36].scene;
        windowMesh.scale.x = .4;
        windowMesh.scale.y = .2;
        windowMesh.scale.z = .3;
        windowMesh.position.x = 0;
        windowMesh.position.y = 0;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['door5'] = group;
      }

      //window1
      {
        //loader.load('Models/window/1/Project Name.gltf', function (gltf) {
        const windowMesh = model[37].scene;
        windowMesh.scale.x = 4;
        windowMesh.scale.y = 4;
        windowMesh.scale.z = 5;
        windowMesh.position.x = 0;
        windowMesh.position.y = .1;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['window1'] = group;
      }

      //window2
      {
        //loader.load('Models/window/2/Project Name.gltf', function (gltf) {
        const windowMesh = model[38].scene;
        windowMesh.scale.x = 4;
        windowMesh.scale.y = 4;
        windowMesh.scale.z = 5;
        windowMesh.position.x = 0;
        windowMesh.position.y = .1;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['window2'] = group;
      }

      //window3
      {
        //loader.load('Models/window/3/Project Name/Project Name.gltf', function (gltf) {
        const windowMesh = model[39].scene;
        windowMesh.scale.x = 444;
        windowMesh.scale.y = 444;
        windowMesh.scale.z = 555;
        windowMesh.position.x = 0;
        windowMesh.position.y = .1;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['window3'] = group;
      }

      //window4
      {
        //loader.load('Models/window/4/Project Name.gltf', function (gltf) {
        const windowMesh = model[40].scene;
        windowMesh.scale.x = 44;
        windowMesh.scale.y = 44;
        windowMesh.scale.z = 50;
        windowMesh.position.x = 0;
        windowMesh.position.y = .1;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['window4'] = group;
      }

      //window5
      {
        //loader.load('Models/window/5/Project Name/Project Name.gltf', function (gltf) {
        const windowMesh = model[41].scene;
        windowMesh.scale.x = 44;
        windowMesh.scale.y = 44;
        windowMesh.scale.z = 50;
        windowMesh.position.x = 0;
        windowMesh.position.y = .1;
        windowMesh.position.z = .1;
        const window2 = windowMesh.clone();
        window2.position.z = -.1;
        const group = new THREE.Group();
        group.add(windowMesh);
        group.add(window2);
        furnitures['window5'] = group;
      }
      modelReady = true;
    }
  }, []);





  function animate() {
    requestAnimationFrame(animate);
    if (modelReady) {
      controls.update();
      stats.update();
      renderer.render(scene, camera);
    }
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
            <hr className="main-hr" />
            <h1 className="main-title">Design your room</h1>
            <div id="scene" className="scene-container"> <canvas className="webgl" ></canvas> </div>
          </div>
        </Col>

        {/* Right Sidebar */}
        <Col md={3} lg={2} className="right-sidebar">
          <div className="right-sidebar-container">
            <h1>Walls Color</h1>
            <hr className="right-hr" />
            <InputGroup className="right-input-group">
              <InputGroup.Text>Color:</InputGroup.Text>
              <Form.Control type="color" defaultValue="#ffffff" id="color-picker-wall" />
            </InputGroup>
            <h1>Roof Color</h1>
            <hr className="right-hr" />
            <InputGroup className="right-input-group">
              <InputGroup.Text>Color:</InputGroup.Text>
              <Form.Control type="color" defaultValue="#ffffff" id="color-picker-roof" />
            </InputGroup>
            <h1>Objects Color</h1>
            <hr className="right-hr" />
            <InputGroup className="right-input-group">
              <InputGroup.Text>Color:</InputGroup.Text>
              <Form.Control type="color" defaultValue="#ffffff" id="color-picker-object" />
            </InputGroup>
            <h1>Floor Color</h1>
            <hr className="right-hr" />
            <InputGroup className="right-input-group">
              <InputGroup.Text>Color:</InputGroup.Text>
              <Form.Control type="color" defaultValue="#ffffff" id="color-picker-floor" />
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>



  );
}
export default CustomDesign;