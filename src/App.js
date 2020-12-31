import './App.css';
import Gifts from "./Data"
import React from "react";

class App extends React.Component{
  state={
    index: 0,
    search: [],
    gifts: [],
    backDisabled:true,
    nextDisabled:false,
   
  };
  handleBack=()=>{
    if(this.state.index>0){
      this.setState({index: this.state.index-1})
    } 
    if(this.state.index-1===0){
      this.setState({backDisabled:true})
    }
    else(this.setState({backDisabled:false}))
    if(this.state.index-1===this.state.gifts.length-1){
      this.setState({nextDisabled:true})
    }
    else(this.setState({nextDisabled:false}))
  }

  handleNext=()=>{
    console.log('hi')
    if(this.state.index+1<this.state.gifts.length){
      this.setState({index: this.state.index+1, backDisabled:false})
    }
    if(this.state.index+1===this.state.gifts.length-1){
      this.setState({nextDisabled:true})
    }
    else(this.setState({nextDisabled:false}))
  }
  handleCount=(count)=>{
    const gifts=[...this.state.gifts]
    const currentGift= gifts[this.state.index]
    currentGift.count= count + 1
    this.setState({gifts: gifts})
  }
  handleRestart=()=>{
    this.setState({index: 0,backDisabled:true, nextDisabled:false, search: [], gifts: []})
  }

  handleSearch=(e)=>{
    let search = this.state.search
    if(search.includes(e.target.innerHTML)){
      search = search.filter(item=> item !=e.target.innerHTML)
    }
    else(search.push(e.target.innerHTML))
    this.setState({search: search})
    let gifts= Gifts.filter(gift => gift.tags.find(tag=> search.includes(tag))).sort((a,b)=>(b.count-a.count))
    console.log(this.state.gifts)
    console.log(gifts)
    this.setState({index: 0, backDisabled:true, gifts: gifts})

    if(gifts.length<2){
      this.setState({nextDisabled:true})
    }
    else(this.setState({nextDisabled:false}))
}
  render(){
  let {index,gifts,search,backDisabled,nextDisabled}=this.state;
  console.log(search)
  return(
    <div className="App">
      <header className="App-header">
      </header>
      <div className='Main'><h1 onClick={()=>this.handleRestart()}>Sustainable Gift Recommendations</h1>
          <form className='button' >
          {search.includes("Clothing")
          ?(<label className="Selected" onClick={(e)=>this.handleSearch(e)}>Clothing</label>)
          :(<label onClick={(e)=>this.handleSearch(e)}>Clothing</label>)}
                    {search.includes("Home")
          ?(<label className="Selected" onClick={(e)=>this.handleSearch(e)}>Home</label>)
          :(<label onClick={(e)=>this.handleSearch(e)}>Home</label>)}
                    {search.includes("Travel")
          ?(<label className="Selected" onClick={(e)=>this.handleSearch(e)}>Travel</label>)
          :(<label onClick={(e)=>this.handleSearch(e)}>Travel</label>)}
          </form>
          {gifts.length>0 && gifts
          ?(<><p>{gifts.length} results:</p>
          <h2><a onClick={()=>this.handleCount(gifts[index].count)} target="_blank" rel="noreferrer" href={gifts[index].link}>{gifts[index].object}</a></h2>
          <h3>{gifts[index].description}</h3>
          <h3>{index+1}/{gifts.length}</h3>
          <div className='button' >
          <button disabled={backDisabled} onClick={this.handleBack}>Back</button>
          <br/><br/> 
          <button disabled={nextDisabled} onClick={this.handleNext}>Next</button></div> </>)
          :(<h2>Click at least one category to see recs!</h2>)
          }
      </div>
    </div>
  )}
}

export default App;
