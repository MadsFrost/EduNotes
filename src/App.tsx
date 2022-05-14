import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Download from "./utils/Download";
import { Code } from "./utils/EditorComponents";
import { initStorage, getNotebooks } from "./utils/Storage";
const mdMermaid = `The following are some examples of the diagrams, charts and graphs that can be made using Mermaid and the Markdown-inspired text specific to it. 

\`\`\`mermaid
graph TD
A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
\`\`\`

\`\`\`mermaid
sequenceDiagram
Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
John-->>Alice: Great!
John->>Bob: How about you?
Bob-->>John: Jolly good!
\`\`\`
`;

export default function App() {
  const [value, setValue] = useState(mdMermaid);
  React.useEffect(() => {
      initStorage();
  })
  return (
    <>
        <h1>Editor</h1>
        <div style={{ width: '100%', height: '100%' }}>
            <MDEditor
            style={{ position: 'relative', zIndex: 0 }}
            fullscreen={true}
            preview="live"
            hideToolbar={true}
            onChange={(newValue = "") => setValue(newValue)}
            textareaProps={{
            placeholder: "Please enter Markdown text"
            }}
            height={500}
            value={value}
            previewOptions={{
            components: {
                code: Code
            }
            }}
            />
        </div>
        <a download={'test.md'} href={Download(value)}>download</a>
    </>
    );
}