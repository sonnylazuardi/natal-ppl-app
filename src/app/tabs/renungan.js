import React from 'react';
import MaterialUI from 'material-ui';
import axios from 'axios';
import Nav from '../tabs/nav';

let { Card, FlatButton, IconButton, RefreshIndicator, List, ListItem, Avatar, ListDivider } = MaterialUI;
import Colors from 'material-ui/lib/styles/colors';

class Renungan extends React.Component {
    constructor(props) {
        super(props);
        var renungan = localStorage.getItem('renungan');
        if (renungan == 'undefined' || !renungan) {
            renungan = [];
        } else {
            renungan = JSON.parse(renungan);
        }
        this.state = {
            items: renungan,
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
            axios.get('http://busintime.id:5000/renungan')
                .then((response) => {
                    var items = response.data;

                    localStorage.setItem('renungan', JSON.stringify(items));
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
    }

    handlePull () {
        return this.refreshData();
    }

    handleRefresh () {
        this.refreshData();
    }

    handleClick (slug) {
        this.context.router.transitionTo('singlenews', {slug: slug});
    }

    render() {
        var items = this.state.items;
        var ctr = 0;
        return (
            <div>
                <Nav active="renungan" />
                <div id="content">
                    {this.state.loading ? (
                        <div className="loading">
                            <RefreshIndicator size={40} left={0} top={0} status="loading" />
                        </div>
                        ) : null}
                    <List style={{padding: '0 !important'}}>
                      {items.map((item) => {return (
                        <div className="card" key={item.id} onClick={this.handleClick.bind(this, item.slug)}>
                            <div className="card-image">
                                <img src={item.image}/>
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
                       
                        );}
                      )}
                      
                    </List>
                </div>
            </div>
        );
    }
}

Renungan.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default Renungan;