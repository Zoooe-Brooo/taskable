import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { Outlet } from 'react-router-dom';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import theme from './components/responsiveness/index';

function App() {
	return (
		<ChakraProvider theme={theme}>
			<ApolloProvider client={client}>
				<Flex direction="column" minH="100vh">
					<Header />
					<Box flex="1" mt="60px">
						<Outlet />
					</Box>
					<Footer />
				</Flex>
			</ApolloProvider>
		</ChakraProvider>
	);
}

export default App;
