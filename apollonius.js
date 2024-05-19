import { Decimal, half, zero, one, two } from "./decimal.js";
import Vector from "./vector.js";
import Camera from "./camera.js";


let canvas = document.getElementById("thecanvas");
let ctx = canvas.getContext("2d");
let camera = new Camera(canvas);
let rc = new Decimal("0.2");
let circlePoints = [new Vector(half.neg(), half), new Vector(rc, rc), new Vector(zero, half.neg()), new Vector(rc, rc), new Vector(half, half), new Vector(rc, rc)];
let circleColors = ["#ff0000", "#ff0000", "#002ff6", "#002ff6", "#0f9800", "#0f9800", "#ce00ff", "#ce00ff"];
let solutionToggles = [];
for (let i = 0; i < 8; i++) solutionToggles.push(true);
let pointSize = new Decimal(3.5);
let pointClickSize = new Decimal(10);
let pointSelected = -1;
let showPoints = true;
let worldDragPoint = null;

// Returns the index of the draggable point closest to the given point in world coordinates
function pointNearCirclePoints(p, circlePoints) {
    let ps = camera.screenToWorldScale(pointClickSize);
    let ps2 = ps * ps;
    for (let j = 0; j < circlePoints.length; j++) {
        let i = 0;
        if (j < circlePoints.length / 2) {
            i = j * 2 + 1;
        } else {
            i = 2 * (j - circlePoints.length / 2);
        }
        let p1 = circlePoints[i];
        let p1_ = new Vector(p1);
        if (i % 2 === 1) {
            let p2 = circlePoints[i - 1];
            p1_.add(p2);
        }
        p1_.sub(p);
        if (p1_.lenSq < ps2) {
            return i;
        }
    }
    return -1;
}

function updateMouse(event) {
    let m = camera.mouseCoordsWorld(event);
    if (pointSelected !== -1) {
        let p = circlePoints[pointSelected];
        if (pointSelected % 2 === 1) {
            let p2 = circlePoints[pointSelected - 1];
            p.set(m).sub(p2);
        } else {
            p.set(m);
        }
    } else if (worldDragPoint !== null) {
        let mw = camera.mouseCoordsWorld(event);
        camera.pos.add(worldDragPoint.minus(mw));
    } else {
        if (pointNearCirclePoints(m, circlePoints) !== -1) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "auto";
        }
    }
}

canvas.addEventListener("wheel", event => {
    if (document.activeElement === canvas) {
        event.preventDefault();
        camera.zoom = camera.zoom.sub(0.001 * event.deltaY);
        updateMouse(event);
    }
});

canvas.addEventListener("mousedown", event => {
    event.preventDefault();
    let m = camera.mouseCoordsWorld(event);
    pointSelected = pointNearCirclePoints(m, circlePoints);
    worldDragPoint = new Vector(m);

    if (pointSelected === -1) {
        canvas.style.cursor = "grab";
    } else {
        canvas.style.cursor = "pointer";
    }
    canvas.focus();
});

canvas.addEventListener("mouseup", event => {
    pointSelected = -1;
    worldDragPoint = null;
    canvas.style.cursor = "auto";
});

canvas.addEventListener("mousemove", updateMouse);

canvas.addEventListener("keydown", event => {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        let code = event.keyCode - 48;
        if (code >= 1 && code <= 8) {
            let i = code - 1;
            solutionToggles[i] = !solutionToggles[i];
        } else {
            let trueFalse = code === 9;
            for (let i = 0; i < 8; i++) {
                solutionToggles[i] = trueFalse;
            }
        }
    } else if (event.keyCode === 72) {
        showPoints = !showPoints;
    }
});

canvas.setAttribute("tabindex", 0);

