import Decimal from "./decimal.mjs";

Decimal.set({ precision: 30 });

let half = new Decimal("0.5");
let zero = new Decimal(0);
let one = new Decimal(1);
let two = new Decimal(2);

export { Decimal as Decimal, half as half, zero as zero, one as one, two as two };