import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FormControl, FormLabel, useState } from 'react';
import { Stack, Input, Button } from '@chakra-ui/react';

const MyModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const [error, setError] = useState('');

    function clearInputValue() {
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        setError("");
      };

    const addProduct = async () => {

        if (!name || !price || !company || !category) {
            setError(true);
            return false;
        }

        const userID = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/api/product/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userID }),
            headers: {
                'Content-Type': 'application/json',
                auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) alert("Product Added...");
        else return false;
        clearInputValue();
    }

    return (
        <Modal isOpen={isOpen} onClose={() => { clearInputValue(); onClose(); }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
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
                    <Button colorScheme='blue' mr={3} onClick={addProduct} >Add</Button>
                    <Button onClick={() => { clearInputValue(); onClose(); }}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MyModal;
