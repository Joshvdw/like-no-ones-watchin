import "../styles/globals.scss";
import "../styles/_grid.scss";
import type { AppProps } from "next/app";
import CanvasWrapper from "../components/layouts/canvas/CanvasWrapper";
import ErrorBoundary from "../components/singleComponents/ErrorBoundary/ErrorBoundary";
import { useDetectGPU } from "@react-three/drei";
import useStore from "../components/singleComponents/Hooks/useStore";
import { useRef, useEffect, useState } from "react";
import { useSpring } from "react-spring";
import { useThrottledCallback } from "use-debounce";
import { getPositions } from "../components/singleComponents/Utils/Utils";
import ErrorMessage from "../components/singleComponents/ErrorBoundary/ErrorMessage";

import UI from "../components/Home/UI";

function MyApp({ Component, pageProps }: AppProps) {
  const GPUT = useDetectGPU();
  const [show, setShow] = useState(false);
  const [reveal, setReveal] = useState(false);

  const fwdRef = useRef<HTMLDivElement>(null); // ref to connect mouse events to the Canvas when Children DOM elements of this element are layerd on top

  return (
    <div className="app" ref={fwdRef}>
      {/* PRELOADER */}
      <div className={`preloader ${reveal && "reveal"} `}>
        <div className={`loader_logo`}>
          <h1>Like no one's watchin</h1>
        </div>
        <div
          className={`${
            show ? "loader_button_show" : "loader_button_not_show"
          }`}
        >
          <button className="enter_btn" onClick={() =>{
            setReveal(true)
          }}>enter</button>
        </div>
      </div>

      <ErrorBoundary fallback={<ErrorMessage />}>
        <CanvasWrapper fwdRef={fwdRef} setReveal={setReveal} reveal={reveal}/>
        <div className="dom">
          <UI reveal={reveal}/>
          <Component {...pageProps} />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default MyApp;
