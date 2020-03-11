import React, { useState, useMemo } from 'react';
import { Modal,Button, Form, InputGroup, Spinner } from 'react-bootstrap';

import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api';

export default function ProductModal({show,onHide,title,product}){
    const [codProd, setCodProd] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState(null);
    const [price,setPrice] = useState("");
    const [loading,setLoading] = useState(false);

    const preview = useMemo(()=>{
        if(image)
            return URL.createObjectURL(image)
        else if(product)
            return product.image
        else return null
    });

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData();
        data.append('codProd',codProd);
        data.append('description',description);
        data.append('image',image);
        data.append('price',price);
        data.append('amount',10);

        const token = localStorage.getItem('token');

        setLoading(true)

        if(product){
            await api.put(`/manage/products/${product.codProd}`,data,{
                headers:{
                    Authorization:token
                }
            })
        }else{
            await api.post('/manage/products',data,{
                headers:{
                    Authorization:token
                }
            });
        }

        

        setLoading(false);
        window.location.reload();
        
    }

    function loadProduct(){
        if(product){
            setCodProd(product.codProd)
            setDescription(product.description)
            setPrice(product.price)
        }else{
            setCodProd("")
            setDescription("")
            setPrice("")
        }
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size='lg' 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onEnter={loadProduct}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id='formProduct' onSubmit={handleSubmit}>
                    <Form.Group controlId="formGroupCod">
                        <Form.Label>Código*</Form.Label>
                        <Form.Control 
                            placeholder="Digite o código do produto. Ex: 00000123"
                            required
                            disabled={product}
                            value={codProd}
                            onChange={ event => setCodProd(event.target.value) }
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescription">
                        <Form.Label>Descrição*</Form.Label>
                        <Form.Control 
                            placeholder="Digite a descrição do produto. Ex: Café"
                            required
                            value={description}
                            onChange={ event => setDescription(event.target.value) }
                        />
                    </Form.Group>
                    <Form.Group controlId="formGroupPrice">
                        <Form.Label>Preço*</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>R$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control placeholder="Digite o preço do produto." 
                                required 
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}/>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formGroupImage">
                        <Form.Label>Imagem*</Form.Label>
                        <label 
                            id="image"
                            style={{ backgroundImage: `url(${preview})`,
                                        backgroundSize:'contain',
                                        backgroundRepeat:'no-repeat',
                                        backgroundPosition:'center'}}>
                            <Form.Control type='file' onChange={(e)=>setImage(e.target.files[0])}/>
                            { !preview && <img src={camera} alt="Enviar imagem"/>}
                        </label>   
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} disabled={loading} variant='danger'>Close</Button>
                <Button type='submit' disabled={loading} variant='success' form='formProduct'>
                    Salvar
                    {loading&&<Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}