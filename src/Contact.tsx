import Markdown from "react-markdown";
import contact from "../content/pages/contact.json";

export function Contact() {
  return (
    <div>
      <Markdown>{contact.content}</Markdown>
    </div>
  );
}
