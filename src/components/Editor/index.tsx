import React from 'react';
import MDEditor from "@uiw/react-md-editor";
import Download from "../../utils/Download";
import { Code } from "../../utils/EditorComponents";
export interface EditorProps {
    filename: string;
    value: string;
}
const Editor: React.FC<EditorProps> = (props) => {
    const { filename, value } = props;
    const [markdown, setMarkdown] = React.useState(value)
    const NewDownload = Download(value);
    return (
        <>
            <MDEditor
                style={{ position: 'relative', zIndex: 0 }}
                fullscreen={true}
                preview="live"
                onChange={(newValue = "") => setMarkdown(newValue)}
                textareaProps={{
                placeholder: "Please enter Markdown text"
                }}
                height={500}
                value={markdown}
                previewOptions={{
                components: {
                    code: Code
                }
                }}
            />
            <a download={filename} href={NewDownload}>download</a>
        </>
    )
}

export default Editor;
