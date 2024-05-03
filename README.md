# Apollonius-Problem-JavaScript

$$\large\lvert\vec{c}-\vec{c_1}\rvert^2=(r+r_1)^2$$

$$\large\lvert\vec{c}-\vec{c_2}\rvert^2=(r+r_2)^2$$

$$\large\lvert\vec{c}-\vec{c_3}\rvert^2=(r+r_3)^2$$

Expanded:

$$\large\lvert\vec{c}\rvert^2-2(\vec{c}\cdot\vec{c_1})+\lvert\vec{c_1}\rvert^2=r^2+2r_1r+r_1^2$$

$$\large\lvert\vec{c}\rvert^2-2(\vec{c}\cdot\vec{c_2})+\lvert\vec{c_2}\rvert^2=r^2+2r_2r+r_2^2$$

$$\large\lvert\vec{c}\rvert^2-2(\vec{c}\cdot\vec{c_3})+\lvert\vec{c_3}\rvert^2=r^2+2r_3r+r_3^2$$

Eliminate $\large\lvert\vec{c}\rvert^2$:

$$\large\vec{c}\cdot\vec{c_3}-\vec{c}\cdot\vec{c_2}=(r_2-r_3)r+\frac{1}{2}(r_2^2-r_3^2+\lvert\vec{c_3}\rvert^2-\lvert\vec{c_2}\rvert^2)$$

$$\large\vec{c}\cdot\vec{c_2}-\vec{c}\cdot\vec{c_1}=(r_1-r_2)r+\frac{1}{2}(r_1^2-r_2^2+\lvert\vec{c_2}\rvert^2-\lvert\vec{c_1}\rvert^2)$$

$$\large\vec{c}\cdot\vec{c_1}-\vec{c}\cdot\vec{c_3}=(r_3-r_1)r+\frac{1}{2}(r_3^2-r_1^2+\lvert\vec{c_1}\rvert^2-\lvert\vec{c_3}\rvert^2)$$

Express $\large\vec{c_1}$ as a linear combination of $\large\vec{c_2}$ and $\large\vec{c_3}$:

$$\large\vec{c_1}=m\vec{c_2}+n\vec{c_3}$$

New equation to eliminate $\large\vec{c}\cdot\vec{c_1}$:

$$\large\vec{c}\cdot(m\vec{c_2}+n\vec{c_3})-\vec{c}\cdot\vec{c_3}=(r_3-r_1)r+\frac{1}{2}(r_3^2-r_1^2+\lvert\vec{c_1}\rvert^2-\lvert\vec{c_3}\rvert^2)$$

$$\large m(\vec{c}\cdot\vec{c_2})+n(\vec{c}\cdot\vec{c_3})-\vec{c}\cdot\vec{c_3}=(r_3-r_1)r+\frac{1}{2}(r_3^2-r_1^2+\lvert\vec{c_1}\rvert^2-\lvert\vec{c_3}\rvert^2)$$

Find $\large\vec{c}\cdot\vec{c_3}$:

$$\large X=\vec{c_1}\cdot\vec{c_1}$$

$$\large Y=\vec{c_2}\cdot\vec{c_2}$$

$$\large Z=\vec{c_3}\cdot\vec{c_3}$$

$$\large W_{12}=\vec{c_1}\cdot\vec{c_2}$$

$$\large W_{23}=\vec{c_2}\cdot\vec{c_3}$$

$$\large W_{31}=\vec{c_3}\cdot\vec{c_1}$$
