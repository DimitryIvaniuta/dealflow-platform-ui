import { createGraphqlClient } from '@/shared/api/graphqlClient';

export type CustomerStatus = 'ACTIVE' | 'ARCHIVED' | 'PROSPECT' | string;

export type Customer = {
  id: string;
  displayName: string;
  email?: string | null;
  status: CustomerStatus;
};

export type PageInfo = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type CustomersConnection = {
  items: Customer[];
  pageInfo: PageInfo;
};

export type CustomerFilterInput = {
  text?: string | null;
  statuses?: CustomerStatus[] | null;
};

export async function fetchCustomers(workspaceId: string, filter: CustomerFilterInput | null, page: number, size: number) {
  const client = createGraphqlClient();
  const query = `
    query Customers($workspaceId: UUID!, $filter: CustomerFilterInput, $page: Int!, $size: Int!) {
      customers(workspaceId: $workspaceId, filter: $filter, page: $page, size: $size) {
        items { id displayName email status }
        pageInfo { page size totalElements totalPages hasNext hasPrevious }
      }
    }
  `;
  const res = await client.request<{ customers: CustomersConnection }>(query, { workspaceId, filter, page, size });
  return res.customers;
}

export type CreateCustomerInput = {
  workspaceId: string;
  displayName: string;
  email?: string | null;
  phone?: string | null;
};

export async function createCustomer(input: CreateCustomerInput) {
  const client = createGraphqlClient();
  const mutation = `
    mutation CreateCustomer($input: CreateCustomerInput!) {
      createCustomer(input: $input) { id displayName email status }
    }
  `;
  const res = await client.request<{ createCustomer: Customer }>(mutation, { input });
  return res.createCustomer;
}
