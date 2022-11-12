import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import Triangle from "./Triangle.js";
import Cube from "./Cube.js";
import Model from "./Model.js";
import * as THREE from 'https://cdn.skypack.dev/three@0.133.0';
import Texture from "./Texture.js";
const { mat4, vec3, vec4, quat } = glMatrix;
const canvas = document.getElementById("canvas");
const renderer = new Renderer(canvas);
const myCamera = new Camera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const checkTex = new Texture(document.getElementById("checkerboard"));
const stoneTex = new Texture(document.getElementById("stone"));
const brickTex = new Texture(document.getElementById("brick"));
//console.log(tex.getPixelR(0.39, 0))
camera.position.z = 5;
camera.lookAt(0, 0, 0);
camera.updateMatrix();
//console.log(myCamera.projectionMatrix);
//console.log(camera.projectionMatrix.elements);
//myCamera.projectionMatrix = camera.projectionMatrix.elements.slice();
//myCamera.viewMatrix = camera.matrixWorldInverse.elements.slice();
//console.log(camera.projectionMatrix.elements);
//console.log(new THREE.Vector3(0, 0, -100).project(camera))

/*renderer.clear(0, 1, 1);
renderer.drawTriangle([300, 300], [310.5, 300], [310, 310], 1, 0, 0);
//renderer.drawTopTriangle([500, 355], [390, 355], [300, 400], 1, 0, 0);

renderer.draw();*/
const testTriangle = new Triangle([1, 1, 0.5], [1, 0, 0.5], [0, 0, 0.5], stoneTex);
const testTriangle2 = new Triangle([0.5, 1, 1], [0.5, 0, 1], [0.5, 0, 0], stoneTex);
const testTriangle5 = new Triangle([-0.5, 1, 0.5], [-0.5, 0, 0.5], [0.5, 0, 0.5], stoneTex, null, [
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0]
]);
const testTriangle6 = new Triangle([0, 1, 1], [0, 0, 1], [0, 0, 0], stoneTex, null, [
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0]
]);
const testTriangle7 = new Triangle([1, 1, -0.5 + 0.5], [1, 0, -0.5 + 0.5], [0, 0, -0.5 + 0.5], stoneTex, null, [
    [1.0, 0.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0]
]);
const testTriangle8 = new Triangle([0.5, 1, -1 + 0.5], [0.5, 0, -1 + 0.5], [0.5, 0, 0 + 0.5], stoneTex, null, [
    [1.0, 0.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0]
]);
const testTriangle3 = new Triangle([-1 + 0.5, 1, -0.5 + 0.5], [-1 + 0.5, 0, -0.5 + 0.5], [0 + 0.5, 0, -0.5 + 0.5], stoneTex, null, [
    [0.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0]
]);
const testTriangle4 = new Triangle([-0.5 + 0.5, 1, -1 + 0.5], [-0.5 + 0.5, 0, -1 + 0.5], [-0.5 + 0.5, 0, 0 + 0.5], stoneTex, null, [
    [0.0, 1.0, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 1.0, 1.0]
]);
const groundTri = new Triangle([3, 0, 3], [3, 0, -3], [-3, 0, -3], brickTex, [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
], [
    [1.0, 1.0, 1.0],
    [1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0]
]);
const groundTri2 = new Triangle([-3, 0, -3], [-3, 0, 3], [3, 0, 3], brickTex, [
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: 0 }
], [
    [0.0, 1.0, 1.0],
    [1.0, 1.0, 0.0],
    [1.0, 1.0, 1.0]
]);
const testCube = new Cube(mat4.create(), checkTex, [
    [1.0, 1.0, 1.0],
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
    [1.0, 1.0, 0.0],
    [1.0, 0.0, 1.0]
]);
const sideCubes = [];
for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        if (!(x === 1 && y === 1)) {
            const cube = new Cube(mat4.create(), checkTex, [
                [Math.random(), Math.random(), Math.random()],
                [Math.random(), Math.random(), Math.random()],
                [Math.random(), Math.random(), Math.random()],
                [Math.random(), Math.random(), Math.random()],
                [Math.random(), Math.random(), Math.random()],
                [Math.random(), Math.random(), Math.random()]
            ]);
            cube.x = x;
            cube.y = y;
            cube.offset = Math.random() * 10000;
            sideCubes.push(cube);
        }
    }
}
const altar = new Model(mat4.fromTranslation(mat4.create(), [-0.25, 0, -0.25]));
altar.triangles = [testTriangle, testTriangle2, testTriangle3, testTriangle4, testTriangle5, testTriangle6, testTriangle7, testTriangle8];
//const testTriangle = new Triangle([10, 10, 0], [1, 0, 0], [0, 0, 0])
let avgTime = 1;
let frames = 1;

function animate() {
    renderer.clear(0, 1, 1);
    /*const point = myCamera.project([1, 1, 0]);
    for (let i = -3; i <= 3; i++) {
        for (let j = -3; j <= 3; j++) {
            renderer.setColorAt(Math.floor(point[0] * canvas.width + i), Math.floor(point[1] * canvas.height + j), 1, 0, 0);
        }
    }*/
    //renderer.drawTriangle([100 + 50 * Math.sin(performance.now() / 500), 100 + 40 * Math.cos(performance.now() / 250)], [100 + 50 * Math.cos(performance.now() / 250), 200 + 150 * Math.sin(performance.now() / 250)], [200 + 140 * Math.sin(performance.now() / 250), 200 + 75 * Math.cos(performance.now() / 1000)], 1, 0, 0);
    const start = performance.now();
    const scale = 0.25 + 0.1 * (0.5 * Math.sin(performance.now() / 1000) + 0.5);
    testCube.matrix = mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler([0, 0, 0, 0], performance.now() * 0.1, -performance.now() * 0.1, performance.now() * 0.1), [0, 1, 0], [scale, scale, scale]);
    renderer.renderTriangle(groundTri, 0, 1, 0);
    renderer.renderTriangle(groundTri2, 0, 1, 0);
    /*renderer.renderTriangle(testTriangle, 1, 0, 0);
    renderer.renderTriangle(testTriangle2, 1, 0, 0);
    renderer.renderTriangle(testTriangle3, 1, 0, 0);
    renderer.renderTriangle(testTriangle4, 1, 0, 0);
    renderer.renderTriangle(testTriangle5, 1, 0, 0);
    renderer.renderTriangle(testTriangle6, 1, 0, 0);
    renderer.renderTriangle(testTriangle7, 1, 0, 0);
    renderer.renderTriangle(testTriangle8, 1, 0, 0);*/
    renderer.renderModel(altar, 1, 0, 0);
    renderer.renderModel(testCube, 1, 0, 0);
    sideCubes.forEach(cube => {
        const scale = 0.5 * (0.25 + 0.1 * (0.5 * Math.sin((performance.now() + cube.offset) / 1000) + 0.5));
        cube.matrix = mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler([0, 0, 0, 0], (performance.now() + cube.offset) * 0.1, (-performance.now() - cube.offset) * 0.1, (-performance.now() - cube.offset) * 0.1), [cube.x - 1, 0.5, cube.y - 1], [scale, scale, scale]);
        renderer.renderModel(cube, 1, 0, 0);
    })
    renderer.camera.setPositionAndTarget([10 * Math.sin(performance.now() / 1000), 6 + 3 * Math.sin(performance.now() / 500), 10 * Math.cos(performance.now() / 1000)], [0, 0, 0]);
    renderer.draw();
    avgTime += performance.now() - start;
    frames++;
    console.log(avgTime / frames);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);