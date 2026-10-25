import { Link } from "wouter";
import { getSlug } from "./lib/path";
import Markdown from "react-markdown";
import { useContext } from "react";
import { WindowsizeContext } from "./lib/hooks";

type WorkItem = {
  title: string;
  order: number;
  thumbnail: string;
  header: string;
  info: string;
  content: string;
  link: string;
  details: WorkDetailProps[];
  references: string[];
  slug: string;
};
const works: Record<string, Omit<WorkItem, "slug">> = import.meta.glob(
  "/content/works/*.json",
  {
    eager: true,
    import: "default",
  },
);

export function Works() {
  const windowsize = useContext(WindowsizeContext);
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        gridTemplateColumns: windowsize >= 700 ? "1fr 1fr" : "1fr",
        columnGap: "3rem",
        rowGap: "4rem",
        marginBottom: "20rem",
      }}
    >
      {Object.entries(works)
        .toSorted((a, b) => a[1].order - b[1].order)
        .map(([path, item]) => (
          <WorkItem {...item} slug={getSlug(path)} key={getSlug(path)} />
        ))}
    </div>
  );
}

function WorkItem({ title, thumbnail, info, slug }: WorkItem) {
  return (
    <Link
      href={`/works/${slug}`}
      style={{
        aspectRatio: "3/2",
        fontSize: "12px",
        textDecoration: "none",
      }}
    >
      <img
        src={import.meta.env.BASE_URL + thumbnail}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          marginBottom: "1rem",
        }}
      />
      <div>{title}</div>
      <div style={{ lineHeight: "20px" }}>{info}</div>
    </Link>
  );
}

export function Work({ slug }: { slug: string }) {
  const windowsize = useContext(WindowsizeContext);

  const path = `/content/works/${slug}.json`;
  const work = works[path];
  if (!work) return "This page does not exist :(";
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            windowsize >= 1000
              ? "1fr 1fr 1fr"
              : windowsize >= 700
                ? "1fr 1fr"
                : "1fr",
          marginTop: "1rem",
          gap: "5rem",
        }}
      >
        <div>
          <div>{work.title}</div>
          <div>{work.info}</div>
        </div>
        <div style={{ gridRow: windowsize < 1000 ? 2 : undefined }}>
          <Markdown>{work.content}</Markdown>
        </div>
        <img
          src={import.meta.env.BASE_URL + work.header}
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            gridRow:
              windowsize < 700 ? "1" : windowsize < 1000 ? "1 / 3" : undefined,
          }}
        />
      </div>
      {work.details.map((item) => (
        <WorkDetail {...item} key={JSON.stringify(item)} />
      ))}
    </>
  );
}

type WorkDetailProps =
  | { type: "image_item"; image: string[] }
  | {
      type: "three_col";
      text_left: string;
      text_middle: string;
      image: string;
    }
  | { type: "video_item"; video: string };
function WorkDetail(props: WorkDetailProps) {
  const windowsize = useContext(WindowsizeContext);
  switch (props.type) {
    case "image_item": {
      return (
        <>
          {props.image.map((item) => (
            <div style={{ marginTop: "13rem" }} key={item}>
              <img
                src={import.meta.env.BASE_URL + item}
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </>
      );
    }
    case "three_col": {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              windowsize >= 1000
                ? "1fr 1fr 1fr"
                : windowsize >= 700
                  ? "1fr 1fr"
                  : "1fr",
            marginTop: "13rem",
            gap: "5rem",
          }}
        >
          <div>{props.text_left}</div>
          <div style={{ gridRow: windowsize < 1000 ? 2 : undefined }}>
            {props.text_middle}
          </div>
          {props.image !== "" && (
            <img
              src={import.meta.env.BASE_URL + props.image}
              style={{
                width: "100%",
                gridRow:
                  windowsize < 700
                    ? "1"
                    : windowsize < 1000
                      ? "1 / 3"
                      : undefined,
              }}
            />
          )}
        </div>
      );
    }
    case "video_item": {
      return (
        <video style={{ width: "100%", marginTop: "13rem" }}>
          <source src={import.meta.env.BASE_URL + props.video} />
        </video>
      );
    }
  }
}
