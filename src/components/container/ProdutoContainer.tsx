import React from 'react';
import { Container, Icon, Header, Divider } from 'semantic-ui-react';
import Slider from "react-slick";
import "./produtoContainer.sass";
import { Produto } from '../../model/Produto';
import ProdutoCard from '../produto/ProdutoCard';

function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="arrow-next"
            onClick={onClick}
        ><Icon link name='chevron right' size="big" color="violet" /></div>
    );
}

function PrevArrow(props: any) {
    const { onClick } = props;
    return (
        <div
            className="arrow-prev"
            onClick={onClick}
        ><Icon link name='chevron left' size="big" color="violet" /></div>
    );
}

export interface ProductContainerProps {
    nome: string
    produtos: Array<Produto>
}

const ProdutoContainer = (props: ProductContainerProps) => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Container>
            <Header as='h2' color='violet'>{props.nome}</Header>
            <Divider />
            <Slider {...settings} className="my-slider">
                {props.produtos.map(produto => {
                    return (
                        <ProdutoCard
                            key={produto.id}
                            {...produto}
                        />
                    );
                })}
            </Slider>
        </Container>
    );
}

export default ProdutoContainer;