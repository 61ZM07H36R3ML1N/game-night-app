const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'game-night-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

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

const listUpcomingGameNightsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUpcomingGameNights');
}
listUpcomingGameNightsRef.operationName = 'ListUpcomingGameNights';
exports.listUpcomingGameNightsRef = listUpcomingGameNightsRef;

exports.listUpcomingGameNights = function listUpcomingGameNights(dc) {
  return executeQuery(listUpcomingGameNightsRef(dc));
};

const inviteToGameNightRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InviteToGameNight', inputVars);
}
inviteToGameNightRef.operationName = 'InviteToGameNight';
exports.inviteToGameNightRef = inviteToGameNightRef;

exports.inviteToGameNight = function inviteToGameNight(dcOrVars, vars) {
  return executeMutation(inviteToGameNightRef(dcOrVars, vars));
};

const getGameNightDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGameNightDetails', inputVars);
}
getGameNightDetailsRef.operationName = 'GetGameNightDetails';
exports.getGameNightDetailsRef = getGameNightDetailsRef;

exports.getGameNightDetails = function getGameNightDetails(dcOrVars, vars) {
  return executeQuery(getGameNightDetailsRef(dcOrVars, vars));
};
