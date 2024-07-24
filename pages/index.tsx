import { GetStaticProps } from 'next';
import { getAllUsers, UserProps } from '@/lib/api/user';
import { defaultMetaProps } from '@/components/layout/meta';
import clientPromise from '@/lib/mongodb';
import Main from '@/components/main';

export default function Home({ user }: { user: UserProps }) {
  return <Main />;
}

export const getStaticProps: GetStaticProps = async () => {
  // You should remove this try-catch block once your MongoDB Cluster is fully provisioned
  try {
    await clientPromise;
  } catch (e: any) {
    if (e.code === 'ENOTFOUND') {
      // cluster is still provisioning
      return {
        props: {
          clusterStillProvisioning: true
        }
      };
    } else {
      throw new Error(`Connection limit reached. Please try again later.`);
    }
  }

  return {
    props: {
      meta: defaultMetaProps
    },
    revalidate: 10
  };
};
