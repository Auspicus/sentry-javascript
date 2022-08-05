import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

type Paths = { [key: string]: string | string[] };
type Props = { [key: string]: unknown };

export type GSPaths = {
  fn: GetStaticPaths;
  wrappedFn: GetStaticPaths;
  context: GetStaticPathsContext;
  result: GetStaticPathsResult<Paths>;
};

export type GSProps = {
  fn: GetStaticProps;
  wrappedFn: GetStaticProps;
  context: GetStaticPropsContext;
  result: GetStaticPropsResult<Props>;
};

export type GSSP = {
  fn: GetServerSideProps;
  wrappedFn: GetServerSideProps;
  context: GetServerSidePropsContext;
  result: GetServerSidePropsResult<Props>;
};

export type DataFetchingFunction = GSPaths | GSProps | GSSP;
