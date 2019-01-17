(function () {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
  };
  var urltype = $.getUrlParam('id')

  function getSell(id) {
    $.ajax({
      url: "http://api.gifts.lzlj.online/admin/prize_lists/1",
      type: "post",
      data: { prize_id: id, _method: 'put' },
      dataType: 'JSON',
      cache: false,
      success: function (res) {
        console.log(res)
        let itemImg = res.data
        let sellHtml = ''
        // if (itemImg == 'system busyness.') {
        //   // alert("该商品已被领取，请扫描其他商品二维码！");
        //   sellHtml = `<h3>该商品已被领取，请扫描其他商品二维码！</h3>`
        // } else {
        //   sellHtml = `<img src="${itemImg.image}">`
        // }
        // $('#giftSell').html(sellHtml);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("加载失败，请检查网络后重试。");
        console.log(response.code);
      }
    });
  }

  window.onload = () => {
    if(urltype){
      draw()
      // getSell(urltype)
    }else{
      // alert("未获取到数据，请稍候重试！");
    }
  }

  var renderer;
  function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //告诉渲染器需要阴影效果
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);
  }

  var camera;
  function initCamera() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  var scene;
  function initScene() {
    scene = new THREE.Scene();
  }

  //初始化dat.GUI简化试验流程
  var gui;
  function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
    };
    // 右上角的开启关闭
    // var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
  }


  var light;
  function initLight() {
    scene.add(new THREE.AmbientLight(0xcccccc));
    // scene.add(new THREE.AmbientLight(0xffffff));

    light = new THREE.PointLight(0xffffff, .5);
    light.position.set(50, 50, 50);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);
  }


  function initModel() {
    // Heineken Jager 0.015  
    let scaleNum = .5
    //辅助工具  显示线
    // var helper = new THREE.AxesHelper(50);
    // scene.add(helper);

    let daeUrl = 'dae/3/item.dae'
    var loader = new THREE.ColladaLoader();
    var mesh;
    loader.load( daeUrl, function (result) {
      document.getElementsByClassName('loading')[0].style.display = 'none';
      // mesh = result.scene.children[0].clone();
      mesh = result.scene
      console.log(result)
      console.log(result.scene)
      // 模型居中
      let box = new THREE.Box3().setFromObject(mesh);
      console.log(box)
      // 默认20,缩小0.5,设定为10
      // mesh.position.set((-box.max.x - box.min.x) * 20, (-box.max.y - box.min.y) * 20,(-box.max.z - box.min.z) * 20)
      mesh.position.set((-box.max.x - box.min.x) * scaleNum * 20, (-box.max.y - box.min.y) * scaleNum * 20, (-box.max.z - box.min.z) * scaleNum * 20)
      // 缩放
      mesh.scale.set(scaleNum, scaleNum, scaleNum);
      scene.add(mesh);
    });
  }

  //初始化性能插件
  var stats;
  function initStats() {
    stats = new Stats();
    // document.body.appendChild(stats.dom);
  }

  //用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
  var controls;
  function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.dampingFactor = 0.8;
    //是否可以缩放
    controls.enableZoom = false;
    //是否自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 14;
    //是否开启右键拖拽
    controls.enablePan = true;
  }

  function render() {

    renderer.render(scene, camera);
  }

  //窗口变动触发的函数
  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

  }

  function animate() {
    //更新控制器
    render();

    //更新性能插件
    stats.update();

    controls.update();

    requestAnimationFrame(animate);
  }

  function draw() {
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();

    animate();
    window.onresize = onWindowResize;
  }

})();