import { saveAs} from "file-saver";
import { mdToPdf } from "md-to-pdf";

export const DownloadPDF = async (markdown) => {
    const pdf = await mdToPdf({ content: markdown }).catch((err) => console.log(err));
    if (pdf) {
        saveAs(pdf, 'test.pdf');
    }
}
