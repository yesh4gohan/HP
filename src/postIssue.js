import React, { Component } from 'react';
import "./postIssue.css";


export default class PostIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            InfoClick: false,
            tags: [],
            desc: "",
            title: "",
            disableSubmit: true

        };
        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.pushTag = this.pushTag.bind(this);
    }
    pushTag(e) {
        let prom = new Promise((res, rej) => {
            let latest_tags = [...this.state.tags];
        if (latest_tags.indexOf(e.target.value) >= 0) {
            latest_tags.splice(latest_tags.indexOf(e.target.value), 1);
        }
        else {
            latest_tags.push(e.target.value);
        }
        this.setState({ tags: latest_tags });
        res();
        })
        prom.then(()=>{
        this.handleSubmitDisable();
        })
    }
    onChange(e) {
        let prom = new Promise((res, rej) => {
            this.setState({ [e.target.id]: e.target.value });
            res();
        })
        prom.then(() => {
            this.handleSubmitDisable();
        })
    }
    submit(e) {
        e.preventDefault();
        const body = {
            issueId:`issue-${Math.floor((Math.random()*1000))}`,
            postDescription:this.state.desc,
            postTitle:this.state.title,
            tags:this.state.tags
        }
        console.log(body);
    }
    handleSubmitDisable() {
        let { desc, title, tags } = this.state;
        if (desc.length && title.length && tags.length) {
            this.setState({ disableSubmit: false });
        }
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="title">Issue Title</label>
                        </div>

                        <div className="col-75">
                            <input type="text" id="title" value={this.state.title} name="firstname" placeholder="nice title for issue" onChange={this.onChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="Tags">Tags</label>
                        </div>
                        <div className="col-75">
                            <input type="checkbox" onChange={this.pushTag} value="Exception">Exception</input>
                            <input type="checkbox" onChange={this.pushTag} value="Workspace">Workspace</input>
                            <input type="checkbox" onChange={this.pushTag} value="server">server</input>
                            <input type="checkbox" onChange={this.pushTag} value="general">general</input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="desc">Short Description</label>
                        </div>
                        <div className="col-75">
                            <textarea onChange={this.onChange} id="desc" name="description" value={this.state.desc} placeholder="Short issue description.."></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" disabled = {this.state.disableSubmit}>submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
