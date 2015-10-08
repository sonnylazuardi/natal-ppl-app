import React from 'react';
import MaterialUI from 'material-ui';
let { AppBar, LeftNav, MenuItem, IconButton, NavigationClose } = MaterialUI;
import Colors from 'material-ui/lib/styles/colors';
let BackButton = require('material-ui/lib/svg-icons/navigation/arrow-back');

class Header extends React.Component {

    _onLeftIconButtonTouchTap () {
        this.refs.leftNav.toggle();
    }

    _onLeftNavChange (e, key, payload) {
        this.context.router.transitionTo(payload.route);
    }

    _onClick (e) {
        e.preventDefault();
        this.refs.leftNav.toggle();
    }

    _onBack (e) {
        e.preventDefault();
        window.history.back();
    }

    render () {
        var menuItems = [
            { type: MenuItem.Types.SUBHEADER, text: 'Navigasi' },
            { route: 'news', text: 'Berita' },
            { route: 'renungan', text: 'Renungan' },
            { route: 'instagram', text: 'Instagram' },
            { route: 'youtube', text: 'Youtube' },
            { route: 'gift', text: 'Gift' },
            { type: MenuItem.Types.SUBHEADER, text: 'Menu' },
            { route: 'carousel', text: 'Tentang Natal PPL'},
        ];

        return (
            <div className="nav">
                {this.props.back ?
                    <AppBar title={<img src="assets/img/logo-small.png" className="logo-sm"/>} iconElementLeft={<IconButton onClick={this._onBack.bind(this)}><BackButton /></IconButton>} />
                    :
                    <AppBar title={<img src="assets/img/logo-small.png" className="logo-sm"/>} onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)} zDepth={0} />}
                <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this._onLeftNavChange.bind(this)} onClick={this._onClick.bind(this)} />
            </div>
        );
    }
};

Header.contextTypes = {
    router: React.PropTypes.func,
}

Header.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Header;