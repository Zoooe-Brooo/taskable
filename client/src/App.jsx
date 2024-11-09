import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './utils/store';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './components/responsiveness/index';

const httpLink = createHttpLink({
	uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});


function App() {
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
			    <ChakraProvider theme={theme}>
			    	<Flex direction="column" minH="100vh">
			    		<Header />
			    		<Box flex="1" mt="60px">
			    			<Outlet />
			    		</Box>
			    		<Footer />
			    	</Flex>
			    </ChakraProvider>
		    </Provider>
		</ApolloProvider>
	);
}

export default App;
