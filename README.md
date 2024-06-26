# The Problem of Apollonius - JavaScript demo

![animation](https://raw.githubusercontent.com/FuzzyCat444/Apollonius-Problem-JavaScript/main/images/animation.gif)

[My YouTube video](https://www.youtube.com/watch?v=_KbA55qvSqE)

[GitHub page link](https://fuzzycat444.github.io/Apollonius-Problem-JavaScript/)

The problem of Apollonius is a relatively challenging geometry problem where, given three circles, the goal is to find a circle tangent to all three. After finding a [nice paper](https://forumgeom.fau.edu/FG2017volume17/FG201735.pdf) by Milorad R. Stevanovic, Predrag B. Petrovic, and Marina M. Stevanovic demonstrating how to solve this problem, I decided to create a GitHub website explaining the problem and solution with an interactive JavaScript/HTML5 canvas app. The radii of the solution circles are computed exactly by solving a quadratic polynomial with the quadratic formula. I experimented with the arbitrary precision library [decimal.js](https://github.com/MikeMcl/decimal.js) by [MikeMcl](https://github.com/MikeMcl) out of curiosity. I recommend using Chrome, Edge, Opera, or Brave instead of Firefox as Firefox does not draw large circles accurately.
