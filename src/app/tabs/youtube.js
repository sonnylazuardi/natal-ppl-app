import React from 'react';
import MaterialUI from 'material-ui';
import axios from 'axios';
let { Card, CardHeader, CardTitle, CardText, Avatar, CardMedia, CardActions, FlatButton, IconButton, RefreshIndicator } = MaterialUI;
import Colors from 'material-ui/lib/styles/colors';
import Nav from '../tabs/nav';

class Youtube extends React.Component {
    constructor(props) {
        super(props);
        var youtube = localStorage.getItem('youtube');
        if (youtube == 'undefined' || !youtube) {
            youtube = [];
        } else {
            youtube = JSON.parse(youtube);
        }
        this.state = {
            items: youtube,
            loading: false
        };
        this.props = {
            active: false
        };
    }

    refreshData() {
        return new Promise((resolve, reject) => {
            this.setState({
                loading: true
            });
            axios.get('http://busintime.id:5000/youtube')
                .then((response) => {
                    var items = response.data;

                    localStorage.setItem('youtube', JSON.stringify(items));
                    resolve(items);

                    this.setState({
                        items: items,
                        loading: false
                    });
                });
        });
    }

    componentDidMount() {
        setTimeout(this.refreshData.bind(this), 0);
        // window.WebPullToRefresh.init({
        //     loadingFunction: this.handlePull.bind(this)
        // });
    }

    handlePull () {
        return this.refreshData();
    }


    handleRefresh () {
        this.refreshData();
    }

    handleYoutube (id) {
        // window.open(link, '_blank');
        // navigator.app.loadUrl(link, { openExternal:true });
        YoutubeVideoPlayer.openVideo(id);
    }

    render() {
        var ctr = 0;

        var myItems = this.state.items;
        var items = myItems.map((item) => {
            return (
                <div className="card youtube" key={item.id} onClick={this.handleYoutube.bind(this, item.id)}>
                    <div className="card-image">
                        <img src={item.thumbnail}/>
                    </div>
                    <div className="overlay" />
                    <div className="card-info">
                        <div className="card-title">
                            {item.title}
                        </div>
                        <div className="card-social">
                            <span className="card-date"><i className="fa fa-clock-o"></i> {item.date}</span>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div>
                
                <Nav active="youtube" />

                <div className="content" id="content">

                    {this.state.loading ? (
                        <div className="loading">
                            <RefreshIndicator size={40} left={0} top={0} status="loading" />
                        </div>
                        ) : null}

                    {items}
                </div>

            </div>
        );
    }
}

export default Youtube;