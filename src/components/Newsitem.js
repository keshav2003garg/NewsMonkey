import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="card">
                <div style={{display: "flex", justifyContent: "flex-end", position: "absolute", right: "0"}}>
                    <span className="badge rounded-pill bg-danger">{source}   <span className="visually-hidden"></span></span>
                </div>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on <em><strong>{new Date(date).toGMTString()}</strong></em></small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}
