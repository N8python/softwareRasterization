const { mat4, vec3, vec4 } = glMatrix;
class Camera {
    constructor(fov, aspect, near, far, position = [0, 0, 5], target = [0, 0, 0]) {
        this.projectionMatrix = mat4.create();
        mat4.perspective(this.projectionMatrix, fov, aspect, near, far);
        this.viewMatrix = mat4.create();
        this.position = target;
        this.target = target;
        mat4.targetTo(this.viewMatrix, position, target, [0, 1, 0]);
        mat4.invert(this.viewMatrix, this.viewMatrix);
    }
    setPositionAndTarget(position, target) {
        mat4.targetTo(this.viewMatrix, position, target, [0, 1, 0]);
        mat4.invert(this.viewMatrix, this.viewMatrix);
    }
    project(point, matrix) {
        const projectedPoint = [point[0], point[1], point[2], 1];
        if (matrix) {
            vec4.transformMat4(projectedPoint, projectedPoint, matrix);
        }
        vec4.transformMat4(projectedPoint, projectedPoint, this.viewMatrix);
        vec4.transformMat4(projectedPoint, projectedPoint, this.projectionMatrix);
        projectedPoint[0] /= projectedPoint[3];
        projectedPoint[1] /= projectedPoint[3];
        projectedPoint[2] /= projectedPoint[3];
        projectedPoint[0] = 1.0 - (projectedPoint[0] * 0.5 + 0.5);
        projectedPoint[1] = (projectedPoint[1] * 0.5 + 0.5);
        projectedPoint[2] = 1.0 - (projectedPoint[2] * 0.5 + 0.5);
        projectedPoint[3] = projectedPoint[3];
        return projectedPoint;
    }
}
export default Camera;