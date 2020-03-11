import React, { useEffect, useState } from 'react';
import { Table,Button } from 'react-bootstrap';
import api from '../../services/api';
import ProductItem from '../../components/ProductItem';
import ProductModal from '../../components/ProductModal';


export default function Products({history}){
    const [products,setProducts] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [product,setProduct] = useState(null);

    async function loadProducts(){
        const token = localStorage.getItem('token');
        const {data} = await api.get('/products',{headers:{Authorization:token}});
        setProducts(data);
    }

    function loadEdit(id){
        products.some(p=>{
            if(p.codProd===id)
                setProduct(p)
        })
        setModalShow(true)
    }


    useEffect(()=>{
        
        loadProducts();
    },[])

    function openNewProduct(){
        if(product)
            setProduct(null);
        setModalShow(true)
    }

    return(
    <div>
        <Button onClick={()=>openNewProduct()}>Novo Produto</Button>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Cód. Produto</th>
                    <th>Imagem</th>
                    <th>Descrição</th>      
                    <th>Preço</th>
                    <th>Editar</th>
                    <th>Remover</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>(
                      <ProductItem product={product} key={product.codProd} edit={loadEdit}/>            
                ))}
            </tbody>
        </Table>
        <ProductModal show={modalShow} 
            onHide={()=>window.confirm('Voce deseja realmente fechar?')&&setModalShow(false)} 
            title={product?'Editar produto':'Novo produto'}
            product={product||null}
        />
    </div>)
}