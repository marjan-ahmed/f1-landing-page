// ===== THREE.JS F1 CAR SHOWCASE =====

let scene, camera, renderer, clock;
let cars = [];
let activeCar = 0;
const carLabels = ['SCUDERIA FERRARI', 'RED BULL RACING', 'MERCEDES-AMG'];

function createF1Car(bodyColor, accentColor) {
  const car = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: bodyColor,
    metalness: 0.7,
    roughness: 0.3,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    metalness: 0.5,
    roughness: 0.4,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.3,
    roughness: 0.7,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.1,
    roughness: 0.9,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0x999999,
    metalness: 0.95,
    roughness: 0.05,
  });

  // Main body (monocoque)
  const mainBody = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.22, 1.0),
    bodyMat
  );
  mainBody.position.y = 0.32;
  car.add(mainBody);

  // Nose cone - tapered front section
  const noseGeo = new THREE.BoxGeometry(1.4, 0.14, 0.45);
  const nose = new THREE.Mesh(noseGeo, bodyMat);
  nose.position.set(2.3, 0.26, 0);
  car.add(nose);

  // Nose tip
  const noseTip = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.08, 0.25),
    bodyMat
  );
  noseTip.position.set(3.0, 0.22, 0);
  car.add(noseTip);

  // Engine cover / airbox
  const engineCover = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.4, 0.65),
    bodyMat
  );
  engineCover.position.set(-0.4, 0.53, 0);
  car.add(engineCover);

  // Air intake above driver
  const airIntake = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.35, 0.3),
    darkMat
  );
  airIntake.position.set(0.3, 0.65, 0);
  car.add(airIntake);

  // Cockpit opening
  const cockpit = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.28, 0.45),
    darkMat
  );
  cockpit.position.set(0.7, 0.52, 0);
  car.add(cockpit);

  // Side pods
  const sidePodGeo = new THREE.BoxGeometry(1.9, 0.3, 0.28);
  const sidePodL = new THREE.Mesh(sidePodGeo, bodyMat);
  sidePodL.position.set(-0.1, 0.38, 0.62);
  car.add(sidePodL);
  const sidePodR = sidePodL.clone();
  sidePodR.position.z = -0.62;
  car.add(sidePodR);

  // Side pod inlets
  const inletGeo = new THREE.BoxGeometry(0.15, 0.22, 0.2);
  const inletL = new THREE.Mesh(inletGeo, darkMat);
  inletL.position.set(0.85, 0.4, 0.62);
  car.add(inletL);
  const inletR = inletL.clone();
  inletR.position.z = -0.62;
  car.add(inletR);

  // Front wing main plane
  const frontWing = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.03, 2.0),
    accentMat
  );
  frontWing.position.set(2.85, 0.1, 0);
  car.add(frontWing);

  // Front wing flaps
  const flapGeo = new THREE.BoxGeometry(0.2, 0.03, 1.8);
  const frontFlap = new THREE.Mesh(flapGeo, accentMat);
  frontFlap.position.set(2.6, 0.14, 0);
  frontFlap.rotation.z = 0.1;
  car.add(frontFlap);

  // Front wing endplates
  const endplateGeo = new THREE.BoxGeometry(0.4, 0.14, 0.03);
  const endplateL = new THREE.Mesh(endplateGeo, accentMat);
  endplateL.position.set(2.75, 0.12, 1.0);
  car.add(endplateL);
  const endplateR = endplateL.clone();
  endplateR.position.z = -1.0;
  car.add(endplateR);

  // Rear wing main plane
  const rearWing = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.32, 0.95),
    accentMat
  );
  rearWing.position.set(-1.75, 0.88, 0);
  car.add(rearWing);

  // Rear wing flap
  const rearFlap = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.08, 0.9),
    accentMat
  );
  rearFlap.position.set(-1.65, 1.06, 0);
  car.add(rearFlap);

  // Rear wing endplates
  const rearEndGeo = new THREE.BoxGeometry(0.28, 0.42, 0.025);
  const rearEndL = new THREE.Mesh(rearEndGeo, accentMat);
  rearEndL.position.set(-1.72, 0.84, 0.48);
  car.add(rearEndL);
  const rearEndR = rearEndL.clone();
  rearEndR.position.z = -0.48;
  car.add(rearEndR);

  // Rear wing supports (pylons)
  const pylonGeo = new THREE.BoxGeometry(0.03, 0.4, 0.03);
  const pylonL = new THREE.Mesh(pylonGeo, chromeMat);
  pylonL.position.set(-1.55, 0.62, 0.25);
  car.add(pylonL);
  const pylonR = pylonL.clone();
  pylonR.position.z = -0.25;
  car.add(pylonR);

  // Floor / diffuser
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 0.03, 1.3),
    darkMat
  );
  floor.position.set(0, 0.15, 0);
  car.add(floor);

  // Rear diffuser
  const diffuser = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.15, 1.1),
    darkMat
  );
  diffuser.position.set(-1.9, 0.22, 0);
  car.add(diffuser);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 20);
  const wheelRimGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.21, 8);

  const wheelPositions = [
    [1.4, 0.3, 0.72],
    [1.4, 0.3, -0.72],
    [-1.05, 0.3, 0.72],
    [-1.05, 0.3, -0.72],
  ];

  car._wheels = [];
  wheelPositions.forEach(function (pos) {
    const wheelGroup = new THREE.Group();

    const tire = new THREE.Mesh(wheelGeo, tireMat);
    tire.rotation.x = Math.PI / 2;
    wheelGroup.add(tire);

    const rim = new THREE.Mesh(wheelRimGeo, chromeMat);
    rim.rotation.x = Math.PI / 2;
    wheelGroup.add(rim);

    wheelGroup.position.set(pos[0], pos[1], pos[2]);
    car.add(wheelGroup);
    car._wheels.push(wheelGroup);
  });

  // Halo (safety device)
  const haloGeo = new THREE.TorusGeometry(0.22, 0.02, 6, 12, Math.PI);
  const halo = new THREE.Mesh(haloGeo, chromeMat);
  halo.position.set(0.65, 0.7, 0);
  halo.rotation.y = Math.PI / 2;
  halo.rotation.z = Math.PI;
  car.add(halo);

  // Halo pillar
  const haloPillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.44, 0.025, 0.04),
    chromeMat
  );
  haloPillar.position.set(0.65, 0.7, 0);
  car.add(haloPillar);

  // Scale
  car.scale.set(0.42, 0.42, 0.42);

  return car;
}

