import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Heading,
    Input,
    Button,
    Text,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';

const SignUp = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch("http://localhost:5000/api/signup", {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/');
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
                <Heading mb={6}>Sign Up</Heading>
                <Input
                    placeholder="john doe"
                    type="text"
                    variant="filled"
                    mb={3}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <Text color="muted">Have an account?</Text>
                <Link href='/login' color={'blue.400'}>Sign In</Link>
                <Button colorScheme="teal" mb={8} onClick={collectData} marginTop={'0.5rem'}>
                    Sign Up
                </Button>

            </Flex>
        </Flex>

    )
}

export default SignUp;