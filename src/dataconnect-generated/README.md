# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListGameNights*](#listgamenights)
  - [*GetInvitations*](#getinvitations)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateGameNight*](#creategamenight)
  - [*SuggestGame*](#suggestgame)
  - [*ProposeGameForNight*](#proposegamefornight)
  - [*InviteUser*](#inviteuser)

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

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, vars: GetUserVariables): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query requires an argument of type `GetUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    id: string;
    username: string;
    email?: string | null;
  } & User_Key;
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser, GetUserVariables } from '@dataconnect/generated';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  uid: ..., 
};

// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser(getUserVars);
// Variables can be defined inline as well.
const { data } = await getUser({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect, getUserVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser(getUserVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef, GetUserVariables } from '@dataconnect/generated';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  uid: ..., 
};

// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef(getUserVars);
// Variables can be defined inline as well.
const ref = getUserRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect, getUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListGameNights
You can execute the `ListGameNights` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGameNights(): QueryPromise<ListGameNightsData, undefined>;

interface ListGameNightsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGameNightsData, undefined>;
}
export const listGameNightsRef: ListGameNightsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGameNights(dc: DataConnect): QueryPromise<ListGameNightsData, undefined>;

interface ListGameNightsRef {
  ...
  (dc: DataConnect): QueryRef<ListGameNightsData, undefined>;
}
export const listGameNightsRef: ListGameNightsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGameNightsRef:
```typescript
const name = listGameNightsRef.operationName;
console.log(name);
```

### Variables
The `ListGameNights` query has no variables.
### Return Type
Recall that executing the `ListGameNights` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGameNightsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListGameNights`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGameNights } from '@dataconnect/generated';


// Call the `listGameNights()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGameNights();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGameNights(dataConnect);

console.log(data.gameNights);

// Or, you can use the `Promise` API.
listGameNights().then((response) => {
  const data = response.data;
  console.log(data.gameNights);
});
```

### Using `ListGameNights`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGameNightsRef } from '@dataconnect/generated';


// Call the `listGameNightsRef()` function to get a reference to the query.
const ref = listGameNightsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGameNightsRef(dataConnect);

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

## GetInvitations
You can execute the `GetInvitations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getInvitations(vars: GetInvitationsVariables): QueryPromise<GetInvitationsData, GetInvitationsVariables>;

interface GetInvitationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInvitationsVariables): QueryRef<GetInvitationsData, GetInvitationsVariables>;
}
export const getInvitationsRef: GetInvitationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInvitations(dc: DataConnect, vars: GetInvitationsVariables): QueryPromise<GetInvitationsData, GetInvitationsVariables>;

interface GetInvitationsRef {
  ...
  (dc: DataConnect, vars: GetInvitationsVariables): QueryRef<GetInvitationsData, GetInvitationsVariables>;
}
export const getInvitationsRef: GetInvitationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInvitationsRef:
```typescript
const name = getInvitationsRef.operationName;
console.log(name);
```

### Variables
The `GetInvitations` query requires an argument of type `GetInvitationsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInvitationsVariables {
  gameNightId: UUIDString;
}
```
### Return Type
Recall that executing the `GetInvitations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInvitationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetInvitations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInvitations, GetInvitationsVariables } from '@dataconnect/generated';

// The `GetInvitations` query requires an argument of type `GetInvitationsVariables`:
const getInvitationsVars: GetInvitationsVariables = {
  gameNightId: ..., 
};

// Call the `getInvitations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInvitations(getInvitationsVars);
// Variables can be defined inline as well.
const { data } = await getInvitations({ gameNightId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInvitations(dataConnect, getInvitationsVars);

console.log(data.gameNightInvitations);

// Or, you can use the `Promise` API.
getInvitations(getInvitationsVars).then((response) => {
  const data = response.data;
  console.log(data.gameNightInvitations);
});
```

### Using `GetInvitations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInvitationsRef, GetInvitationsVariables } from '@dataconnect/generated';

// The `GetInvitations` query requires an argument of type `GetInvitationsVariables`:
const getInvitationsVars: GetInvitationsVariables = {
  gameNightId: ..., 
};

// Call the `getInvitationsRef()` function to get a reference to the query.
const ref = getInvitationsRef(getInvitationsVars);
// Variables can be defined inline as well.
const ref = getInvitationsRef({ gameNightId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInvitationsRef(dataConnect, getInvitationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gameNightInvitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gameNightInvitations);
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

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  uid: string;
  username: string;
  email?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  uid: ..., 
  username: ..., 
  email: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ uid: ..., username: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  uid: ..., 
  username: ..., 
  email: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ uid: ..., username: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

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
  id: UUIDString;
  name: string;
  date: DateString;
  creatorId: string;
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
  id: ..., 
  name: ..., 
  date: ..., 
  creatorId: ..., 
};

// Call the `createGameNight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGameNight(createGameNightVars);
// Variables can be defined inline as well.
const { data } = await createGameNight({ id: ..., name: ..., date: ..., creatorId: ..., });

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
  id: ..., 
  name: ..., 
  date: ..., 
  creatorId: ..., 
};

// Call the `createGameNightRef()` function to get a reference to the mutation.
const ref = createGameNightRef(createGameNightVars);
// Variables can be defined inline as well.
const ref = createGameNightRef({ id: ..., name: ..., date: ..., creatorId: ..., });

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

## SuggestGame
You can execute the `SuggestGame` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
suggestGame(vars: SuggestGameVariables): MutationPromise<SuggestGameData, SuggestGameVariables>;

interface SuggestGameRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SuggestGameVariables): MutationRef<SuggestGameData, SuggestGameVariables>;
}
export const suggestGameRef: SuggestGameRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
suggestGame(dc: DataConnect, vars: SuggestGameVariables): MutationPromise<SuggestGameData, SuggestGameVariables>;

