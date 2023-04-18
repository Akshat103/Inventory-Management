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

const LogedInLinks = ['Dashboard'];
const SignUpLinks = ['Signin', 'Signup'];

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
              {auth ?
                <NavLink href="/">Dashboard</NavLink>
              : 
              <>
              <NavLink href="/login">Signin</NavLink>
              <NavLink href="/signup">SignUp</NavLink>
              </>
}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>

            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
              </MenuButton>
              {/* <MenuList>
                <MenuItem>"/"</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList> */}
            </Menu>
          </Flex>
        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>
    </>
  );
}
export default Navbar;