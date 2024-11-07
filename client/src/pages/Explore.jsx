import { useState } from 'react';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import FreelancerProfileModal from '../components/FreelancerProfileModal';

const freelancers = [
	{
		name: 'Amy Smith',
		service: 'Full Stack Developer',
		description:
			'A versatile developer skilled in both front-end and back-end technologies, capable of building and maintaining complex web applications.',
		image: '/public/images/profile-pics/amy.png',
		price: 60,
		rating: 4.5,
		projectsCompleted: 120,
		skills: ['JavaScript', 'React', 'Node.js'],
		signedUpDuration: 3,
	},
	{
		name: 'John Doe',
		service: 'Front-End Developer',
		description:
			'A front-end developer specializing in building and maintaining responsive websites and web applications.',
		image: '/public/images/profile-pics/john.png',
		price: 40,
		rating: 4.2,
		projectsCompleted: 90,
		skills: ['JavaScript', 'React', 'CSS'],
		signedUpDuration: 2,
	},
	{
		name: 'Brianna Johnson',
		service: 'Back-End Developer',
		description:
			'A back-end developer specializing in building and maintaining server-side logic and databases for web applications.',
		image: '/public/images/profile-pics/brianna.png',
		price: 50,
		rating: 4.8,
		projectsCompleted: 100,
		skills: ['Node.js', 'MongoDB', 'Express'],
		signedUpDuration: 2,
	},
	{
		name: 'Mike Williams',
		service: 'UI/UX Designer',
		description:
			'A UI/UX designer specializing in creating user-friendly interfaces and experiences for web and mobile applications.',
		image: '/public/images/profile-pics/mike.png',
		price: 45,
		rating: 4.6,
		projectsCompleted: 80,
		skills: ['Adobe XD', 'Figma', 'Sketch'],
		signedUpDuration: 1,
	},
	{
		name: 'Jessica Brown',
		service: 'Baby Sitter',
		description:
			'A responsible and caring baby sitter with experience caring for children of all ages.',
		image: '/public/images/profile-pics/jessica.png',
		price: 35,
		rating: 4.9,
		projectsCompleted: 70,
		skills: ['Childcare', 'First Aid', 'Education'],
		signedUpDuration: 1,
	},
	{
		name: 'David Wilson',
		service: 'Gardener',
		description:
			'A skilled gardener with experience maintaining lawns, gardens, and landscapes.',
		image: '/public/images/profile-pics/david.png',
		price: 45,
		rating: 4.7,
		projectsCompleted: 60,
		skills: ['Gardening', 'Landscaping', 'Plant Care'],
		signedUpDuration: 1,
	},
	{
		name: 'Sarah Martinez',
		service: 'House Cleaner',
		description:
			'A thorough and detail-oriented house cleaner with experience cleaning homes, apartments, and offices.',
		image: '/public/images/profile-pics/sarah.png',
		price: 30,
		rating: 4.8,
		projectsCompleted: 50,
		skills: ['Cleaning', 'Organizing', 'Detail-Oriented'],
		signedUpDuration: 1,
	},
	{
		name: 'Daniel Thompson',
		service: 'Dog Walker',
		description:
			'A reliable and trustworthy dog walker with experience walking dogs of all breeds and sizes.',
		image: '/public/images/profile-pics/daniel.png',
		price: 20,
		rating: 4.9,
		projectsCompleted: 40,
		skills: ['Dog Walking', 'Leash Training', 'Dog Care'],
		signedUpDuration: 1,
	},
	{
		name: 'Olivia Garcia',
		service: 'Tutor',
		description:
			'An experienced tutor with expertise in a variety of subjects, capable of helping students of all ages.',
		image: '/public/images/profile-pics/Olivia.png',
		price: 40,
		rating: 4.7,
		projectsCompleted: 30,
		skills: ['Tutoring', 'Educational Strategies', 'Subject Expertise'],
		signedUpDuration: 1,
	},
	{
		name: 'William Lee',
		service: 'Personal Trainer',
		description:
			'A certified personal trainer with experience creating custom workout plans and providing fitness coaching.',
		image: '/public/images/profile-pics/william.png',
		price: 40,
		rating: 4.6,
		projectsCompleted: 20,
		skills: ['Fitness Training', 'Nutrition', 'Strength Training'],
		signedUpDuration: 1,
	},
];

const Explore = () => {
	const [selectedFreelancer, setSelectedFreelancer] = useState(null);

	const handleViewProfile = (freelancer) => {
		setSelectedFreelancer(freelancer);
	};

	const handleCloseModal = () => {
		setSelectedFreelancer(null);
	};

	return (
		<Flex
			wrap="wrap"
			justify="center"
			p={10}
			bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
		>
			{freelancers.map((freelancer, index) => (
				<Box
					key={index}
					bg="rgba(255, 255, 255, 0.1)"
					boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
					backdropFilter="blur(20px)"
					borderRadius="15px"
					m={4}
					p={6}
					width={{ base: '100%', md: '45%' }}
					textAlign="center"
					transition="transform 0.3s ease, box-shadow 0.3s ease"
					_hover={{
						transform: 'scale(1.05)',
						boxShadow: '0 6px 40px rgba(0, 0, 0, 0.2)',
					}}
					display="flex"
					flexDirection="column"
					alignItems="center"
				>
					<Image
						src={freelancer.image}
						alt={freelancer.name}
						borderRadius="full"
						boxSize="200px"
						mb={4}
					/>
					<Text fontSize="xl" fontWeight="bold" mb={2}>
						{freelancer.name}
					</Text>
					<Text mb={2}>{freelancer.service}</Text>
					<Text mb={2}>{freelancer.description}</Text>
					<Text fontWeight="bold" mb={4}>
						${freelancer.price}/hr
					</Text>
					<Button
						colorScheme="teal"
						onClick={() => handleViewProfile(freelancer)}
					>
						View Profile
					</Button>
				</Box>
			))}
			{selectedFreelancer && (
				<FreelancerProfileModal
					freelancer={selectedFreelancer}
					isOpen={!!selectedFreelancer}
					onClose={handleCloseModal}
				/>
			)}
		</Flex>
	);
};

export default Explore;
