import Camera from "./Camera.js";
import Texture from "./Texture.js";
const tex = new Texture(document.getElementById("checkerboard"));

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.outputBuffer = this.ctx.createImageData(this.width, this.height);
        this.colorBuffer = new Float32Array(this.height * this.width * 3);
        this.depthBuffer = new Float32Array(this.height * this.width);
        this.camera = new Camera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    }
    setColorAt(x, y, r, g, b) {
        const idxAccess = (y * this.width + x) * 3;
        this.colorBuffer[idxAccess] = r;
        this.colorBuffer[idxAccess + 1] = g;
        this.colorBuffer[idxAccess + 2] = b;
    }
    setDepthAt(x, y, d) {
        const idxAccess = (y * this.width + x);
        this.depthBuffer[idxAccess] = d;
    }
    getDepth(x, y) {
        return this.depthBuffer[y * this.width + x];
    }
    getR(x, y) {
        return this.colorBuffer[(y * this.width + x) * 3];
    }
    getG(x, y) {
        return this.colorBuffer[(y * this.width + x) * 3 + 1];
    }
    getB(x, y) {
        return this.colorBuffer[(y * this.width + x) * 3 + 2];
    }
    writeToOutputBuffer() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const idxAccess = (y * this.width + x) * 4;
                this.outputBuffer.data[idxAccess] = this.getR(x, y) * 255;
                this.outputBuffer.data[idxAccess + 1] = this.getG(x, y) * 255;
                this.outputBuffer.data[idxAccess + 2] = this.getB(x, y) * 255;
                this.outputBuffer.data[idxAccess + 3] = 255;
            }
        }
    }
    drawBuffer() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.putImageData(this.outputBuffer, 0, 0);
    }
    draw() {
        this.writeToOutputBuffer();
        this.drawBuffer();
    }
    clear(r, g, b) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.setColorAt(x, y, r, g, b);
                this.setDepthAt(x, y, 1);
            }
        }
    }
    drawHorizontalLine(y, x1, x2, r, g, b) {
        if (y < 0 || y >= this.height) {
            return;
        }
        if (x1 > x2) {
            let temp = x1;
            x1 = x2;
            x2 = temp;
        }
        for (let x = x1; x <= x2; x++) {
            if (x < 0 || x >= this.width) {
                continue;
            }
            /*if (x === x1 || x === x2) {
                this.setColorAt(x, y, (r + this.getR(x, y)) / 2, (g + this.getG(x, y)) / 2, (b + this.getB(x, y)) / 2);
            } else {*/
            this.setColorAt(x, y, r, g, b);
            //}
        }
    }
    drawBottomTriangle(vertex1, vertex2, vertex3, r, g, b) {
        const inverseSlope1 = (vertex2[0] - vertex1[0]) / (vertex2[1] - vertex1[1]);
        const inverseSlope2 = (vertex3[0] - vertex1[0]) / (vertex3[1] - vertex1[1]);
        let currX1 = vertex1[0];
        let currX2 = vertex1[0];

        for (let y = vertex1[1]; y <= vertex2[1]; y += 1) {
            this.drawHorizontalLine(y, Math.floor(currX1), Math.floor(currX2), r, g, b);
            currX1 += inverseSlope1;
            currX2 += inverseSlope2;
        }
    }
    drawTopTriangle(vertex1, vertex2, vertex3, r, g, b) {
        const inverseSlope1 = (vertex3[0] - vertex1[0]) / (vertex3[1] - vertex1[1]);
        const inverseSlope2 = (vertex3[0] - vertex2[0]) / (vertex3[1] - vertex2[1]);
        let currX1 = vertex3[0];
        let currX2 = vertex3[0];
        for (let y = vertex3[1]; y >= vertex1[1]; y -= 1) {
            this.drawHorizontalLine(y, Math.floor(currX1), Math.floor(currX2), r, g, b);
            currX1 -= inverseSlope1;
            currX2 -= inverseSlope2;
        }
    }
    drawTriangle(vertex1, vertex2, vertex3, tri) {
        const v1 = { x: vertex1[0], y: vertex1[1], z: vertex1[2], w: vertex1[3] };
        const v2 = { x: vertex2[0], y: vertex2[1], z: vertex2[2], w: vertex2[3] };
        const v3 = { x: vertex3[0], y: vertex3[1], z: vertex3[2], w: vertex3[3] };
        const v1uv = tri.uv1;
        const v2uv = tri.uv2;
        const v3uv = tri.uv3;
        const col1 = tri.colors[0];
        const col2 = tri.colors[1];
        const col3 = tri.colors[2];
        const denom = (v2.y - v3.y) * (v1.x - v3.x) + (v3.x - v2.x) * (v1.y - v3.y);
        const invDenom = 1.0 / denom;
        const invV1 = 1.0 / v1.w;
        const invV2 = 1.0 / v2.w;
        const invV3 = 1.0 / v3.w;
        const b1y = (v2.y - v3.y);
        const b1x = (v3.x - v2.x);
        const b2y = (v3.y - v1.y);
        const b2x = (v1.x - v3.x);
        let minX = Math.min(Math.max(Math.floor(Math.min(v1.x, v2.x, v3.x)), 0), this.width);
        let minY = Math.min(Math.max(Math.floor(Math.min(v1.y, v2.y, v3.y)), 0), this.height);
        let maxX = Math.min(Math.max(Math.ceil(Math.max(v1.x, v2.x, v3.x)), 0), this.width);
        let maxY = Math.min(Math.max(Math.ceil(Math.max(v1.y, v2.y, v3.y)), 0), this.height);
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                const weight1 = (b1y * (x - v3.x) + b1x * (y - v3.y)) * invDenom;
                const weight2 = (b2y * (x - v3.x) + b2x * (y - v3.y)) * invDenom;
                const weight3 = 1 - weight1 - weight2;
                if (weight1 <= 0 || weight2 <= 0 || weight3 <= 0) {
                    continue;
                }
                const depth = weight1 * v1.z + weight2 * v2.z + weight3 * v3.z;
                const beforeDepth = this.getDepth(x, y);
                if (depth < beforeDepth) {
                    const w1d = weight1 * invV1;
                    const w2d = weight2 * invV2;
                    const w3d = weight3 * invV3;
                    const perspectiveDiv = w1d + w2d + w3d;
                    const invPDiv = 1 / perspectiveDiv;
                    const b1 = w1d * invPDiv;
                    const b2 = w2d * invPDiv;
                    const b3 = w3d * invPDiv;
                    const colorR = b1 * col1[0] + b2 * col2[0] + b3 * col3[0];
                    const colorG = b1 * col1[1] + b2 * col2[1] + b3 * col3[1];
                    const colorB = b1 * col1[2] + b2 * col2[2] + b3 * col3[2];
                    if (tri.tex) {
                        const xUv = b1 * v1uv.x + b2 * v2uv.x + b3 * v3uv.x;
                        const yUv = b1 * v1uv.y + b2 * v2uv.y + b3 * v3uv.y;
                        this.setColorAt(x, y, tri.tex.getPixelR(xUv, yUv) * colorR, tri.tex.getPixelG(xUv, yUv) * colorG, tri.tex.getPixelB(xUv, yUv) * colorB);
                    } else {
                        this.setColorAt(x, y, colorR, colorB, colorG);
                    }
                    this.setDepthAt(x, y, depth);
                }
            }
        }
    }
    toScreenSpace(vertex) {
        vertex[0] *= this.width;
        vertex[1] *= this.height;
        return vertex;
    }
    renderTriangle(tri, r, g, b, matrix) {
        this.drawTriangle(this.toScreenSpace(this.camera.project(tri.vertex1, matrix)), this.toScreenSpace(this.camera.project(tri.vertex2, matrix)), this.toScreenSpace(this.camera.project(tri.vertex3, matrix)), tri);
    }
    renderModel(model, r, g, b) {
        model.triangles.forEach(tri => {
            this.renderTriangle(tri, r, g, b, model.matrix);
        })
    }
}
export default Renderer;