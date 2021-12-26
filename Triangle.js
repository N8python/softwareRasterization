class Triangle {
    constructor(vertex1, vertex2, vertex3, tex, uvs, colors) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.vertex3 = vertex3;
        if (!uvs) {
            this.uv1 = { x: 0, y: 0 };
            this.uv2 = { x: 0, y: 1 };
            this.uv3 = { x: 1, y: 1 };
        } else {
            this.uv1 = uvs[0];
            this.uv2 = uvs[1];
            this.uv3 = uvs[2];
        }
        if (!colors) {
            this.colors = [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ];
        } else {
            this.colors = colors;
        }
        this.tex = tex;
    }
}
export default Triangle;