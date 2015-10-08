import React from 'react';
import MaterialUI from 'material-ui';
import axios from 'axios';
import Nav from '../tabs/nav';
let { Card, FlatButton, IconButton, RefreshIndicator, List, ListItem, Avatar, ListDivider } = MaterialUI;
import Colors from 'material-ui/lib/styles/colors';
import Header from '../header';

class SingleNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
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
            axios.get('http://busintime.id:5000/news/'+this.context.router.getCurrentParams().slug)
                .then((response) => {
                    console.log(response);

                    var item = response.data;

                    resolve(item);
                    this.setState({
                        item: item,
                        loading: false
                    });
                });
        });
    }

    componentDidMount() {
        this.refreshData();
    }

    handleRefresh () {
        this.refreshData();
    }

    render() {
        var item = this.state.item;
        var ctr = 0;
        return (
            <div>
                <Header back={true}/>
                <div className="page">
                    <div className="post">
                        {this.state.loading ? (
                            <div className="loading">
                                <RefreshIndicator size={40} left={0} top={0} status="loading" />
                            </div>
                            ) : null}

                        <div className="post-header">
                            <h1>{item.title}</h1>
                            <div className="post-date"><i className="fa fa-clock-o"></i> {item.date}</div>
                        </div>
                        
                        <div dangerouslySetInnerHTML={{__html: item.html}} />
                    </div>
                </div>
            </div>
        );
    }
}

SingleNews.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default SingleNews;