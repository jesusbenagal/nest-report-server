import { type ContextPageSize, type Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    text: `Página ${currentPage} de ${pageCount}`,
    alignment: 'right',
    fontSize: 12,
    bold: true,
    margin: [0, 15, 35, 0],
  };
};
