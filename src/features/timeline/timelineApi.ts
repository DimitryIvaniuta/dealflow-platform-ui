import { graphqlRequest } from '@/shared/api/graphqlRequest';

export type CustomerEvent = {
  id: string;
  eventType: string;
  category: string;
  source: string;
  occurredAt: string;
  actorSubject: string;
  summary: string;
  payload: unknown;
};

export type PageInfo = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type CustomerEventConnection = {
  items: CustomerEvent[];
  pageInfo: PageInfo;
};

export type CustomerTimelineFilterInput = {
  types?: string[] | null;
  categories?: string[] | null;
  text?: string | null;
};

export async function fetchCustomerTimeline(workspaceId: string, customerId: string, filter: CustomerTimelineFilterInput | null, page: number, size: number) {
  const query = `
    query CustomerTimeline($workspaceId: UUID!, $customerId: UUID!, $filter: CustomerTimelineFilterInput, $page: Int!, $size: Int!) {
      customerTimeline(workspaceId: $workspaceId, customerId: $customerId, filter: $filter, page: $page, size: $size) {
        items { id eventType category source occurredAt actorSubject summary payload }
        pageInfo { page size totalElements totalPages hasNext hasPrevious }
      }
    }
  `;
  const res = await graphqlRequest<{ customerTimeline: CustomerEventConnection }>(query, { workspaceId, customerId, filter, page, size });
  return res.customerTimeline;
}

export async function addCustomerNote(workspaceId: string, customerId: string, note: string) {
  const mutation = `
    mutation AddCustomerNote($workspaceId: UUID!, $customerId: UUID!, $note: String!) {
      addCustomerNote(workspaceId: $workspaceId, customerId: $customerId, note: $note) {
        id eventType occurredAt summary payload
      }
    }
  `;
  const res = await graphqlRequest<{ addCustomerNote: CustomerEvent }>(mutation, { workspaceId, customerId, note });
  return res.addCustomerNote;
}
