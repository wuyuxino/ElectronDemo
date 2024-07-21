import { useEffect, useState } from "react";

import { MinusOutlined, FullscreenOutlined, FullscreenExitOutlined, CloseOutlined } from "@ant-design/icons";

import "./css/Nav.css";

const { ipcRenderer } = require('electron');

export default function Nav() {

    const [ismax, setIsmax] = useState(false);
    useEffect(() => {
        ipcRenderer.on("isMaximized", (event, arg) => {
            setIsmax(arg)
        })
    }, []);

    return (
        <div className="nav"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: 60
            }}>
            <div
                style={{
                    width: 200,
                    height: 60,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: "#FFF",
                    fontWeight: "900",
                    letterSpacing: 4,
                    fontSize: 22
                }}>
                <img src="img/cat.png" alt="1" width={50} height={50} style={{ marginLeft: 20 }} />
                <span style={{ marginLeft: 6 }}>LoveIt</span>
            </div>
            <div
                style={{
                    width: "calc(100% - 230px)",
                    height: 50,
                    background: "rgba(0,0,0,0.3)",
                    margin: "10px 10px 0 0",
                    borderRadius: "4px 4px 0 0",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: 'center',
                    color: "#FFF"
                }}>
                <MinusOutlined
                    onClick={() => {
                        ipcRenderer.send('minimize')
                    }}
                    className="button"
                    style={{ fontSize: 20, fontWeight: "800", marginRight: 10 }} />
                {
                    ismax
                        ?
                        <FullscreenExitOutlined
                            className="button"
                            onClick={() => {
                                ipcRenderer.send("ismax");
                                ipcRenderer.send('maximize');
                            }}
                            style={{ fontSize: 20, fontWeight: "800", marginRight: 10 }}
                        />
                        :
                        <FullscreenOutlined
                            onClick={() => {
                                ipcRenderer.send("ismax");
                                ipcRenderer.send('maximize');
                            }}
                            className="button"
                            style={{ fontSize: 20, fontWeight: "800", marginRight: 10 }}
                        />
                }
                <CloseOutlined
                    className="button"
                    onClick={() => {
                        ipcRenderer.send('close')
                    }}
                    style={{ fontSize: 20, fontWeight: "800", marginRight: 10 }} />
            </div>
        </div>
    );
}
