import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Button } from 'react-bootstrap';
import api from '../../services/api';

import showSaleStatus from '../../utils/showSaleStatus'

export default function SaleItem({sale,show}){

    async function deleteSale(id){
        if(window.confirm('Deseja realmente excluir o produto?')){
            const token = localStorage.getItem('token');
            await api.delete(`/manage/sales/${id}`,{
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
                {sale.id}
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                {sale.client.name}
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                {showSaleStatus(sale)}
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                R$ {parseFloat(sale.total).toFixed(2)}
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                <Button onClick={()=>show(sale.id)} variant='success'>
                    <MaterialIcon icon="description" color="#fff"/>
                </Button>
            </td>
            <td style={{textAlign:'center',verticalAlign:'middle'}}>
                <Button variant="danger" onClick={()=>deleteSale(sale.id)}>
                    <MaterialIcon icon="delete" color="#fff"/>
                </Button>
            </td>
        </tr>
    )
}