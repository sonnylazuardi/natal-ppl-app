import React from 'react';
import MaterialUI from 'material-ui';
import axios from 'axios';
import Nav from '../tabs/nav';
let { Card, CardHeader, CardTitle, CardText, Avatar, CardMedia, CardActions, FlatButton, IconButton, RefreshIndicator } = MaterialUI;

import Colors from 'material-ui/lib/styles/colors';

class Instagram extends React.Component {
    constructor(props) {
        super(props);
        var instagram = localStorage.getItem('instagram');
        if (instagram == 'undefined' || !instagram) {
            instagram = [];
        } else {
            instagram = JSON.parse(instagram);
        }
        this.state = {
            items: instagram,
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
            axios.get('http://busintime.id:5000/instagram')
                .then((response) => {
                    var items = response.data;

                    localStorage.setItem('instagram', JSON.stringify(items));
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

    handleZoom (imageSmall, imageBig) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        // build items array
        var items = [
            {
                src: imageBig,
                w: 640,
                h: 640
            }
        ];

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {index: 0});
        gallery.init();
    }

    handleToInstagram (link) {
        // window.open(link, '_blank');
        navigator.app.loadUrl(link, { openExternal:true });
    }

    render() {
        var myItems = this.state.items;
        var items = myItems.map((item) => {
            return (
                <div className="card" key={item.id} onClick={this.handleZoom.bind(this, item.image, item.imageBig)}>
                    <div className="card-image">
                        <img src={item.image}/>
                    </div>
                    <div className="overlay" />
                    <div className="card-info">
                        <div className="card-title" onClick={this.handleToInstagram.bind(this, item.link)}>
                            {item.caption}
                        </div>
                        <div className="card-social">
                            <span className="card-date"><i className="fa fa-clock-o"></i> {item.date}</span>
                            <span className="card-stat">{item.commentCount} <i className="fa fa-comment"></i></span>
                            <span className="card-stat">{item.likeCount} <i className="fa fa-heart"></i></span>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <Nav active="instagram" />
                
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

Instagram.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default Instagram;