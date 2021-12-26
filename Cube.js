import Triangle from "./Triangle.js";
import Model from "./Model.js";
class Cube extends Model {
    constructor(matrix, tex, colors) {
        super(matrix);
        this.triangles = [
            new Triangle([-1, -1, 1], [
                1, -1, 1
            ], [
                1, 1, 1
            ], tex, null, [
                colors[0],
                colors[0],
                colors[0]
            ]),
            new Triangle([
                1, 1, 1
            ], [-1, 1, 1], [-1, -1, 1], tex, null, [
                colors[0],
                colors[0],
                colors[0]
            ]),
            new Triangle([-1, -1, -1], [
                1, -1, -1
            ], [
                1, 1, -1
            ], tex, null, [
                colors[1],
                colors[1],
                colors[1]
            ]),
            new Triangle([
                1, 1, -1
            ], [-1, 1, -1], [-1, -1, -1], tex, null, [
                colors[1],
                colors[1],
                colors[1]
            ]),
            new Triangle([-1, 1, -1], [-1, 1, 1], [
                1, 1, 1
            ], tex, null, [
                colors[2],
                colors[2],
                colors[2]
            ]),
            new Triangle([
                1, 1, 1
            ], [
                1, 1, -1
            ], [-1, 1, -1], tex, null, [
                colors[2],
                colors[2],
                colors[2]
            ]),
            new Triangle([-1, -1, -1], [-1, -1, 1], [
                1, -1, 1
            ], tex, null, [
                colors[3],
                colors[3],
                colors[3]
            ]),
            new Triangle([
                1, -1, 1
            ], [
                1, -1, -1
            ], [-1, -1, -1], tex, null, [
                colors[3],
                colors[3],
                colors[3]
            ]),
            new Triangle([
                1, -1, -1
            ], [
                1, 1, -1
            ], [
                1, 1, 1
            ], tex, null, [
                colors[4],
                colors[4],
                colors[4]
            ]),
            new Triangle([
                1, 1, 1
            ], [
                1, -1, 1
            ], [
                1, -1, -1
            ], tex, null, [
                colors[4],
                colors[4],
                colors[4]
            ]),
            new Triangle([-1, -1, -1], [-1, 1, -1], [-1, 1, 1], tex, null, [
                colors[5],
                colors[5],
                colors[5]
            ]),
            new Triangle([-1, 1, 1], [-1, -1, 1], [-1, -1, -1], tex, null, [
                colors[5],
                colors[5],
                colors[5]
            ])
        ]
    }
}
export default Cube;