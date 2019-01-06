import React, { useState } from "react";
import { Search, Image, SearchResultProps } from "semantic-ui-react";
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { ProdutoType } from "../produto/produto";
import EcommerceContext from "../../AppContext";

const defaultRenderer = (props: SearchResultProps) =>
  <Link to={`/produto/${props.chave}`}>
    <div key={props.chave}>
      {props.imagem && <div className='image'> <Image src={props.imagem} /> </div>}
      <div className='content'>
        {props.preco && <div className='price'>{props.preco}</div>}
        {props.nome && <div className='title'>{props.nome}</div>}
        {props.descricao && <div className='description'>{props.descricao}</div>}
      </div>
    </div>
  </Link>


const SearchCategorias = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const clearState = () => {
    setLoading(false);
    setResults([]);
    setValue("");
  }

  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>, source: ProdutoType[]) => {
    setLoading(true);
    setValue(e.currentTarget.value);

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = (result: any) => re.test(result.nome)
      const filteredResults = _.reduce(
        source,
        (memo: any, data: any) => {
          const results = _.filter(data.produtos, isMatch)
          let name = data.nome;
          if (results.length) memo[name] = { name, results }
          return memo
        },
        {},
      )
      setLoading(false);
      setResults(filteredResults);
    }, 300)
  }

  const handleResultSelect = () => { clearState(); };

  return (
    <EcommerceContext.Consumer>
      {
        context => context && (
          <Search
            aligned="right"
            category
            loading={loading}
            resultRenderer={defaultRenderer}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(e => handleSearchChange(e, context.state.produtos), 500, { leading: true })}
            results={results}
            value={value}
          />
        )
      }
    </EcommerceContext.Consumer>
  );
}

export default SearchCategorias;