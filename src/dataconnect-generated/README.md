# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListUpcomingGameNights*](#listupcominggamenights)
  - [*GetGameNightDetails*](#getgamenightdetails)
- [**Mutations**](#mutations)
  - [*CreateGameNight*](#creategamenight)
  - [*InviteToGameNight*](#invitetogamenight)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListUpcomingGameNights
You can execute the `ListUpcomingGameNights` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUpcomingGameNights(): QueryPromise<ListUpcomingGameNightsData, undefined>;

interface ListUpcomingGameNightsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUpcomingGameNightsData, undefined>;
}
export const listUpcomingGameNightsRef: ListUpcomingGameNightsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUpcomingGameNights(dc: DataConnect): QueryPromise<ListUpcomingGameNightsData, undefined>;

interface ListUpcomingGameNightsRef {
  ...
  (dc: DataConnect): QueryRef<ListUpcomingGameNightsData, undefined>;
}
export const listUpcomingGameNightsRef: ListUpcomingGameNightsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUpcomingGameNightsRef:
```typescript
const name = listUpcomingGameNightsRef.operationName;
console.log(name);
```

### Variables
The `ListUpcomingGameNights` query has no variables.
### Return Type
Recall that executing the `ListUpcomingGameNights` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUpcomingGameNightsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUpcomingGameNightsData {
  gameNights: ({
    id: UUIDString;
    name: string;
    eventDate: DateString;
    eventTime?: string | null;
    description?: string | null;
  } & GameNight_Key)[];
}
```
### Using `ListUpcomingGameNights`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUpcomingGameNights } from '@dataconnect/generated';


// Call the `listUpcomingGameNights()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUpcomingGameNights();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUpcomingGameNights(dataConnect);

console.log(data.gameNights);

// Or, you can use the `Promise` API.
listUpcomingGameNights().then((response) => {
  const data = response.data;
  console.log(data.gameNights);
});
```

### Using `ListUpcomingGameNights`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUpcomingGameNightsRef } from '@dataconnect/generated';


// Call the `listUpcomingGameNightsRef()` function to get a reference to the query.
const ref = listUpcomingGameNightsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUpcomingGameNightsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gameNights);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gameNights);
});
```

## GetGameNightDetails
You can execute the `GetGameNightDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getGameNightDetails(vars: GetGameNightDetailsVariables): QueryPromise<GetGameNightDetailsData, GetGameNightDetailsVariables>;

interface GetGameNightDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGameNightDetailsVariables): QueryRef<GetGameNightDetailsData, GetGameNightDetailsVariables>;
}
export const getGameNightDetailsRef: GetGameNightDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGameNightDetails(dc: DataConnect, vars: GetGameNightDetailsVariables): QueryPromise<GetGameNightDetailsData, GetGameNightDetailsVariables>;

interface GetGameNightDetailsRef {
  ...
  (dc: DataConnect, vars: GetGameNightDetailsVariables): QueryRef<GetGameNightDetailsData, GetGameNightDetailsVariables>;
}
export const getGameNightDetailsRef: GetGameNightDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGameNightDetailsRef:
```typescript
const name = getGameNightDetailsRef.operationName;
console.log(name);
```

### Variables
The `GetGameNightDetails` query requires an argument of type `GetGameNightDetailsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGameNightDetailsVariables {
  gameNightId: UUIDString;
}
```
### Return Type
Recall that executing the `GetGameNightDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGameNightDetailsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetGameNightDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGameNightDetails, GetGameNightDetailsVariables } from '@dataconnect/generated';

// The `GetGameNightDetails` query requires an argument of type `GetGameNightDetailsVariables`:
const getGameNightDetailsVars: GetGameNightDetailsVariables = {
  gameNightId: ..., 
};

// Call the `getGameNightDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGameNightDetails(getGameNightDetailsVars);
// Variables can be defined inline as well.
const { data } = await getGameNightDetails({ gameNightId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGameNightDetails(dataConnect, getGameNightDetailsVars);

console.log(data.gameNight);

// Or, you can use the `Promise` API.
getGameNightDetails(getGameNightDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.gameNight);
});
```

### Using `GetGameNightDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGameNightDetailsRef, GetGameNightDetailsVariables } from '@dataconnect/generated';

// The `GetGameNightDetails` query requires an argument of type `GetGameNightDetailsVariables`:
const getGameNightDetailsVars: GetGameNightDetailsVariables = {
  gameNightId: ..., 
};

// Call the `getGameNightDetailsRef()` function to get a reference to the query.
const ref = getGameNightDetailsRef(getGameNightDetailsVars);
// Variables can be defined inline as well.
const ref = getGameNightDetailsRef({ gameNightId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGameNightDetailsRef(dataConnect, getGameNightDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gameNight);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gameNight);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateGameNight
You can execute the `CreateGameNight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGameNight(vars: CreateGameNightVariables): MutationPromise<CreateGameNightData, CreateGameNightVariables>;

interface CreateGameNightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGameNightVariables): MutationRef<CreateGameNightData, CreateGameNightVariables>;
}
export const createGameNightRef: CreateGameNightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGameNight(dc: DataConnect, vars: CreateGameNightVariables): MutationPromise<CreateGameNightData, CreateGameNightVariables>;

interface CreateGameNightRef {
  ...
  (dc: DataConnect, vars: CreateGameNightVariables): MutationRef<CreateGameNightData, CreateGameNightVariables>;
}
export const createGameNightRef: CreateGameNightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGameNightRef:
```typescript
const name = createGameNightRef.operationName;
console.log(name);
```

### Variables
The `CreateGameNight` mutation requires an argument of type `CreateGameNightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGameNightVariables {
  name: string;
  description?: string | null;
  eventDate: DateString;
  eventTime?: string | null;
  isFinalized?: boolean | null;
}
```
### Return Type
Recall that executing the `CreateGameNight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGameNightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGameNightData {
  gameNight_insert: GameNight_Key;
}
```
### Using `CreateGameNight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGameNight, CreateGameNightVariables } from '@dataconnect/generated';

// The `CreateGameNight` mutation requires an argument of type `CreateGameNightVariables`:
const createGameNightVars: CreateGameNightVariables = {
  name: ..., 
  description: ..., // optional
  eventDate: ..., 
  eventTime: ..., // optional
  isFinalized: ..., // optional
};

// Call the `createGameNight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGameNight(createGameNightVars);
// Variables can be defined inline as well.
const { data } = await createGameNight({ name: ..., description: ..., eventDate: ..., eventTime: ..., isFinalized: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGameNight(dataConnect, createGameNightVars);

console.log(data.gameNight_insert);

// Or, you can use the `Promise` API.
createGameNight(createGameNightVars).then((response) => {
  const data = response.data;
  console.log(data.gameNight_insert);
});
```

### Using `CreateGameNight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGameNightRef, CreateGameNightVariables } from '@dataconnect/generated';

// The `CreateGameNight` mutation requires an argument of type `CreateGameNightVariables`:
const createGameNightVars: CreateGameNightVariables = {
  name: ..., 
  description: ..., // optional
  eventDate: ..., 
  eventTime: ..., // optional
  isFinalized: ..., // optional
};

// Call the `createGameNightRef()` function to get a reference to the mutation.
const ref = createGameNightRef(createGameNightVars);
// Variables can be defined inline as well.
const ref = createGameNightRef({ name: ..., description: ..., eventDate: ..., eventTime: ..., isFinalized: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGameNightRef(dataConnect, createGameNightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gameNight_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gameNight_insert);
});
```

## InviteToGameNight
You can execute the `InviteToGameNight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
inviteToGameNight(vars: InviteToGameNightVariables): MutationPromise<InviteToGameNightData, InviteToGameNightVariables>;

interface InviteToGameNightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InviteToGameNightVariables): MutationRef<InviteToGameNightData, InviteToGameNightVariables>;
}
export const inviteToGameNightRef: InviteToGameNightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
inviteToGameNight(dc: DataConnect, vars: InviteToGameNightVariables): MutationPromise<InviteToGameNightData, InviteToGameNightVariables>;

