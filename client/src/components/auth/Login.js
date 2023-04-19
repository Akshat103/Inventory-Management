import React, {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import {
    Flex,
    Heading,
    Input,
    Button,
    Text,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const handlelogin = async () => {
        let result = await fetch('http://localhost:5000/api/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.token) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.token));
            navigate('/');
        }
        else {
            alert("Please enter correct deatils...")
        }

    }


    return (

        <Flex h="80vh" alignItems="center" justifyContent="center">
            <Flex
                flexDirection="column"
                bg={formBackground}
                p={12}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6}>Sign In</Heading>
                <Input
                    placeholder="johndoe@gmail.com"
                    type="email"
                    variant="filled"
                    mb={3}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="**********"
                    type="password"
                    variant="filled"
                    mb={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Text color="muted">Don't have an account?</Text>
                <Link href='/signup' color={'blue.400'}>Sign Up</Link>
                <Button colorScheme="teal" mb={8} onClick={handlelogin} marginTop={'0.5rem'}>
                    Log In
                </Button>

            </Flex>
        </Flex>

    )
}

export default Login;