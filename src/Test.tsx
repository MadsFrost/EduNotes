import React from "react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

export default function Test() {
  const [value, setValue] = React.useState("**Hello world!!!** <IFRAME SRC='javascript:javascript:alert(window.origin);'></IFRAME>");
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <MDEditor.Markdown 
        source={value} 
        rehypePlugins={[[rehypeSanitize]]}
      />
    </div>
  );
}