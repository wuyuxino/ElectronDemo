import { useEffect } from 'react';

export default function Cesium2() {

    var viewer

    async function drawCesium() {

        viewer = new Cesium.Viewer("cesium2", {
            infoBox: false,
            selectionIndicator: false,
            shadows: true,
            shouldAnimate: true,
        });

        viewer.entities.removeAll();


        const position = Cesium.Cartesian3.fromDegrees(
            -123.0744619,
            44.0503706,
            1000,
        );
        const heading = Cesium.Math.toRadians(135);
        const pitch = 0;
        const roll = 0;
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        const entity = viewer.entities.add({
            name: "Cesium_Air",
            position: position,
            orientation: orientation,
            model: {
                uri: "Cesium_Air.glb",
                minimumPixelSize: 128,
                maximumScale: 20000,
            },
        });

        viewer.trackedEntity = entity;
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