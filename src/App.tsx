import { Link, Route } from "wouter";

import nav_home from "./assets/Daniel_Huss.png";
import nav_news from "./assets/NEWS.png";
import nav_works from "./assets/WORKS.png";
import nav_about from "./assets/ABOUT.png";
import nav_contact from "./assets/CONTACT.png";
import impressum from "./assets/Impressum.png";
import { Works } from "./Works";

const footer_links: Record<string, FooterItemProps> = import.meta.glob(
  "/content/links/*.json",
  {
    eager: true,
    import: "default",
  },
);

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <main>
        <nav
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Nav href="/" src={nav_home} />
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Nav href="/news" src={nav_news} />
            <Nav href="/works" src={nav_works} />
            <Nav href="/about" src={nav_about} />
            <Nav href="/contact" src={nav_contact} />
          </div>
        </nav>
      </main>
      <div style={{ flexGrow: 1 }}>
        <Route path={"/"}>
          <Works />
        </Route>
      </div>
      <footer style={{ display: "flex", flexDirection: "column" }}>
        {Object.values(footer_links).map((item) => (
          <FooterItem {...item} key={item.link} />
        ))}
        <Nav src={impressum} href="/impressum" />
        <div style={{ fontSize: 10, marginTop: "3rem", marginBottom: "2rem" }}>
          {new Date().getFullYear()} Daniel Huss. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Nav({ href, src }: { href: string; src: string }) {
  return (
    <Link href={href}>
      <img src={src} style={{ height: "1rem" }} />
    </Link>
  );
}

type FooterItemProps = { image: string; link: string };
function FooterItem({ image, link }: FooterItemProps) {
  return (
    <a href={link} target="_blank">
      <img src={image} style={{ height: "1rem" }} />
    </a>
  );
}

export default App;
