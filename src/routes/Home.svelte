<script>
    import * as THREE from "three";
    import * as TWEEN from "tween";
    import {loadModel} from "../lib/LoadModel";
    import {onMount} from "svelte";


    let clickStartX = 0;
    let clickEndX = 0;

    let touchstartX = 0;
    let touchendX = 0;

    let boolChange = false;
    let boolChange2 = false;
    //Set Scene
    const scene = new THREE.Scene();

    //Set Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);

    camera.lookAt(0, 0, 0);
    scene.add(camera);

    let grate = null;
    let grate2 = null;
    let grate3 = null;
    let text = null;

    const items = [];
    const itemPath = [
        '/glb/Item2.gltf',
        '/glb/Item4.gltf',
        '/glb/Item5.gltf',
        '/glb/Item7.gltf',
        '/glb/Item8.gltf',
        '/glb/Item9.gltf',
        '/glb/Item10.gltf',
        '/glb/Item11.gltf',
        '/glb/Item12.gltf',
        '/glb/Item13.gltf',
    ];

    //Set Renderer
    const renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setClearColor(0x330066);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //WindowResize
    window.addEventListener("resize", onWindowResize);

    const lights = {
        PL1: new THREE.PointLight(0x919eff, 20, 3, 7),
        PL2: new THREE.PointLight(0x919eff, 5, 4, 2),
        SPL1: new THREE.SpotLight(0xeceeff, 10, 2, 50, Math.PI / 2, 1)
    };

    lights.PL1.position.set(0.35, -0.9, -3);
    lights.PL2.position.set(-0.25, 1, -3.0);
    lights.PL1.castShadow = true;
    lights.PL1.shadow.bias = -0.005;
    lights.PL1.shadow.radius = shadow_radius;

    lights.SPL1.position.set(0, 0.7, -1);
    lights.SPL1.target.position.set(0, 0, -2.5);
    lights.SPL1.castShadow = false;

    scene.add(lights.PL1);
    scene.add(lights.PL2);
    scene.add(lights.SPL1);


    const shadow_radius = 2.7;

    //Set Model
    onMount(async () => {
        await loadModel('/glb/grate.gltf').then(model => grate = model);
        await loadModel('/glb/grate2.gltf').then(model => grate2 = model);
        await loadModel('/glb/grate3.gltf').then(model => grate3 = model);
        await loadModel('/glb/postperception.gltf').then(model => text = model);
        for (const path of itemPath) {
            await loadModel(path).then(model => items.push(model));
        }
        console.log('loaded')
        grate.position.set(0.1, 0, 0);
        grate3.position.set(0.1, 0, 0);
        grate2.position.set(0.1, 0, 0.1);
        text.position.set(-0, 0.50, -3.6);
        text.scale.set(2.2, 2.2, 2.2)

        items[3].position.set(0, 0, -2);

        for (const model of items) {
            model.scale.set(4, 4, 4);
        }

        scene.add(items[3]);
        scene.add(grate);
        scene.add(grate2);
        scene.add(grate3);
        scene.add(text);

        // Scroll to bottom when startup
        // window.scrollTo({left: 0, top: document.body.scrollHeight, behavior: "smooth"});
        document.getElementById('main').appendChild(renderer.domElement);

        //SetItem
        setItemPosition();
        controlItemPosition();

        //Update
        animate();
    })


    //Set Light

    // const light = new THREE.HemisphereLight(0xffffff, 0x000, 1.5);
    // scene.add(light);


    //-----Function-----

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }

    function render() {
        renderer.render(scene, camera);
        if (grate) {
            items[0].rotation.y += 0.013;
            grate.rotation.y += 0.00015;
            grate3.rotation.y += 0.00003;
            grate2.rotation.y += 0.00014;
        }
    }

    function setItemPosition() {
        items[0].position.set(0, 0, -2.5);

        for (let i = 1, j = 3; i < items.length; i++, j++) {
            items[i].position.set(j, 0, -5);
        }
        for (const model of items) {
            // model.position.set(0, 0, -2);
            scene.add(model)
        }

    }

    function controlItemPosition() {
        document.addEventListener("mousedown", (e) => {
            clickStartX = e.screenX;
        });
        document.addEventListener("mouseup", (e) => {
            clickEndX = e.screenX;
            checkDirectionOfMouseSwipe();
            if (boolChange) {
                let firstElement = items.shift();
                items.push(firstElement);
            }
            if (boolChange2) {
                let lastElement = items.pop();
                items.unshift(lastElement);
            }

        });
        document.addEventListener("touchstart", (e) => {
            touchstartX = e.changedTouches[0].screenX;
        });

        document.addEventListener("touchend", (e) => {
            touchendX = e.changedTouches[0].screenX;
            checkDirection();
            if (boolChange) {
                let firstElement = items.shift();
                items.push(firstElement);
            }
            if (boolChange2) {
                let lastElement = items.pop();
                items.unshift(lastElement);
            }
        });

    }

    function checkDirectionOfMouseSwipe() {
        if (clickStartX < clickEndX) {
            boolChange = true;
            boolChange2 = false;
            let positionList = []
            for (const item of items) {
                const positions = item.position;
                positionList.push(positions);
            }
            console.log(positionList);

            for (let i = 0; i < items.length; i++) {
                if (i - 1 === -1) {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({
                            x: positionList[items.length - 1].x,
                            y: positionList[items.length - 1].y,
                            z: positionList[items.length - 1].z
                        }, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                } else {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({x: positionList[i - 1].x, y: positionList[i - 1].y, z: positionList[i - 1].z}, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                }
            }
        } else if (clickStartX > clickEndX) {
            boolChange = false;
            boolChange2 = true;
            let positionList = []
            for (const item of items) {
                const positions = item.position;
                positionList.push(positions);
            }
            console.log(positionList);

            for (let i = 0; i < items.length; i++) {
                if (i + 1 === items.length) {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({x: positionList[0].x, y: positionList[0].y, z: positionList[0].z}, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                } else {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({x: positionList[i + 1].x, y: positionList[i + 1].y, z: positionList[i + 1].z}, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                }
            }
        } else {
            boolChange = false;
            boolChange2 = false;
        }
    }

    function checkDirection() {
        if (touchendX - touchstartX > 30) {
            boolChange = true;
            boolChange2 = false;
            let positionList = []
            for (const item of items) {
                const positions = item.position;
                positionList.push(positions);
            }
            console.log(positionList);

            for (let i = 0; i < items.length; i++) {
                if (i - 1 === -1) {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({
                            x: positionList[items.length - 1].x,
                            y: positionList[items.length - 1].y,
                            z: positionList[items.length - 1].z
                        }, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                } else {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({x: positionList[i - 1].x, y: positionList[i - 1].y, z: positionList[i - 1].z}, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                }
            }
        } else if (touchendX - touchstartX < -30) {
            boolChange = false;
            boolChange2 = true;
            let positionList = []
            for (const item of items) {
                const positions = item.position;
                positionList.push(positions);
            }
            console.log(positionList);

            for (let i = 0; i < items.length; i++) {
                if (i + 1 === items.length) {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({x: positionList[0].x, y: positionList[0].y, z: positionList[0].z}, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                } else {
                    let tween = new TWEEN.Tween(items[i].position)
                        .to({x: positionList[i + 1].x, y: positionList[i + 1].y, z: positionList[i + 1].z}, 3000)
                        .easing(TWEEN.Easing.Quadratic.InOut);
                    tween.start();
                }
            }
        } else {
            boolChange = false;
            boolChange2 = false;
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        render();
    }
</script>

<style>
    #scrollProgress {
        position: fixed;
        bottom: 10px;
        left: 10px;
        z-index: 99;
        font-size: 3vh;
    }
</style>

<span id="scrollProgress"></span>
<div id="main" class="w-screen h-screen fixed"></div>

