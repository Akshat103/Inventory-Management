import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface NavLinkProps {
  children: ReactNode;
  href: string;
}

const NavLink = ({ children, href }: NavLinkProps) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}>
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logo = require("../../images/logo.PNG")

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Avatar
                  size={'sm'}
                  src={
                    logo
                  }
                /></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {
                auth ?
                <>
                  <NavLink href="/">Dashboard</NavLink>
                  <Button onClick={logout} justifyItems={'right'}>Logout</Button>
                </>
                :
                <>
                  <NavLink href="/login">Signin</NavLink>
                  <NavLink href="/signup">SignUp</NavLink>
                </>
}
            </HStack>
          </HStack>
        </Flex>

      </Box>
    </>
  );
}
export default Navbar;