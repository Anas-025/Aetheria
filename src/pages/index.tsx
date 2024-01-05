import Image from "next/image";
import { useState } from "react";
import brutal from "../../public/brutal.svg";
import butterfly from "../../public/butterfly.png";
import close from "../../public/close.svg";
import grainTexture from "../../public/grainTexture.png";
import hamburger from "../../public/hamburger.svg";
import logo from "../../public/logo.svg";
import menuGradient from "../../public/menuGradient.png";
import style from "../styles/index.module.css";

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleHamburgerClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.logo}>
          <a href="">
            <Image draggable="false" src={logo} alt="Aetheria Logo" />
          </a>
        </div>

        <div className={style.buttons}>
          <a className={style.login} href="/login">
            Login
          </a>
          <a className={style.signin} href="/signin">
            Sign In
          </a>

          <div className={style.hamburger} onClick={handleHamburgerClick}>
            <div
              className={style.preserver3d}
              style={{
                transform: `${open ? "rotateY(180deg)" : "rotateY(0deg)"}`,
              }}
            >
              <div className={style.front}>
                <Image
                  width={30}
                  draggable="false"
                  src={hamburger}
                  alt="Aetheria Logo"
                />
              </div>
              <div className={style.back}>
                <Image
                  width={30}
                  draggable="false"
                  src={close}
                  alt="Aetheria Logo"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={style.background}>
          <Image
            className={style.butterfly}
            draggable="false"
            src={butterfly}
            alt="butterfly"
          />
          <Image
            className={style.brutal}
            draggable="false"
            src={brutal}
            alt="brutal"
          />
          <Image
            className={style.grainTexture}
            draggable="false"
            src={grainTexture}
            alt="grain texture"
          />

          <div className={style.initials}>By Shaikh M. Anas</div>
        </div>

        <div className={style.hero_text}>
          <div>
            <span className={style.hl_text}>L</span>IBRARY
          </div>
          <div>
            <span className={style.hl_text}>R</span>EIMAGINED{" "}
            <span className={style.hl_text}>F</span>OR
          </div>
          <div className={style.hl_text}>
            L
            <span
              className={style.circle_full_stop}
              style={{ marginLeft: "6px" }}
            >
              .
            </span>
            D<span className={style.circle_full_stop}>.</span>C
            <span className={style.circle_full_stop}>.</span>E
          </div>
        </div>
      </div>
      <div
        className={style.sideMenu}
        style={{ bottom: `${open ? "-13%" : "-100%"}` }}
      >
        <ul>
          <a href="/signin">
            <li>Sigin</li>
          </a>
          <a href="/login">
            <li>Login</li>
          </a>
        </ul>

        <Image
          className={style.menuGrainTexture}
          src={menuGradient}
          alt="background"
        />
      </div>
    </>
  );
}
