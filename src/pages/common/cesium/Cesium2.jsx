import { useEffect } from 'react';

export default function Cesium2() {

    var viewer

    async function drawCesium() {
        viewer = new Cesium.Viewer("cesium2", {

        });
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