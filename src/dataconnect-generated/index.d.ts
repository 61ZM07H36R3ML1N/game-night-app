import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateGameNightData {
  gameNight_insert: GameNight_Key;
}

export interface CreateGameNightVariables {
  id: UUIDString;
  name: string;
  date: DateString;
  creatorId: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  uid: string;
  username: string;
  email?: string | null;
}

export interface GameNightInvitation_Key {
  id: UUIDString;
  __typename?: 'GameNightInvitation_Key';
}

export interface GameNightProposal_Key {
  gameNightId: UUIDString;
  suggestionId: UUIDString;
  __typename?: 'GameNightProposal_Key';
}

export interface GameNight_Key {
  id: UUIDString;
  __typename?: 'GameNight_Key';
}

export interface GameSuggestion_Key {
  id: UUIDString;
  __typename?: 'GameSuggestion_Key';
}

export interface GetInvitationsData {
  gameNightInvitations: ({
    id: UUIDString;
    status: string;
    user: {
      username: string;
      email?: string | null;
    };
  } & GameNightInvitation_Key)[];
}

export interface GetInvitationsVariables {
  gameNightId: UUIDString;
}

export interface GetUserData {
  user?: {
    id: string;
    username: string;
    email?: string | null;
  } & User_Key;
}

export interface GetUserVariables {
  uid: string;
}

export interface InviteUserData {
  gameNightInvitation_insert: GameNightInvitation_Key;
}

export interface InviteUserVariables {
  id: UUIDString;
  gameNightId: UUIDString;
  userId: string;
}

export interface ListGameNightsData {
  gameNights: ({
    id: UUIDString;
    name: string;
    eventDate: DateString;
    eventTime?: string | null;
    isFinalized?: boolean | null;
    creator: {
      username: string;
    };
  } & GameNight_Key)[];
}

export interface ProposeGameForNightData {
  gameNightProposal_insert: GameNightProposal_Key;
}

export interface ProposeGameForNightVariables {
  gameNightId: UUIDString;
  suggestionId: UUIDString;
}

export interface SuggestGameData {
  gameSuggestion_insert: GameSuggestion_Key;
}

export interface SuggestGameVariables {
  id: UUIDString;
  title: string;
  userId: string;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface ListGameNightsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGameNightsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGameNightsData, undefined>;
  operationName: string;
}
export const listGameNightsRef: ListGameNightsRef;

export function listGameNights(): QueryPromise<ListGameNightsData, undefined>;
export function listGameNights(dc: DataConnect): QueryPromise<ListGameNightsData, undefined>;

interface GetInvitationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInvitationsVariables): QueryRef<GetInvitationsData, GetInvitationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetInvitationsVariables): QueryRef<GetInvitationsData, GetInvitationsVariables>;
  operationName: string;
}
export const getInvitationsRef: GetInvitationsRef;

export function getInvitations(vars: GetInvitationsVariables): QueryPromise<GetInvitationsData, GetInvitationsVariables>;
export function getInvitations(dc: DataConnect, vars: GetInvitationsVariables): QueryPromise<GetInvitationsData, GetInvitationsVariables>;

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateGameNightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGameNightVariables): MutationRef<CreateGameNightData, CreateGameNightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGameNightVariables): MutationRef<CreateGameNightData, CreateGameNightVariables>;
  operationName: string;
}
export const createGameNightRef: CreateGameNightRef;

export function createGameNight(vars: CreateGameNightVariables): MutationPromise<CreateGameNightData, CreateGameNightVariables>;
export function createGameNight(dc: DataConnect, vars: CreateGameNightVariables): MutationPromise<CreateGameNightData, CreateGameNightVariables>;

interface SuggestGameRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SuggestGameVariables): MutationRef<SuggestGameData, SuggestGameVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SuggestGameVariables): MutationRef<SuggestGameData, SuggestGameVariables>;
  operationName: string;
}
export const suggestGameRef: SuggestGameRef;

export function suggestGame(vars: SuggestGameVariables): MutationPromise<SuggestGameData, SuggestGameVariables>;
export function suggestGame(dc: DataConnect, vars: SuggestGameVariables): MutationPromise<SuggestGameData, SuggestGameVariables>;

interface ProposeGameForNightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProposeGameForNightVariables): MutationRef<ProposeGameForNightData, ProposeGameForNightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ProposeGameForNightVariables): MutationRef<ProposeGameForNightData, ProposeGameForNightVariables>;
  operationName: string;
}
export const proposeGameForNightRef: ProposeGameForNightRef;

export function proposeGameForNight(vars: ProposeGameForNightVariables): MutationPromise<ProposeGameForNightData, ProposeGameForNightVariables>;
export function proposeGameForNight(dc: DataConnect, vars: ProposeGameForNightVariables): MutationPromise<ProposeGameForNightData, ProposeGameForNightVariables>;

interface InviteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InviteUserVariables): MutationRef<InviteUserData, InviteUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InviteUserVariables): MutationRef<InviteUserData, InviteUserVariables>;
  operationName: string;
}
export const inviteUserRef: InviteUserRef;

export function inviteUser(vars: InviteUserVariables): MutationPromise<InviteUserData, InviteUserVariables>;
export function inviteUser(dc: DataConnect, vars: InviteUserVariables): MutationPromise<InviteUserData, InviteUserVariables>;

