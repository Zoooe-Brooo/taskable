// import { Outlet } from 'react-router-dom';
// import {
// 	ApolloClient,
// 	InMemoryCache,
// 	ApolloProvider,
// 	createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// import Nav from './components/Nav';
// import { StoreProvider } from './utils/GlobalState';

// const httpLink = createHttpLink({
// 	uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
// 	const token = localStorage.getItem('id_token');
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? `Bearer ${token}` : '',
// 		},
// 	};
// });

// const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });

// function App() {
// 	return (
// 		<ApolloProvider client={client}>
// 			<ChakraProvider>
// 				<StoreProvider>
// 					<Box minH="100vh" display="flex" flexDirection="column">
// 						<Nav />
// 						<Container as="main" flex="1" py={8}>
// 							<Outlet />
// 						</Container>
// 					</Box>
// 				</StoreProvider>
// 			</ChakraProvider>
// 		</ApolloProvider>
// 	);
// }

import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	return (
		<ChakraProvider>
			<Flex direction="column" minH="100vh">
				<Header />
				<Box flex="1" mt="60px">
					<Outlet />
				</Box>
				<Footer />
			</Flex>
		</ChakraProvider>
	);
}

export default App;
