## Three.js

#### 预览
1. https://dingchaofa.github.io/WebGL/chapter1/index.html
 
#### 学习笔记
1. chapter1是几何形状的练习，演示，可在文件内查看  
https://github.com/dingchaofa/WebGL/blob/master/chapter1/index.htmlhttps://github.com/dingchaofa/WebGL/blob/master/chapter1/index.html

#### 学习资料
1. ![Three.js入门指南](http://www.ituring.com.cn/book/1272) 张雯莉
2. three.js常用的3中材料 http://blog.csdn.net/Newpidian/article/details/

#### 学习笔记
1. MeshBasicMaterial：对光照无感，给几何体一种简单的颜色或显示线框。

2. 总结Phong材质的特有属性：

　　ambient：设置材质的环境色，和AmbientLight光源一起使用，这个颜色会与环境光的颜色相乘。即是对光源作出反应。

　　emissive：设置材质发射的颜色，不是一种光源，而是一种不受光照影响的颜色。默认为黑色

　　specular：指定该材质的光亮程度及其高光部分的颜色，如果设置成和color属性相同的颜色，则会得到另一个更加类似属的材质，如果设置成grey灰色，则看起来像塑料

　　shininess：指定高光部分的亮度，默认值为30.