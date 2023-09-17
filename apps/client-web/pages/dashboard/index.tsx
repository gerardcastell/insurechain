import React from 'react';
import { getSession } from 'next-auth/react';
import { StyledLink } from '@insurechain/web/ui-elements';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
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
      <StyledLink href="/dashboard/proposals">Proposals</StyledLink>
    </div>
  );
};

export default Dashboard;