function initThreeJS() {
  var canvas = document.getElementById('f1Canvas');
  if (!canvas) {
    console.warn('F1 3D Showcase: Canvas element #f1Canvas not found.');
    return;
  }

  var wrapper = canvas.parentElement;
  var width = wrapper.clientWidth;
  var height = canvas.clientHeight || 500;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080808, 0.08);

  // Camera
  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(3, 2.5, 4);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x080808);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Clock
  clock = new THREE.Clock();

  // Ground plane
  var groundGeo = new THREE.PlaneGeometry(20, 20);
  var groundMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.3,
    roughness: 0.8,
  });
  var ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01;
  ground.receiveShadow = true;
  scene.add(ground);

  // Grid helper (subtle)
  var grid = new THREE.GridHelper(12, 24, 0x1a0000, 0x0d0d0d);
  grid.material.opacity = 0.4;
  grid.material.transparent = true;
  scene.add(grid);

  // Lighting
  var ambient = new THREE.AmbientLight(0x222222, 1.5);
  scene.add(ambient);

  var keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(5, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 20;
  keyLight.shadow.camera.left = -5;
  keyLight.shadow.camera.right = 5;
  keyLight.shadow.camera.top = 5;
  keyLight.shadow.camera.bottom = -5;
  scene.add(keyLight);

  var fillLight = new THREE.DirectionalLight(0x334466, 0.8);
  fillLight.position.set(-3, 4, -3);
  scene.add(fillLight);

  // Red accent light
  var redLight = new THREE.PointLight(0xe10600, 1.5, 8);
  redLight.position.set(-2, 1, 2);
  scene.add(redLight);

  // Blue rim light
  var blueLight = new THREE.PointLight(0x1e41ff, 0.6, 8);
  blueLight.position.set(3, 1, -3);
  scene.add(blueLight);

  // Create 3 F1 cars
  // Ferrari - Red with white accents
  var ferrari = createF1Car(0xdc0000, 0xffffff);
  ferrari.traverse(function (child) {
    if (child.isMesh) child.castShadow = true;
  });
  scene.add(ferrari);
  cars.push(ferrari);

  // Red Bull - Dark blue with yellow accents
  var redbull = createF1Car(0x0f1b4c, 0xffc906);
  redbull.traverse(function (child) {
    if (child.isMesh) child.castShadow = true;
  });
  redbull.visible = false;
  scene.add(redbull);
  cars.push(redbull);

  // Mercedes - Silver with teal accents
  var mercedes = createF1Car(0x8c8c8c, 0x00d2be);
  mercedes.traverse(function (child) {
    if (child.isMesh) child.castShadow = true;
  });
  mercedes.visible = false;
  scene.add(mercedes);
  cars.push(mercedes);

  // Handle resize
  window.addEventListener('resize', onWindowResize);

  // Start animation loop
  animate();
}

