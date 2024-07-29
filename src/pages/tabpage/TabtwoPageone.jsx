import { useEffect, useRef } from "react";
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

export default function TabtwoPageone() {
    const canvasRef = useRef(null);
    let engine;
    let scene;

    const createScene = () => {
        engine = new BABYLON.Engine(canvasRef.current, true);
        scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

        // 添加相机和光源
        const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 4, Math.PI / 2.5, 15, new BABYLON.Vector3(-11, 5, 1));
        var light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1.5;
        camera.attachControl(canvasRef.current, true);
        // 加载模型
        BABYLON.SceneLoader.Append("/scene/gltf/yz/", "scene.gltf", scene);
        return scene;
    }

    useEffect(() => {
        if (!engine) {
            createScene();
            engine.runRenderLoop(() => {
                scene.render();
            });
            window.addEventListener("resize", () => {
                engine.resize();
            });
        }
    }, []);

    useEffect(() => {
        return () => {
            if (scene) {
                engine.stopRenderLoop();
                scene.dispose();
                engine.dispose();
            }
        };
    }, [])

    return (
        <div style={{ display: "flex", height: "calc(100% - 10px)" }}>
            <canvas ref={canvasRef} style={{ display: "flex", width: "100%", height: "100%" }} />
        </div>
    )
}