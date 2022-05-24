import React from 'react';
import MDEditor from "@uiw/react-md-editor";
import 'katex/dist/katex.css';
import katex from 'katex';
export interface EditorProps {
    onChange: (markdown: string) => void;
    value: string;
}
const Editor: React.FC<EditorProps> = (props) => {
    const { value, onChange } = props;
    const [markdown, setMarkdown] = React.useState(value);
    React.useEffect(() => {
        console.log(markdown);
        onChange(markdown)
    }, [markdown]);
    return (
        <>
            <textarea autoFocus className={'hidden'} defaultValue={markdown} onChange={(e) => setMarkdown(e.currentTarget.value)} />
            <MDEditor
                id={'test'}
                hideToolbar={true}
                spellCheck={true}
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
                        code: ({ inline, children = [], className, ...props }) => {
                            const txt: any = children[0] || '';
                            if (inline) {
                                if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                                    const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                                        throwOnError: false,
                                    });
                                    return <code dangerouslySetInnerHTML={{ __html: html }} />;
                                }
                                return <code>{txt}</code>;
                            }
                            if (
                                txt?.props &&
                                typeof txt.props.children[0] === 'string' &&
                                typeof className === 'string' &&
                                txt.props.children !== undefined &&
                                txt.props.children.length !== 0 &&
                                /^language-katex/.test(className.toLocaleLowerCase())
                            ) {
                                const html = katex.renderToString(txt.props.children[0], {
                                    throwOnError: false,
                                });
                                return <code dangerouslySetInnerHTML={{ __html: html }} />;
                            }
                            return <code className={String(className)}>{txt}</code>;
                        },
                    },
                }}
            />
        </>
    )
}

export default Editor;
