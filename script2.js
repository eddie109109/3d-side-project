import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';


function main() {
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
const fov = 40;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 1000;
// an array of objects whose rotation to update
const objects = [];
 
// use just one sphere for everything
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments);
 
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);  // make the sun large

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.scale.set(1, 1, 1);  // make the sun large
earthMesh.position.x = 2;

// set up the scene below
const scene = new THREE.Scene(); 
scene.background = new THREE.Color(0xAAAAAA);

scene.add(sunMesh);
objects.push(sunMesh);

// scene.add(earthMesh);
sunMesh.add(earthMesh);
objects.push(earthMesh);



{
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
}

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 150, 0);
camera.up.set(0, 0, 1); // we are looking straight down so z is up
camera.lookAt(0, 0, 0);



function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;
  }

  function render(time) {
    time *= 0.001;


    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
        obj.rotation.y = time;
    });

    // objects.forEach((obj, ndx) => {
    //   const speed = .1 + ndx * .05;
    //   const rot = time * speed;
    //   obj.rotation.x = rot;
    //   obj.rotation.y = rot;
    // });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

}

main();