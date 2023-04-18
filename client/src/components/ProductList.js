import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon
} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { DeleteIcon, RepeatIcon, AddIcon } from '@chakra-ui/icons'
import { Search2Icon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import MyModal from './AddModel.js'

const ProductList = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };


    const [products, setProducts] = useState([]);

    useEffect(() => {
        getproducts();
    }, []);

    const getproducts = async () => {
        let result = await fetch("http://localhost:5000/api/product/all-product",
            {
                headers: {
                    auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setProducts(result.Products);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/api/product/delete-product/${id}`, {
            headers: {
                auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            method: "POST"
        });
        result = await result.json();
        if (result) {
            getproducts();
        }
    }

    if (products === undefined) return <h3>No Product added...</h3>
    // if (!products.length) return <h3>Loading...</h3>;

    const serachHandle = async (event) => {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/api/product/product-search/${key}`,
                {
                    headers: {
                        auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                    },
                    method: "POST"
                });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else getproducts();
    }

    return (
        <div className="container">

            <>
                <InputGroup borderRadius={5} size="sm" marginTop={'0.5rem'} marginBottom={"0.5rem"}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.600" />}
                    />
                    <Input type="text" placeholder="Search..." border="1px solid #949494" onChange={serachHandle} />
                    <InputRightAddon
                        p={0}
                        border="none"
                    >
                    </InputRightAddon>
                </InputGroup>
            </>

            <Button onClick={handleOpenModal}><AddIcon /></Button>
            <MyModal isOpen={isOpen} onClose={handleCloseModal} />

            {
                products.length > 0 ?
                    <TableContainer>
                        <Table variant='simple'>
                            <TableCaption>Products Listed</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>S. No</Th>
                                    <Th>Name</Th>
                                    <Th>Price</Th>
                                    <Th>Category</Th>
                                    <Th>Operation</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    products.map((item, index) =>
                                        <Tr key={item._id}>
                                            <Td>{index + 1}</Td>
                                            <Td>{item.name}</Td>
                                            <Td>{item.price}</Td>
                                            <Td>{item.category}</Td>
                                            <Td>

                                                <Button className="btn btn-delete" marginRight={'0.5rem'}
                                                    onClick={() => deleteProduct(item._id)}>
                                                    <DeleteIcon />
                                                </Button>
                                                <Button>
                                                    <Link to={'/update/' + item._id}><RepeatIcon /></Link>
                                                </Button>
                                            </Td>
                                        </Tr>)
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                    :
                    <h1>NO PRODUCT FOUND</h1>

                // products.length > 0 ?
                //     <ul className="responsive-table">
                //         <li className="table-header">
                //             <div className="col col-1">S. No</div>
                //             <div className="col col-2">Name</div>
                //             <div className="col col-3">Price</div>
                //             <div className="col col-4">Category</div>
                //             <div className="col col-4">Delete</div>
                //         </li>
                //         {products.map((item, index) =>
                //             <li className="table-row" key={item._id}>
                //                 <div className="col col-1" >{index + 1}</div>
                //                 <div className="col col-2" >{item.name}</div>
                //                 <div className="col col-3" >{item.price}</div>
                //                 <div className="col col-4" >{item.category}</div>
                //                 <div className="col col-4" >
                //                     <button className="btn btn-delete"
                //                         onClick={() => deleteProduct(item._id)}>
                //                         Delete
                //                     </button>
                //                     <Link to={'/update/' + item._id}>Update</Link>
                //                 </div>

                //             </li>)}
                //     </ul>
                //     :
                //     <h1>NO PRODUCT FOUND</h1>
            }
        </div>
    )
}

export default ProductList;