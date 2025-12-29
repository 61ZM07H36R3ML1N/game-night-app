const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'game-night-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const getUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser', inputVars);
}
getUserRef.operationName = 'GetUser';
exports.getUserRef = getUserRef;

exports.getUser = function getUser(dcOrVars, vars) {
  return executeQuery(getUserRef(dcOrVars, vars));
};

const listGameNightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGameNights');
}
listGameNightsRef.operationName = 'ListGameNights';
exports.listGameNightsRef = listGameNightsRef;

exports.listGameNights = function listGameNights(dc) {
  return executeQuery(listGameNightsRef(dc));
};

const getInvitationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInvitations', inputVars);
}
getInvitationsRef.operationName = 'GetInvitations';
exports.getInvitationsRef = getInvitationsRef;

exports.getInvitations = function getInvitations(dcOrVars, vars) {
  return executeQuery(getInvitationsRef(dcOrVars, vars));
};

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const createGameNightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGameNight', inputVars);
}
createGameNightRef.operationName = 'CreateGameNight';
exports.createGameNightRef = createGameNightRef;

exports.createGameNight = function createGameNight(dcOrVars, vars) {
  return executeMutation(createGameNightRef(dcOrVars, vars));
};

const suggestGameRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SuggestGame', inputVars);
}
suggestGameRef.operationName = 'SuggestGame';
exports.suggestGameRef = suggestGameRef;

exports.suggestGame = function suggestGame(dcOrVars, vars) {
  return executeMutation(suggestGameRef(dcOrVars, vars));
};

const proposeGameForNightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProposeGameForNight', inputVars);
}
proposeGameForNightRef.operationName = 'ProposeGameForNight';
exports.proposeGameForNightRef = proposeGameForNightRef;

exports.proposeGameForNight = function proposeGameForNight(dcOrVars, vars) {
  return executeMutation(proposeGameForNightRef(dcOrVars, vars));
};

const inviteUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InviteUser', inputVars);
}
inviteUserRef.operationName = 'InviteUser';
exports.inviteUserRef = inviteUserRef;

exports.inviteUser = function inviteUser(dcOrVars, vars) {
  return executeMutation(inviteUserRef(dcOrVars, vars));
};
