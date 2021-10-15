import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export default class News extends Component {
    constructor(){
        super();
        this.state = {
            article: [],
            page: 1,
            loading: false
        }
    }

    async updateNews(){
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=60967af5b4474976b9218d53ef16615b&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(apiUrl)
        let parsedData = await data.json()
        this.setState({article: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

    async componentDidMount(){
        this.updateNews()
    }

    handlePreviousClick = async ()=>{
        this.updateNews()
        this.setState({page: this.state.page-1})
    }

    handleNextClick = async ()=>{
        this.updateNews()
        this.setState({page: this.state.page+1})
    }

    render() {
        return (
            <div className="container my-4">
                <h1 style={{textAlign: "center", margin: "40px 0px"}}>NewsMonkey{this.props.heading}</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-4">
                {!this.state.loading && this.state.article.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handlePreviousClick}>&larr;Previous</button>
                    <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}
