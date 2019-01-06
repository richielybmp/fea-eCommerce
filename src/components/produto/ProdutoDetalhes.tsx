import React from 'react'
import {
    Button,
    Image,
    Segment,
    Container,
    Header,
    Item,
    Icon,
    Input,
    Rating,
    Modal,
    Table,
    Tab
} from 'semantic-ui-react';
import { DataSet } from '../../mock';
import EcommerContext from '../../AppContext';
import './produto.sass'
import { Link } from "react-router-dom";
import Currency from 'react-currency-formatter';
import BreadcrumbTrack from './BreadcrumbTrack';
import { ProdutoType } from './produto';

const rowTableParcelas = (produto: ProdutoType) => {
    let rows = [];
    for (let i = 0; i < 12; i++) {
        rows.push(
            <Item>
                <Table striped size={"large"} className={'table-parcelamento'}>
                    <Table.Body>
                        <Table.Row key={i}>
                            <Table.Cell>{i + 1}x</Table.Cell>
                            <Table.Cell>sem juros</Table.Cell>
                            <Table.Cell textAlign={'right'}>
                                total <Currency quantity={(produto.preco / (i + 1))} currency="BRL" />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Item>
        )
    }
    return rows;
}

const panes = (produto: ProdutoType) => [
    { menuItem: 'Cartão', render: () => <Tab.Pane>{rowTableParcelas(produto)}</Tab.Pane> },
    {
        menuItem: 'Boleto', render: () =>
            <Tab.Pane>
                <Item.Header as={'h4'}>
                    <Currency quantity={(produto.preco - ((produto.preco * 10) / 100))} currency="BRL" /> no boleto bancário
                    <span className='green-text'> (10% de desconto)</span>
                </Item.Header>
                <br />
                <Item>O boleto será gerado após a finalização de sua compra. Imprima e pague no banco ou pague pela internet utilizando o código de barras do boleto.</Item>
            </Tab.Pane>
    },
]

const ProdutoDetalhes = ({ match }: any) => {
    const id = match.params.id;
    return (
        <EcommerContext.Consumer >
            {value => {
                const produto = DataSet.getProdutoById(value!.state.produtos, id);
                return produto ? (
                    <>
                        <BreadcrumbTrack
                            sessao={{ categoria: produto.categoria, nome: produto.nome }}
                        />
                        <Segment placeholder>
                            <Segment className='row-container main-produto-detalhe'>
                                <Container>
                                    <Image src={produto.imagem} size='large' bordered className='image-product' />
                                </Container>

                                <Container className='column-container product-details'>
                                    <Segment size={'large'} padded>
                                        <Item.Header as={'h2'}>{produto.nome}</Item.Header>
                                    </Segment>
                                    <br />

                                    <Segment size={'large'} padded>
                                        <Item.Group divided className={'row-container'}>
                                            <Item.Content>
                                                <Item className="Meta row-container center-row">
                                                    Avaliação:
                                                    <Rating icon='star' defaultRating={produto.rating} maxRating={5} />
                                                </Item>
                                                <Item.Meta as={'h2'}>
                                                    <Currency quantity={produto.preco} currency="BRL" />
                                                </Item.Meta>

                                                <Item.Meta>
                                                    10x de <Currency quantity={(produto.preco / 10)} currency="BRL" /> s/juros
                                                </Item.Meta>
                                            </Item.Content>
                                        </Item.Group>

                                        <Button
                                            positive
                                            size='huge'
                                            as={Link}
                                            disabled={(produto.qtdEstoque <= 0)}
                                            to={`${process.env.PUBLIC_URL}/carrinho`}
                                            onClick={() => value!.dispatch.addToCart(produto.id)}>
                                            <Icon name={'shop'} />
                                            Comprar
                                        </Button>

                                        <br />
                                        <Item.Group divided className={'row-container center-center'}>
                                            <Icon name={'credit card outline'} size={'big'} color={'grey'} />
                                            <Item.Content verticalAlign='middle'>
                                                <Currency quantity={(produto.preco - (produto.preco * 10) / 100)} currency="BRL" /> em 1x no cartão de crédito <span
                                                    className='green-text'>(10% de desconto)</span>
                                            </Item.Content>
                                        </Item.Group>
                                        <Item.Group>
                                            <Item.Content>
                                                <Modal trigger={<a className='cursor-pointer'>Formas de parcelamento</a>} size={"tiny"} closeIcon>
                                                    <Header content='Formas de parcelamento' />
                                                    <Modal.Content>
                                                        {
                                                            <Tab panes={panes(produto)} />
                                                        }
                                                    </Modal.Content>

                                                </Modal>
                                            </Item.Content>
                                        </Item.Group>

                                        {/* Apenas para teste aqui */}
                                        {/*<Button onClick={() => value.dispatch.removeFromCart(produto.id)}>Remover</Button>*/}
                                    </Segment>
                                    <br />
                                    <Segment size={'large'} padded className={'row-container center-center main-produto-detalhe'}>
                                        <p>
                                            Calcular frete:
                                        </p>
                                        <Input action={{ color: 'instagram', content: 'OK' }} placeholder='_____-___' />
                                    </Segment>
                                </Container>
                            </Segment>
                            <Segment>
                                <Container>
                                    <Segment size={'large'} padded>
                                        <Header as={'h2'}>Descrição do Produto</Header>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat nunc porta, varius elit porttitor, aliquet odio. Duis ante est, lacinia sit amet dignissim at, accumsan at nisi. Suspendisse orci dui, pulvinar dignissim ex ut, sagittis ultricies quam. Donec tincidunt eu purus ut facilisis. Sed tellus enim, volutpat eget nisl sodales, viverra euismod tortor. Nam venenatis massa augue, eget varius risus pulvinar sit amet. In ornare augue ut ipsum facilisis ultrices.
                                        </p>
                                        <p>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        <p>- Aenean et elit aliquet, vestibulum ex ut, cursus tellus.</p>
                                        <p>- Aliquam id augue ut massa consectetur consectetur viverra eu mauris.</p>
                                        <p>Etiam sodales augue a magna imperdiet lobortis.</p>
                                        <p>Fusce condimentum nunc at risus dictum elementum.</p>
                                        <p>Pellentesque non magna et lacus gravida consectetur.</p>
                                        <p>Quisque sit amet neque sed est dictum posuere.</p>
                                        <p>Cras id dui nec neque interdum pretium at ut elit.</p>
                                        <p>In at eros ultrices, elementum mi eu, venenatis nulla.</p>
                                        <p>Nam semper ligula in diam convallis, eget finibus enim aliquet.</p>
                                        <p>Etiam ac urna non lectus consequat faucibus ut ac risus.</p>
                                        <p>Quisque pretium diam eu pellentesque faucibus.</p>
                                        <p>Etiam ullamcorper metus a ultricies lobortis.</p>
                                        <p>Donec vulputate mauris non ante tristique condimentum.</p>
                                        <p>Aliquam nec magna vel lacus hendrerit facilisis.</p>

                                    </Segment>
                                </Container>
                            </Segment>

                        </Segment>
                    </>
                ) : (<>Produto não encontrado</>)
            }}
        </EcommerContext.Consumer>
    )
}
export default ProdutoDetalhes;