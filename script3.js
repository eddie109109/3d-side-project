import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';


function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    // renderer.setClearColor(0xAAAAAA);
    // renderer.shadowMap.enabled = true;
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({map: loader.load('./me.jpg')});  // greenish blue
    // const material = new THREE.MeshBasicMaterial({color:"green"}); 
    const scene = new THREE.Scene();

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const cubes = [];  // just an array we can use to rotate the cubes
    cubes.push(cube);

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
    
        cubes.forEach((cube, ndx) => {
          const speed = .2 + ndx * .1;
          const rot = time * speed;
          cube.rotation.x = rot;
          cube.rotation.y = rot;
        });
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
        }

    requestAnimationFrame(render);
}

main();