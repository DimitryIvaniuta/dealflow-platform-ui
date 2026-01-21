import { graphqlRequest } from '@/shared/api/graphqlRequest';

export type OpportunityStage =
  | 'INTAKE'
  | 'DISCOVERY'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'ARCHIVED'
  | string;

export type Opportunity = {
  id: string;
  title: string;
  amount?: string | null;
  stage: OpportunityStage;
  expectedCloseDate?: string | null; // LocalDate as YYYY-MM-DD
  customer?: { id: string; displayName: string } | null;
  owner?: { id: string; displayName: string } | null;
};

export type OpportunityFilterInput = {
  stage?: OpportunityStage | null;
  ownerMemberId?: string | null;
  minAmount?: string | null;
  maxAmount?: string | null;
};

// SPQR exposes Spring Page<T> with these common fields.
export type OpportunityPage = {
  content: Opportunity[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export async function fetchOpportunities(workspaceId: string, filter: OpportunityFilterInput | null, page: number, size: number) {
  const query = `
    query Opportunities($workspaceId: UUID!, $filter: OpportunityFilterInput, $page: Int!, $size: Int!) {
      opportunities(workspaceId: $workspaceId, filter: $filter, page: $page, size: $size) {
        content { id title amount stage expectedCloseDate customer { id displayName } owner { id displayName } }
        number size totalElements totalPages
      }
    }
  `;
  const res = await graphqlRequest<{ opportunities: OpportunityPage }>(query, { workspaceId, filter, page, size });
  return res.opportunities;
}

export type CreateOpportunityInput = {
  workspaceId: string;
  title: string;
  amount?: string | null;
  expectedCloseDate?: string | null;
  customerId?: string | null;
  ownerMemberId?: string | null;
};

export async function createOpportunity(input: CreateOpportunityInput) {
  const mutation = `
    mutation CreateOpportunity($input: CreateOpportunityInput!) {
      createOpportunity(input: $input) { id title amount stage expectedCloseDate customer { id displayName } owner { id displayName } }
    }
  `;
  const res = await graphqlRequest<{ createOpportunity: Opportunity }>(mutation, { input });
  return res.createOpportunity;
}

export type UpdateOpportunityInput = {
  workspaceId: string;
  opportunityId: string;
  title?: string | null;
  amount?: string | null;
  expectedCloseDate?: string | null;
  stage?: OpportunityStage | null;
  customerId?: string | null;
  ownerMemberId?: string | null;
  clearCustomer?: boolean | null;
  clearOwner?: boolean | null;
};

export async function updateOpportunity(input: UpdateOpportunityInput) {
  const mutation = `
    mutation UpdateOpportunity($input: UpdateOpportunityInput!) {
      updateOpportunity(input: $input) { id title amount stage expectedCloseDate customer { id displayName } owner { id displayName } }
    }
  `;
  const res = await graphqlRequest<{ updateOpportunity: Opportunity }>(mutation, { input });
  return res.updateOpportunity;
}

export async function deleteOpportunity(workspaceId: string, opportunityId: string) {
  const mutation = `
    mutation DeleteOpportunity($input: DeleteOpportunityInput!) {
      deleteOpportunity(input: $input) { id stage }
    }
  `;
  const res = await graphqlRequest<{ deleteOpportunity: Opportunity }>(mutation, { input: { workspaceId, opportunityId } });
  return res.deleteOpportunity;
}

export async function moveOpportunityStage(workspaceId: string, opportunityId: string, stage: OpportunityStage) {
  const mutation = `
    mutation MoveOpportunityStage($input: MoveOpportunityStageInput!) {
      moveOpportunityStage(input: $input) { id stage }
    }
  `;
  const res = await graphqlRequest<{ moveOpportunityStage: Opportunity }>(mutation, { input: { workspaceId, opportunityId, stage } });
  return res.moveOpportunityStage;
}
