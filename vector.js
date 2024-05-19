import { Decimal, half, zero, one, two } from "./decimal.js";

class Vector {
    constructor(x, y) {
        if (x == null) {
            this.x = zero;
            this.y = zero;
        } else if (x.constructor === Vector) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    set(x, y) {
        if (x.constructor === Vector) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
        return this;
    }

    get lenSq() {
        return this.x.pow(two).add(this.y.pow(two));
    }

    get len() {
        return this.lenSq.sqrt();
    }

    set len(length) {
        let ratio = length.div(this.len);
        this.x = this.x.mul(ratio);
        this.y = this.y.mul(ratio);
    }

    dot(x, y) {
        if (x.constructor === Vector) {
            return this.x.mul(x.x).add(this.y.mul(x.y));
        } else {
            return this.x.mul(x).add(this.y.mul(y));
        }
    }

    plus(x, y) {
        if (x.constructor === Vector) {
            return new Vector(
                this.x.add(x.x),
                this.y.add(x.y)
            );
        } else {
            return new Vector(
                this.x.add(x),
                this.y.add(y)
            );
        }
    }

    minus(x, y) {
        if (x.constructor === Vector) {
            return new Vector(
                this.x.sub(x.x),
                this.y.sub(x.y)
            );
        } else {
            return new Vector(
                this.x.sub(x),
                this.y.sub(y)
            );
        }
    }

    scaled(x, y) {
        if (x.constructor === Vector) {
            return new Vector(
                this.x.mul(x.x),
                this.y.mul(x.y)
            );
        } else if (y == null) {
            return new Vector(
                this.x.mul(x),
                this.y.mul(x)
            );
        } else {
            return new Vector(
                this.x.mul(x),
                this.y.mul(y)
            );
        }
    }

    add(x, y) {
        if (x.constructor === Vector) {
            this.x = this.x.add(x.x);
            this.y = this.y.add(x.y);
        } else {
            this.x = this.x.add(x);
            this.y = this.y.add(y);
        }
        return this;
    }

    sub(x, y) {
        if (x.constructor === Vector) {
            this.x = this.x.sub(x.x);
            this.y = this.y.sub(x.y);
        } else {
            this.x = this.x.sub(x);
            this.y = this.y.sub(y);
        }
        return this;
    }

    scale(x, y) {
        if (x.constructor === Vector) {
            this.x = this.x.mul(x.x);
            this.y = this.y.mul(x.y);
        } else if (y == null) {
            this.x = this.x.mul(x);
            this.y = this.y.mul(x);
        } else {
            this.x = this.x.mul(x);
            this.y = this.y.mul(y);
        }
        return this;
    }

    toString() {
        return "(" + this.x.toString() + ", " + this.y.toString() + ")";
    }
}

export { Vector as default };