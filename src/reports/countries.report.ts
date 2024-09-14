import { type TDocumentDefinitions } from 'pdfmake/interfaces';
import { countries as Country } from '@prisma/client';

import { headerSection } from './sections/header.section';
import { footerSection } from './sections/footer.section';

interface IReportOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountryReport = (
  options: IReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'customLayout01',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
            [
              '',
              '',
              '',
              '',
              'Total',
              {
                text: `${countries.length}`,
                bold: true,
              },
            ],
          ],
        },
      },
      {
        text: 'Totales',
        style: {
          fontSize: 16,
          margin: [0, 40, 0, 0],
          bold: true,
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', 'auto', '*'],
          body: [
            [
              { text: 'Total de Paises', colSpan: 2, bold: true },
              {},
              { text: `${countries.length} países`, bold: true },
              {},
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
