from SpaceRock import SpaceRock
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

Comet = SpaceRock()
Comet.set('Borisov', 300000, 3.357, 44.05349, 209.1244, 308.14995, 0.)

Mars = SpaceRock()
Mars.set('Mars', 206655, 0.0934, 1.85, 286.4623, 49.57854, 0)

Earth = SpaceRock()
t0 = Earth.julian_date(2020, 1, 3)
Earth.set('Earth', 150000, 0.0167, 0.00005, 114.20783, -11.26064, t0)

Venus = SpaceRock()
Venus.set('Venus', 108200, 0.0068, 3.3946, 54.85229, 76.67069, 0)

Mercury = SpaceRock()
Mercury.set('Mercury', 57909, 0.2056, 7.0, 29.12, 48.33, 42.59)

xa = []
ya = []
za = []

x = []
y = []
z = []

xv = []
yv = []
zv = []

xm = []
ym = []
zm = []

xc = []
yc = []
zc = []

for i in range(0, 687):
    ra = Mars.get_r(t0 + i)
    r = Earth.get_r(t0 + i)
    rv = Venus.get_r(t0 + i)
    rm = Mercury.get_r(t0 + i)
    rc = Comet.get_r(t0 + i)

    xa.append(ra[0])
    ya.append(ra[1])
    za.append(ra[2])
    x.append(r[0])
    y.append(r[1])
    z.append(r[2])
    xv.append(rv[0])
    yv.append(rv[1])
    zv.append(rv[2])
    xm.append(rm[0])
    ym.append(rm[1])
    zm.append(rm[2])
    xc.append(rc[0])
    yc.append(rc[1])
    zc.append(rc[2])


fig = plt.figure()
ax1 = fig.add_subplot(111, projection='3d')
ax1.scatter(xa, ya, za, s=1, c='r', marker="o", label='Mars')
ax1.scatter(x, y, z, s=1, c='b', marker="o", label='Earth')
ax1.scatter(xv, yv, zv, s=1, c='y', marker="o", label='Venus')
ax1.scatter(xm, ym, zm, s=1, c='#999999', marker="o", label='Mercury')
#ax1.scatter(xc, yc, zc, s=1, c='purple', marker="o", label='Borisov')
ax1.scatter(0, 0, 0, s=10, c='#000000', marker="o", label='Sun')
ax1.set(xlim=(-250000, 250000), ylim=(-250000, 250000), zlim=(-250000, 250000))
plt.legend(loc='upper left')
plt.show()