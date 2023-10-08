import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import PolicyView from '../../../../features/policies/policy-view';

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);
  const policyAddress = params?.id as string;
  if (!session?.access_token) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  if (!policyAddress) {
    return {
      redirect: {
        destination: '/dashboard/policies',
        permanent: false,
      },
    };
  }

  return { props: { policyAddress } };
};

const PolicyPage = ({ policyAddress }: { policyAddress: `0x${string}` }) => {
  return <PolicyView address={policyAddress} />;
};

export default PolicyPage;
