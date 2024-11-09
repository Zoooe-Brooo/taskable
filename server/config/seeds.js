const db = require('./connection');
const { User, Freelancer } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Freelancer', 'freelancers');
  await cleanDB('User', 'users');

  const freelancers = await Freelancer.insertMany([
    {
      name: 'Amy Smith',
      service: 'Full Stack Developer',
      description:
      'A versatile developer skilled in both front-end and back-end technologies, capable of building and maintaining complex web applications.',
      image: 'freelancer-image.png',
      price: 60,
      rating: 4.5,
		  projectsCompleted: 120,
		  signedUpDuration: 3,
      availability: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB']
    },
    {
      name: 'John Doe',
      service: 'Front-End Developer',
      description:
      'A front-end developer specializing in building and maintaining responsive websites and web applications.',
      image: 'freelancer-image.png',
      price: 40,
      rating: 4.2,
		  projectsCompleted: 90,
		  signedUpDuration: 2,
      availability: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap']
    },
    {
      name: 'Brianna Johnson',
      service: 'Back-End Developer',
      description:
      'A back-end developer specializing in building and maintaining server-side logic and databases for web applications.',
      image: 'freelancer-image.png',
      price: 50,
      rating: 4.8,
		  projectsCompleted: 100,
		  signedUpDuration: 2,
      availability: true,
      skills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'REST APIs', 'GraphQL']
    },
    {
      name: 'Mike Williams',
      service: 'UI/UX Designer',
      description:
      'A UI/UX designer specializing in creating user-friendly interfaces and experiences for web and mobile applications.',
      image: 'freelancer-image.png',
      price: 45,
      rating: 4.6,
	  	projectsCompleted: 80,
  		signedUpDuration: 1,
      availability: true,
      skills: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'User Research', 'Wireframing']
    },
    {
      name: 'Jessica Brown',
      service: 'Web Designer',
      description:
      'A web designer specializing in creating visually appealing and responsive websites for businesses and individuals.',
      image: 'freelancer-image.png',
      price: 45,
      rating: 4.9,
	  	projectsCompleted: 70,
  		signedUpDuration: 1,
      availability: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design', 'SEO']
    },
    {
      name: 'David Wilson',
      service: 'JavaScript Developer',
      description:
      'A JavaScript developer specializing in building and maintaining interactive web applications using modern frameworks and libraries.',
      image: 'freelancer-image.png',
      price: 45,
      rating: 4.7,
	  	projectsCompleted: 60,
  		signedUpDuration: 1,
      availability: true,
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs']
    },
    {
      name: 'Sarah Martinez',
      service: 'React Developer',
      description:
      'A React developer specializing in building and maintaining single-page applications and user interfaces for web applications.',
      image: 'freelancer-image.png',
      price: 50,
      rating: 4.8,
	  	projectsCompleted: 50,
	  	signedUpDuration: 1,
      availability: true,
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux', 'Material-UI']
    },
    {
      name: 'Daniel Thompson',
      service: 'Node.js Developer',
      description:
      'A Node.js developer specializing in building and maintaining server-side logic and APIs for web applications.',
      image: 'freelancer-image.png',
      price: 45,
      rating: 4.9,
		  projectsCompleted: 40,
	  	signedUpDuration: 1,
      availability: true,
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'GraphQL', 'Socket.io']
    },
    {
      name: 'Olivia Garcia',
      service: 'Web Application Developer',
      description:
      'A web application developer specializing in building and maintaining custom web applications for businesses and organizations.',
      image: 'freelancer-image.png',
      price: 55,
      rating: 4.7,
		  projectsCompleted: 30,
	    signedUpDuration: 1,
      availability: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB']
    },
    {
      name: 'William Lee',
      service: 'Software Engineer (Web Development Focus)',
      description:
      'A software engineer specializing in web development, capable of building and maintaining complex web applications and software solutions.',
      image: 'freelancer-image.png',
      price: 60,
      rating: 4.6,
		  projectsCompleted: 20,
  		signedUpDuration: 1,
      availability: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React', 'MongoDB']
    }
  ]);

  console.log('freelancers seeded');

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        freelancers: [freelancers[0]._id, freelancers[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
