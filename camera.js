import { Decimal, half, zero, one, two } from "./decimal.js";
import Vector from "./vector.js";

class Camera {
    constructor(canvas) {
        this.pos = new Vector();
        this.zoom = zero;
        this.canvas = canvas;
    }

    screenToWorld(p) {
        let width = this.width;
        let height = this.height;
        
        let pp = new Vector(p);
        pp.scale(two).scale(one.div(width), one.div(height)).sub(one, one);
        pp.scale(width.div(height), one);

        pp.scale(this.zoom.neg().exp());

        pp.add(this.pos);
        return pp;
    }

    worldToScreen(p) {
        let width = this.width;
        let height = this.height;
        
        let pp = new Vector(p);
        pp.sub(this.pos);

        pp.scale(this.zoom.exp())

        pp.scale(height.div(width), one).add(one, one).scale(half);
        pp.scale(width, height);
        return pp;
    }

    mouseCoordsScreen(event) {
        let rect = this.canvas.getBoundingClientRect();
        return new Vector(new Decimal(event.clientX - rect.left), new Decimal(event.clientY - rect.top));
    }

    mouseCoordsWorld(event) {
        return this.screenToWorld(this.mouseCoordsScreen(event));
    }

    screenToWorldScale(x) {
        let ez = this.zoom.neg().exp();
        return x.mul(two).mul(ez).div(this.height);
    }

    worldToScreenScale(x) {
        let ez = this.zoom.exp();
        return x.mul(half).mul(ez).mul(this.height);
    }

    get width() {
        return new Decimal(this.canvas.width);
    }

    get height() {
        return new Decimal(this.canvas.height);
    }
}

export { Camera as default };