import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    constructor(){
        super();
        this.state = {
            article: [],
            page: 1,
            loading: true,
            totalResults: 0
        }
    }

    async updateNews(){
        this.props.setProgress(10)
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(apiUrl)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState({article: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
        this.props.setProgress(100)
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

    fetchMoreData = async () => {
        this.setState({page: this.state.page+1})
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(apiUrl)
        let parsedData = await data.json()
        this.setState({article: this.state.article.concat(parsedData.articles), totalResults: parsedData.totalResults})
      };

    render() {
        return (
            <>
                <h1 style={{textAlign: "center", margin: "40px 0px"}}>NewsMonkey{this.props.heading}</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner />}
                    >
                    <div className="container">
                        <div className="row my-4">
                        {this.state.article.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                                        <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                        })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}
