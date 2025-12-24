import { CreateGameNightData, CreateGameNightVariables, ListUpcomingGameNightsData, InviteToGameNightData, InviteToGameNightVariables, GetGameNightDetailsData, GetGameNightDetailsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateGameNight(options?: useDataConnectMutationOptions<CreateGameNightData, FirebaseError, CreateGameNightVariables>): UseDataConnectMutationResult<CreateGameNightData, CreateGameNightVariables>;
export function useCreateGameNight(dc: DataConnect, options?: useDataConnectMutationOptions<CreateGameNightData, FirebaseError, CreateGameNightVariables>): UseDataConnectMutationResult<CreateGameNightData, CreateGameNightVariables>;

export function useListUpcomingGameNights(options?: useDataConnectQueryOptions<ListUpcomingGameNightsData>): UseDataConnectQueryResult<ListUpcomingGameNightsData, undefined>;
export function useListUpcomingGameNights(dc: DataConnect, options?: useDataConnectQueryOptions<ListUpcomingGameNightsData>): UseDataConnectQueryResult<ListUpcomingGameNightsData, undefined>;

export function useInviteToGameNight(options?: useDataConnectMutationOptions<InviteToGameNightData, FirebaseError, InviteToGameNightVariables>): UseDataConnectMutationResult<InviteToGameNightData, InviteToGameNightVariables>;
export function useInviteToGameNight(dc: DataConnect, options?: useDataConnectMutationOptions<InviteToGameNightData, FirebaseError, InviteToGameNightVariables>): UseDataConnectMutationResult<InviteToGameNightData, InviteToGameNightVariables>;

export function useGetGameNightDetails(vars: GetGameNightDetailsVariables, options?: useDataConnectQueryOptions<GetGameNightDetailsData>): UseDataConnectQueryResult<GetGameNightDetailsData, GetGameNightDetailsVariables>;
export function useGetGameNightDetails(dc: DataConnect, vars: GetGameNightDetailsVariables, options?: useDataConnectQueryOptions<GetGameNightDetailsData>): UseDataConnectQueryResult<GetGameNightDetailsData, GetGameNightDetailsVariables>;
