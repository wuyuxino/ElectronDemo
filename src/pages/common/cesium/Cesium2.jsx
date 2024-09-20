import { useEffect } from 'react';

export default function Cesium2() {

    var viewer

    async function drawCesium() {



        viewer = new Cesium.Viewer("cesium2", {});

        // 模型的URL
        var modelUrl = "/scene/gltf/girl/girl.gltf";

        console.log(Cesium.VERSION)

        console.log(modelUrl)


    }

    useEffect(() => {
        drawCesium();
        return () => {
            viewer && viewer.destroy()
        };
    }, [])

    return (
        <div style={{ display: "flex", width: "100%", height: "100%" }} id='cesium2' />
    )
}