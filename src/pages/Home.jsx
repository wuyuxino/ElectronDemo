import { useEffect } from "react";
import Nav from './common/Nav';
import Left from './common/Left';
import Container from './common/Container';
import { Outlet } from 'react-router-dom';

export default function Home() {

  return (
    <Container>
      <Nav />
      <div style={{ display: "flex", justifyContent: "space-between", height: "calc(100% - 60px)", overflow: "hidden" }}>
        <Left />
        <div
          style={{
            width: "calc(100% - 230px)",
            height: "calc(100% - 10px)",
            borderRadius: "0px 0px 4px 4px",
            marginRight: 10,
            background: "rgba(0,0,0,0.3)",
            overflow: "hidden"
          }}>
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
