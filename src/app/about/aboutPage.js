import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Router from 'react-router';
import Header from '../header';

class About extends React.Component {

  handleTransition () {
    this.context.router.transitionTo('instagram');
  }

  handleAbout () {
    // window.open('http://sonnylab.com', '_blank');
    navigator.app.loadUrl('http://sonnylab.com/', { openExternal:true });
  }
  
  render () {
    return (
      <div>
        <Header back={true}/>
        <div className="page">
          <div className="padding">
            <h1>
              Natal PPL App
            </h1>

            <p>
              Natal GBI PPL 2015
            </p>

            <RaisedButton label="@sonnylazuardi" linkButton={true} labelStyle={{textTransform: 'inherit'}} onClick={this.handleAbout.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
};

About.contextTypes = {
  router: React.PropTypes.func,
};

module.exports = About;