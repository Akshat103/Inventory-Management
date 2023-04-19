import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Stack, Input } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons'

function UpdateModal({ data }) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');

  const [error, setError] = useState('');

  const getProductDetails = async () => {
    console.warn(data);
    let result = await fetch(`http://localhost:5000/api/product/single-product/${data._id}`,
      {
        headers: {
          auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
    result = await result.json();
    console.warn(result);
    setName(result.Product.name);
    setPrice(result.Product.price);
    setCategory(result.Product.category);
    setCompany(result.Product.company);
  }

  useEffect(() => {
    console.warn(data);
    getProductDetails();
  }, []);

  const updateProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    const userID = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch(`http://localhost:5000/api/product/edit-product/${data._id}`, {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userID }),
      headers: {
        'Content-Type': 'application/json',
        auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      alert("Product Updated...");
    }
    else return false;
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
    <Button onClick={handleOpen}><RepeatIcon /></Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Data Modal</ModalHeader>
          <ModalCloseButton />

          <ModalBody>

            <Stack spacing={3}>

              <Input variant='outline' placeholder='Product Name' value={name}
                onChange={(e) => { setName(e.target.value) }} />
              {error && !name && <span>Enter valid Name</span>}

              <Input variant='outline' placeholder='Product Price' value={price}
                onChange={(e) => { setPrice(e.target.value) }} />
              {error && !price && <span>Enter valid Price</span>}

              <Input variant='outline' placeholder='Product Category' value={category}
                onChange={(e) => { setCategory(e.target.value) }} />
              {error && !category && <span>Enter valid Category</span>}

              <Input variant='outline' placeholder='Product Company' value={company}
                onChange={(e) => { setCompany(e.target.value) }} />
              {error && !company && <span>Enter valid Company</span>}

            </Stack>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={updateProduct} >Update</Button>
            <Button colorScheme="blue" mr={3} onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateModal;