// Finds two solution radii by finding two roots of the Apollonius quadratic
// (sign1, sign2) can be (1,1), (1,-1), (-1,1), or (-1,-1)
// 4 sign combinations * 2 solutions per quadratic = all 8 possible solutions
// It is not necessary to generate all 8 sign combinations as solutions come in pairs
function getSolutionPair(circlePoints, sign1, sign2) {
    let circles = [];
    // If circles are described by two points, convert them to one point and a radius
    for (let i = 0; i < 3; i++) {
        let index = 2 * i;
        
        circles.push(circlePoints[index]);
        
        let radius = circlePoints[index + 1];
        if (radius.constructor === Vector) {
            circles.push(radius.len);
        } else {
            circles.push(radius);
        }
    }
    
    let r_a = circles[1].mul(sign1);
    let r_b = circles[3].mul(sign2);
    let r_c = circles[5];
    let ab2 = circles[0].minus(circles[2]).lenSq;
    let bc2 = circles[2].minus(circles[4]).lenSq;
    let ac2 = circles[0].minus(circles[4]).lenSq;
    let K_a = r_b.sub(r_c).pow(two).sub(bc2);
    let K_b = r_a.sub(r_c).pow(two).sub(ac2);
    let K_c = r_a.sub(r_b).pow(two).sub(ab2);
    let K_a2 = K_a.pow(two);
    let K_b2 = K_b.pow(two);
    let K_c2 = K_c.pow(two);
    let _2K_aK_b = two.mul(K_a).mul(K_b);
    let _2K_bK_c = two.mul(K_b).mul(K_c);
    let _2K_aK_c = two.mul(K_a).mul(K_c);
    let K_aK_bK_c = K_a.mul(K_b).mul(K_c);
    
    // Compute coefficients of solution quadratic
    let A = K_a2.add(K_b2).add(K_c2).sub(_2K_aK_b).sub(_2K_bK_c).sub(_2K_aK_c);
    let B = two.mul(K_a2).mul(r_a).add(two.mul(K_b2).mul(r_b)).add(two.mul(K_c2).mul(r_c)).sub(_2K_aK_b.mul(r_a.add(r_b))).sub(_2K_bK_c.mul(r_b.add(r_c))).sub(_2K_aK_c.mul(r_a.add(r_c)));
    let C = K_a2.mul(r_a.pow(two)).add(K_b2.mul(r_b.pow(two))).add(K_c2.mul(r_c.pow(two))).sub(_2K_aK_b.mul(r_a).mul(r_b)).sub(_2K_bK_c.mul(r_b).mul(r_c)).sub(_2K_aK_c.mul(r_a).mul(r_c)).sub(K_aK_bK_c);
    
    if (A.eq(zero))
        return null;
    
    let discriminant = B.pow(two).sub(new Decimal(4).mul(A).mul(C));
    if (discriminant.lt(zero))
        return null;
    let denominator = one.div(two.mul(A));
    let sqrt = discriminant.sqrt();
    
    // Solve the quadratic using the quadratic formula
    let r1 = B.neg().sub(sqrt).mul(denominator);
    let r2 = B.neg().add(sqrt).mul(denominator);
    
    return [[r1, r2], circles];
}

// Locates point based on distances to three other points using circle-circle intersection
// Formula for circle-circle intersection: https://mathworld.wolfram.com/Circle-CircleIntersection.html
// There appears to be a typo in the square root when solving for "a" on the website, I worked through the algebra and fixed it here
const circleEpsilon = new Decimal("0.000000000001");
function triangulatePosition(p1, p2, p3, d1, d2, d3) {
    let d = p1.minus(p2).len;
    if (d.eq(zero))
        return null;
    let discriminant = d.add(d1).sub(d2).mul(d.sub(d1).add(d2)).mul(d.add(d1).add(d2)).mul(d.neg().add(d1).add(d2));
    if (discriminant.lt(zero))
        return null;
    let halfDivD = half.div(d);
    let x = halfDivD.mul(d.pow(two).add(d1.pow(two)).sub(d2.pow(two)));
    let y = halfDivD.mul(discriminant.sqrt());
    
    let axis1 = p2.minus(p1);
    axis1.len = x;
    let axis2 = new Vector(axis1.y.neg(), axis1.x);
    axis2.len = y;
    
    let int1 = p1.plus(axis1.plus(axis2));
    let int2 = p1.plus(axis1.minus(axis2));
    
    let onCircle3_1 = int1.minus(p3).len.sub(d3).abs();
    let onCircle3_2 = int2.minus(p3).len.sub(d3).abs();
    
    if (onCircle3_1.lt(circleEpsilon)) {
        return int1;
    } else if (onCircle3_2.lt(circleEpsilon)) {
        return int2;
    } else {
        return null;
    };
}

