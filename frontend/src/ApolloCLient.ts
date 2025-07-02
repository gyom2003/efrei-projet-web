import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
const httpUri = import.meta.env.VITE_BACKEND_URL_FR;
const wsUri = import.meta.env.VITE_BACKEND_WS_URL_FR;

// HTTP link pour requêtes queries/mutations
const httpLink = new HttpLink({
  uri: httpUri,
});

// WS link pour subscriptions
const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    connectionParams: () => {
      const token = localStorage.getItem('token');
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const httpLinkWithAuth = authLink.concat(httpLink);

// Utiliser split pour router les opérations entre HTTP et WS
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuth,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
