import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fetchUrlData = async () => {
        props.setProgress(10);
        setLoading(true)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url)//fetch return a promise
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        // fetch top indian headlines for the very first time when app loads 
        //keep second arg to useEffect as empty so that it will work as componentDidMount i.e. will trigger when loading first time
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        fetchUrlData();
        //eslint-disable-next-line
    }, [] )

    //next and prev button click code to load more articles
    // handleNextClick = async () => {
    //     if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
    //         return
    //     }
    //     setPage(page + 1)
    //     await fetchUrlData();
    // }
    // handlePrevClick = async () => {
    //     setState(page - 1)
    //     await fetchUrlData();
    // }

    //fetching more data for infinite scrolling
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1);//this is an asyncronous function, so it will take some time to update states, hence manually write {page+1} in url
        let data = await fetch(url)//fetch return a promise
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <h2 className='text-center' style={{ margin: '35px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {/* while using next and prev buttons we used below code */}
            {loading && <Spinner />}

            {/* using infinite scrolling to lead more articles */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className="row">
                        {/* return the newsItems */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general'
}
News.propypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
