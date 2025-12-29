import { GetUserData, GetUserVariables, ListGameNightsData, GetInvitationsData, GetInvitationsVariables, CreateUserData, CreateUserVariables, CreateGameNightData, CreateGameNightVariables, SuggestGameData, SuggestGameVariables, ProposeGameForNightData, ProposeGameForNightVariables, InviteUserData, InviteUserVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useGetUser(vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;
export function useGetUser(dc: DataConnect, vars: GetUserVariables, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, GetUserVariables>;

export function useListGameNights(options?: useDataConnectQueryOptions<ListGameNightsData>): UseDataConnectQueryResult<ListGameNightsData, undefined>;
export function useListGameNights(dc: DataConnect, options?: useDataConnectQueryOptions<ListGameNightsData>): UseDataConnectQueryResult<ListGameNightsData, undefined>;

export function useGetInvitations(vars: GetInvitationsVariables, options?: useDataConnectQueryOptions<GetInvitationsData>): UseDataConnectQueryResult<GetInvitationsData, GetInvitationsVariables>;
export function useGetInvitations(dc: DataConnect, vars: GetInvitationsVariables, options?: useDataConnectQueryOptions<GetInvitationsData>): UseDataConnectQueryResult<GetInvitationsData, GetInvitationsVariables>;

export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useCreateGameNight(options?: useDataConnectMutationOptions<CreateGameNightData, FirebaseError, CreateGameNightVariables>): UseDataConnectMutationResult<CreateGameNightData, CreateGameNightVariables>;
export function useCreateGameNight(dc: DataConnect, options?: useDataConnectMutationOptions<CreateGameNightData, FirebaseError, CreateGameNightVariables>): UseDataConnectMutationResult<CreateGameNightData, CreateGameNightVariables>;

export function useSuggestGame(options?: useDataConnectMutationOptions<SuggestGameData, FirebaseError, SuggestGameVariables>): UseDataConnectMutationResult<SuggestGameData, SuggestGameVariables>;
export function useSuggestGame(dc: DataConnect, options?: useDataConnectMutationOptions<SuggestGameData, FirebaseError, SuggestGameVariables>): UseDataConnectMutationResult<SuggestGameData, SuggestGameVariables>;

export function useProposeGameForNight(options?: useDataConnectMutationOptions<ProposeGameForNightData, FirebaseError, ProposeGameForNightVariables>): UseDataConnectMutationResult<ProposeGameForNightData, ProposeGameForNightVariables>;
export function useProposeGameForNight(dc: DataConnect, options?: useDataConnectMutationOptions<ProposeGameForNightData, FirebaseError, ProposeGameForNightVariables>): UseDataConnectMutationResult<ProposeGameForNightData, ProposeGameForNightVariables>;

export function useInviteUser(options?: useDataConnectMutationOptions<InviteUserData, FirebaseError, InviteUserVariables>): UseDataConnectMutationResult<InviteUserData, InviteUserVariables>;
export function useInviteUser(dc: DataConnect, options?: useDataConnectMutationOptions<InviteUserData, FirebaseError, InviteUserVariables>): UseDataConnectMutationResult<InviteUserData, InviteUserVariables>;
