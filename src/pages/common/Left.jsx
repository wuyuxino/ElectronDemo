import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Left() {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState("");
    const [itemIndex, setItemIndex] = useState("");

    

    const menuList = [
        {
            key: 0,
            nav: "ThreeJs",
            list: [
                {
                    name: "作品一",
                    link: "/tabonePageone"
                },
                {
                    name: "作品二",
                    link: "/tabonePagetwo"
                },
                {
                    name: "作品三",
                    link: "/tabonePagethree"
                }
            ]
        },
        {
            key: 1,
            nav: "BabylonJs",
            list: [
                {
                    name: "作品一",
                    link: "/tabtwoPageone"
                },
                {
                    name: "作品二",
                    link: "/tabtwoPagetwo"
                },
                {
                    name: "作品三",
                    link: "/tabtwoPagethree"
                }
            ]
        }
    ]

    useEffect(() => {
        
        let leftMenu = document.getElementsByClassName("left")[0]
        leftMenu.addEventListener("mouseenter", () => {
            leftMenu.setAttribute("class", "left")
        })
        leftMenu.addEventListener("mouseleave", () => {
            leftMenu.setAttribute("class", "left lefts lefth")
        })
    }, [])

    return (
        <div
            className="left lefts lefth"
            style={{
                width: 200,
                overflowX: "hidden",
                overflowY: "scroll"
            }}>
            {
                menuList.map((i, n) => {
                    return (
                        <div
                            key={n}
                            style={{
                                width: 200,
                                color: "rgba(255,255,255,.6)",
                                fontWeight: "800",
                                marginTop: 22
                            }}>
                            <span style={{ marginLeft: 20, letterSpacing: 1, fontSize: 10 }}>{i.nav}</span>
                            {
                                i.list.map((ii, nn) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setItemIndex(nn);
                                                setTabIndex(i.key);
                                                navigate(ii.link);
                                            }}
                                            key={ii.name}
                                            style={{
                                                marginLeft: 30,
                                                letterSpacing: 1,
                                                marginTop: 12,
                                                fontSize: 13,
                                                width: 136,
                                                borderRadius: 4,
                                                cursor: "pointer",
                                                background: itemIndex == nn && tabIndex == i.key ? "rgba(255,255,255,.2)" : "",
                                                color: itemIndex == nn && tabIndex == i.key ? "rgba(255,255,255,1)" : "",
                                            }}>
                                            <div
                                                onMouseEnter={(e) => {
                                                    if (itemIndex == nn && tabIndex == i.key) { return };
                                                    e.target.style.background = "rgba(255,255,255,.2)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = "";
                                                }}
                                                style={{
                                                    padding: 10,
                                                    borderRadius: 4
                                                }}>
                                                {ii.name}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <div style={{ width: 200, height: 60 }}></div>
        </div>
    );
}
