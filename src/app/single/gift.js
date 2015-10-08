import React from 'react';
import MaterialUI from 'material-ui';
import axios from 'axios';
import Nav from '../tabs/nav';
let { Card, FlatButton, IconButton, RefreshIndicator, List, ListItem, Avatar, ListDivider, RaisedButton } = MaterialUI;
import Colors from 'material-ui/lib/styles/colors';
import Header from '../header';

class SingleGift extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {},
            loading: false,
            redeem: true, 
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
            axios.get('http://busintime.id:5000/sponsor/'+this.context.router.getCurrentParams().id)
                .then((response) => {
                    console.log(response);

                    var item = response.data;
                    var redeem = false;

                    var redeems = localStorage.getItem('redeems');
                    if (redeems == 'undefined' || !redeems) {
                        redeems = [];
                    } else {
                        redeems = JSON.parse(redeems);
                    }

                    
                    if (redeems.indexOf(item.id) > -1) {
                        redeem = true;
                    } else {
                        redeem = false;
                    }

                    this.setState({
                        item: item,
                        loading: false,
                        redeem: redeem
                    });

                    resolve(item);
                });
        });
    }

    componentDidMount() {
        this.refreshData();
    }

    handleRefresh () {
        this.refreshData();
    }

    redeemItem (id) {
        var redeems = localStorage.getItem('redeems');
        if (redeems == 'undefined' || !redeems) {
            redeems = [];
        } else {
            redeems = JSON.parse(redeems);
        }
        if (redeems.indexOf(id) > -1) {
            this.setState({
                redeem: true
            });
        } else {
            redeems.push(id);
            localStorage.setItem('redeems', JSON.stringify(redeems));
            this.setState({
                redeem: true
            });
        }
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
                            <h1>{item.name}</h1>
                            <div className="post-date"><i className="fa fa-clock-o"></i> {item.date}</div>
                        </div>
                        
                        <img src={item.image} />

                        <div style={{padding: '10px'}} dangerouslySetInnerHTML={{__html: item.gift}} />

                        <RaisedButton label="Redeem" fullWidth={true} primary={true} onClick={this.redeemItem.bind(this, item.id)} disabled={this.state.redeem} />
                    </div>
                </div>
            </div>
        );
    }
}

SingleGift.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default SingleGift;