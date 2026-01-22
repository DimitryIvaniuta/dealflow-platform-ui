import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '@/shared/api/codegenFetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An arbitrary precision signed decimal */
  BigDecimal: { input: any; output: any; }
  /** Built-in scalar representing an instant in time */
  Instant: { input: string; output: string; }
  /** Any JSON value */
  Json: { input: any; output: any; }
  /** Built-in scalar representing a local date */
  LocalDate: { input: any; output: any; }
  /** A 64-bit signed integer */
  Long: { input: any; output: any; }
  /** UUID String */
  UUID: { input: string; output: string; }
};

export type AppendCustomerEventInputInput = {
  category?: InputMaybe<CustomerEventCategory>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  eventType?: InputMaybe<CustomerEventType>;
  listingId?: InputMaybe<Scalars['UUID']['input']>;
  noTime?: InputMaybe<Scalars['Boolean']['input']>;
  occurredAt?: InputMaybe<Scalars['Instant']['input']>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  payload?: InputMaybe<Scalars['Json']['input']>;
  source?: InputMaybe<CustomerEventSource>;
  summary?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type AuthenticationInput = {
  authenticated: Scalars['Boolean']['input'];
};

export type CreateCustomerInputInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  externalRef?: InputMaybe<Scalars['String']['input']>;
  ownerMemberId?: InputMaybe<Scalars['UUID']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateListingInputInput = {
  askingPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  status: ListingStatus;
  title?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateOpportunityInputInput = {
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['LocalDate']['input']>;
  ownerMemberId?: InputMaybe<Scalars['UUID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type Customer = {
  __typename?: 'Customer';
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  externalRef?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  normalizedName?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<WorkspaceMember>;
  phone?: Maybe<Scalars['String']['output']>;
  status?: Maybe<CustomerStatus>;
  workspace?: Maybe<Workspace>;
};

export type CustomerConnection = {
  __typename?: 'CustomerConnection';
  items?: Maybe<Array<Maybe<Customer>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CustomerEvent = {
  __typename?: 'CustomerEvent';
  actorSubject?: Maybe<Scalars['String']['output']>;
  category?: Maybe<CustomerEventCategory>;
  customer?: Maybe<Customer>;
  eventType?: Maybe<CustomerEventType>;
  id?: Maybe<Scalars['UUID']['output']>;
  listingId?: Maybe<Scalars['UUID']['output']>;
  noTime: Scalars['Boolean']['output'];
  occurredAt?: Maybe<Scalars['Instant']['output']>;
  opportunityId?: Maybe<Scalars['UUID']['output']>;
  payload?: Maybe<Scalars['Json']['output']>;
  source?: Maybe<CustomerEventSource>;
  summary?: Maybe<Scalars['String']['output']>;
  transactionId?: Maybe<Scalars['UUID']['output']>;
  workspaceId?: Maybe<Scalars['UUID']['output']>;
};

export enum CustomerEventCategory {
  Communication = 'COMMUNICATION',
  Deal = 'DEAL',
  Listings = 'LISTINGS',
  Pipeline = 'PIPELINE',
  Relationship = 'RELATIONSHIP',
  System = 'SYSTEM',
  Tasks = 'TASKS'
}

export type CustomerEventConnection = {
  __typename?: 'CustomerEventConnection';
  items?: Maybe<Array<Maybe<CustomerEvent>>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum CustomerEventSource {
  Integration = 'INTEGRATION',
  Manual = 'MANUAL',
  System = 'SYSTEM'
}

export enum CustomerEventType {
  ContactAdded = 'CONTACT_ADDED',
  ContactUpdated = 'CONTACT_UPDATED',
  EmailReceived = 'EMAIL_RECEIVED',
  EmailSent = 'EMAIL_SENT',
  ListingShared = 'LISTING_SHARED',
  NoteAdded = 'NOTE_ADDED',
  StatusChanged = 'STATUS_CHANGED',
  TaskCompleted = 'TASK_COMPLETED',
  TaskCreated = 'TASK_CREATED',
  TransactionAccepted = 'TRANSACTION_ACCEPTED',
  TransactionRejected = 'TRANSACTION_REJECTED'
}

export type CustomerFilterInputInput = {
  ownerMemberId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<CustomerStatus>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export enum CustomerStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Blocked = 'BLOCKED',
  New = 'NEW',
  Qualified = 'QUALIFIED'
}

export type CustomerTimelineFilterInputInput = {
  categories?: InputMaybe<Array<InputMaybe<CustomerEventCategory>>>;
  from?: InputMaybe<Scalars['Instant']['input']>;
  listingId?: InputMaybe<Scalars['UUID']['input']>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  sources?: InputMaybe<Array<InputMaybe<CustomerEventSource>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['Instant']['input']>;
  transactionId?: InputMaybe<Scalars['UUID']['input']>;
  types?: InputMaybe<Array<InputMaybe<CustomerEventType>>>;
};

export type DeleteListingInputInput = {
  listingId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type DeleteOpportunityInputInput = {
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Listing = {
  __typename?: 'Listing';
  askingPrice?: Maybe<Scalars['BigDecimal']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  cityNormalized?: Maybe<Scalars['String']['output']>;
  customer?: Maybe<Customer>;
  id?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<ListingStatus>;
  title?: Maybe<Scalars['String']['output']>;
  workspace?: Maybe<Workspace>;
};

export type ListingConnection = {
  __typename?: 'ListingConnection';
  items?: Maybe<Array<Maybe<Listing>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ListingFilterInputInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  maxPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  minPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  status?: InputMaybe<ListingStatus>;
};

export enum ListingStatus {
  Archived = 'ARCHIVED',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  UnderOffer = 'UNDER_OFFER'
}

export enum MemberStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Invited = 'INVITED'
}

export type MoveOpportunityStageInputInput = {
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  stage?: InputMaybe<OpportunityStage>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  addCustomerNote?: Maybe<CustomerEvent>;
  appendCustomerEvent?: Maybe<CustomerEvent>;
  createCustomer?: Maybe<Customer>;
  createListing?: Maybe<Listing>;
  createOpportunity?: Maybe<Opportunity>;
  deleteListing?: Maybe<Listing>;
  deleteOpportunity?: Maybe<Opportunity>;
  moveOpportunityStage?: Maybe<Opportunity>;
  publishListing?: Maybe<Listing>;
  recordContactAdded?: Maybe<CustomerEvent>;
  recordEmailSent?: Maybe<CustomerEvent>;
  recordTaskCompleted?: Maybe<CustomerEvent>;
  recordTransactionAccepted?: Maybe<CustomerEvent>;
  updateCustomerStatus?: Maybe<Customer>;
  updateListing?: Maybe<Listing>;
  updateOpportunity?: Maybe<Opportunity>;
};


/** Mutation root */
export type MutationAddCustomerNoteArgs = {
  auth?: InputMaybe<AuthenticationInput>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Mutation root */
export type MutationAppendCustomerEventArgs = {
  auth?: InputMaybe<AuthenticationInput>;
  input?: InputMaybe<AppendCustomerEventInputInput>;
};


/** Mutation root */
export type MutationCreateCustomerArgs = {
  input?: InputMaybe<CreateCustomerInputInput>;
};


/** Mutation root */
export type MutationCreateListingArgs = {
  input?: InputMaybe<CreateListingInputInput>;
};


/** Mutation root */
export type MutationCreateOpportunityArgs = {
  input?: InputMaybe<CreateOpportunityInputInput>;
};


/** Mutation root */
export type MutationDeleteListingArgs = {
  input?: InputMaybe<DeleteListingInputInput>;
};


/** Mutation root */
export type MutationDeleteOpportunityArgs = {
  input?: InputMaybe<DeleteOpportunityInputInput>;
};


/** Mutation root */
export type MutationMoveOpportunityStageArgs = {
  input?: InputMaybe<MoveOpportunityStageInputInput>;
};


/** Mutation root */
export type MutationPublishListingArgs = {
  input?: InputMaybe<PublishListingInputInput>;
};


/** Mutation root */
export type MutationRecordContactAddedArgs = {
  auth?: InputMaybe<AuthenticationInput>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Mutation root */
export type MutationRecordEmailSentArgs = {
  auth?: InputMaybe<AuthenticationInput>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  templateKey?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Mutation root */
export type MutationRecordTaskCompletedArgs = {
  auth?: InputMaybe<AuthenticationInput>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
  taskTitle?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Mutation root */
export type MutationRecordTransactionAcceptedArgs = {
  amount?: InputMaybe<Scalars['String']['input']>;
  auth?: InputMaybe<AuthenticationInput>;
  currency?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  transactionId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Mutation root */
export type MutationUpdateCustomerStatusArgs = {
  input?: InputMaybe<UpdateCustomerStatusInputInput>;
};


/** Mutation root */
export type MutationUpdateListingArgs = {
  input?: InputMaybe<UpdateListingInputInput>;
};


/** Mutation root */
export type MutationUpdateOpportunityArgs = {
  input?: InputMaybe<UpdateOpportunityInputInput>;
};

export enum NullHandling {
  Native = 'NATIVE',
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type Opportunity = {
  __typename?: 'Opportunity';
  amount?: Maybe<Scalars['BigDecimal']['output']>;
  customer?: Maybe<Customer>;
  expectedCloseDate?: Maybe<Scalars['LocalDate']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  owner?: Maybe<WorkspaceMember>;
  stage?: Maybe<OpportunityStage>;
  title?: Maybe<Scalars['String']['output']>;
  workspace?: Maybe<Workspace>;
};

export type OpportunityFilterInputInput = {
  maxAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  minAmount?: InputMaybe<Scalars['BigDecimal']['input']>;
  ownerMemberId?: InputMaybe<Scalars['UUID']['input']>;
  stage?: InputMaybe<OpportunityStage>;
};

export enum OpportunityStage {
  Archived = 'ARCHIVED',
  Discovery = 'DISCOVERY',
  Intake = 'INTAKE',
  Lost = 'LOST',
  Negotiation = 'NEGOTIATION',
  Proposal = 'PROPOSAL',
  Won = 'WON'
}

export type Order = {
  __typename?: 'Order';
  direction?: Maybe<Direction>;
  ignoreCase?: Maybe<Scalars['Boolean']['output']>;
  nullHandlingHint?: Maybe<NullHandling>;
  property: Scalars['String']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Long']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Page_Opportunity = {
  __typename?: 'Page_Opportunity';
  content?: Maybe<Array<Maybe<Opportunity>>>;
  first: Scalars['Boolean']['output'];
  hasContent: Scalars['Boolean']['output'];
  hasNext: Scalars['Boolean']['output'];
  hasPrevious: Scalars['Boolean']['output'];
  last: Scalars['Boolean']['output'];
  nextOrLastPageable?: Maybe<Pagination>;
  nextPageable?: Maybe<Pagination>;
  number: Scalars['Int']['output'];
  numberOfElements: Scalars['Int']['output'];
  pageable?: Maybe<Pagination>;
  previousOrFirstPageable?: Maybe<Pagination>;
  previousPageable?: Maybe<Pagination>;
  size: Scalars['Int']['output'];
  sort?: Maybe<Sorting>;
  totalElements: Scalars['Long']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Pagination = {
  __typename?: 'Pagination';
  pageNumber: Scalars['Int']['output'];
  pageSize?: Maybe<Scalars['Int']['output']>;
  sort?: Maybe<Sort>;
};

export type PublishListingInputInput = {
  listingId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  customerTimeline?: Maybe<CustomerEventConnection>;
  customers?: Maybe<CustomerConnection>;
  listing?: Maybe<Listing>;
  listings?: Maybe<ListingConnection>;
  opportunities?: Maybe<Page_Opportunity>;
  opportunity?: Maybe<Opportunity>;
};


/** Query root */
export type QueryCustomerTimelineArgs = {
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  filter?: InputMaybe<CustomerTimelineFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Query root */
export type QueryCustomersArgs = {
  filter?: InputMaybe<CustomerFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Query root */
export type QueryListingArgs = {
  listingId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Query root */
export type QueryListingsArgs = {
  filter?: InputMaybe<ListingFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Query root */
export type QueryOpportunitiesArgs = {
  filter?: InputMaybe<OpportunityFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};


/** Query root */
export type QueryOpportunityArgs = {
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type Sort = {
  __typename?: 'Sort';
  orders: Array<Order>;
};

export type Sorting = {
  __typename?: 'Sorting';
  orders: Array<Order>;
};

export type UpdateCustomerStatusInputInput = {
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<CustomerStatus>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateListingInputInput = {
  askingPrice?: InputMaybe<Scalars['BigDecimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  clearCustomer?: InputMaybe<Scalars['Boolean']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  listingId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<ListingStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UpdateOpportunityInputInput = {
  amount?: InputMaybe<Scalars['BigDecimal']['input']>;
  clearCustomer?: InputMaybe<Scalars['Boolean']['input']>;
  clearOwner?: InputMaybe<Scalars['Boolean']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['LocalDate']['input']>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  ownerMemberId?: InputMaybe<Scalars['UUID']['input']>;
  stage?: InputMaybe<OpportunityStage>;
  title?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
};

export type Workspace = {
  __typename?: 'Workspace';
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<WorkspaceStatus>;
};

export type WorkspaceMember = {
  __typename?: 'WorkspaceMember';
  displayName?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  status?: Maybe<MemberStatus>;
  subject?: Maybe<Scalars['String']['output']>;
  workspace?: Maybe<Workspace>;
};

export enum WorkspaceStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Suspended = 'SUSPENDED'
}

export type AutoAddCustomerNoteMutationVariables = Exact<{
  note?: InputMaybe<Scalars['String']['input']>;
  auth?: InputMaybe<AuthenticationInput>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoAddCustomerNoteMutation = { __typename?: 'Mutation', addCustomerNote?: { __typename?: 'CustomerEvent', actorSubject?: string | null, category?: CustomerEventCategory | null, eventType?: CustomerEventType | null, id?: string | null, listingId?: string | null, noTime: boolean, occurredAt?: string | null, opportunityId?: string | null, payload?: any | null, source?: CustomerEventSource | null, summary?: string | null, transactionId?: string | null, workspaceId?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null } | null };

export type AutoAppendCustomerEventMutationVariables = Exact<{
  input?: InputMaybe<AppendCustomerEventInputInput>;
  auth?: InputMaybe<AuthenticationInput>;
}>;


export type AutoAppendCustomerEventMutation = { __typename?: 'Mutation', appendCustomerEvent?: { __typename?: 'CustomerEvent', actorSubject?: string | null, category?: CustomerEventCategory | null, eventType?: CustomerEventType | null, id?: string | null, listingId?: string | null, noTime: boolean, occurredAt?: string | null, opportunityId?: string | null, payload?: any | null, source?: CustomerEventSource | null, summary?: string | null, transactionId?: string | null, workspaceId?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null } | null };

export type AutoCreateCustomerMutationVariables = Exact<{
  input?: InputMaybe<CreateCustomerInputInput>;
}>;


export type AutoCreateCustomerMutation = { __typename?: 'Mutation', createCustomer?: { __typename?: 'Customer', displayName?: string | null, email?: string | null, externalRef?: string | null, id?: string | null, normalizedName?: string | null, phone?: string | null, status?: CustomerStatus | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoCreateListingMutationVariables = Exact<{
  input?: InputMaybe<CreateListingInputInput>;
}>;


export type AutoCreateListingMutation = { __typename?: 'Mutation', createListing?: { __typename?: 'Listing', askingPrice?: any | null, city?: string | null, cityNormalized?: string | null, id?: string | null, status?: ListingStatus | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoCreateOpportunityMutationVariables = Exact<{
  input?: InputMaybe<CreateOpportunityInputInput>;
}>;


export type AutoCreateOpportunityMutation = { __typename?: 'Mutation', createOpportunity?: { __typename?: 'Opportunity', amount?: any | null, expectedCloseDate?: any | null, id?: string | null, stage?: OpportunityStage | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoDeleteListingMutationVariables = Exact<{
  input?: InputMaybe<DeleteListingInputInput>;
}>;


export type AutoDeleteListingMutation = { __typename?: 'Mutation', deleteListing?: { __typename?: 'Listing', askingPrice?: any | null, city?: string | null, cityNormalized?: string | null, id?: string | null, status?: ListingStatus | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoDeleteOpportunityMutationVariables = Exact<{
  input?: InputMaybe<DeleteOpportunityInputInput>;
}>;


export type AutoDeleteOpportunityMutation = { __typename?: 'Mutation', deleteOpportunity?: { __typename?: 'Opportunity', amount?: any | null, expectedCloseDate?: any | null, id?: string | null, stage?: OpportunityStage | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoMoveOpportunityStageMutationVariables = Exact<{
  input?: InputMaybe<MoveOpportunityStageInputInput>;
}>;


export type AutoMoveOpportunityStageMutation = { __typename?: 'Mutation', moveOpportunityStage?: { __typename?: 'Opportunity', amount?: any | null, expectedCloseDate?: any | null, id?: string | null, stage?: OpportunityStage | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoPublishListingMutationVariables = Exact<{
  input?: InputMaybe<PublishListingInputInput>;
}>;


export type AutoPublishListingMutation = { __typename?: 'Mutation', publishListing?: { __typename?: 'Listing', askingPrice?: any | null, city?: string | null, cityNormalized?: string | null, id?: string | null, status?: ListingStatus | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoRecordContactAddedMutationVariables = Exact<{
  auth?: InputMaybe<AuthenticationInput>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoRecordContactAddedMutation = { __typename?: 'Mutation', recordContactAdded?: { __typename?: 'CustomerEvent', actorSubject?: string | null, category?: CustomerEventCategory | null, eventType?: CustomerEventType | null, id?: string | null, listingId?: string | null, noTime: boolean, occurredAt?: string | null, opportunityId?: string | null, payload?: any | null, source?: CustomerEventSource | null, summary?: string | null, transactionId?: string | null, workspaceId?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null } | null };

export type AutoRecordEmailSentMutationVariables = Exact<{
  auth?: InputMaybe<AuthenticationInput>;
  subject?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  to?: InputMaybe<Scalars['String']['input']>;
  templateKey?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoRecordEmailSentMutation = { __typename?: 'Mutation', recordEmailSent?: { __typename?: 'CustomerEvent', actorSubject?: string | null, category?: CustomerEventCategory | null, eventType?: CustomerEventType | null, id?: string | null, listingId?: string | null, noTime: boolean, occurredAt?: string | null, opportunityId?: string | null, payload?: any | null, source?: CustomerEventSource | null, summary?: string | null, transactionId?: string | null, workspaceId?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null } | null };

export type AutoRecordTaskCompletedMutationVariables = Exact<{
  auth?: InputMaybe<AuthenticationInput>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  taskTitle?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoRecordTaskCompletedMutation = { __typename?: 'Mutation', recordTaskCompleted?: { __typename?: 'CustomerEvent', actorSubject?: string | null, category?: CustomerEventCategory | null, eventType?: CustomerEventType | null, id?: string | null, listingId?: string | null, noTime: boolean, occurredAt?: string | null, opportunityId?: string | null, payload?: any | null, source?: CustomerEventSource | null, summary?: string | null, transactionId?: string | null, workspaceId?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null } | null };

export type AutoRecordTransactionAcceptedMutationVariables = Exact<{
  amount?: InputMaybe<Scalars['String']['input']>;
  auth?: InputMaybe<AuthenticationInput>;
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoRecordTransactionAcceptedMutation = { __typename?: 'Mutation', recordTransactionAccepted?: { __typename?: 'CustomerEvent', actorSubject?: string | null, category?: CustomerEventCategory | null, eventType?: CustomerEventType | null, id?: string | null, listingId?: string | null, noTime: boolean, occurredAt?: string | null, opportunityId?: string | null, payload?: any | null, source?: CustomerEventSource | null, summary?: string | null, transactionId?: string | null, workspaceId?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null } | null };

export type AutoUpdateCustomerStatusMutationVariables = Exact<{
  input?: InputMaybe<UpdateCustomerStatusInputInput>;
}>;


export type AutoUpdateCustomerStatusMutation = { __typename?: 'Mutation', updateCustomerStatus?: { __typename?: 'Customer', displayName?: string | null, email?: string | null, externalRef?: string | null, id?: string | null, normalizedName?: string | null, phone?: string | null, status?: CustomerStatus | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoUpdateListingMutationVariables = Exact<{
  input?: InputMaybe<UpdateListingInputInput>;
}>;


export type AutoUpdateListingMutation = { __typename?: 'Mutation', updateListing?: { __typename?: 'Listing', askingPrice?: any | null, city?: string | null, cityNormalized?: string | null, id?: string | null, status?: ListingStatus | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoUpdateOpportunityMutationVariables = Exact<{
  input?: InputMaybe<UpdateOpportunityInputInput>;
}>;


export type AutoUpdateOpportunityMutation = { __typename?: 'Mutation', updateOpportunity?: { __typename?: 'Opportunity', amount?: any | null, expectedCloseDate?: any | null, id?: string | null, stage?: OpportunityStage | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoCustomerTimelineQueryVariables = Exact<{
  filter?: InputMaybe<CustomerTimelineFilterInputInput>;
  size: Scalars['Int']['input'];
  customerId?: InputMaybe<Scalars['UUID']['input']>;
  page: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoCustomerTimelineQuery = { __typename?: 'Query', customerTimeline?: { __typename?: 'CustomerEventConnection', items?: Array<{ __typename?: 'CustomerEvent', id?: string | null } | null> | null } | null };

export type AutoCustomersQueryVariables = Exact<{
  filter?: InputMaybe<CustomerFilterInputInput>;
  size: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoCustomersQuery = { __typename?: 'Query', customers?: { __typename?: 'CustomerConnection', items?: Array<{ __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null> | null } | null };

export type AutoListingQueryVariables = Exact<{
  listingId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoListingQuery = { __typename?: 'Query', listing?: { __typename?: 'Listing', askingPrice?: any | null, city?: string | null, cityNormalized?: string | null, id?: string | null, status?: ListingStatus | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AutoListingsQueryVariables = Exact<{
  filter?: InputMaybe<ListingFilterInputInput>;
  size: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoListingsQuery = { __typename?: 'Query', listings?: { __typename?: 'ListingConnection', items?: Array<{ __typename?: 'Listing', id?: string | null, title?: string | null, status?: ListingStatus | null } | null> | null } | null };

export type AutoOpportunitiesQueryVariables = Exact<{
  filter?: InputMaybe<OpportunityFilterInputInput>;
  size: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoOpportunitiesQuery = { __typename?: 'Query', opportunities?: { __typename?: 'Page_Opportunity', first: boolean, hasContent: boolean, hasNext: boolean, hasPrevious: boolean, last: boolean, number: number, numberOfElements: number, size: number, totalElements: any, totalPages: number, content?: Array<{ __typename?: 'Opportunity', id?: string | null, title?: string | null, stage?: OpportunityStage | null } | null> | null } | null };

export type AutoOpportunityQueryVariables = Exact<{
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  workspaceId?: InputMaybe<Scalars['UUID']['input']>;
}>;


export type AutoOpportunityQuery = { __typename?: 'Query', opportunity?: { __typename?: 'Opportunity', amount?: any | null, expectedCloseDate?: any | null, id?: string | null, stage?: OpportunityStage | null, title?: string | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null, email?: string | null } | null, workspace?: { __typename?: 'Workspace', id?: string | null, displayName?: string | null, status?: WorkspaceStatus | null } | null } | null };

export type AddCustomerNoteMutationVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  customerId: Scalars['UUID']['input'];
  note: Scalars['String']['input'];
}>;


export type AddCustomerNoteMutation = { __typename?: 'Mutation', addCustomerNote?: { __typename?: 'CustomerEvent', id?: string | null, eventType?: CustomerEventType | null, occurredAt?: string | null, summary?: string | null, payload?: any | null } | null };

export type AppendCustomerEventMutationVariables = Exact<{
  input: AppendCustomerEventInputInput;
}>;


export type AppendCustomerEventMutation = { __typename?: 'Mutation', appendCustomerEvent?: { __typename?: 'CustomerEvent', id?: string | null, eventType?: CustomerEventType | null, category?: CustomerEventCategory | null, source?: CustomerEventSource | null, occurredAt?: string | null, summary?: string | null, payload?: any | null } | null };

export type CreateCustomerMutationVariables = Exact<{
  input: CreateCustomerInputInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null, status?: CustomerStatus | null } | null };

export type CustomerTimelineQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  customerId: Scalars['UUID']['input'];
  filter?: InputMaybe<CustomerTimelineFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type CustomerTimelineQuery = { __typename?: 'Query', customerTimeline?: { __typename?: 'CustomerEventConnection', items?: Array<{ __typename?: 'CustomerEvent', id?: string | null, eventType?: CustomerEventType | null, category?: CustomerEventCategory | null, source?: CustomerEventSource | null, occurredAt?: string | null, actorSubject?: string | null, summary?: string | null, payload?: any | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', page: number, size: number, totalElements: any, totalPages: number, hasNext: boolean, hasPrevious: boolean } | null } | null };

export type CustomersQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  filter?: InputMaybe<CustomerFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type CustomersQuery = { __typename?: 'Query', customers?: { __typename?: 'CustomerConnection', items?: Array<{ __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null, status?: CustomerStatus | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', page: number, size: number, totalElements: any, totalPages: number, hasNext: boolean, hasPrevious: boolean } | null } | null };

export type CustomerFieldsFragment = { __typename?: 'Customer', id?: string | null, displayName?: string | null, email?: string | null, status?: CustomerStatus | null };

export type CustomerMiniFieldsFragment = { __typename?: 'Customer', id?: string | null, displayName?: string | null };

export type ListingFieldsFragment = { __typename?: 'Listing', id?: string | null, title?: string | null, city?: string | null, askingPrice?: any | null, status?: ListingStatus | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null } | null };

export type PageInfoFieldsFragment = { __typename?: 'PageInfo', page: number, size: number, totalElements: any, totalPages: number, hasNext: boolean, hasPrevious: boolean };

export type ListingsQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  filter?: InputMaybe<ListingFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type ListingsQuery = { __typename?: 'Query', listings?: { __typename?: 'ListingConnection', items?: Array<{ __typename?: 'Listing', id?: string | null, title?: string | null, city?: string | null, askingPrice?: any | null, status?: ListingStatus | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', page: number, size: number, totalElements: any, totalPages: number, hasNext: boolean, hasPrevious: boolean } | null } | null };

export type CreateListingMutationVariables = Exact<{
  input: CreateListingInputInput;
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing?: { __typename?: 'Listing', id?: string | null, title?: string | null, city?: string | null, askingPrice?: any | null, status?: ListingStatus | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null } | null } | null };

export type UpdateListingMutationVariables = Exact<{
  input: UpdateListingInputInput;
}>;


export type UpdateListingMutation = { __typename?: 'Mutation', updateListing?: { __typename?: 'Listing', id?: string | null, title?: string | null, city?: string | null, askingPrice?: any | null, status?: ListingStatus | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null } | null } | null };

export type PublishListingMutationVariables = Exact<{
  input: PublishListingInputInput;
}>;


export type PublishListingMutation = { __typename?: 'Mutation', publishListing?: { __typename?: 'Listing', id?: string | null, status?: ListingStatus | null } | null };

export type DeleteListingMutationVariables = Exact<{
  input: DeleteListingInputInput;
}>;


export type DeleteListingMutation = { __typename?: 'Mutation', deleteListing?: { __typename?: 'Listing', id?: string | null, status?: ListingStatus | null } | null };

export type OpportunitiesQueryVariables = Exact<{
  workspaceId: Scalars['UUID']['input'];
  filter?: InputMaybe<OpportunityFilterInputInput>;
  page: Scalars['Int']['input'];
  size: Scalars['Int']['input'];
}>;


export type OpportunitiesQuery = { __typename?: 'Query', opportunities?: { __typename?: 'Page_Opportunity', number: number, size: number, totalElements: any, totalPages: number, content?: Array<{ __typename?: 'Opportunity', id?: string | null, title?: string | null, amount?: any | null, stage?: OpportunityStage | null, expectedCloseDate?: any | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null } | null } | null> | null } | null };

export type CreateOpportunityMutationVariables = Exact<{
  input: CreateOpportunityInputInput;
}>;


export type CreateOpportunityMutation = { __typename?: 'Mutation', createOpportunity?: { __typename?: 'Opportunity', id?: string | null, title?: string | null, amount?: any | null, stage?: OpportunityStage | null, expectedCloseDate?: any | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null } | null } | null };

export type UpdateOpportunityMutationVariables = Exact<{
  input: UpdateOpportunityInputInput;
}>;


export type UpdateOpportunityMutation = { __typename?: 'Mutation', updateOpportunity?: { __typename?: 'Opportunity', id?: string | null, title?: string | null, amount?: any | null, stage?: OpportunityStage | null, expectedCloseDate?: any | null, customer?: { __typename?: 'Customer', id?: string | null, displayName?: string | null } | null, owner?: { __typename?: 'WorkspaceMember', id?: string | null, displayName?: string | null } | null } | null };

export type MoveOpportunityStageMutationVariables = Exact<{
  input: MoveOpportunityStageInputInput;
}>;


export type MoveOpportunityStageMutation = { __typename?: 'Mutation', moveOpportunityStage?: { __typename?: 'Opportunity', id?: string | null, stage?: OpportunityStage | null } | null };

export type DeleteOpportunityMutationVariables = Exact<{
  input: DeleteOpportunityInputInput;
}>;


export type DeleteOpportunityMutation = { __typename?: 'Mutation', deleteOpportunity?: { __typename?: 'Opportunity', id?: string | null, stage?: OpportunityStage | null } | null };


export const CustomerFieldsFragmentDoc = `
    fragment CustomerFields on Customer {
  id
  displayName
  email
  status
}
    `;
export const CustomerMiniFieldsFragmentDoc = `
    fragment CustomerMiniFields on Customer {
  id
  displayName
}
    `;
export const ListingFieldsFragmentDoc = `
    fragment ListingFields on Listing {
  id
  title
  city
  askingPrice
  status
  customer {
    ...CustomerMiniFields
  }
}
    ${CustomerMiniFieldsFragmentDoc}`;
export const PageInfoFieldsFragmentDoc = `
    fragment PageInfoFields on PageInfo {
  page
  size
  totalElements
  totalPages
  hasNext
  hasPrevious
}
    `;
export const AutoAddCustomerNoteDocument = `
    mutation AutoAddCustomerNote($note: String, $auth: AuthenticationInput, $customerId: UUID, $workspaceId: UUID) {
  addCustomerNote(
    note: $note
    auth: $auth
    customerId: $customerId
    workspaceId: $workspaceId
  ) {
    actorSubject
    category
    customer {
      id
      displayName
      email
    }
    eventType
    id
    listingId
    noTime
    occurredAt
    opportunityId
    payload
    source
    summary
    transactionId
    workspaceId
  }
}
    `;

export const useAutoAddCustomerNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoAddCustomerNoteMutation, TError, AutoAddCustomerNoteMutationVariables, TContext>) => {
    
    return useMutation<AutoAddCustomerNoteMutation, TError, AutoAddCustomerNoteMutationVariables, TContext>(
      ['AutoAddCustomerNote'],
      (variables?: AutoAddCustomerNoteMutationVariables) => fetcher<AutoAddCustomerNoteMutation, AutoAddCustomerNoteMutationVariables>(AutoAddCustomerNoteDocument, variables)(),
      options
    )};

useAutoAddCustomerNoteMutation.getKey = () => ['AutoAddCustomerNote'];

export const AutoAppendCustomerEventDocument = `
    mutation AutoAppendCustomerEvent($input: AppendCustomerEventInputInput, $auth: AuthenticationInput) {
  appendCustomerEvent(input: $input, auth: $auth) {
    actorSubject
    category
    customer {
      id
      displayName
      email
    }
    eventType
    id
    listingId
    noTime
    occurredAt
    opportunityId
    payload
    source
    summary
    transactionId
    workspaceId
  }
}
    `;

export const useAutoAppendCustomerEventMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoAppendCustomerEventMutation, TError, AutoAppendCustomerEventMutationVariables, TContext>) => {
    
    return useMutation<AutoAppendCustomerEventMutation, TError, AutoAppendCustomerEventMutationVariables, TContext>(
      ['AutoAppendCustomerEvent'],
      (variables?: AutoAppendCustomerEventMutationVariables) => fetcher<AutoAppendCustomerEventMutation, AutoAppendCustomerEventMutationVariables>(AutoAppendCustomerEventDocument, variables)(),
      options
    )};

useAutoAppendCustomerEventMutation.getKey = () => ['AutoAppendCustomerEvent'];

export const AutoCreateCustomerDocument = `
    mutation AutoCreateCustomer($input: CreateCustomerInputInput) {
  createCustomer(input: $input) {
    displayName
    email
    externalRef
    id
    normalizedName
    owner {
      id
      displayName
      email
    }
    phone
    status
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoCreateCustomerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoCreateCustomerMutation, TError, AutoCreateCustomerMutationVariables, TContext>) => {
    
    return useMutation<AutoCreateCustomerMutation, TError, AutoCreateCustomerMutationVariables, TContext>(
      ['AutoCreateCustomer'],
      (variables?: AutoCreateCustomerMutationVariables) => fetcher<AutoCreateCustomerMutation, AutoCreateCustomerMutationVariables>(AutoCreateCustomerDocument, variables)(),
      options
    )};

useAutoCreateCustomerMutation.getKey = () => ['AutoCreateCustomer'];

export const AutoCreateListingDocument = `
    mutation AutoCreateListing($input: CreateListingInputInput) {
  createListing(input: $input) {
    askingPrice
    city
    cityNormalized
    customer {
      id
      displayName
      email
    }
    id
    status
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoCreateListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoCreateListingMutation, TError, AutoCreateListingMutationVariables, TContext>) => {
    
    return useMutation<AutoCreateListingMutation, TError, AutoCreateListingMutationVariables, TContext>(
      ['AutoCreateListing'],
      (variables?: AutoCreateListingMutationVariables) => fetcher<AutoCreateListingMutation, AutoCreateListingMutationVariables>(AutoCreateListingDocument, variables)(),
      options
    )};

useAutoCreateListingMutation.getKey = () => ['AutoCreateListing'];

export const AutoCreateOpportunityDocument = `
    mutation AutoCreateOpportunity($input: CreateOpportunityInputInput) {
  createOpportunity(input: $input) {
    amount
    customer {
      id
      displayName
      email
    }
    expectedCloseDate
    id
    owner {
      id
      displayName
      email
    }
    stage
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoCreateOpportunityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoCreateOpportunityMutation, TError, AutoCreateOpportunityMutationVariables, TContext>) => {
    
    return useMutation<AutoCreateOpportunityMutation, TError, AutoCreateOpportunityMutationVariables, TContext>(
      ['AutoCreateOpportunity'],
      (variables?: AutoCreateOpportunityMutationVariables) => fetcher<AutoCreateOpportunityMutation, AutoCreateOpportunityMutationVariables>(AutoCreateOpportunityDocument, variables)(),
      options
    )};

useAutoCreateOpportunityMutation.getKey = () => ['AutoCreateOpportunity'];

export const AutoDeleteListingDocument = `
    mutation AutoDeleteListing($input: DeleteListingInputInput) {
  deleteListing(input: $input) {
    askingPrice
    city
    cityNormalized
    customer {
      id
      displayName
      email
    }
    id
    status
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoDeleteListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoDeleteListingMutation, TError, AutoDeleteListingMutationVariables, TContext>) => {
    
    return useMutation<AutoDeleteListingMutation, TError, AutoDeleteListingMutationVariables, TContext>(
      ['AutoDeleteListing'],
      (variables?: AutoDeleteListingMutationVariables) => fetcher<AutoDeleteListingMutation, AutoDeleteListingMutationVariables>(AutoDeleteListingDocument, variables)(),
      options
    )};

useAutoDeleteListingMutation.getKey = () => ['AutoDeleteListing'];

export const AutoDeleteOpportunityDocument = `
    mutation AutoDeleteOpportunity($input: DeleteOpportunityInputInput) {
  deleteOpportunity(input: $input) {
    amount
    customer {
      id
      displayName
      email
    }
    expectedCloseDate
    id
    owner {
      id
      displayName
      email
    }
    stage
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoDeleteOpportunityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoDeleteOpportunityMutation, TError, AutoDeleteOpportunityMutationVariables, TContext>) => {
    
    return useMutation<AutoDeleteOpportunityMutation, TError, AutoDeleteOpportunityMutationVariables, TContext>(
      ['AutoDeleteOpportunity'],
      (variables?: AutoDeleteOpportunityMutationVariables) => fetcher<AutoDeleteOpportunityMutation, AutoDeleteOpportunityMutationVariables>(AutoDeleteOpportunityDocument, variables)(),
      options
    )};

useAutoDeleteOpportunityMutation.getKey = () => ['AutoDeleteOpportunity'];

export const AutoMoveOpportunityStageDocument = `
    mutation AutoMoveOpportunityStage($input: MoveOpportunityStageInputInput) {
  moveOpportunityStage(input: $input) {
    amount
    customer {
      id
      displayName
      email
    }
    expectedCloseDate
    id
    owner {
      id
      displayName
      email
    }
    stage
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoMoveOpportunityStageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoMoveOpportunityStageMutation, TError, AutoMoveOpportunityStageMutationVariables, TContext>) => {
    
    return useMutation<AutoMoveOpportunityStageMutation, TError, AutoMoveOpportunityStageMutationVariables, TContext>(
      ['AutoMoveOpportunityStage'],
      (variables?: AutoMoveOpportunityStageMutationVariables) => fetcher<AutoMoveOpportunityStageMutation, AutoMoveOpportunityStageMutationVariables>(AutoMoveOpportunityStageDocument, variables)(),
      options
    )};

useAutoMoveOpportunityStageMutation.getKey = () => ['AutoMoveOpportunityStage'];

export const AutoPublishListingDocument = `
    mutation AutoPublishListing($input: PublishListingInputInput) {
  publishListing(input: $input) {
    askingPrice
    city
    cityNormalized
    customer {
      id
      displayName
      email
    }
    id
    status
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoPublishListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoPublishListingMutation, TError, AutoPublishListingMutationVariables, TContext>) => {
    
    return useMutation<AutoPublishListingMutation, TError, AutoPublishListingMutationVariables, TContext>(
      ['AutoPublishListing'],
      (variables?: AutoPublishListingMutationVariables) => fetcher<AutoPublishListingMutation, AutoPublishListingMutationVariables>(AutoPublishListingDocument, variables)(),
      options
    )};

useAutoPublishListingMutation.getKey = () => ['AutoPublishListing'];

export const AutoRecordContactAddedDocument = `
    mutation AutoRecordContactAdded($auth: AuthenticationInput, $contactEmail: String, $contactName: String, $customerId: UUID, $contactPhone: String, $workspaceId: UUID) {
  recordContactAdded(
    auth: $auth
    contactEmail: $contactEmail
    contactName: $contactName
    customerId: $customerId
    contactPhone: $contactPhone
    workspaceId: $workspaceId
  ) {
    actorSubject
    category
    customer {
      id
      displayName
      email
    }
    eventType
    id
    listingId
    noTime
    occurredAt
    opportunityId
    payload
    source
    summary
    transactionId
    workspaceId
  }
}
    `;

export const useAutoRecordContactAddedMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoRecordContactAddedMutation, TError, AutoRecordContactAddedMutationVariables, TContext>) => {
    
    return useMutation<AutoRecordContactAddedMutation, TError, AutoRecordContactAddedMutationVariables, TContext>(
      ['AutoRecordContactAdded'],
      (variables?: AutoRecordContactAddedMutationVariables) => fetcher<AutoRecordContactAddedMutation, AutoRecordContactAddedMutationVariables>(AutoRecordContactAddedDocument, variables)(),
      options
    )};

useAutoRecordContactAddedMutation.getKey = () => ['AutoRecordContactAdded'];

export const AutoRecordEmailSentDocument = `
    mutation AutoRecordEmailSent($auth: AuthenticationInput, $subject: String, $customerId: UUID, $to: String, $templateKey: String, $workspaceId: UUID) {
  recordEmailSent(
    auth: $auth
    subject: $subject
    customerId: $customerId
    to: $to
    templateKey: $templateKey
    workspaceId: $workspaceId
  ) {
    actorSubject
    category
    customer {
      id
      displayName
      email
    }
    eventType
    id
    listingId
    noTime
    occurredAt
    opportunityId
    payload
    source
    summary
    transactionId
    workspaceId
  }
}
    `;

export const useAutoRecordEmailSentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoRecordEmailSentMutation, TError, AutoRecordEmailSentMutationVariables, TContext>) => {
    
    return useMutation<AutoRecordEmailSentMutation, TError, AutoRecordEmailSentMutationVariables, TContext>(
      ['AutoRecordEmailSent'],
      (variables?: AutoRecordEmailSentMutationVariables) => fetcher<AutoRecordEmailSentMutation, AutoRecordEmailSentMutationVariables>(AutoRecordEmailSentDocument, variables)(),
      options
    )};

useAutoRecordEmailSentMutation.getKey = () => ['AutoRecordEmailSent'];

export const AutoRecordTaskCompletedDocument = `
    mutation AutoRecordTaskCompleted($auth: AuthenticationInput, $customerId: UUID, $taskTitle: String, $taskId: String, $workspaceId: UUID) {
  recordTaskCompleted(
    auth: $auth
    customerId: $customerId
    taskTitle: $taskTitle
    taskId: $taskId
    workspaceId: $workspaceId
  ) {
    actorSubject
    category
    customer {
      id
      displayName
      email
    }
    eventType
    id
    listingId
    noTime
    occurredAt
    opportunityId
    payload
    source
    summary
    transactionId
    workspaceId
  }
}
    `;

export const useAutoRecordTaskCompletedMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoRecordTaskCompletedMutation, TError, AutoRecordTaskCompletedMutationVariables, TContext>) => {
    
    return useMutation<AutoRecordTaskCompletedMutation, TError, AutoRecordTaskCompletedMutationVariables, TContext>(
      ['AutoRecordTaskCompleted'],
      (variables?: AutoRecordTaskCompletedMutationVariables) => fetcher<AutoRecordTaskCompletedMutation, AutoRecordTaskCompletedMutationVariables>(AutoRecordTaskCompletedDocument, variables)(),
      options
    )};

useAutoRecordTaskCompletedMutation.getKey = () => ['AutoRecordTaskCompleted'];

export const AutoRecordTransactionAcceptedDocument = `
    mutation AutoRecordTransactionAccepted($amount: String, $auth: AuthenticationInput, $customerId: UUID, $currency: String, $transactionId: UUID, $workspaceId: UUID) {
  recordTransactionAccepted(
    amount: $amount
    auth: $auth
    customerId: $customerId
    currency: $currency
    transactionId: $transactionId
    workspaceId: $workspaceId
  ) {
    actorSubject
    category
    customer {
      id
      displayName
      email
    }
    eventType
    id
    listingId
    noTime
    occurredAt
    opportunityId
    payload
    source
    summary
    transactionId
    workspaceId
  }
}
    `;

export const useAutoRecordTransactionAcceptedMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoRecordTransactionAcceptedMutation, TError, AutoRecordTransactionAcceptedMutationVariables, TContext>) => {
    
    return useMutation<AutoRecordTransactionAcceptedMutation, TError, AutoRecordTransactionAcceptedMutationVariables, TContext>(
      ['AutoRecordTransactionAccepted'],
      (variables?: AutoRecordTransactionAcceptedMutationVariables) => fetcher<AutoRecordTransactionAcceptedMutation, AutoRecordTransactionAcceptedMutationVariables>(AutoRecordTransactionAcceptedDocument, variables)(),
      options
    )};

useAutoRecordTransactionAcceptedMutation.getKey = () => ['AutoRecordTransactionAccepted'];

export const AutoUpdateCustomerStatusDocument = `
    mutation AutoUpdateCustomerStatus($input: UpdateCustomerStatusInputInput) {
  updateCustomerStatus(input: $input) {
    displayName
    email
    externalRef
    id
    normalizedName
    owner {
      id
      displayName
      email
    }
    phone
    status
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoUpdateCustomerStatusMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoUpdateCustomerStatusMutation, TError, AutoUpdateCustomerStatusMutationVariables, TContext>) => {
    
    return useMutation<AutoUpdateCustomerStatusMutation, TError, AutoUpdateCustomerStatusMutationVariables, TContext>(
      ['AutoUpdateCustomerStatus'],
      (variables?: AutoUpdateCustomerStatusMutationVariables) => fetcher<AutoUpdateCustomerStatusMutation, AutoUpdateCustomerStatusMutationVariables>(AutoUpdateCustomerStatusDocument, variables)(),
      options
    )};

useAutoUpdateCustomerStatusMutation.getKey = () => ['AutoUpdateCustomerStatus'];

export const AutoUpdateListingDocument = `
    mutation AutoUpdateListing($input: UpdateListingInputInput) {
  updateListing(input: $input) {
    askingPrice
    city
    cityNormalized
    customer {
      id
      displayName
      email
    }
    id
    status
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoUpdateListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoUpdateListingMutation, TError, AutoUpdateListingMutationVariables, TContext>) => {
    
    return useMutation<AutoUpdateListingMutation, TError, AutoUpdateListingMutationVariables, TContext>(
      ['AutoUpdateListing'],
      (variables?: AutoUpdateListingMutationVariables) => fetcher<AutoUpdateListingMutation, AutoUpdateListingMutationVariables>(AutoUpdateListingDocument, variables)(),
      options
    )};

useAutoUpdateListingMutation.getKey = () => ['AutoUpdateListing'];

export const AutoUpdateOpportunityDocument = `
    mutation AutoUpdateOpportunity($input: UpdateOpportunityInputInput) {
  updateOpportunity(input: $input) {
    amount
    customer {
      id
      displayName
      email
    }
    expectedCloseDate
    id
    owner {
      id
      displayName
      email
    }
    stage
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoUpdateOpportunityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AutoUpdateOpportunityMutation, TError, AutoUpdateOpportunityMutationVariables, TContext>) => {
    
    return useMutation<AutoUpdateOpportunityMutation, TError, AutoUpdateOpportunityMutationVariables, TContext>(
      ['AutoUpdateOpportunity'],
      (variables?: AutoUpdateOpportunityMutationVariables) => fetcher<AutoUpdateOpportunityMutation, AutoUpdateOpportunityMutationVariables>(AutoUpdateOpportunityDocument, variables)(),
      options
    )};

useAutoUpdateOpportunityMutation.getKey = () => ['AutoUpdateOpportunity'];

export const AutoCustomerTimelineDocument = `
    query AutoCustomerTimeline($filter: CustomerTimelineFilterInputInput, $size: Int!, $customerId: UUID, $page: Int!, $workspaceId: UUID) {
  customerTimeline(
    filter: $filter
    size: $size
    customerId: $customerId
    page: $page
    workspaceId: $workspaceId
  ) {
    items {
      id
    }
  }
}
    `;

export const useAutoCustomerTimelineQuery = <
      TData = AutoCustomerTimelineQuery,
      TError = unknown
    >(
      variables: AutoCustomerTimelineQueryVariables,
      options?: UseQueryOptions<AutoCustomerTimelineQuery, TError, TData>
    ) => {
    
    return useQuery<AutoCustomerTimelineQuery, TError, TData>(
      ['AutoCustomerTimeline', variables],
      fetcher<AutoCustomerTimelineQuery, AutoCustomerTimelineQueryVariables>(AutoCustomerTimelineDocument, variables),
      options
    )};

useAutoCustomerTimelineQuery.getKey = (variables: AutoCustomerTimelineQueryVariables) => ['AutoCustomerTimeline', variables];

export const AutoCustomersDocument = `
    query AutoCustomers($filter: CustomerFilterInputInput, $size: Int!, $page: Int!, $workspaceId: UUID) {
  customers(filter: $filter, size: $size, page: $page, workspaceId: $workspaceId) {
    items {
      id
      displayName
      email
    }
  }
}
    `;

export const useAutoCustomersQuery = <
      TData = AutoCustomersQuery,
      TError = unknown
    >(
      variables: AutoCustomersQueryVariables,
      options?: UseQueryOptions<AutoCustomersQuery, TError, TData>
    ) => {
    
    return useQuery<AutoCustomersQuery, TError, TData>(
      ['AutoCustomers', variables],
      fetcher<AutoCustomersQuery, AutoCustomersQueryVariables>(AutoCustomersDocument, variables),
      options
    )};

useAutoCustomersQuery.getKey = (variables: AutoCustomersQueryVariables) => ['AutoCustomers', variables];

export const AutoListingDocument = `
    query AutoListing($listingId: UUID, $workspaceId: UUID) {
  listing(listingId: $listingId, workspaceId: $workspaceId) {
    askingPrice
    city
    cityNormalized
    customer {
      id
      displayName
      email
    }
    id
    status
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoListingQuery = <
      TData = AutoListingQuery,
      TError = unknown
    >(
      variables?: AutoListingQueryVariables,
      options?: UseQueryOptions<AutoListingQuery, TError, TData>
    ) => {
    
    return useQuery<AutoListingQuery, TError, TData>(
      variables === undefined ? ['AutoListing'] : ['AutoListing', variables],
      fetcher<AutoListingQuery, AutoListingQueryVariables>(AutoListingDocument, variables),
      options
    )};

useAutoListingQuery.getKey = (variables?: AutoListingQueryVariables) => variables === undefined ? ['AutoListing'] : ['AutoListing', variables];

export const AutoListingsDocument = `
    query AutoListings($filter: ListingFilterInputInput, $size: Int!, $page: Int!, $workspaceId: UUID) {
  listings(filter: $filter, size: $size, page: $page, workspaceId: $workspaceId) {
    items {
      id
      title
      status
    }
  }
}
    `;

export const useAutoListingsQuery = <
      TData = AutoListingsQuery,
      TError = unknown
    >(
      variables: AutoListingsQueryVariables,
      options?: UseQueryOptions<AutoListingsQuery, TError, TData>
    ) => {
    
    return useQuery<AutoListingsQuery, TError, TData>(
      ['AutoListings', variables],
      fetcher<AutoListingsQuery, AutoListingsQueryVariables>(AutoListingsDocument, variables),
      options
    )};

useAutoListingsQuery.getKey = (variables: AutoListingsQueryVariables) => ['AutoListings', variables];

export const AutoOpportunitiesDocument = `
    query AutoOpportunities($filter: OpportunityFilterInputInput, $size: Int!, $page: Int!, $workspaceId: UUID) {
  opportunities(
    filter: $filter
    size: $size
    page: $page
    workspaceId: $workspaceId
  ) {
    content {
      id
      title
      stage
    }
    first
    hasContent
    hasNext
    hasPrevious
    last
    number
    numberOfElements
    size
    totalElements
    totalPages
  }
}
    `;

export const useAutoOpportunitiesQuery = <
      TData = AutoOpportunitiesQuery,
      TError = unknown
    >(
      variables: AutoOpportunitiesQueryVariables,
      options?: UseQueryOptions<AutoOpportunitiesQuery, TError, TData>
    ) => {
    
    return useQuery<AutoOpportunitiesQuery, TError, TData>(
      ['AutoOpportunities', variables],
      fetcher<AutoOpportunitiesQuery, AutoOpportunitiesQueryVariables>(AutoOpportunitiesDocument, variables),
      options
    )};

useAutoOpportunitiesQuery.getKey = (variables: AutoOpportunitiesQueryVariables) => ['AutoOpportunities', variables];

export const AutoOpportunityDocument = `
    query AutoOpportunity($opportunityId: UUID, $workspaceId: UUID) {
  opportunity(opportunityId: $opportunityId, workspaceId: $workspaceId) {
    amount
    customer {
      id
      displayName
      email
    }
    expectedCloseDate
    id
    owner {
      id
      displayName
      email
    }
    stage
    title
    workspace {
      id
      displayName
      status
    }
  }
}
    `;

export const useAutoOpportunityQuery = <
      TData = AutoOpportunityQuery,
      TError = unknown
    >(
      variables?: AutoOpportunityQueryVariables,
      options?: UseQueryOptions<AutoOpportunityQuery, TError, TData>
    ) => {
    
    return useQuery<AutoOpportunityQuery, TError, TData>(
      variables === undefined ? ['AutoOpportunity'] : ['AutoOpportunity', variables],
      fetcher<AutoOpportunityQuery, AutoOpportunityQueryVariables>(AutoOpportunityDocument, variables),
      options
    )};

useAutoOpportunityQuery.getKey = (variables?: AutoOpportunityQueryVariables) => variables === undefined ? ['AutoOpportunity'] : ['AutoOpportunity', variables];

export const AddCustomerNoteDocument = `
    mutation AddCustomerNote($workspaceId: UUID!, $customerId: UUID!, $note: String!) {
  addCustomerNote(workspaceId: $workspaceId, customerId: $customerId, note: $note) {
    id
    eventType
    occurredAt
    summary
    payload
  }
}
    `;

export const useAddCustomerNoteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddCustomerNoteMutation, TError, AddCustomerNoteMutationVariables, TContext>) => {
    
    return useMutation<AddCustomerNoteMutation, TError, AddCustomerNoteMutationVariables, TContext>(
      ['AddCustomerNote'],
      (variables?: AddCustomerNoteMutationVariables) => fetcher<AddCustomerNoteMutation, AddCustomerNoteMutationVariables>(AddCustomerNoteDocument, variables)(),
      options
    )};

useAddCustomerNoteMutation.getKey = () => ['AddCustomerNote'];

export const AppendCustomerEventDocument = `
    mutation AppendCustomerEvent($input: AppendCustomerEventInputInput!) {
  appendCustomerEvent(input: $input) {
    id
    eventType
    category
    source
    occurredAt
    summary
    payload
  }
}
    `;

export const useAppendCustomerEventMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AppendCustomerEventMutation, TError, AppendCustomerEventMutationVariables, TContext>) => {
    
    return useMutation<AppendCustomerEventMutation, TError, AppendCustomerEventMutationVariables, TContext>(
      ['AppendCustomerEvent'],
      (variables?: AppendCustomerEventMutationVariables) => fetcher<AppendCustomerEventMutation, AppendCustomerEventMutationVariables>(AppendCustomerEventDocument, variables)(),
      options
    )};

useAppendCustomerEventMutation.getKey = () => ['AppendCustomerEvent'];

export const CreateCustomerDocument = `
    mutation CreateCustomer($input: CreateCustomerInputInput!) {
  createCustomer(input: $input) {
    ...CustomerFields
  }
}
    ${CustomerFieldsFragmentDoc}`;

export const useCreateCustomerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCustomerMutation, TError, CreateCustomerMutationVariables, TContext>) => {
    
    return useMutation<CreateCustomerMutation, TError, CreateCustomerMutationVariables, TContext>(
      ['CreateCustomer'],
      (variables?: CreateCustomerMutationVariables) => fetcher<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, variables)(),
      options
    )};

useCreateCustomerMutation.getKey = () => ['CreateCustomer'];

export const CustomerTimelineDocument = `
    query CustomerTimeline($workspaceId: UUID!, $customerId: UUID!, $filter: CustomerTimelineFilterInputInput, $page: Int!, $size: Int!) {
  customerTimeline(
    workspaceId: $workspaceId
    customerId: $customerId
    filter: $filter
    page: $page
    size: $size
  ) {
    items {
      id
      eventType
      category
      source
      occurredAt
      actorSubject
      summary
      payload
    }
    pageInfo {
      ...PageInfoFields
    }
  }
}
    ${PageInfoFieldsFragmentDoc}`;

export const useCustomerTimelineQuery = <
      TData = CustomerTimelineQuery,
      TError = unknown
    >(
      variables: CustomerTimelineQueryVariables,
      options?: UseQueryOptions<CustomerTimelineQuery, TError, TData>
    ) => {
    
    return useQuery<CustomerTimelineQuery, TError, TData>(
      ['CustomerTimeline', variables],
      fetcher<CustomerTimelineQuery, CustomerTimelineQueryVariables>(CustomerTimelineDocument, variables),
      options
    )};

useCustomerTimelineQuery.getKey = (variables: CustomerTimelineQueryVariables) => ['CustomerTimeline', variables];

export const CustomersDocument = `
    query Customers($workspaceId: UUID!, $filter: CustomerFilterInputInput, $page: Int!, $size: Int!) {
  customers(workspaceId: $workspaceId, filter: $filter, page: $page, size: $size) {
    items {
      ...CustomerFields
    }
    pageInfo {
      ...PageInfoFields
    }
  }
}
    ${CustomerFieldsFragmentDoc}
${PageInfoFieldsFragmentDoc}`;

export const useCustomersQuery = <
      TData = CustomersQuery,
      TError = unknown
    >(
      variables: CustomersQueryVariables,
      options?: UseQueryOptions<CustomersQuery, TError, TData>
    ) => {
    
    return useQuery<CustomersQuery, TError, TData>(
      ['Customers', variables],
      fetcher<CustomersQuery, CustomersQueryVariables>(CustomersDocument, variables),
      options
    )};

useCustomersQuery.getKey = (variables: CustomersQueryVariables) => ['Customers', variables];

export const ListingsDocument = `
    query Listings($workspaceId: UUID!, $filter: ListingFilterInputInput, $page: Int!, $size: Int!) {
  listings(workspaceId: $workspaceId, filter: $filter, page: $page, size: $size) {
    items {
      ...ListingFields
    }
    pageInfo {
      ...PageInfoFields
    }
  }
}
    ${ListingFieldsFragmentDoc}
${PageInfoFieldsFragmentDoc}`;

export const useListingsQuery = <
      TData = ListingsQuery,
      TError = unknown
    >(
      variables: ListingsQueryVariables,
      options?: UseQueryOptions<ListingsQuery, TError, TData>
    ) => {
    
    return useQuery<ListingsQuery, TError, TData>(
      ['Listings', variables],
      fetcher<ListingsQuery, ListingsQueryVariables>(ListingsDocument, variables),
      options
    )};

useListingsQuery.getKey = (variables: ListingsQueryVariables) => ['Listings', variables];

export const CreateListingDocument = `
    mutation CreateListing($input: CreateListingInputInput!) {
  createListing(input: $input) {
    ...ListingFields
  }
}
    ${ListingFieldsFragmentDoc}`;

export const useCreateListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateListingMutation, TError, CreateListingMutationVariables, TContext>) => {
    
    return useMutation<CreateListingMutation, TError, CreateListingMutationVariables, TContext>(
      ['CreateListing'],
      (variables?: CreateListingMutationVariables) => fetcher<CreateListingMutation, CreateListingMutationVariables>(CreateListingDocument, variables)(),
      options
    )};

useCreateListingMutation.getKey = () => ['CreateListing'];

export const UpdateListingDocument = `
    mutation UpdateListing($input: UpdateListingInputInput!) {
  updateListing(input: $input) {
    ...ListingFields
  }
}
    ${ListingFieldsFragmentDoc}`;

export const useUpdateListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateListingMutation, TError, UpdateListingMutationVariables, TContext>) => {
    
    return useMutation<UpdateListingMutation, TError, UpdateListingMutationVariables, TContext>(
      ['UpdateListing'],
      (variables?: UpdateListingMutationVariables) => fetcher<UpdateListingMutation, UpdateListingMutationVariables>(UpdateListingDocument, variables)(),
      options
    )};

useUpdateListingMutation.getKey = () => ['UpdateListing'];

export const PublishListingDocument = `
    mutation PublishListing($input: PublishListingInputInput!) {
  publishListing(input: $input) {
    id
    status
  }
}
    `;

export const usePublishListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PublishListingMutation, TError, PublishListingMutationVariables, TContext>) => {
    
    return useMutation<PublishListingMutation, TError, PublishListingMutationVariables, TContext>(
      ['PublishListing'],
      (variables?: PublishListingMutationVariables) => fetcher<PublishListingMutation, PublishListingMutationVariables>(PublishListingDocument, variables)(),
      options
    )};

usePublishListingMutation.getKey = () => ['PublishListing'];

export const DeleteListingDocument = `
    mutation DeleteListing($input: DeleteListingInputInput!) {
  deleteListing(input: $input) {
    id
    status
  }
}
    `;

export const useDeleteListingMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteListingMutation, TError, DeleteListingMutationVariables, TContext>) => {
    
    return useMutation<DeleteListingMutation, TError, DeleteListingMutationVariables, TContext>(
      ['DeleteListing'],
      (variables?: DeleteListingMutationVariables) => fetcher<DeleteListingMutation, DeleteListingMutationVariables>(DeleteListingDocument, variables)(),
      options
    )};

useDeleteListingMutation.getKey = () => ['DeleteListing'];

export const OpportunitiesDocument = `
    query Opportunities($workspaceId: UUID!, $filter: OpportunityFilterInputInput, $page: Int!, $size: Int!) {
  opportunities(
    workspaceId: $workspaceId
    filter: $filter
    page: $page
    size: $size
  ) {
    content {
      id
      title
      amount
      stage
      expectedCloseDate
      customer {
        id
        displayName
      }
      owner {
        id
        displayName
      }
    }
    number
    size
    totalElements
    totalPages
  }
}
    `;

export const useOpportunitiesQuery = <
      TData = OpportunitiesQuery,
      TError = unknown
    >(
      variables: OpportunitiesQueryVariables,
      options?: UseQueryOptions<OpportunitiesQuery, TError, TData>
    ) => {
    
    return useQuery<OpportunitiesQuery, TError, TData>(
      ['Opportunities', variables],
      fetcher<OpportunitiesQuery, OpportunitiesQueryVariables>(OpportunitiesDocument, variables),
      options
    )};

useOpportunitiesQuery.getKey = (variables: OpportunitiesQueryVariables) => ['Opportunities', variables];

export const CreateOpportunityDocument = `
    mutation CreateOpportunity($input: CreateOpportunityInputInput!) {
  createOpportunity(input: $input) {
    id
    title
    amount
    stage
    expectedCloseDate
    customer {
      id
      displayName
    }
    owner {
      id
      displayName
    }
  }
}
    `;

export const useCreateOpportunityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateOpportunityMutation, TError, CreateOpportunityMutationVariables, TContext>) => {
    
    return useMutation<CreateOpportunityMutation, TError, CreateOpportunityMutationVariables, TContext>(
      ['CreateOpportunity'],
      (variables?: CreateOpportunityMutationVariables) => fetcher<CreateOpportunityMutation, CreateOpportunityMutationVariables>(CreateOpportunityDocument, variables)(),
      options
    )};

useCreateOpportunityMutation.getKey = () => ['CreateOpportunity'];

export const UpdateOpportunityDocument = `
    mutation UpdateOpportunity($input: UpdateOpportunityInputInput!) {
  updateOpportunity(input: $input) {
    id
    title
    amount
    stage
    expectedCloseDate
    customer {
      id
      displayName
    }
    owner {
      id
      displayName
    }
  }
}
    `;

export const useUpdateOpportunityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateOpportunityMutation, TError, UpdateOpportunityMutationVariables, TContext>) => {
    
    return useMutation<UpdateOpportunityMutation, TError, UpdateOpportunityMutationVariables, TContext>(
      ['UpdateOpportunity'],
      (variables?: UpdateOpportunityMutationVariables) => fetcher<UpdateOpportunityMutation, UpdateOpportunityMutationVariables>(UpdateOpportunityDocument, variables)(),
      options
    )};

useUpdateOpportunityMutation.getKey = () => ['UpdateOpportunity'];

export const MoveOpportunityStageDocument = `
    mutation MoveOpportunityStage($input: MoveOpportunityStageInputInput!) {
  moveOpportunityStage(input: $input) {
    id
    stage
  }
}
    `;

export const useMoveOpportunityStageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<MoveOpportunityStageMutation, TError, MoveOpportunityStageMutationVariables, TContext>) => {
    
    return useMutation<MoveOpportunityStageMutation, TError, MoveOpportunityStageMutationVariables, TContext>(
      ['MoveOpportunityStage'],
      (variables?: MoveOpportunityStageMutationVariables) => fetcher<MoveOpportunityStageMutation, MoveOpportunityStageMutationVariables>(MoveOpportunityStageDocument, variables)(),
      options
    )};

useMoveOpportunityStageMutation.getKey = () => ['MoveOpportunityStage'];

export const DeleteOpportunityDocument = `
    mutation DeleteOpportunity($input: DeleteOpportunityInputInput!) {
  deleteOpportunity(input: $input) {
    id
    stage
  }
}
    `;

export const useDeleteOpportunityMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteOpportunityMutation, TError, DeleteOpportunityMutationVariables, TContext>) => {
    
    return useMutation<DeleteOpportunityMutation, TError, DeleteOpportunityMutationVariables, TContext>(
      ['DeleteOpportunity'],
      (variables?: DeleteOpportunityMutationVariables) => fetcher<DeleteOpportunityMutation, DeleteOpportunityMutationVariables>(DeleteOpportunityDocument, variables)(),
      options
    )};

useDeleteOpportunityMutation.getKey = () => ['DeleteOpportunity'];
