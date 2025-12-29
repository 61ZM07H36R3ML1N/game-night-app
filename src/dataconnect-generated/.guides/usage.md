# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetUser, useListGameNights, useGetInvitations, useCreateUser, useCreateGameNight, useSuggestGame, useProposeGameForNight, useInviteUser } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetUser(getUserVars);

const { data, isPending, isSuccess, isError, error } = useListGameNights();

const { data, isPending, isSuccess, isError, error } = useGetInvitations(getInvitationsVars);

const { data, isPending, isSuccess, isError, error } = useCreateUser(createUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateGameNight(createGameNightVars);

const { data, isPending, isSuccess, isError, error } = useSuggestGame(suggestGameVars);

const { data, isPending, isSuccess, isError, error } = useProposeGameForNight(proposeGameForNightVars);

const { data, isPending, isSuccess, isError, error } = useInviteUser(inviteUserVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getUser, listGameNights, getInvitations, createUser, createGameNight, suggestGame, proposeGameForNight, inviteUser } from '@dataconnect/generated';


// Operation GetUser:  For variables, look at type GetUserVars in ../index.d.ts
const { data } = await GetUser(dataConnect, getUserVars);

// Operation ListGameNights: 
const { data } = await ListGameNights(dataConnect);

// Operation GetInvitations:  For variables, look at type GetInvitationsVars in ../index.d.ts
const { data } = await GetInvitations(dataConnect, getInvitationsVars);

// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreateGameNight:  For variables, look at type CreateGameNightVars in ../index.d.ts
const { data } = await CreateGameNight(dataConnect, createGameNightVars);

// Operation SuggestGame:  For variables, look at type SuggestGameVars in ../index.d.ts
const { data } = await SuggestGame(dataConnect, suggestGameVars);

// Operation ProposeGameForNight:  For variables, look at type ProposeGameForNightVars in ../index.d.ts
const { data } = await ProposeGameForNight(dataConnect, proposeGameForNightVars);

// Operation InviteUser:  For variables, look at type InviteUserVars in ../index.d.ts
const { data } = await InviteUser(dataConnect, inviteUserVars);


```