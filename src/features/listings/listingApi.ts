import { graphqlRequest } from '@/shared/api/graphqlRequest';

export type ListingStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | string;

export type Listing = {
  id: string;
  title: string;
  city: string;
  askingPrice: string; // BigDecimal as string
  status: ListingStatus;
  customer?: { id: string; displayName: string } | null;
};

export type PageInfo = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ListingConnection = {
  items: Listing[];
  pageInfo: PageInfo;
};

export type ListingFilterInput = {
  city?: string | null;
  status?: ListingStatus | null;
  minPrice?: string | null;
  maxPrice?: string | null;
};

export async function fetchListings(workspaceId: string, filter: ListingFilterInput | null, page: number, size: number) {
  const query = `
    query Listings($workspaceId: UUID!, $filter: ListingFilterInput, $page: Int!, $size: Int!) {
      listings(workspaceId: $workspaceId, filter: $filter, page: $page, size: $size) {
        items { id title city askingPrice status customer { id displayName } }
        pageInfo { page size totalElements totalPages hasNext hasPrevious }
      }
    }
  `;
  const res = await graphqlRequest<{ listings: ListingConnection }>(query, { workspaceId, filter, page, size });
  return res.listings;
}

export type CreateListingInput = {
  workspaceId: string;
  title: string;
  city: string;
  askingPrice: string;
  customerId?: string | null;
};

export async function createListing(input: CreateListingInput) {
  const mutation = `
    mutation CreateListing($input: CreateListingInput!) {
      createListing(input: $input) { id title city askingPrice status customer { id displayName } }
    }
  `;
  const res = await graphqlRequest<{ createListing: Listing }>(mutation, { input });
  return res.createListing;
}

export type UpdateListingInput = {
  workspaceId: string;
  listingId: string;
  title?: string | null;
  city?: string | null;
  askingPrice?: string | null;
  status?: ListingStatus | null;
  customerId?: string | null;
  clearCustomer?: boolean | null;
};

export async function updateListing(input: UpdateListingInput) {
  const mutation = `
    mutation UpdateListing($input: UpdateListingInput!) {
      updateListing(input: $input) { id title city askingPrice status customer { id displayName } }
    }
  `;
  const res = await graphqlRequest<{ updateListing: Listing }>(mutation, { input });
  return res.updateListing;
}

export async function deleteListing(workspaceId: string, listingId: string) {
  const mutation = `
    mutation DeleteListing($input: DeleteListingInput!) {
      deleteListing(input: $input) { id status }
    }
  `;
  const res = await graphqlRequest<{ deleteListing: Listing }>(mutation, { input: { workspaceId, listingId } });
  return res.deleteListing;
}

export async function publishListing(workspaceId: string, listingId: string) {
  const mutation = `
    mutation PublishListing($input: PublishListingInput!) {
      publishListing(input: $input) { id status }
    }
  `;
  const res = await graphqlRequest<{ publishListing: Listing }>(mutation, { input: { workspaceId, listingId } });
  return res.publishListing;
}