interface InviteToGameNightRef {
  ...
  (dc: DataConnect, vars: InviteToGameNightVariables): MutationRef<InviteToGameNightData, InviteToGameNightVariables>;
}
export const inviteToGameNightRef: InviteToGameNightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the inviteToGameNightRef:
```typescript
const name = inviteToGameNightRef.operationName;
console.log(name);
```

### Variables
The `InviteToGameNight` mutation requires an argument of type `InviteToGameNightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InviteToGameNightVariables {
  gameNightId: UUIDString;
  inviteeId: UUIDString;
}
```
### Return Type
Recall that executing the `InviteToGameNight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InviteToGameNightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InviteToGameNightData {
  gameNightInvitation_insert: GameNightInvitation_Key;
}
```
### Using `InviteToGameNight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, inviteToGameNight, InviteToGameNightVariables } from '@dataconnect/generated';

// The `InviteToGameNight` mutation requires an argument of type `InviteToGameNightVariables`:
const inviteToGameNightVars: InviteToGameNightVariables = {
  gameNightId: ..., 
  inviteeId: ..., 
};

// Call the `inviteToGameNight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await inviteToGameNight(inviteToGameNightVars);
// Variables can be defined inline as well.
const { data } = await inviteToGameNight({ gameNightId: ..., inviteeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await inviteToGameNight(dataConnect, inviteToGameNightVars);

console.log(data.gameNightInvitation_insert);

// Or, you can use the `Promise` API.
inviteToGameNight(inviteToGameNightVars).then((response) => {
  const data = response.data;
  console.log(data.gameNightInvitation_insert);
});
```

### Using `InviteToGameNight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, inviteToGameNightRef, InviteToGameNightVariables } from '@dataconnect/generated';

// The `InviteToGameNight` mutation requires an argument of type `InviteToGameNightVariables`:
const inviteToGameNightVars: InviteToGameNightVariables = {
  gameNightId: ..., 
  inviteeId: ..., 
};

// Call the `inviteToGameNightRef()` function to get a reference to the mutation.
const ref = inviteToGameNightRef(inviteToGameNightVars);
// Variables can be defined inline as well.
const ref = inviteToGameNightRef({ gameNightId: ..., inviteeId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = inviteToGameNightRef(dataConnect, inviteToGameNightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gameNightInvitation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gameNightInvitation_insert);
});
```

