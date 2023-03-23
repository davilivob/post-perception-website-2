import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"


async function loadModel(fileName) {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(fileName);
    return gltf.scene.children[0];
}

export {loadModel};
