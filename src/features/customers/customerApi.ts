import { graphqlRequest } from '@/shared/api/graphqlRequest';

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
  const query = `
    query Customers($workspaceId: UUID!, $filter: CustomerFilterInput, $page: Int!, $size: Int!) {
      customers(workspaceId: $workspaceId, filter: $filter, page: $page, size: $size) {
        items { id displayName email status }
        pageInfo { page size totalElements totalPages hasNext hasPrevious }
      }
    }
  `;
  const res = await graphqlRequest<{ customers: CustomersConnection }>(query, { workspaceId, filter, page, size });
  return res.customers;
}

export type CreateCustomerInput = {
  workspaceId: string;
  displayName: string;
  email?: string | null;
  phone?: string | null;
};

export async function createCustomer(input: CreateCustomerInput) {
  const mutation = `
    mutation CreateCustomer($input: CreateCustomerInput!) {
      createCustomer(input: $input) { id displayName email status }
    }
  `;
  const res = await graphqlRequest<{ createCustomer: Customer }>(mutation, { input });
  return res.createCustomer;
}
