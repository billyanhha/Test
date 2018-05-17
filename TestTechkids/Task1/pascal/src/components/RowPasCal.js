import React, { Component } from 'react'


class RowPasCal extends Component {


    frac = (e) =>{
        if(e == 0 || e==1) return 1;
        return e*this.frac(e-1);
    }
    ncr = (value , index) =>{
        // if(value ===0 && index === 1 ) return '';
        let mul = this.frac(index) / (this.frac(value) * this.frac(index -value));
        console.log(mul)
        if(mul > 100000) {mul = mul.toString().substring(0,6).concat('....') ; console.log(mul)};
        return mul;
    }
    render() {
        const row = Array.apply(null , Array(this.props.index ? (this.props.index +1) : 0)).map((value , index)=>{
            if(this.props.index === 1 && index === 0 ) return;
            if(this.props.index === 1 && index === 1 ) return (  <span key ={index} className="span" style={{fontSize:'19px'}}> { this.ncr(index , this.props.index)  }</span>)
            return (  <span key ={index} className="span"> { this.ncr(index , this.props.index)  }</span>)
        })
        return (
            <div className="row" >
                
                   {row}
                
            </div>
        );



    }
}

export default RowPasCal;