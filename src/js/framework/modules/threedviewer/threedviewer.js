if (typeof define !== 'function') {var define = require('amdefine')(module); }
define(function (require) {
    'use strict';

    var SCREEN_WIDTH = 500,
        SCREEN_HEIGHT = 400;

    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 2000;

    var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

    var renderer = new THREE.WebGLRenderer({ antialias:true });

    var ThreeDViewer = Backbone.View.extend({
        tagName: "div",
        className: "threedviewer",
        template: '',
        scene: new THREE.Scene(),
        loader: new THREE.Bg(),
        ambientLight: new THREE.AmbientLight(0xffffff),
        spLight: new THREE.SpotLight(0xffffff, 1.0, 4000, Math.PI / 3),
        no_cache: new Date().getTime(),

        initialize: function (data) {
            this.data = data;
            //this.setScreenArea();
        },

        initView: function () {

            
            this.scene.fog = new THREE.FogExp2(0xffffff, 0);

            //this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
            //this.material = new THREE.MeshNormalMaterial( { color: 0x00ff00 } );
            //this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
            //this.camera.position.x = 200;
            //this.camera.position.y = 100;
            //this.camera.position.z = 200;

            // prepare camera
            this.scene.add(camera);
            camera.position.set(0, 100, 300);
            camera.lookAt(new THREE.Vector3(0,0,0));
     
            // prepare renderer
            this.setScreenArea();
            renderer.setClearColor(this.scene.fog.color);
            renderer.shadowMapEnabled = true;  
            renderer.shadowMapSoft = true;

            // add spot light
            this.spLight.castShadow = true;
            this.spLight.position.set(-700, 1000, 1000);
            this.scene.add(this.spLight);

            //add ambient light
            this.scene.add(this.ambientLight);

            var container = this.$el.find(".threeDContainer");
                container.append( renderer.domElement );
                this.loadScene();

        },

        setScreenArea: function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            switch(width) {
                case 320:
                    SCREEN_WIDTH = 320;
                    SCREEN_HEIGHT = 240;
                    break;
                case 360:
                    SCREEN_WIDTH = 360;
                    SCREEN_HEIGHT = 270;
                    break;
                case 375:
                    SCREEN_WIDTH = 375;
                    SCREEN_HEIGHT = 282;
                    break;
                case 414:
                    SCREEN_WIDTH = 414;
                    SCREEN_HEIGHT = 311;
                    break;
                case 480:
                    SCREEN_WIDTH = 480;
                    SCREEN_HEIGHT = 360;
                    break;
                default:
                    SCREEN_WIDTH = 500;
                    SCREEN_HEIGHT = 400
                    break;
            }

            if(SCREEN_WIDTH !== 500) {
                camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
                camera.updateProjectionMatrix();
            }
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        },
  
        onWindowResize: function (evt) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        },

        loadScene: function (object) {
      
            var self = this;
           
            var obj = {
                file: this.data.modelFile,
                material: this.data.modelAsset       
            }

            this.loader.crossOrigin = "*";
            this.loader.load(
                //'http://customstoreapp.com/proxy.php?proxy=' + obj.file, 
                //'http://customstoreapp.com/proxy.php?proxy=' + obj.material,
                obj.file,
                obj.material,
                // Function when both resources are loaded
                function (scope, object) {
                    
                    object.position.x = 0;
                    object.position.y = -120;
                    object.position.z = 0;
                    object.scale.set(25.0, 25.0, 25.0);

                   /* object.traverse(function (child) {
                        child.centroid = new THREE.Vector3();
                        for (var i = 0, l = child.geometry.vertices.length; i < l; i++) {
                            child.centroid.add(child.geometry.vertices[i].clone());
                        }
                        child.centroid.divideScalar(child.geometry.vertices.length);
                        var offset = child.centroid.clone();
                        child.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-offset.x, -offset.y, -offset.z));
                        child.position.copy(child.centroid);
                        child.geometry.computeBoundingBox();
                    }); */

                    scope.obj = object;
                    self.scene.add(object);
                },
                    // Function called when downloads progress
                function ( xhr ) {
                    //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                    // Function called when downloads error
                function ( xhr ) {
                    //console.log( 'An error happened' );
                }
            );
        
            this.start();
        },

        start: function () {
           
            var self = this;
            this._intervalId = setInterval(function() {
                self.animate();
            }, 1000/24);
            /* bug */
            //requestAnimationFrame(self.animate);
        },

        stop: function () {
            clearInterval(this._intervalId);
        },

        animate: function () {
            if(this.loader.obj) {
                this.loader.obj.rotation.y += 0.01;

                renderer.render(this.scene, camera);
            }
        },

        destroy: function () {
            this.stop();
            //cancelAnimationFrame(this.id);// Stop the animation
            //renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
            this.spLight = null;
            this.ambientLight = null;
            //this.scene = null;
            //this.projector = null;
            //this.camera = null;
            //this.controls = null;
            renderer.domElement = null;
            renderer = new THREE.WebGLRenderer({ antialias:true });
        },

        getTemplate: function () {
            var self = this;

            $.get('js/framework/modules/threedviewer/threedviewer.html?r=' + self.no_cache, function (data) {
                var temp = Handlebars.compile(data);
                self.template = $('.' + self.className).html(temp);
                self.initView();
            });
        },

        render: function () {
            var self = this;

            self.getTemplate();

            return this;
        }
    });
    return ThreeDViewer;
});