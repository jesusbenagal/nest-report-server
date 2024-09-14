import { type Content } from 'pdfmake/interfaces';

import { DateFormatter } from '../../helpers';

interface IHeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = (options: IHeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 30],
        width: 150,
      }
    : null;

  const headerSubtitle: Content = subTitle
    ? {
        text: title,
        alignment: 'center',
        margin: [0, 2, 0, 0],
        style: {
          bold: true,
          fontSize: 16,
        },
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            alignment: 'center',
            margin: [0, 15, 0, 0],
            style: {
              bold: true,
              fontSize: 22,
            },
          },
          headerSubtitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
