import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	// Your custom breakpoints
	breakpoints: {
		base: '0em',
		sm: '30em',
		md: '48em',
		lg: '62em',
		xl: '80em',
	},
	// Global component styles
	styles: {
		global: {
			'html, body': {
				color: 'gray.800',
				lineHeight: 'tall',
			},
			a: {
				color: 'teal.500',
				_hover: {
					textDecoration: 'underline',
				},
			},
		},
	},
	// Default responsive styles for basic components
	components: {
		Text: {
			baseStyle: {
				fontSize: { base: 'md', md: 'lg' },
			},
		},
		Heading: {
			baseStyle: {
				fontSize: { base: '2xl', md: '3xl' },
			},
		},
		Button: {
			baseStyle: {
				fontSize: { base: 'sm', md: 'md' },
				padding: { base: '4', md: '6' },
				variants: {
					primary: {
						bg: 'teal.500',
						color: 'white',
						_hover: { bg: 'teal.600' },
					},
				},
			},
		},
		Container: {
			baseStyle: {
				maxW: { base: '100%', md: 'container.md', lg: 'container.lg' },
				px: { base: 4, md: 8 }, // Default responsive padding for all Container components
			},
		},
		HStack: {
			baseStyle: {
				spacing: { base: 2, md: 4 }, // Default responsive spacing for all HStack components
			},
		},
		VStack: {
			baseStyle: {
				spacing: { base: 2, md: 4 }, // Default responsive spacing for all VStack components
			},
		},
	},
});

export default theme;
