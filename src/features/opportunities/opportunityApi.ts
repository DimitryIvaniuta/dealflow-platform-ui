import { fetcher } from '@/shared/api/codegenFetcher';
import {
  OpportunitiesDocument,
  CreateOpportunityDocument,
  UpdateOpportunityDocument,
  DeleteOpportunityDocument,
  MoveOpportunityStageDocument,
  type OpportunitiesQuery,
  type OpportunitiesQueryVariables,
  type CreateOpportunityMutation,
  type CreateOpportunityMutationVariables,
  type UpdateOpportunityMutation,
  type UpdateOpportunityMutationVariables,
  type DeleteOpportunityMutation,
  type DeleteOpportunityMutationVariables,
  type MoveOpportunityStageMutation,
  type MoveOpportunityStageMutationVariables
} from '@/graphql/generated';

export type OpportunityPage = OpportunitiesQuery['opportunities'];
export type Opportunity = OpportunityPage['content'][number];
export type OpportunityStage = Opportunity['stage'] | string;
export type OpportunityFilterInput = OpportunitiesQueryVariables['filter'];
export type CreateOpportunityInput = CreateOpportunityMutationVariables['input'];
export type UpdateOpportunityInput = UpdateOpportunityMutationVariables['input'];

export async function fetchOpportunities(
  workspaceId: string,
  filter: OpportunityFilterInput | null,
  page: number,
  size: number
): Promise<OpportunityPage> {
  const data = await fetcher<OpportunitiesQuery, OpportunitiesQueryVariables>(OpportunitiesDocument, {
    workspaceId,
    filter,
    page,
    size
  });
  return data.opportunities;
}

export async function createOpportunity(input: CreateOpportunityInput): Promise<Opportunity> {
  const data = await fetcher<CreateOpportunityMutation, CreateOpportunityMutationVariables>(
    CreateOpportunityDocument,
    { input }
  );
  return data.createOpportunity;
}

export async function updateOpportunity(input: UpdateOpportunityInput): Promise<Opportunity> {
  const data = await fetcher<UpdateOpportunityMutation, UpdateOpportunityMutationVariables>(UpdateOpportunityDocument, {
    input
  });
  return data.updateOpportunity;
}

export async function deleteOpportunity(workspaceId: string, opportunityId: string): Promise<Opportunity> {
  const data = await fetcher<DeleteOpportunityMutation, DeleteOpportunityMutationVariables>(DeleteOpportunityDocument, {
    input: { workspaceId, opportunityId }
  });
  return data.deleteOpportunity;
}

export async function moveOpportunityStage(
  workspaceId: string,
  opportunityId: string,
  stage: OpportunityStage
): Promise<Opportunity> {
  const data = await fetcher<MoveOpportunityStageMutation, MoveOpportunityStageMutationVariables>(
    MoveOpportunityStageDocument,
    { input: { workspaceId, opportunityId, stage } }
  );
  return data.moveOpportunityStage;
}
