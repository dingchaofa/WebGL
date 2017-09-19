var container,stats

var mesh, camera, scene, renderer, effect
var helper

var ready = false

var mouseX = 0, mouseY = 0

var windowHalfX = window.innerWidth/2,
    windowHalfY = window.innerHeight/2

var clock = new THREE.Clock() //跟踪时间的对象

init();
animate();

function init() {
  container = document.createElement('div')
  document.body.appendChild(container)

  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,2000)

  scene = new THREE.Scene()
  scene.add(new THREE.PolarGridHelper(30,10)) //定义一个半径是30，10条射线的极面网格，网格是一组二维的面

  var ambient = new THREE.AmbientLight(0x666666) //环境光
  scene.add(ambient)

  var directionalLight = new THREE.DirectionalLight(0x887766) //平行光
  directionalLight.position.set(-1,1,1).normalize() //设置光的方向
  scene.add(directionalLight)

  renderer = new THREE.WebGLRenderer({antialias:true}) //antialias抗锯齿
  renderer.setPixelRatio(window.devicePixelRatio) //设备像素比
  renderer.setSize(window.innerWidth,window.innerHeight) //渲染大小
  renderer.setClearColor(new THREE.Color(0xffffff)) //设置清除的颜色
  container.appendChild((renderer.domElement)) //把canvas添加到DOM上

  effect = new THREE.OutlineEffect(renderer) //生成目标轮廓效果

  var onProgress = function (xhr) {
    var process = document.getElementsByClassName('process')[0]
    if(xhr.lengthComputable){
      var percentComplete = xhr.loaded/xhr.total*100
      console.log(Math.round(percentComplete)+'% downloaded')
      process.textContent = Math.round(percentComplete)+'% downloaded'
    }
  }

  var onError = function (xhr) {

  }

  var modelFile = 'models/mmd/miku/miku_v2.pmd'; //一种三维模型
  var vmdFiles = [ 'models/mmd/vmds/wavefile_v2.vmd' ]; //模型动作
  var cameraFiles = [ 'models/mmd/vmds/wavefile_camera.vmd' ]; //相机动作
  var audioFile = 'models/mmd/audios/wavefile_short.mp3';
  var audioParams = { delayTime: 160 * 1 / 30 };

  helper = new THREE.MMDHelper() //MMDLoader.js

  var loader = new THREE.MMDLoader()

  loader.load(modelFile,vmdFiles,function (object) {
    mesh = object

    helper.add(mesh)
    helper.setAnimation(mesh)
    helper.setPhysics(mesh)

    loader.loadVmds(cameraFiles,function (vmd) {
      helper.setCamera(camera)

      loader.pourVmdIntoCamera(camera,vmd)

      helper.setCameraAnimation(camera)

      loader.loadAudio(audioFile,function (audio,listener) {
        listener.position.z = 1
        helper.setAudio(audio,listener,audioParams)

        helper.unifyAnimationDuration()

        scene.add(audio)
        scene.add(listener)
        scene.add(mesh)

        ready = true
      },onProgress,onError)
    },onProgress,onError)
  },onProgress,onError)

  document.addEventListener('mousemove',onDocumentMouseMove)

  window.addEventListener('resize',onWindowResize)
}

function onDocumentMouseMove() {
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  effect.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

  requestAnimationFrame( animate );
  render();

}

function render() {

  if ( ready ) {

    helper.animate( clock.getDelta() );

  }

  effect.render( scene, camera );

}