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
  name: string;
  description?: string | null;
  eventDate: DateString;
  eventTime?: string | null;
  isFinalized?: boolean | null;
}

export interface FoodItem_Key {
  id: UUIDString;
  __typename?: 'FoodItem_Key';
}

export interface GameNightInvitation_Key {
  gameNightId: UUIDString;
  inviteeId: UUIDString;
  __typename?: 'GameNightInvitation_Key';
}

export interface GameNightProposal_Key {
  id: UUIDString;
  __typename?: 'GameNightProposal_Key';
}

export interface GameNight_Key {
  id: UUIDString;
  __typename?: 'GameNight_Key';
}

export interface Game_Key {
  id: UUIDString;
  __typename?: 'Game_Key';
}

export interface GetGameNightDetailsData {
  gameNight?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    eventDate: DateString;
    eventTime?: string | null;
    isFinalized?: boolean | null;
    creator: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
      gameNightInvitations_on_gameNight: ({
        invitee: {
          id: UUIDString;
          displayName: string;
        } & User_Key;
          status?: string | null;
      })[];
        gameNightProposals_on_gameNight: ({
          id: UUIDString;
          type: string;
          game?: {
            id: UUIDString;
            title: string;
          } & Game_Key;
            foodItem?: {
              id: UUIDString;
              name: string;
            } & FoodItem_Key;
              votes_on_gameNightProposal: ({
                user: {
                  id: UUIDString;
                  displayName: string;
                } & User_Key;
              })[];
        } & GameNightProposal_Key)[];
  } & GameNight_Key;
}

export interface GetGameNightDetailsVariables {
  gameNightId: UUIDString;
}

export interface InviteToGameNightData {
  gameNightInvitation_insert: GameNightInvitation_Key;
}

export interface InviteToGameNightVariables {
  gameNightId: UUIDString;
  inviteeId: UUIDString;
}

export interface ListUpcomingGameNightsData {
  gameNights: ({
    id: UUIDString;
    name: string;
    eventDate: DateString;
    eventTime?: string | null;
    description?: string | null;
  } & GameNight_Key)[];
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Vote_Key {
  id: UUIDString;
  __typename?: 'Vote_Key';
}

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

interface ListUpcomingGameNightsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUpcomingGameNightsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUpcomingGameNightsData, undefined>;
  operationName: string;
}
export const listUpcomingGameNightsRef: ListUpcomingGameNightsRef;

export function listUpcomingGameNights(): QueryPromise<ListUpcomingGameNightsData, undefined>;
export function listUpcomingGameNights(dc: DataConnect): QueryPromise<ListUpcomingGameNightsData, undefined>;

interface InviteToGameNightRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InviteToGameNightVariables): MutationRef<InviteToGameNightData, InviteToGameNightVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InviteToGameNightVariables): MutationRef<InviteToGameNightData, InviteToGameNightVariables>;
  operationName: string;
}
export const inviteToGameNightRef: InviteToGameNightRef;

export function inviteToGameNight(vars: InviteToGameNightVariables): MutationPromise<InviteToGameNightData, InviteToGameNightVariables>;
export function inviteToGameNight(dc: DataConnect, vars: InviteToGameNightVariables): MutationPromise<InviteToGameNightData, InviteToGameNightVariables>;

interface GetGameNightDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGameNightDetailsVariables): QueryRef<GetGameNightDetailsData, GetGameNightDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGameNightDetailsVariables): QueryRef<GetGameNightDetailsData, GetGameNightDetailsVariables>;
  operationName: string;
}
export const getGameNightDetailsRef: GetGameNightDetailsRef;

export function getGameNightDetails(vars: GetGameNightDetailsVariables): QueryPromise<GetGameNightDetailsData, GetGameNightDetailsVariables>;
export function getGameNightDetails(dc: DataConnect, vars: GetGameNightDetailsVariables): QueryPromise<GetGameNightDetailsData, GetGameNightDetailsVariables>;