function drawCircle(ctx, camera, p1, p2, drawPoints) {
    let center = camera.worldToScreen(p1);
    let radius = p2;
    let hasP2 = p2.constructor === Vector;
    if (hasP2) {
        radius = p2.len;
    }
    radius = camera.worldToScreenScale(radius);
    
    let cx = center.x.toNumber();
    let cy = center.y.toNumber();
    let ps = pointSize.toNumber();
    
    // Circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius.toNumber(), 0, 2 * Math.PI, false);
    ctx.stroke();

    if (drawPoints) {
        ctx.lineWidth = 1.5;
        // Center point
        ctx.beginPath();
        ctx.arc(cx, cy, ps, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        if (hasP2) {
            // Point on circumference
            let radiusPoint = camera.worldToScreen(p1.plus(p2));
            ctx.beginPath();
            ctx.arc(radiusPoint.x.toNumber(), radiusPoint.y.toNumber(), ps, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.stroke();
        }
    }
}

let previousTimeStamp = null;
requestAnimationFrame(function animate(timeStamp) {
    
    if (previousTimeStamp == null)
        previousTimeStamp = timeStamp;
    
    if (timeStamp - previousTimeStamp > 6) {
        let style = getComputedStyle(canvas);
        canvas.width = parseInt(style.width);
        canvas.height = parseInt(style.height);
        let aspect = canvas.height / canvas.width;
        if (canvas.width > 1200) {
            canvas.width = 1200;
            canvas.height = aspect * canvas.width;
        }

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i <= circlePoints.length - 2; i += 2) {
            let p1 = circlePoints[i];
            let p2 = circlePoints[i + 1];

            ctx.lineWidth = 3;
            ctx.strokeStyle = "black";
            ctx.fillStyle = "blue";

            drawCircle(ctx, camera, p1, p2, showPoints);
        }
        
        for (let i = 0; i < 4; i++) {
            // Compute sign combination from i by extracting the first and second bits
            // Sign combination can be any of (1,1), (1,-1), (-1,1), (-1,-1)
            let sign1 = new Decimal(1 - 2 * (i & 1));
            let sign2 = new Decimal(1 - 2 * ((i >> 1) & 1));
            
            let solution = getSolutionPair(circlePoints, sign1, sign2);
            if (solution != null) {
                let p_a = solution[1][0];
                let p_b = solution[1][2];
                let p_c = solution[1][4];
                let r_a = solution[1][1];
                let r_b = solution[1][3];
                let r_c = solution[1][5];
                
                let r1 = solution[0][0];
                let r2 = solution[0][1];
                let p1 = triangulatePosition(p_a, p_b, p_c, r_a.add(sign1.mul(r1)).abs(), r_b.add(sign2.mul(r1)).abs(), r_c.add(r1).abs());
                let p2 = triangulatePosition(p_a, p_b, p_c, r_a.add(sign1.mul(r2)).abs(), r_b.add(sign2.mul(r2)).abs(), r_c.add(r2).abs());
                
                let si1 = 2 * i;
                let si2 = si1 + 1;
                ctx.lineWidth = 2;
                if (solutionToggles[si1] && p1 != null) {
                    ctx.strokeStyle = circleColors[si1];
                    drawCircle(ctx, camera, p1, r1.abs(), false);
                }
                if (solutionToggles[si2] && p2 != null) {
                    ctx.strokeStyle = circleColors[si2];
                    drawCircle(ctx, camera, p2, r2.abs(), false);
                }
            }
        }
        
        previousTimeStamp = timeStamp;
    }
    requestAnimationFrame(animate);
});
