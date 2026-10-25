import Markdown from "react-markdown";
import about from "../content/pages/about.json" with { type: "json" };

export function About() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1.2fr 2fr",
        gap: "5rem",
      }}
    >
      <div>{about.info}</div>
      <div>
        <Markdown>{about.content}</Markdown>
      </div>
      <img src={about.portrait} style={{ width: "100%" }} />
    </div>
  );
}
