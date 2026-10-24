type Work = {
  title: string;
  thumbnail: string;
  header: string;
  info: string;
  content: string;
  link: string;
  details: unknown[];
  references: "";
};
const works: Record<string, Work> = import.meta.glob("/content/works/*.json", {
  eager: true,
  import: "default",
});

export function Works({ showHeroImage = false }: { showHeroImage?: boolean }) {
  return (
    <>
      {Object.values(works).map((item) => (
        <Work {...item} key={item.title} />
      ))}
    </>
  );
}

function Work({ title }: Work) {
  return title;
}
