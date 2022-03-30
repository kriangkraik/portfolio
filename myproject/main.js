import './style.css'
import * as THREE from "three";

//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.5, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);
camera.position.setX(-3);

renderer.render(scene, camera);

//TorusGeometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xF03F07
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//pointLighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(80, 80, 80);
//AmbientLight
const Ambientlight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, Ambientlight);
//star 
function addStar() {
  const geometry = new THREE.SphereGeometry(0.10, 25, 25);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

//background 
const space = new THREE.TextureLoader().load('space.jpg');
scene.background = space;

//profile
const kriangkraiTexture = new THREE.TextureLoader().load('kriangkrai.jpg');
const kriangkrai = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    map: kriangkraiTexture
  }));
scene.add(kriangkrai);

//moon
const moonTexture1 = new THREE.TextureLoader().load('moon.jpg');
const moonTexture2 = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(new THREE.SphereGeometry(3, 30, 30),
  new THREE.MeshStandardMaterial({
    map: moonTexture1,
    normalMap: moonTexture2
  }))
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);
kriangkrai.position.z = -5;
kriangkrai.position.x = 2;

//move camera
function moveCamera() {
  const c = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  kriangkrai.rotation.y += 0.01;
  kriangkrai.rotation.z += 0.01;

  camera.position.x = c * -0.0002;
  camera.position.y = c * -0.0002;
  camera.position.z = c * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

//animate loop
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  renderer.render(scene, camera);
}

animate();