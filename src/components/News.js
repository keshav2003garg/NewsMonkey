import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=>{

    const [article, setArticle] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async ()=>{
        props.setProgress(10)
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(apiUrl)
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        setArticle(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async ()=>{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        let data = await fetch(apiUrl)
        let parsedData = await data.json()
        setArticle(article.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }
    
    return (
        <>
            <h1 style={{textAlign: "center", margin: "90px 0px 40px 0px"}}>NewsMonkey{props.heading}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={article.length}
                next={fetchMoreData}
                hasMore={article.length !== totalResults}
                loader={<Spinner />}
                >
                <div className="container">
                    <div className="row my-4">
                    {article.map((element)=>{
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

export default News