import { serverSideTranslations } from 'next-i18next';

export async function generateStaticProps(locale) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['translation'])),
    },
  };
}
