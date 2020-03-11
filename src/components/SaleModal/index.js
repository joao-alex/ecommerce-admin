import React, { useState } from 'react';
import { Modal, Form, InputGroup, Table, Spinner, Button } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';

import api from '../../services/api';

import './styles.scss'


export default function SaleModal({ show, onHide, sale, setSale }) {

    const [loading,setLoading] = useState(false);


    async function confirmPayment(){
        setLoading(true)
        const token = localStorage.getItem('token');
        const {data} = await api.put(`/manage/sales/${sale.id}`,{status:sale.status+=1},{
            headers:{
                Authorization:token
            }
        });

        setSale(data)
        setLoading(false)
    }

    return sale && (
        <Modal
            show={show}
            onHide={onHide}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pedido #{sale.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <ul class="multi-steps">
                        <li class={sale.status===0&&'is-active'}>Carrinho</li>
                        <li class={sale.status===1&&'is-active'}>Aguardando Pagamento</li>
                        <li class={sale.status===2&&'is-active'}>Aguardando Confirmação</li>
                        <li class={sale.status===3&&'is-active'}>Pagamento Confirmado</li>
                        <li class={sale.status===4&&'is-active'}>Finalizado</li>
                    </ul>
                    <Form.Group>
                        <h5>Cliente</h5>
                        <Form.Control disabled value={sale.client.name} />
                    </Form.Group>
                    <Form.Group>
                        <h5>Total</h5>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>R$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control placeholder="Digite o preço do produto."
                                disabled
                                type='number'
                                value={parseFloat(sale.total).toFixed(2)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <h5>Lista de produtos</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Cód. Produto</th>
                                    <th>Imagem</th>
                                    <th>Descrição</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sale.products.map(p => (
                                    <tr key={p.codProd}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {p.codProd}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <img src={p.image} width="100" height="100" alt="Imagem do produto" />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {p.description}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            R$ {parseFloat(p.price).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Form.Group>
                    <Form.Group>
                        <h5>Pagamento</h5>
                        {sale.receipt ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                                <img src={sale.receipt} alt="Comprovante" height='400' onClick={()=>window.open(sale.receipt)} />
                                <Button variant='success' disabled={sale.status!==2} style={{marginTop:10}} onClick={confirmPayment}>
                                    {sale.status===2?'Confirmar Pagamento':'Pagamento Confirmado'}
                                    {loading &&<Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />}
                                </Button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} id='receipt'>
                                <span style={{ color: '#555', fontWeight: '500' }}>Nenhum registro de pagamento </span>
                                <MaterialIcon icon='mood_bad' />
                            </div>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>

        </Modal>
    )
}