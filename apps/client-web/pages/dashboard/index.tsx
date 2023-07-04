import React from 'react';
import { getSession } from 'next-auth/react';
import Link from '../../components/Link';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    console.log(context);
    return {
      redirect: {
        destination:
          '/login' + context.resolvedUrl
            ? `?redirect=${context.resolvedUrl}`
            : '',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const Dashboard = () => {
  return (
    <div>
      <Link href="/dashboard/proposals">Proposals</Link>
    </div>
  );
};

export default Dashboard;
