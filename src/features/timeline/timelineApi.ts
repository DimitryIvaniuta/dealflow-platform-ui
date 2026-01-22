import { fetcher } from '@/shared/api/codegenFetcher';
import {
  CustomerTimelineDocument,
  AddCustomerNoteDocument,
  AppendCustomerEventDocument,
  type CustomerTimelineQuery,
  type CustomerTimelineQueryVariables,
  type AddCustomerNoteMutation,
  type AddCustomerNoteMutationVariables,
  type AppendCustomerEventMutation,
  type AppendCustomerEventMutationVariables
} from '@/graphql/generated';

export type CustomerEvent = CustomerTimelineQuery['customerTimeline']['items'][number];
export type CustomerEventConnection = CustomerTimelineQuery['customerTimeline'];
export type PageInfo = CustomerTimelineQuery['customerTimeline']['pageInfo'];
export type CustomerTimelineFilterInput = CustomerTimelineQueryVariables['filter'];

export async function fetchCustomerTimeline(
  workspaceId: string,
  customerId: string,
  filter: CustomerTimelineFilterInput | null,
  page: number,
  size: number
): Promise<CustomerEventConnection> {
  const data = await fetcher<CustomerTimelineQuery, CustomerTimelineQueryVariables>(CustomerTimelineDocument, {
    workspaceId,
    customerId,
    filter,
    page,
    size
  });
  return data.customerTimeline;
}

export async function addCustomerNote(workspaceId: string, customerId: string, note: string): Promise<CustomerEvent> {
  const data = await fetcher<AddCustomerNoteMutation, AddCustomerNoteMutationVariables>(AddCustomerNoteDocument, {
    workspaceId,
    customerId,
    note
  });
  return data.addCustomerNote;
}

export async function appendCustomerEvent(input: AppendCustomerEventMutationVariables['input']): Promise<CustomerEvent> {
  const data = await fetcher<AppendCustomerEventMutation, AppendCustomerEventMutationVariables>(
    AppendCustomerEventDocument,
    { input }
  );
  return data.appendCustomerEvent;
}
