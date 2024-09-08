import { type TDocumentDefinitions } from 'pdfmake/interfaces';

interface IReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: IReportOptions,
): TDocumentDefinitions => {
  const { name } = options;

  const docDefinition: TDocumentDefinitions = {
    content: [`Hello World, ${name}`],
  };

  return docDefinition;
};