interface SuggestGameRef {
  ...
  (dc: DataConnect, vars: SuggestGameVariables): MutationRef<SuggestGameData, SuggestGameVariables>;
}
export const suggestGameRef: SuggestGameRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the suggestGameRef:
```typescript
const name = suggestGameRef.operationName;
console.log(name);
```

### Variables
The `SuggestGame` mutation requires an argument of type `SuggestGameVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SuggestGameVariables {
  id: UUIDString;
  title: string;
  userId: string;
}
```
### Return Type
Recall that executing the `SuggestGame` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SuggestGameData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SuggestGameData {
  gameSuggestion_insert: GameSuggestion_Key;
}
```
### Using `SuggestGame`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, suggestGame, SuggestGameVariables } from '@dataconnect/generated';

// The `SuggestGame` mutation requires an argument of type `SuggestGameVariables`:
const suggestGameVars: SuggestGameVariables = {
  id: ..., 
  title: ..., 
  userId: ..., 
};

// Call the `suggestGame()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await suggestGame(suggestGameVars);
// Variables can be defined inline as well.
const { data } = await suggestGame({ id: ..., title: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await suggestGame(dataConnect, suggestGameVars);

console.log(data.gameSuggestion_insert);

// Or, you can use the `Promise` API.
suggestGame(suggestGameVars).then((response) => {
  const data = response.data;
  console.log(data.gameSuggestion_insert);
});
```

### Using `SuggestGame`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, suggestGameRef, SuggestGameVariables } from '@dataconnect/generated';

// The `SuggestGame` mutation requires an argument of type `SuggestGameVariables`:
const suggestGameVars: SuggestGameVariables = {
  id: ..., 
  title: ..., 
  userId: ..., 
};

// Call the `suggestGameRef()` function to get a reference to the mutation.
const ref = suggestGameRef(suggestGameVars);
// Variables can be defined inline as well.
const ref = suggestGameRef({ id: ..., title: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = suggestGameRef(dataConnect, suggestGameVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gameSuggestion_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gameSuggestion_insert);
});
```

## ProposeGameForNight
You can execute the `ProposeGameForNight` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
proposeGameForNight(vars: ProposeGameForNightVariables): MutationPromise<ProposeGameForNightData, ProposeGameForNightVariables>;

interface ProposeGameForNightRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProposeGameForNightVariables): MutationRef<ProposeGameForNightData, ProposeGameForNightVariables>;
}
export const proposeGameForNightRef: ProposeGameForNightRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
proposeGameForNight(dc: DataConnect, vars: ProposeGameForNightVariables): MutationPromise<ProposeGameForNightData, ProposeGameForNightVariables>;

interface ProposeGameForNightRef {
  ...
  (dc: DataConnect, vars: ProposeGameForNightVariables): MutationRef<ProposeGameForNightData, ProposeGameForNightVariables>;
}
export const proposeGameForNightRef: ProposeGameForNightRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the proposeGameForNightRef:
```typescript
const name = proposeGameForNightRef.operationName;
console.log(name);
```

