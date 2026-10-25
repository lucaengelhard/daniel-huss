import { Link, Route, Switch, useRoute } from "wouter";

import { Works, Work } from "./Works";

import nav_home from "./assets/Daniel_Huss.png";
import nav_news from "./assets/NEWS.png";
import nav_works from "./assets/WORKS.png";
import nav_about from "./assets/ABOUT.png";
import nav_contact from "./assets/CONTACT.png";
import impressum from "./assets/Impressum.png";

import home from "../content/pages/home.json" with { type: "json" };
import { News } from "./News";
import { About } from "./About";
import { Contact } from "./Contact";
import { useEffect, useRef } from "react";
const footer_links: Record<string, FooterItemProps> = import.meta.glob(
  "/content/links/*.json",
  {
    eager: true,
    import: "default",
  },
);

function App() {
  const [match] = useRoute("/");
  const heroRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = heroRef.current;
    if (!img) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        const res = entries.find((e) => !e.isIntersecting);
        if (res) {
          img.style.display = "none";
          observer.disconnect();
        }
      },
      { root: null },
    );

    if (match) {
      observer.observe(img);
    } else {
      observer.disconnect();
    }
  }, [match]);

  return (
    <>
      <img
        ref={heroRef}
        src={home.hero}
        style={{
          display: match ? "block" : "none",
          height: "100vh",
          width: "100vw",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
          padding: "1.5rem",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <nav
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            paddingTop: "2rem",
            paddingBottom: "2rem",
            marginBottom: "10rem",
            position: "sticky",
            top: 0,
            background: "white",
          }}
        >
          <Nav href="/" src={nav_home} />
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
            }}
          >
            <Nav href="/news" src={nav_news} />
            <Nav href="/works" src={nav_works} />
            <Nav href="/about" src={nav_about} />
            <Nav href="/contact" src={nav_contact} />
          </div>
        </nav>

        <div style={{ flexGrow: 1, maxWidth: "100vw" }}>
          <Switch>
            <Route path={"/"}>
              <Works />
            </Route>
            <Route path={"/works"}>
              <Works />
            </Route>
            <Route path={"/works/:title"}>
              {(params) => <Work slug={params.title} />}
            </Route>
            <Route path="/news">
              <News />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route>
              This Page does not exist :(
              <br />
              <Link href="/">Back to Homepage</Link>
            </Route>
          </Switch>
        </div>
        <footer style={{ display: "flex", flexDirection: "column" }}>
          {Object.values(footer_links).map((item) => (
            <FooterItem {...item} key={item.link} />
          ))}
          <Link href="/impressum" style={{ marginTop: "0.8rem" }}>
            <img src={impressum} style={{ height: "1rem" }} />
          </Link>
          <div
            style={{
              fontSize: 10,
              marginTop: "3rem",
              marginBottom: "2rem",
              color: "gray",
            }}
          >
            © {new Date().getFullYear()} Daniel Huss. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

function Nav({ href, src }: { href: string; src: string }) {
  return (
    <Link href={href}>
      <img src={src} style={{ height: "0.8rem" }} />
    </Link>
  );
}

type FooterItemProps = { image: string; link: string };
function FooterItem({ image, link }: FooterItemProps) {
  return (
    <a href={link} target="_blank" style={{ marginTop: "0.5rem" }}>
      <img src={image} style={{ height: "1rem" }} />
    </a>
  );
}

export default App;
