import React from 'react';
import './style.scss';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export default class HomePage extends React.PureComponent {

  constructor(){
    super();
    this.state = {
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
            resolve(resp);
          })
        })
      })

      Promise.all(list).then((res) => {
        this.setState({pokemon : res})
      })
    })
  }

  render() {
    console.log(this.state.pokemon,'pokemon***********');

    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    },
    ]
    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Avatar',
      accessor: 'age',
      Cell: props => <span className='number'>{props.value}</span>
    }, {
      id: 'friendName',
      Header: 'Type',
      accessor: d => d.friend.name
    }, {
      Header: props => <span>Friend Age</span>,
      accessor: 'friend.age'
    }]

    return(
      <ReactTable
        showPaginationBottom={false}
        data={data}
        columns={columns}
      />
    )
  }
}

