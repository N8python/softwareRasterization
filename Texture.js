class Texture {
    constructor(image) {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        this.data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        this.width = image.width;
        this.height = image.height;
        this.image = image;
    }
    getPixelR(x, y) {
        x = Math.min(Math.max(Math.floor(x * this.width), 0), this.width);
        y = Math.min(Math.max(Math.floor(y * this.height), 0), this.height);
        return this.data[(y * this.width + x) * 4] / 255;
    }
    getPixelG(x, y) {
        x = Math.min(Math.max(Math.floor(x * this.width), 0), this.width);
        y = Math.min(Math.max(Math.floor(y * this.height), 0), this.height);
        return this.data[(y * this.width + x) * 4 + 1] / 255;
    }
    getPixelB(x, y) {
        x = Math.min(Math.max(Math.floor(x * this.width), 0), this.width);
        y = Math.min(Math.max(Math.floor(y * this.height), 0), this.height);
        return this.data[(y * this.width + x) * 4 + 2] / 255;
    }
    getPixelA(x, y) {
        x = Math.min(Math.max(Math.floor(x * this.width), 0), this.width);
        y = Math.min(Math.max(Math.floor(y * this.height), 0), this.height);
        return this.data[(y * this.width + x) * 4 + 3] / 255;
    }
}
export default Texture;