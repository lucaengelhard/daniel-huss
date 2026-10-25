import { useContext } from "react";
import Markdown from "react-markdown";
import { WindowsizeContext } from "./lib/hooks";

type NewsItem = {
  title: string;
  subtitle?: string;
  date?: string;
  content?: string;
  image?: string;
  video?: string;
  order: number;
};
const news: Record<string, Omit<NewsItem, "slug">> = import.meta.glob(
  "/content/news/*.json",
  {
    eager: true,
    import: "default",
  },
);
export function News() {
  return (
    <>
      {Object.entries(news)
        .toSorted((a, b) => a[1].order - b[1].order)
        .map(([path, item]) => (
          <NewsItem {...item} key={path} />
        ))}
    </>
  );
}

function NewsItem({ title, subtitle, date, content, image, video }: NewsItem) {
  const windowsize = useContext(WindowsizeContext);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          windowsize < 700
            ? "1fr"
            : windowsize < 1000
              ? "1fr 1fr"
              : "1.2fr 1.2fr 2fr",
        marginTop: "1rem",
        gap: "5rem",
        paddingTop: "9rem",
        margin: "10rem 0 10rem 0",
      }}
    >
      <div>
        <div>{title}</div>
        <div>{subtitle}</div>
        <div style={{ marginTop: "1rem" }}>{date}</div>
      </div>
      <div style={{ gridRow: windowsize < 1000 ? 2 : undefined }}>
        <Markdown>{content}</Markdown>
      </div>
      {video && video !== "" ? (
        <video
          style={{
            width: "100%",
            gridRow:
              windowsize < 700 ? "1" : windowsize < 1000 ? "1 / 3" : undefined,
          }}
        >
          <source src={import.meta.env.BASE_URL + video} />
        </video>
      ) : (
        image &&
        image !== "" && (
          <img
            src={import.meta.env.BASE_URL + image}
            style={{
              width: "100%",
              aspectRatio: "3 / 2",
              gridRow:
                windowsize < 700
                  ? "1"
                  : windowsize < 1000
                    ? "1 / 3"
                    : undefined,
            }}
          />
        )
      )}
    </div>
  );
}