### Variables
The `ProposeGameForNight` mutation requires an argument of type `ProposeGameForNightVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ProposeGameForNightVariables {
  gameNightId: UUIDString;
  suggestionId: UUIDString;
}
```
### Return Type
Recall that executing the `ProposeGameForNight` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ProposeGameForNightData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ProposeGameForNightData {
  gameNightProposal_insert: GameNightProposal_Key;
}
```
### Using `ProposeGameForNight`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, proposeGameForNight, ProposeGameForNightVariables } from '@dataconnect/generated';

// The `ProposeGameForNight` mutation requires an argument of type `ProposeGameForNightVariables`:
const proposeGameForNightVars: ProposeGameForNightVariables = {
  gameNightId: ..., 
  suggestionId: ..., 
};

// Call the `proposeGameForNight()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await proposeGameForNight(proposeGameForNightVars);
// Variables can be defined inline as well.
const { data } = await proposeGameForNight({ gameNightId: ..., suggestionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await proposeGameForNight(dataConnect, proposeGameForNightVars);

console.log(data.gameNightProposal_insert);

// Or, you can use the `Promise` API.
proposeGameForNight(proposeGameForNightVars).then((response) => {
  const data = response.data;
  console.log(data.gameNightProposal_insert);
});
```

### Using `ProposeGameForNight`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, proposeGameForNightRef, ProposeGameForNightVariables } from '@dataconnect/generated';

// The `ProposeGameForNight` mutation requires an argument of type `ProposeGameForNightVariables`:
const proposeGameForNightVars: ProposeGameForNightVariables = {
  gameNightId: ..., 
  suggestionId: ..., 
};

// Call the `proposeGameForNightRef()` function to get a reference to the mutation.
const ref = proposeGameForNightRef(proposeGameForNightVars);
// Variables can be defined inline as well.
const ref = proposeGameForNightRef({ gameNightId: ..., suggestionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = proposeGameForNightRef(dataConnect, proposeGameForNightVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.gameNightProposal_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.gameNightProposal_insert);
});
```

## InviteUser
You can execute the `InviteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
inviteUser(vars: InviteUserVariables): MutationPromise<InviteUserData, InviteUserVariables>;

interface InviteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InviteUserVariables): MutationRef<InviteUserData, InviteUserVariables>;
}
export const inviteUserRef: InviteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
inviteUser(dc: DataConnect, vars: InviteUserVariables): MutationPromise<InviteUserData, InviteUserVariables>;

interface InviteUserRef {
  ...
  (dc: DataConnect, vars: InviteUserVariables): MutationRef<InviteUserData, InviteUserVariables>;
}
export const inviteUserRef: InviteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the inviteUserRef:
```typescript
const name = inviteUserRef.operationName;
console.log(name);
```

### Variables
The `InviteUser` mutation requires an argument of type `InviteUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InviteUserVariables {
  id: UUIDString;
  gameNightId: UUIDString;
  userId: string;
}
```
### Return Type
Recall that executing the `InviteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InviteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InviteUserData {
  gameNightInvitation_insert: GameNightInvitation_Key;
}
```
### Using `InviteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, inviteUser, InviteUserVariables } from '@dataconnect/generated';

// The `InviteUser` mutation requires an argument of type `InviteUserVariables`:
const inviteUserVars: InviteUserVariables = {
  id: ..., 
  gameNightId: ..., 
  userId: ..., 
};

// Call the `inviteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await inviteUser(inviteUserVars);
// Variables can be defined inline as well.
const { data } = await inviteUser({ id: ..., gameNightId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await inviteUser(dataConnect, inviteUserVars);

console.log(data.gameNightInvitation_insert);

// Or, you can use the `Promise` API.
inviteUser(inviteUserVars).then((response) => {
  const data = response.data;
  console.log(data.gameNightInvitation_insert);
});
```

### Using `InviteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, inviteUserRef, InviteUserVariables } from '@dataconnect/generated';

// The `InviteUser` mutation requires an argument of type `InviteUserVariables`:
const inviteUserVars: InviteUserVariables = {
  id: ..., 
  gameNightId: ..., 
  userId: ..., 
};

// Call the `inviteUserRef()` function to get a reference to the mutation.
const ref = inviteUserRef(inviteUserVars);
// Variables can be defined inline as well.
const ref = inviteUserRef({ id: ..., gameNightId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = inviteUserRef(dataConnect, inviteUserVars);

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

