import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import './light.css';
export interface EditorProps {
  onChange: (markdown: string) => void;
  value: string;
}
const TestEditor: React.FC<EditorProps>= (props) => {
  const { value, onChange } = props;
  const [markdown, setMarkdown] = React.useState(value);
  React.useEffect(() => {
    console.log(markdown);
    onChange(markdown)
  }, [markdown]);
  return (
    <div
        id={"test"}
        className={'markdown-body w-full h-full'}
        contentEditable
        onInput={(e) => console.log(e.currentTarget.textContent)}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default TestEditor;