import { fetcher } from '@/shared/api/codegenFetcher';
import {
  ListingsDocument,
  CreateListingDocument,
  UpdateListingDocument,
  DeleteListingDocument,
  PublishListingDocument,
  type ListingFieldsFragment,
  type ListingsQuery,
  type ListingsQueryVariables,
  type CreateListingMutation,
  type CreateListingMutationVariables,
  type UpdateListingMutation,
  type UpdateListingMutationVariables,
  type DeleteListingMutation,
  type DeleteListingMutationVariables,
  type PublishListingMutation,
  type PublishListingMutationVariables
} from '@/graphql/generated';

/**
 * NOTE: this file contains **zero** hand-written GraphQL strings.
 * Everything is generated from src/graphql/operations/** and the backend schema.
 *
 * Workflow:
 *  1) npm run schema:download
 *  2) npm run codegen
 */

export type ListingStatus = ListingFieldsFragment['status'] | string;
export type Listing = ListingFieldsFragment;
export type ListingConnection = ListingsQuery['listings'];
export type PageInfo = ListingsQuery['listings']['pageInfo'];
export type ListingFilterInput = ListingsQueryVariables['filter'];
export type CreateListingInput = CreateListingMutationVariables['input'];
export type UpdateListingInput = UpdateListingMutationVariables['input'];

export async function fetchListings(
  workspaceId: string,
  filter: ListingFilterInput | null,
  page: number,
  size: number
): Promise<ListingConnection> {
  const data = await fetcher<ListingsQuery, ListingsQueryVariables>(ListingsDocument, {
    workspaceId,
    filter,
    page,
    size
  });
  return data.listings;
}

export async function createListing(input: CreateListingInput): Promise<Listing> {
  const data = await fetcher<CreateListingMutation, CreateListingMutationVariables>(CreateListingDocument, { input });
  return data.createListing;
}

export async function updateListing(input: UpdateListingInput): Promise<Listing> {
  const data = await fetcher<UpdateListingMutation, UpdateListingMutationVariables>(UpdateListingDocument, { input });
  return data.updateListing;
}

export async function deleteListing(workspaceId: string, listingId: string): Promise<Listing> {
  const data = await fetcher<DeleteListingMutation, DeleteListingMutationVariables>(DeleteListingDocument, {
    input: { workspaceId, listingId }
  });
  return data.deleteListing;
}

export async function publishListing(workspaceId: string, listingId: string): Promise<Listing> {
  const data = await fetcher<PublishListingMutation, PublishListingMutationVariables>(PublishListingDocument, {
    input: { workspaceId, listingId }
  });
  return data.publishListing;
}
