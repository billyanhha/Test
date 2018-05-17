import React, { Component } from 'react';
import './App.css';
import RowPasCal from './components/RowPasCal';

class App extends Component {
  state = {
    onShow: false,
    rotate: false,
    ss: ['rotate(90deg)'],
  }
  handleChangeText = async (value) => {
    await this.setState({ row: Array.apply(null, Array((parseInt(value ? value : 0) + 1))) });
    this.setState({ onShow: false });
  }
  show = (e) => {
    e.preventDefault();
    this.setState({ onShow: true, ss: [] });
  }
  rotate = async (e) => {
    e.preventDefault();
    let ss = this.state.ISrotate
    await this.setState({ rotate: true, ISrotate: ++ss });
    let arr = this.state.ss;
    arr.push('rotate(90deg)');
    this.setState({ ss: arr })
    let arr_span = await document.getElementsByClassName('span');
    if (arr.length % 4 === 1) {
      for (let index = 0; index < arr_span.length; index++) {
        arr_span[index].style.transform = 'rotate(-90deg)';

      }
    }
    else if (arr.length % 4 === 2) {
      for (let index = 0; index < arr_span.length; index++) {
        arr_span[index].style.transform = 'rotate(-180deg)';

      }
    }
    else if (arr.length % 4 === 3) {
      for (let index = 0; index < arr_span.length; index++) {
        arr_span[index].style.transform = 'rotate(-270deg)';

      }
    }
    else {
      for (let index = 0; index < arr_span.length; index++) {
        arr_span[index].style.transform = 'rotate(-360deg)';

      }
    }
  }
  render() {
    const rowPasCal = (this.state.row ? (this.state.row) : []).map((value, index) => {
        console.log(index);
        
        return <RowPasCal key={index} index={index } />

    })
    return (
      <div className="App" >
        <center><h2 style={{ color: 'red' }}>Pascal Triangle</h2></center>
        <div className="center">
          <form className="form-inline ">
            <h3 >Input here</h3>
            <div className="form-group">

              <input className="form-control" type="number" onChange={e => this.handleChangeText(e.target.value)} />
            </div >
            <button type="submit" onClick={this.show} className="btn btn-default">Generate</button>
          </form>

          <div className="exponent">
            {this.state.onShow ? (
              <div>
                <div className="rotate"
                  style={(
                    this.state.rotate ? this.state.rotate : false) ?
                    { transform: `rotate(${90 * this.state.ss.length}deg) ` } : {}
                  }
                >
                <center><span className="span ssk" style ={{marginBottom : '-10px'}} >1</span></center>
                  {rowPasCal}</div>
                <button className="btn btn-success" style={{ marginTop: '5%' }} onClick={this.rotate}>Rotate <i className="fas fa-play-circle"></i></button>
              </div>
            ) : ''}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
