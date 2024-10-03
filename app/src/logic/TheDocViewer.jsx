import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export default function TheDocViewer() {
  const docs = [
    {
      uri: "https://matfuvit.github.io/UVIT/predavanja/literatura/TutorialsPoint%20CSS.pdf",
    }, // Remote file
    {
      uri: "https://matfuvit.github.io/UVIT/predavanja/literatura/TutorialsPoint%20CSS.pdf",
    }, // Local File
  ];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}
