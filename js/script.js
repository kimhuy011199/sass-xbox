const hanlder3DObject = function () {
  // Scence
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0f10);

  // Camera
  const width = window.innerWidth;
  const height = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 70, 110);

  // Render
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  const view = document.querySelector(".popup__view");
  view.appendChild(renderer.domElement);

  // Control
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 30);
  controls.minDistance = 60;
  controls.maxDistance = 180;

  // GLTF Loader
  const loader = new THREE.GLTFLoader();
  loader.load("js/scene.gltf", function (gltf) {
    gltf.scene.children[0].scale.set(70, 70, 70);
    scene.add(gltf.scene);
    animate();
  });

  function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    controls.update();
  }

  // Light
  light1 = new THREE.PointLight(0x444444, 10);
  light1.position.set(100, 800, 100);
  scene.add(light1);
  light2 = new THREE.PointLight(0x444444, 10);
  light2.position.set(100, 200, 100);
  scene.add(light2);
  light3 = new THREE.PointLight(0x444444, 10);
  light3.position.set(100, 10, 100);
  scene.add(light3);
  light4 = new THREE.PointLight(0x555555, 5);
  light4.position.set(-100, 10, 40);
  scene.add(light4);

  // Handler resize window
  window.addEventListener("resize", resize);
  function resize() {
    const factor = 1;
    const w = window.innerWidth * factor;
    const h = window.innerHeight * factor;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
};

const handlerMenu = function () {
  const navContainer = document.querySelector(".nav__list");
  const navBtn = document.querySelector(".nav__toggle");
  navBtn.addEventListener("click", function (e) {
    navContainer.classList.toggle("nav__hidden");
  });
  const navLink = [...document.querySelectorAll(".nav__link")];
  navLink.forEach((link) => {
    link.addEventListener("click", function (e) {
      navContainer.classList.toggle("nav__hidden");
    });
  });
};

const handlerPopup = function () {
  const popupContainer = document.querySelector(".popup");
  const openPopup = document.querySelector(".controller__btn");
  openPopup.addEventListener("click", function (e) {
    e.preventDefault();
    popupContainer.classList.remove("popup__hidden");
  });
  const closePopup = document.querySelector(".popup__close");
  closePopup.addEventListener("click", function (e) {
    popupContainer.classList.add("popup__hidden");
  });
};

const handlerScrollUp = function () {
  const scrollUpBtn = document.querySelector(".scroll");
  scrollUpBtn.addEventListener("click", function (e) {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 60 ||
      document.documentElement.scrollTop > 60
    ) {
      scrollUpBtn.classList.remove("scroll__hidden");
    } else {
      scrollUpBtn.classList.add("scroll__hidden");
    }
  });
};

const handlerAnimation = function () {
  const allSections = document.querySelectorAll(".section");
  const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
  });
};

const init = function () {
  handlerMenu();
  handlerPopup();
  hanlder3DObject();
  handlerScrollUp();
  handlerAnimation();
};

init();
