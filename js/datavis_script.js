// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

var mouseX = 0,
  mouseY = 0,
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,
  camera,
  scene,
  renderer;

init();
animate();

function init() {
  var container, particle;

  container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0x000000, 250, 1400);
  // LIGHTS
  var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
  dirLight.position.set(0, 0, 1).normalize();
  scene.add(dirLight);

  var pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.position.set(50, 100, 90);
  scene.add(pointLight);

  renderer = new THREE.WebGLRenderer({ alpha: true }); // gradient; this can be swapped for WebGLRenderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Configure renderer clear color
  renderer.setClearColor("#FF4500");

  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 100;

  var controls = new THREE.OrbitControls(camera);

  // particles
  var geometry = new THREE.Geometry();

  for (var i = 0; i < 100; i++) {
    // particle = new THREE.Sprite(material);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({ color: "#433F81" });
    particle = new THREE.Mesh(geometry, material);

    particle.position.x = Math.random() * 2 - 1;
    particle.position.y = Math.random() * 2 - 1;
    particle.position.z = Math.random() * 2 - 1;
    // particle.position.normalize();
    particle.position.multiplyScalar(Math.random() * 10 + 450);
    particle.scale.x = particle.scale.y = 10;
    scene.add(particle);
    geometry.vertices.push(particle.position);
  }

  // lines
  var line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5 })
  );
  scene.add(line);

  // mousey
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("touchstart", onDocumentTouchStart, false);
  document.addEventListener("touchmove", onDocumentTouchMove, false);

  // window.addEventListener("resize", onWindowResize, false);
} // end init();

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  // controls.update();

  renderer.render(scene, camera);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}
