import React from 'react'

const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, author, publishedAt, source } = props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0}}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>
                    </div>
                    
                    <img src={imageUrl ? imageUrl : "https://cdn.benzinga.com/files/images/story/2024/07/03/earnings.jpeg?width=1200&height=800&fit=crop"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {publishedAt ? new Date(publishedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }) : "Unknown"}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
