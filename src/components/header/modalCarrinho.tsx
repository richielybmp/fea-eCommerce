import React from 'react';
import { ProdutoType } from "../produto/produto";
import { Link } from "react-router-dom";
import { Button, Header, Item } from "semantic-ui-react";
import { Consumer } from '../../AppContext';
import { Cart } from '../../Cart';

interface ModalCarrinhoProps {
    clickIconCar: () => void;
    stateModalCar: boolean;
}

const ModalContent = (props: ModalCarrinhoProps, carrinho: Cart) => {
    if (carrinho.totalItens > 0) {
        return <Item.Group divided>
            <Item>
                <Header as='h3' textAlign='center'> Meu Carrinho</Header>
            </Item>
            {
                carrinho.itens().map(item => (
                    <Item className='popup-item'>
                        <Item.Image size='tiny' src={item.produto.imagem} />
                        <Item.Content verticalAlign='middle'>
                            {item.produto.nome}
                            <Item.Meta>
                                {item.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Item.Meta>
                        </Item.Content>
                    </Item>
                ))
            }
            <Item className='footer-popup-car'>
                <Item.Content verticalAlign='middle'>
                    <Item as='h4'>
                        Total (valor sem frete): <span className='bold'>R$ {carrinho.totalPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </Item>
                    <div className='modal-carrinho-footer'>
                        <Link to={`${process.env.PUBLIC_URL}/carrinho`} onClick={props.clickIconCar}>
                            Abrir carrinho
                        </Link>
                        <Link to={`${process.env.PUBLIC_URL}`} onClick={props.clickIconCar}>
                            <Button color='green'>Fechar Pedido</Button>
                        </Link>
                    </div>
                </Item.Content>
            </Item>
        </Item.Group>
    } else {
        return <Item.Group divided>
            <Item>
                <Item.Content verticalAlign='middle'>Carrinho Vazio!</Item.Content>
            </Item>
        </Item.Group>
    }
}

const ModalCarrinho = (props: ModalCarrinhoProps) => {
    return <Consumer>
        {(value) => value && (
            ModalContent(props, value.state.cart)
        )}
    </Consumer>
};

export default ModalCarrinho;