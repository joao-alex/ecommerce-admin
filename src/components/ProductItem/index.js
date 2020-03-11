import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Button } from 'react-bootstrap';
import api from '../../services/api';

export default function ProductItem({product,edit}){

    async function deleteProduct(id){
        if(window.confirm('Deseja realmente excluir o produto?')){
            const token = localStorage.getItem('token');
            await api.delete(`/manage/products/${id}`,{
                headers:{
                    Authorization:token
                }
            });
            window.location.reload();
        }
    }

    return(
        <tr>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                {product.codProd}
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                <img src={product.image} width="100" height="100" alt="Imagem do produto"/>
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                {product.description}
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                R$ {parseFloat(product.price).toFixed(2)}
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                <Button onClick={()=>edit(product.codProd)}>
                    <MaterialIcon icon="edit" color="#fff"/>
                </Button>
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                <Button variant="danger" onClick={()=>deleteProduct(product.codProd)}>
                    <MaterialIcon icon="delete" color="#fff"/>
                </Button>
            </td>
        </tr>
    )
}