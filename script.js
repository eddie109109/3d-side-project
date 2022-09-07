// import * as THREE from './Three.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';



function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;


    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    const objects = [];
    const spread = 15;

    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;
    
        scene.add(obj);
        objects.push(obj);
    }

    function createMaterial() {
        const material = new THREE.MeshPhongMaterial({
          side: THREE.DoubleSide,
        });
    
        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);
    
        return material;
      }
    
      function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMaterial());
        addObject(x, y, mesh);
      }

      function addLineGeometry(x, y, geometry) {
        const material = new THREE.LineBasicMaterial({color: 0x000000});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);
      }

      {
        const width = 8;
        const height = 8;
        const depth = 8;
        addSolidGeometry(-2, 2, new THREE.BoxGeometry(width, height, depth));
      }

      {
            const loader = new THREE.FontLoader();
            function loadFont(url) {
                return new Promise((resolve, reject) => {
                  loader.load(url, resolve, undefined, reject);
                });
            }
            async function doit() {
                const font = await loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json');  
                const geometry = new THREE.TextGeometry('Eddie Chen', {
                  font: font,
                  size: 6.0,
                  height: .2,
                  curveSegments: 12,
                  bevelEnabled: true,
                  bevelThickness: 0.15,
                  bevelSize: .3,
                  bevelSegments: 5,
                });
                const mesh = new THREE.Mesh(geometry, createMaterial());
                geometry.computeBoundingBox();
                geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
          
                const parent = new THREE.Object3D();
                parent.add(mesh);
          
                addObject(-1, -1, parent);
              }
              doit();
      }

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
    
        objects.forEach((obj, ndx) => {
          const speed = .1 + ndx * .05;
          const rot = time * speed;
          obj.rotation.x = rot;
          obj.rotation.y = rot;
        });
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
      }
    
      requestAnimationFrame(render);

}




// main();
