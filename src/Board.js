import React from 'react';
import './App.css';

class Square extends React.Component{
    render()
    {
        return(
            <button className = "btn" onClick = {this.props.onClick}>
            {this.props.value}
            </button> 
        );
    }
}
class Board extends React.Component
{
    renderSquare(x,y)
    {
        return <Square 
                value = {this.props.square[x][y]}
                onClick = {() => this.props.onClick(x,y)}
                />
    }
    renderAllSquare()
    {
        let n = this.props.n;
        let m = this.props.m;
        let array = Array(n).fill(null);
        for(let i=0;i<n;i++)
        {
            let subarray = Array(m).fill(null);
            for(let j=0;j<m;j++)
            {
                let squarekey = i * m + j;
                let x = i;
                let y = j;
                subarray.push(this.renderSquare(x,y));
            }
            array.push(<div key={i}>{subarray}</div>);
        }
        return array;
    }
    render()
    {
        return(
            <div>
                <div>{this.renderAllSquare()}</div>
            </div>
        );
    }
}
export default Board;
