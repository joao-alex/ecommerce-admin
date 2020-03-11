import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';
import api from '../../services/api';
import SaleItem from '../../components/SaleItem';
import SaleModal from '../../components/SaleModal';

import './styles.css'


export default function Sales({history}){
    const [sales,setSales] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [sale,setSale] = useState(null);
    const [status,setStatus] = useState('0');

    async function loadSales(){
        const token = localStorage.getItem('token');
        let url = '/manage/sales';
        if(status!=0)
            url=`/manage/sales?status=${status}`
        const {data} = await api.get(url,{
            headers:{
                Authorization:token
            },
        });
        setSales(data);
    }

    function loadModal(id){
        sales.some(s=>{
            if(s.id===id)
                setSale(s)
        })
        setModalShow(true)
    }
    
    useEffect(()=>{
        loadSales();
    },[status])

    return(
    <div>
        <Form id='header'>
            <Form.Label>Filtrar</Form.Label>
            <Form.Control as='select' onChange={e => setStatus(e.target.value) } id='select'>
                <option value='0'>Todas</option>
                <option value='1'>Aguardando Pagamento</option>
                <option value='2'>Pagamento Efetuado</option>
                <option value='3'>Pagamento Confirmado</option>
                <option value='4'>Finalizado</option>
            </Form.Control>
        </Form>
        
        <Table striped bordered hover style={{marginTop:10}}>
            {sales.length!==0?(
            <>
                <thead>
                    <tr>
                        <th>Cód. Venda</th>
                        <th>Cliente</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Detalhes</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale)=> <SaleItem sale={sale} key={sale.id} show={loadModal}/>)}
                </tbody>
            </>):(
            <>
                <thead>
                    <tr>
                        <th>Ops...</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{verticalAlign:'middle',alignItems:'center'}}>
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <span style={{color:'#666',fontWeight:'500'}}>Nenhuma venda encontrada </span> 
                                <MaterialIcon icon='mood_bad'/>
                            </div>                  
                        </td>
                    </tr>
                </tbody>
            </>
            )}
        </Table>
        <SaleModal
         show={modalShow} 
         sale={sale} 
         onHide={()=>window.confirm('Voce deseja realmente fechar?')&&setModalShow(false)}
         setSale={setSale}
        />
    </div>)
}