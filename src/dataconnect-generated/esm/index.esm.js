import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'game-night-app',
  location: 'us-east4'
};

export const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser', inputVars);
}
getUserRef.operationName = 'GetUser';

export function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
}

export const listGameNightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGameNights');
}
listGameNightsRef.operationName = 'ListGameNights';

export function listGameNights(dc) {
  return executeQuery(listGameNightsRef(dc));
}

export const getInvitationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInvitations', inputVars);
}
getInvitationsRef.operationName = 'GetInvitations';

export function getInvitations(dcOrVars, vars) {
  return executeQuery(getInvitationsRef(dcOrVars, vars));
}

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const createGameNightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGameNight', inputVars);
}
createGameNightRef.operationName = 'CreateGameNight';

export function createGameNight(dcOrVars, vars) {
  return executeMutation(createGameNightRef(dcOrVars, vars));
}

export const suggestGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SuggestGame', inputVars);
}
suggestGameRef.operationName = 'SuggestGame';

export function suggestGame(dcOrVars, vars) {
  return executeMutation(suggestGameRef(dcOrVars, vars));
}

export const proposeGameForNightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProposeGameForNight', inputVars);
}
proposeGameForNightRef.operationName = 'ProposeGameForNight';

export function proposeGameForNight(dcOrVars, vars) {
  return executeMutation(proposeGameForNightRef(dcOrVars, vars));
}

export const inviteUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InviteUser', inputVars);
}
inviteUserRef.operationName = 'InviteUser';

export function inviteUser(dcOrVars, vars) {
  return executeMutation(inviteUserRef(dcOrVars, vars));
}

