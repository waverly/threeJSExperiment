// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

// add controls for the camera
var controls = new THREE.OrbitControls(camera);
// auto rotate
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.5;

controls.addEventListener("start", function() {
  console.log("controls started");
});

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Configure renderer clear color
renderer.setClearColor("#FF4500");

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

// Append Renderer to DOM
document.body.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

cubeDemo();

function cubeDemo() {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
  var cube01 = new THREE.Mesh(geometry, material);
  scene.add(cube01);

  var geometry = new THREE.BoxGeometry(2, 2, 2);
  var material = new THREE.MeshBasicMaterial({
    color: "#433F81",
    wireframe: true,
    transparent: true
  });
  var cube01_wireframe = new THREE.Mesh(geometry, material);
  scene.add(cube01_wireframe);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: "#A49FEF" });
  var cube02 = new THREE.Mesh(geometry, material);
  scene.add(cube02);

  var geometry = new THREE.BoxGeometry(3, 3, 3);
  var material = new THREE.MeshBasicMaterial({
    color: "#A49FEF",
    wireframe: true,
    transparent: true
  });
  var cube02_wireframe = new THREE.Mesh(geometry, material);
  scene.add(cube02_wireframe);

  var geometry = new THREE.BoxGeometry(10, 0.05, 0.5);
  var material = new THREE.MeshBasicMaterial({ color: "#00FFBC" });
  var bar01 = new THREE.Mesh(geometry, material);
  bar01.position.z = 0.5;
  scene.add(bar01);

  var geometry = new THREE.BoxGeometry(10, 0.05, 0.5);
  var material = new THREE.MeshBasicMaterial({ color: "#ffffff" });
  var bar02 = new THREE.Mesh(geometry, material);
  bar02.position.z = 0.5;
  scene.add(bar02);

  // Render Loop
  var render = function() {
    requestAnimationFrame(render);

    // update orbitControls
    controls.update();

    cube01.rotation.x += 0.01;
    cube01.rotation.y += 0.01;

    cube01_wireframe.rotation.x += 0.01;
    cube01_wireframe.rotation.y += 0.01;

    cube02.rotation.x -= 0.01;
    cube02.rotation.y -= 0.01;

    cube02_wireframe.rotation.x -= 0.01;
    cube02_wireframe.rotation.y -= 0.01;

    bar01.rotation.z -= 0.01;
    bar02.rotation.z += 0.01;

    // Render the scene
    renderer.render(scene, camera);
  };

  render();
}
