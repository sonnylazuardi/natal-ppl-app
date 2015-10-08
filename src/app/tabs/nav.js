import React from 'react';
import MaterialUI from 'material-ui';
import Header from '../header';
let { Tabs, Tab } = MaterialUI;

class Nav extends React.Component {

    constructor (props) {
        super(props);
        this.props = {
            active: 'news'
        };
    }

    moveTab (link) {
        this.context.router.transitionTo(link);
    }
   
    render() {
        return (
            <div>
                <Header />
                <div className="page">
                    <Tabs valueLink={{value: this.props.active, requestChange: () => {}}}>
                        <Tab label={<i className="icon fa fa-newspaper-o"></i>} value="news" onClick={this.moveTab.bind(this, 'news')}>
                        </Tab>
                        <Tab label={<i className="icon fa fa-bookmark"></i>} value="renungan" onClick={this.moveTab.bind(this, 'renungan')}>
                        </Tab>
                        <Tab label={<i className="icon fa fa-instagram"></i>} value="instagram" onClick={this.moveTab.bind(this, 'instagram')}>
                        </Tab>
                        <Tab label={<i className="icon fa fa-youtube-play"></i>} value="youtube" onClick={this.moveTab.bind(this, 'youtube')}>
                        </Tab>
                        <Tab label={<i className="icon fa fa-gift"></i>} value="gift" onClick={this.moveTab.bind(this, 'gift')}>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

Nav.contextTypes = {
    router: React.PropTypes.func
};

export default Nav;