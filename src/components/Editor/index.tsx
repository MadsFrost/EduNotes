import React from 'react';
import MDEditor from "@uiw/react-md-editor";
import 'katex/dist/katex.css';
import katex from 'katex';
import GenerateTable from '../../utils/GenerateTable';

export interface EditorProps {
    onChange: (markdown: string) => void;
    value: string;
}
const Editor: React.FC<EditorProps> = (props) => {
    const { value, onChange } = props;
    const [markdown, setMarkdown] = React.useState<string>(value);

    React.useEffect(() => {
        onChange(markdown)
    }, [markdown]);

    React.useEffect(() => {
    const pattern = /&table-\d-\d/;
        if (
            markdown.includes('&table') &&
            pattern.test(markdown.slice(markdown.indexOf('&table'), markdown.indexOf('&table')+6)
            + `-${markdown.charAt(markdown.indexOf('&table')+7)}`
            + `-${markdown.charAt(markdown.indexOf('&table')+9)}`)
        ) {
            const mdWithTable = GenerateTable(markdown);
            setMarkdown(mdWithTable);
        } else {
            setMarkdown(value);
        }
    }, [value])

    return (
        <>
            <MDEditor
                id={'test'}
                hideToolbar={false}
                spellCheck={true}
                style={{ position: 'relative', zIndex: 0 }}
                fullscreen={true}
                preview="live"
                onChange={(newValue = "") => setMarkdown(newValue)}
                textareaProps={{
                    placeholder: "Please enter Markdown text",
                }}
                height={500}
                value={markdown}
                previewOptions={{
                    remarkPlugins: [],
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
