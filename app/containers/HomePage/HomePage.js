import React from 'react';
import './style.scss';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export default class HomePage extends React.PureComponent {

  constructor(){
    super();
    this.state = {
      //181087216071358
      pokemon : []
    }
  }

  componentDidMount(){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'http://pokeapi.co/api/v2/pokemon'
    var list;
    fetch(proxyUrl + targetUrl).then((res) => {
      return res.json();
    }).then((res) => {
      list = res.results.map((el)=>{
        return new Promise((resolve, reject) => {
          fetch(proxyUrl + el.url).then((response)=>{
            return response.json();
          }).then((resp)=>{
            var types = '';
            resp.types.map((el)=>{
              types += el.type.name + ",";
            });
            let obj = {name : resp.name , avatar : resp.sprites.front_shiny, type: types, attribute : resp.species.name}
            resolve(obj);
          })
        })
      })

      Promise.all(list).then((res) => {
        this.setState({pokemon : res})
      })
    })
  }

  render() {
    console.log(this.state.pokemon,'pokemeonnnnnnnnnnnnnnnnnnnnnnnn')
    const data = [];
    this.state.pokemon.map((el)=>{
      data.push(el);
    })
    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Avatar',
      Cell: (row) => {
        return <div><img src={row.original.avatar}/></div>
      },
      accessor: 'avatar'
    }, {
      Header: 'Type',
      accessor: 'type'
    }, {
      Header: 'Attribute',
      accessor: 'attribute'
    }]

    return(
      <ReactTable
        data={data}
        columns={columns}
      />
    )
  }
}

