import React from 'react';
import Router from 'react-router';
import axios from 'axios';
let { Route, Link, RouteHandler, DefaultRoute } = Router;

// material ui theme depedency and setting 
import injectTapEventPlugin from "react-tap-event-plugin";

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';

import AboutPage from './about/aboutPage';

import Instagram from './tabs/instagram';
import Renungan from './tabs/renungan';
import Youtube from './tabs/youtube';
import News from './tabs/news';
import Gift from './tabs/gift';
import SingleNews from './single/news';
import SingleGift from './single/gift';
import Carousel from './carousel';

require("../style/style.scss");

injectTapEventPlugin();

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  }

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount () {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      
    });
    
    this.setState({muiTheme: newMuiTheme});
  }

  render () {
    return (
      <div className="app">
          <RouteHandler/>
      </div>
    );
  }
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

class Exit extends React.Component {
  componentWillMount () {
    navigator.app.exitApp();
  }
  render() {
    return <div/>;
  }
}

var startComponent = Carousel;
var carousel = localStorage.getItem('carousel');
if (carousel == 'undefined' || !carousel) {
  localStorage.setItem('carousel', true);
} else {
  startComponent = News;
}

let routes = (
  <Route name="app" handler={App} path="/">
    <Route name="about" path="/about" handler={AboutPage}/>
    <Route name="instagram" path="/instagram" handler={Instagram}/>
    <Route name="youtube" path="/youtube" handler={Youtube}/>
    <Route name="renungan" path="/renungan" handler={Renungan}/>
    <Route name="news" path="/news" handler={News}/>
    <Route name="gift" path="/gift" handler={Gift}/>
    <Route name="singlenews" path="/news/:slug" handler={SingleNews}/>
    <Route name="singlegift" path="/gift/:id" handler={SingleGift}/>
    <Route name="exit" path="/exit" handler={Exit}/>
    <Route name="carousel" path="/carousel" handler={Carousel}/>
    <DefaultRoute handler={startComponent} />
  </Route>
);

Router.run(routes, (Handler, state) => {
  React.render(<Handler />, document.body);
})

// document.addEventListener("backbutton", function(e) {
//   e.preventDefault();
//   navigator.app.exitApp();
// }, false);

var idPush = 0;

document.addEventListener("deviceready", function(){
    var pushNotification = window.plugins.pushNotification;
    function successHandler (result) {
        console.log('result = ' + result);
    }
    function errorHandler (error) {
        console.log('error = ' + error);
    }
    pushNotification.register(
        successHandler,
        errorHandler,
        {
            "senderID": "1094183435282",
            "ecb": "onNotification"
        });
});

window.onNotification = function (e) {
    idPush++;
    console.log(e);
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                console.log("regID = " + e.regid);
                axios.get('http://busintime.id:5000/gcm/register?regId='+e.regid)
                  .success(function (result) {
                    console.log(result);
                  });
            }
        break;
        case 'message':
            if ( e.foreground )
            {
                cordova.plugins.notification.local.schedule({
                    id: idPush,
                    text: e.payload.message,
                    sound: null,
                });
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                if ( e.coldstart )
                {
                    // $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                    
                    cordova.plugins.notification.local.schedule({
                        id: idPush,
                        text: e.payload.message,
                        sound: null,
                    });
                }
                else
                {
                    // $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    
                    cordova.plugins.notification.local.schedule({
                        id: idPush,
                        text: e.payload.message,
                        sound: null,
                    });
                }
            }
           console.log(e.payload.message, e.payload.msgcnt);
        break;

        case 'error':
            console.log('error', e.msg)
        break;

        default:
            console.log('Unknown')
        break;
    }
}

