import { ProposalDto, getProposal } from '@insurechain/web/backend/data-access';
import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import ProposalView from '../../../../features/proposal/ProposalView';

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);
  const proposalId = params?.id as string;
  if (!session?.access_token) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  if (!proposalId) {
    return {
      redirect: {
        destination: '/dashboard/proposals',
        permanent: false,
      },
    };
  }

  try {
    const response = await getProposal(
      proposalId,
      session.access_token as string
    );
    const proposal = response.data;
    return { props: { proposal } };
  } catch (e) {
    return {
      redirect: {
        destination: '/dashboard/proposals',
        permanent: false,
      },
    };
  }
};

const ProposalPage = ({ proposal }: { proposal: ProposalDto }) => {
  return <ProposalView proposal={proposal} />;
};

export default ProposalPage;
