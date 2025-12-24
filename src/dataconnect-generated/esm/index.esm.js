import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'game-night-app',
  location: 'us-east4'
};

export const createGameNightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGameNight', inputVars);
}
createGameNightRef.operationName = 'CreateGameNight';

export function createGameNight(dcOrVars, vars) {
  return executeMutation(createGameNightRef(dcOrVars, vars));
}

export const listUpcomingGameNightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUpcomingGameNights');
}
listUpcomingGameNightsRef.operationName = 'ListUpcomingGameNights';

export function listUpcomingGameNights(dc) {
  return executeQuery(listUpcomingGameNightsRef(dc));
}

export const inviteToGameNightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InviteToGameNight', inputVars);
}
inviteToGameNightRef.operationName = 'InviteToGameNight';

export function inviteToGameNight(dcOrVars, vars) {
  return executeMutation(inviteToGameNightRef(dcOrVars, vars));
}

export const getGameNightDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGameNightDetails', inputVars);
}
getGameNightDetailsRef.operationName = 'GetGameNightDetails';

export function getGameNightDetails(dcOrVars, vars) {
  return executeQuery(getGameNightDetailsRef(dcOrVars, vars));
}

