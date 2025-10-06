import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    SimpleGrid,
    Link,
    Image
} from '@chakra-ui/react';
import { FaShieldAlt, FaCog, FaUsers, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const bgColor = 'white';
    const textColor = 'gray.600';
    const headingColor = 'gray.800';

    const navigate = useNavigate();

    return (
        <Box bg={bgColor} minH="100vh">
            {/* Header */}
            <Container maxW="7xl" px={6}>
                <Flex justify="space-between" align="center" py={4}>
                    <HStack gap={2}>
                        <Box w={8} h={8} borderRadius="md" >
                            <Image src="/images/logo.png" w="full" h="full" objectFit={'contain'} />
                        </Box>
                        <Text fontSize="xl" fontWeight="bold" color={headingColor}>
                            Paycore
                        </Text>
                    </HStack>

                    <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
                        <Link color={textColor} _hover={{ color: 'blue.500' }}>Home</Link>
                        <Link color={textColor} _hover={{ color: 'blue.500' }}>Features</Link>
                        {/* <Link color={textColor} _hover={{ color: 'blue.500' }}>Pricing</Link> */}
                        <Link color={textColor} _hover={{ color: 'blue.500' }}>Contact</Link>
                    </HStack>

                    <Button colorScheme="blue" size="md" onClick={() => navigate('/auth/onboarding')}>
                        Get Started
                    </Button>
                </Flex>
            </Container>

            {/* Hero Section */}
            <Container maxW="7xl" px={6} py={20}>
                <VStack gap={8} textAlign="center">
                    <VStack gap={4}>
                        <Heading
                            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                            fontWeight="bold"
                            color={headingColor}
                            lineHeight="shorter"
                        >
                            Streamline Your Payroll
                        </Heading>
                        <Heading
                            fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
                            fontWeight="bold"
                            color="blue.500"
                            lineHeight="shorter"
                        >
                            Process with Ease
                        </Heading>
                    </VStack>

                    <Text
                        fontSize={{ base: 'lg', md: 'xl' }}
                        color={textColor}
                        maxW="2xl"
                        lineHeight="tall"
                    >
                        Efficient, secure, and user-friendly payroll management for businesses
                        of all sizes. Automate your payroll process and focus on what matters most.
                    </Text>

                    <HStack gap={4}>
                        <Button colorScheme="blue" size="lg" px={8} onClick={() => navigate('/auth/onboarding')}>
                            Start Free Trial
                        </Button>
                        <Button variant="solid" color="white" size="xl" px={8} borderWidth={'0px'} bg="primaryColor">
                            Learn More
                        </Button>
                    </HStack>

                    {/* Payroll Interface Mockup */}
                    <Box
                        w="full"
                        maxW="4xl"
                        h="400px"
                        bg="gray.100"
                        borderRadius="xl"
                        border="2px"
                        borderColor="gray.200"
                        p={6}
                        mt={12}
                    >
                        <Image src="/images/landingPage.png" w="full" h="full" objectFit={'contain'} />
                    </Box>
                </VStack>
            </Container>

            {/* Features Section */}
            <Box bg="gray.50" py={20}>
                <Container maxW="7xl" px={6}>
                    <VStack gap={16}>
                        <VStack gap={4} textAlign="center">
                            <Heading fontSize="4xl" color={headingColor}>
                                Paycore Features
                            </Heading>
                            <Text fontSize="xl" color={textColor} maxW="2xl">
                                Powerful, self-serve product and growth analytics to help you convert,
                                engage, and retain more users. Trusted by over 4,000 startups.
                            </Text>
                        </VStack>

                        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
                            <VStack gap={4} textAlign="center">
                                <Box as={FaChartLine} w={12} h={12} color="blue.500" />
                                <Heading fontSize="xl">Fast Payroll Processing</Heading>
                                <Text color={textColor} textAlign="center">
                                    Process payroll in minutes, not hours. Automated calculations ensure accuracy.
                                </Text>
                            </VStack>

                            <VStack gap={4} textAlign="center">
                                <Box as={FaUsers} w={12} h={12} color="blue.500" />
                                <Heading fontSize="xl">Employee Management</Heading>
                                <Text color={textColor} textAlign="center">
                                    Comprehensive employee database with easy management tools.
                                </Text>
                            </VStack>

                            <VStack gap={4} textAlign="center">
                                <Box as={FaCog} w={12} h={12} color="blue.500" />
                                <Heading fontSize="xl">Automated Payslips</Heading>
                                <Text color={textColor} textAlign="center">
                                    Generate and distribute payslips automatically to all employees.
                                </Text>
                            </VStack>

                            <VStack gap={4} textAlign="center">
                                <Box as={FaShieldAlt} w={12} h={12} color="blue.500" />
                                <Heading fontSize="xl">Bank-Grade Security</Heading>
                                <Text color={textColor} textAlign="center">
                                    Your data is protected with enterprise-level security measures.
                                </Text>
                            </VStack>
                        </SimpleGrid>
                    </VStack>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box bg="blue.600" py={20}>
                <Container maxW="4xl" px={6}>
                    <VStack gap={8} textAlign="center">
                        <Heading fontSize="4xl" color="white">
                            Ready to Enhance your payment process ?
                        </Heading>
                        <Text fontSize="xl" color="blue.100" maxW="2xl">
                            Try Paycore for free and see how it can transform your payroll management.
                        </Text>
                        <Button size="lg" colorScheme="white" variant="solid" color="blue.600">
                            Get Started
                        </Button>
                    </VStack>
                </Container>
            </Box>

            {/* Demo Section */}
            <Container maxW="7xl" px={6} py={20}>
                <VStack gap={12}>
                    <VStack gap={4} textAlign="center">
                        <Heading fontSize="4xl" color={headingColor}>
                            Demo
                        </Heading>
                    </VStack>

                    {/* Demo Video Placeholder */}
                    <Box
                        w="full"
                        maxW="4xl"
                        h="450px"
                        bg="gray.300"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image src="/images/youtubeLinkImage.png" w="full" h="full" objectFit={'conver'} />
                    </Box>
                </VStack>
            </Container>

            {/* FAQ Section */}
            <Box bg="gray.50" py={20}>
                <Container maxW="4xl" px={6}>
                    <VStack gap={12}>
                        <VStack gap={4} textAlign="center">
                            <Heading fontSize="4xl" color={headingColor}>
                                Frequently asked questions
                            </Heading>
                            <Text fontSize="xl" color={textColor}>
                                Everything you need to know about the product and billing.
                            </Text>
                        </VStack>

                        <VStack gap={6} w="full">
                            <Box w="full" p={6} bg="white" borderRadius="lg" shadow="sm">
                                <VStack gap={3} align="start">
                                    <Text fontWeight="semibold" fontSize="lg">Is there a free trial available?</Text>
                                    <Text color={textColor}>
                                        Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.
                                    </Text>
                                </VStack>
                            </Box>

                            <Box w="full" p={6} bg="white" borderRadius="lg" shadow="sm">
                                <VStack gap={3} align="start">
                                    <Text fontWeight="semibold" fontSize="lg">Can I change my plan later?</Text>
                                    <Text color={textColor}>
                                        Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.
                                    </Text>
                                </VStack>
                            </Box>

                            <Box w="full" p={6} bg="white" borderRadius="lg" shadow="sm">
                                <VStack gap={3} align="start">
                                    <Text fontWeight="semibold" fontSize="lg">What is your cancellation policy?</Text>
                                    <Text color={textColor}>
                                        We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.
                                    </Text>
                                </VStack>
                            </Box>

                            <Box w="full" p={6} bg="white" borderRadius="lg" shadow="sm">
                                <VStack gap={3} align="start">
                                    <Text fontWeight="semibold" fontSize="lg">Can other info be added to an invoice?</Text>
                                    <Text color={textColor}>
                                        Yes, you can add additional information to invoices including custom fields, notes, and attachments.
                                    </Text>
                                </VStack>
                            </Box>

                            <Box w="full" p={6} bg="white" borderRadius="lg" shadow="sm">
                                <VStack gap={3} align="start">
                                    <Text fontWeight="semibold" fontSize="lg">How does billing work?</Text>
                                    <Text color={textColor}>
                                        Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.
                                    </Text>
                                </VStack>
                            </Box>

                            <Box w="full" p={6} bg="white" borderRadius="lg" shadow="sm">
                                <VStack gap={3} align="start">
                                    <Text fontWeight="semibold" fontSize="lg">How do I change my account email?</Text>
                                    <Text color={textColor}>
                                        You can change the email address associated with your account in your account settings under the account tab.
                                    </Text>
                                </VStack>
                            </Box>
                        </VStack>

                        {/* Avatar Section */}
                        <VStack gap={4} textAlign="center">
                            <HStack gap={-2}>
                                <Image src="/images/people.png" w="full" h="60px" objectFit={'contain'} />
                            </HStack>
                            <Text color={textColor}>
                                Can't find the answer you're looking for? Please chat to our friendly team.
                            </Text>
                            <Button colorScheme="blue" variant={'solid'} bg="primaryColor" color="white">
                                Get in touch
                            </Button>
                        </VStack>
                    </VStack>
                </Container>
            </Box>

            {/* Footer */}
            <Box bg="gray.900" color="white" py={12}>
                <Container maxW="7xl" px={6}>
                    <VStack gap={8}>
                        <SimpleGrid columns={{ base: 1, md: 4 }} gap={8} w="full">
                            <VStack gap={4} align="start">
                                <Heading fontSize="lg">Quick Links</Heading>
                                <VStack gap={2} align="start">
                                    <Text>Home</Text>
                                    <Text>About</Text>
                                    <Text>Features</Text>
                                    <Text>Pricing</Text>
                                </VStack>
                            </VStack>

                            <VStack gap={4} align="start">
                                <Heading fontSize="lg">Quick Links</Heading>
                                <VStack gap={2} align="start">
                                    <Text>Blog</Text>
                                    <Text>Help Center</Text>
                                    <Text>Contact</Text>
                                    <Text>Support</Text>
                                </VStack>
                            </VStack>

                            <VStack gap={4} align="start">
                                <Heading fontSize="lg">Company Info</Heading>
                                <VStack gap={2} align="start">
                                    <Text>About Us</Text>
                                    <Text>Our Team</Text>
                                    <Text>Careers</Text>
                                    <Text>Press</Text>
                                </VStack>
                            </VStack>

                            <VStack gap={4} align="start">
                                <Heading fontSize="lg">Legal</Heading>
                                <VStack gap={2} align="start">
                                    <Text>Privacy Policy</Text>
                                    <Text>Terms of Service</Text>
                                    <Text>Cookie Policy</Text>
                                    <Text>GDPR</Text>
                                </VStack>
                            </VStack>
                        </SimpleGrid>

                        <Box w="full" h="1px" bg="gray.700" />

                        <HStack justify="space-between" w="full">
                            <Text>&copy; 2024 Paycore. All rights reserved.</Text>
                            <HStack gap={4}>
                                <Text>Privacy Policy</Text>
                                <Text>Terms of Service</Text>
                                <Text>Cookie Settings</Text>
                            </HStack>
                        </HStack>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;