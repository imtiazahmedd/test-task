import React from 'react';
import './style.scss';
export default class HomePage extends React.PureComponent {


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
        console.log(res,'resssssssssssssssss')
      })
    })
  }

  render() {
    return(
      <div>
        <h1>testing app</h1>
      </div>
    )
  }
}

