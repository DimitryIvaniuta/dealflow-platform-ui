import { fetcher } from '@/shared/api/codegenFetcher';
import {
  CustomersDocument,
  CreateCustomerDocument,
  type CustomerFieldsFragment,
  type CustomersQuery,
  type CustomersQueryVariables,
  type CreateCustomerMutation,
  type CreateCustomerMutationVariables
} from '@/graphql/generated';

export type CustomerStatus = CustomerFieldsFragment['status'] | string;
export type Customer = CustomerFieldsFragment;
export type CustomersConnection = CustomersQuery['customers'];
export type PageInfo = CustomersQuery['customers']['pageInfo'];
export type CustomerFilterInput = CustomersQueryVariables['filter'];
export type CreateCustomerInput = CreateCustomerMutationVariables['input'];

export async function fetchCustomers(
  workspaceId: string,
  filter: CustomerFilterInput | null,
  page: number,
  size: number
): Promise<CustomersConnection> {
  const data = await fetcher<CustomersQuery, CustomersQueryVariables>(CustomersDocument, {
    workspaceId,
    filter,
    page,
    size
  });
  return data.customers;
}

export async function createCustomer(input: CreateCustomerInput): Promise<Customer> {
  const data = await fetcher<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, { input });
  return data.createCustomer;
}
