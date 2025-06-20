import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP link pour requêtes queries/mutations
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

// WS link pour subscriptions
const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true,
  },
});

// Utiliser split pour router les opérations entre HTTP et WS
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
