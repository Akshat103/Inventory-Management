import { Box, Heading, Text } from "@chakra-ui/react";

const NotFound = () => {

  return (
    <Box textAlign="center">
      <Heading as="h1" fontSize="6xl" mt={10} mb={5} >
        404
      </Heading>
      <Text fontSize="xl">Oops! Page not found</Text>
    </Box>
  );
};

export default NotFound;
