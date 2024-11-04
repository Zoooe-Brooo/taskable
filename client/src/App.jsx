// import { Outlet } from 'react-router-dom';
// import {
// 	ApolloClient,
// 	InMemoryCache,
// 	ApolloProvider,
// 	createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

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

function App() {
	return (
		<Box textAlign="center" py={10} px={6}>
			<Heading fontSize="4xl" mb={4}>
				Welcome to Chakra UI
			</Heading>
			<Text fontSize="xl" mb={4}>
				This is a minimal test page using Chakra UI with Vite and React.
			</Text>
			<Button colorScheme="teal" size="lg">
				Click Me
			</Button>
		</Box>
	);
}

export default App;
