(function() {
    'use strict';
    
    var scene, camera, renderer, container;
    var fieldOfView, aspectRatio, nearPlane, farPlane;
    var HEIGHT, WIDTH;
    
    var sea, airplane;
    
    var Colors = {
        red: 0xf25346,
        white: 0xd8d0d1,
        brown: 0x59332e,
        pink: 0xf5986e,
        brownDark: 0x23190f,
        blue: 0x68c3c0
    }
    
    var Sea = function() {
        var geom = new THREE.CylinderGeometry(600,600,800,40,10);
        geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        var mat = new THREE.MeshPhongMaterial({
            color: Colors.blue,
            transparent: true,
            opacity: 0.6,
            shading: THREE.FlatShading
        });
        this.mesh = new THREE.Mesh(geom, mat);
        this.mesh.receiveShadow = true;
    };
    
    function doWindowResize() {
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }
    
    function createScene() {
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
        
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 60;
        nearPlane = 1;
        farPlane = 10000;
        
        camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        camera.position.x = 0;
        camera.position.z = 200;
        camera.position.y = 100;
        
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.shadowMap.enabled = true;
        renderer.setSize(WIDTH, HEIGHT);
        
        container = document.getElementById('world');
        container.appendChild(renderer.domElement);
        
        window.addEventListener('resize', doWindowResize, false);
    }
    
    function createSea() {
        sea = new Sea();
        sea.mesh.position.y = -600;
        scene.add(sea.mesh);
    }
    
    function loop() {
        sea.mesh.rotation.z += 0.005;
        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    }
    
    function init() {
        createScene();
        createSea();
        loop();
    }
    
    window.addEventListener('load', init, false);
    
}());
