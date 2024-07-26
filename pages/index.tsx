import { GetStaticProps } from 'next';
import { getAllUsers, UserProps } from '@/lib/api/user';
import clientPromise from '@/lib/mongodb';
import Main from '@/components/main';

export default function Home({ user }: { user: UserProps }) {
  return <Main />;
}
