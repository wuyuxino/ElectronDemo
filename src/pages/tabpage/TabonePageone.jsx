import { useEffect, useState } from "react";
import * as THREE from 'three';
import { Spin } from 'antd';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


export default function TabonePageone() {
    let renderer;
    const [percent, setPercent] = useState(0)

    function loadScene() {
        // 设置场景、相机和渲染器
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, (window.innerWidth - 230) / (window.innerHeight - 70), 0.1, 1000);
        camera.position.set(12, 8, 6);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth - 230, window.innerHeight - 70);
        let con = document.getElementsByClassName("scene")[0];
        con.appendChild(renderer.domElement);

        // 创建GLTFLoader实例
        const loader = new GLTFLoader();

        // 添加灯光
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
        scene.add(hemiLight)
        var dirLight = new THREE.DirectionalLight(0xffffff)
        dirLight.position.set(-5, 2, 0)
        scene.add(dirLight)

        // 加载天空盒纹理 (自己找图片)
        const loaderTexture = new THREE.CubeTextureLoader();
        const texture = loaderTexture.setPath('/scene/gltf/textures/skybox/')
            .load([
                'TropicalSunnyDay_nx', // right
                'TropicalSunnyDay_ny', // left
                'TropicalSunnyDay_nz', // top
                'TropicalSunnyDay_px', // bottom
                'TropicalSunnyDay_py', // back
                'TropicalSunnyDay_pz'  // front
            ]);

        // 设置场景的环境映射贴图
        // scene.background = texture;
        var gui;
        function initSky() {
            let sky, sun;
            // Add Sky
            sky = new Sky();
            sky.scale.setScalar(450000);
            scene.add(sky);

            sun = new THREE.Vector3();

            /// GUI
            const effectController = {
                turbidity: 10,
                rayleigh: 3,
                mieCoefficient: 0.005,
                mieDirectionalG: 0.7,
                elevation: 2,
                azimuth: 180,
                exposure: renderer.toneMappingExposure
            };

            function guiChanged() {

                const uniforms = sky.material.uniforms;
                uniforms['turbidity'].value = effectController.turbidity;
                uniforms['rayleigh'].value = effectController.rayleigh;
                uniforms['mieCoefficient'].value = effectController.mieCoefficient;
                uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

                const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
                const theta = THREE.MathUtils.degToRad(effectController.azimuth);

                sun.setFromSphericalCoords(1, phi, theta);

                uniforms['sunPosition'].value.copy(sun);

                renderer.toneMappingExposure = effectController.exposure;
                renderer.render(scene, camera);

            }

            gui = new GUI();

            gui.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(guiChanged);
            gui.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(guiChanged);
            gui.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(guiChanged);
            gui.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(guiChanged);
            gui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged);
            gui.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(guiChanged);
            gui.add(effectController, 'exposure', 0, 1, 0.0001).onChange(guiChanged);

            guiChanged();
        }


        // 加载.gltf模型
        loader.load(
            '/scene/gltf/scene.gltf', // 模型的URL
            (gltf) => {
                // 模型加载成功后的回调函数
                scene.add(gltf.scene); // 将模型添加到场景
            },
            (xhr) => {
                // 加载过程中的回调函数
                setPercent((xhr.loaded / xhr.total * 100))
            },
            (error) => {
                // 加载出错的回调函数
                console.error('An error happened', error);
            }
        );

        // 添加OrbitControls，允许用户通过鼠标移动来 orbits the camera around the object
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // 监听窗口大小改变，重新渲染
        function onWindowResize() {
            // 设置相机的宽高比为新窗口的宽高比
            camera.aspect = (window.innerWidth - 230) / (window.innerHeight - 70);

            // 更新相机投影矩阵
            camera.updateProjectionMatrix();

            // 更新渲染器的大小
            renderer.setSize(window.innerWidth - 230, window.innerHeight - 70);

            // 强制渲染器在新的画布尺寸下进行渲染
            renderer.render(scene, camera);
        }
        window.addEventListener('resize', onWindowResize, false);

        initSky();

        // 设置GUI位置
        gui.domElement.style.position = 'absolute';
        gui.domElement.style.top = '60px';
        gui.domElement.style.right = '10px';

        // 渲染循环
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update(); // 更新OrbitControls
        }

        animate(); // 开始渲染循环
    }

    useEffect(() => {
        loadScene();
    }, []);

    // 页面离开
    useEffect(() => {
        return () => {
            // 获取GUI的DOM元素
            var guiDom = document.getElementsByClassName('lil-gui')[0]; // 'gui'是你GUI容器的ID
            // 如果元素存在，则移除它
            if (guiDom) {
                guiDom.parentNode.removeChild(guiDom);
            }
            // 清理渲染器资源
            if (renderer) {
                renderer.dispose();
            }
        }
    }, [])

    return (
        <div className="scene" style={{ display: 'flex' }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", display: percent == 100 ? "none" : "block", fontWeight: "800", color: "#FFF" }}>
                <Spin tip={`加载中：${percent}%`} size="small">
                    <div style={{ height: 60, width: 100 }}></div>
                </Spin>
            </div>
        </div>
    )
}