function onWindowResize() {
  var canvas = document.getElementById('f1Canvas');
  if (!canvas) return;
  var wrapper = canvas.parentElement;
  var width = wrapper.clientWidth;
  var height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function switchCar(index) {
  cars.forEach(function (car, i) {
    car.visible = i === index;
  });
  activeCar = index;

  var label = document.getElementById('carLabel');
  if (label) label.textContent = carLabels[index];

  // Update buttons
  document.querySelectorAll('.showcase-btn').forEach(function (btn, i) {
    btn.classList.toggle('active', i === index);
  });
}

function animate() {
  requestAnimationFrame(animate);

  var elapsed = clock.getElapsedTime();
  var delta = clock.getDelta();

  // Rotate active car on turntable
  cars.forEach(function (car) {
    if (car.visible) {
      car.rotation.y = elapsed * 0.4;

      // Subtle floating effect
      car.position.y = Math.sin(elapsed * 1.5) * 0.02;

      // Spin wheels
      car._wheels.forEach(function (wheel) {
        wheel.children[0].rotation.y += 0.05;
        wheel.children[1].rotation.y += 0.05;
      });
    }
  });

  // Subtle camera breathing
  camera.position.y = 2.5 + Math.sin(elapsed * 0.5) * 0.1;

  renderer.render(scene, camera);
}

// ===== PAGE INTERACTIONS =====

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Three.js
  if (typeof THREE !== 'undefined') {
    initThreeJS();
  } else {
    console.warn('F1 3D Showcase: Three.js library not loaded. 3D car models will not be displayed.');
    var canvasWrapper = document.querySelector('.showcase-canvas-wrapper');
    if (canvasWrapper) {
      var fallback = document.createElement('div');
      fallback.style.cssText = 'display:flex;align-items:center;justify-content:center;height:300px;color:#777;font-family:var(--font-heading);font-size:0.9rem;letter-spacing:2px;text-transform:uppercase;';
      fallback.textContent = '3D Experience requires WebGL';
      var canvas = document.getElementById('f1Canvas');
      if (canvas) canvas.style.display = 'none';
      canvasWrapper.insertBefore(fallback, canvasWrapper.firstChild);
    }
  }

  // Car switcher buttons
  document.querySelectorAll('.showcase-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var carIndex = parseInt(this.getAttribute('data-car'));
      switchCar(carIndex);
    });
  });

  // Mobile menu toggle
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
      });
    });
  }

  // Scroll fade-in animation
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
});

// Subscribe form handler
function handleSubscribe(event) {
  event.preventDefault();
  var input = event.target.querySelector('input[type="email"]');
  if (input && input.value) {
    var email = input.value;
    input.value = '';

    // Show inline success toast
    var existing = document.querySelector('.subscribe-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'subscribe-toast';
    toast.textContent = 'Subscribed! F1 updates will be sent to ' + email;
    toast.style.cssText = 'margin-top:1.2rem;padding:0.8rem 1.5rem;background:rgba(225,6,0,0.12);border:1px solid rgba(225,6,0,0.25);border-radius:4px;color:#f0f0f0;font-size:0.85rem;font-family:var(--font-heading);letter-spacing:1px;animation:fadeIn 0.4s ease-out;';
    event.target.parentNode.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s ease';
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  }
}
