import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { authOptions } from '../../api/auth/[...nextauth]';
import {
  ProposalDto,
  getProposals,
} from '@insurechain/web/backend/data-access';
import { getServerSession } from 'next-auth/next';
import { ProposalsView } from '../../../features/proposal';

export const getServerSideProps: GetServerSideProps<{
  proposals: ProposalDto[];
}> = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.access_token) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  const response = await getProposals(session.access_token as string);
  const proposals = response.data;
  return {
    props: {
      proposals: proposals.sort((a, b) =>
        a.smartContractAddress && !b.smartContractAddress ? 1 : -1
      ),
    },
  };
};

const Proposals = ({
  proposals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ProposalsView proposals={proposals} />;
};

export default Proposals;
