function GenerateTable(markdown: string) {
    const columns = parseInt(markdown.charAt(markdown.indexOf('&table')+7));
    const rows = parseInt(markdown.charAt(markdown.indexOf('&table')+9));
    console.log(columns, rows);
    console.log(true);
    const tableHeader = `${'\n | a '.repeat(columns - 1)} | a | \n`;
    const tableMiddle = `${'| - |'.repeat(columns - 1)} | - | \n`;
    const tableRows = `${(' | a '.repeat(columns - 1) + '| a | \n').repeat(rows - 1)}`;
    const replaceValue = `&table-${markdown.charAt(markdown.indexOf('&table')+7)}-${markdown.charAt(markdown.indexOf('&table')+9)}`;
    return markdown.replace(replaceValue, tableHeader+tableMiddle+tableRows);
}

export default GenerateTable;