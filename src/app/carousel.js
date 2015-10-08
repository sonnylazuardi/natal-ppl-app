var React = require('react');
var ReactSwipe = require('react-swipe');
import MaterialUI from 'material-ui';
let { RaisedButton } = MaterialUI;

class Carousel extends React.Component{
    next () {
        this.refs.ReactSwipe.swipe.next();
    }
    start () {
        this.context.router.transitionTo('news');
    }
    render () {
        return (
            <div className="full-blue">
                <ReactSwipe
                    continuous={false}
                    ref="ReactSwipe"
                    id="mySwipe">
                    <div className="slide-wrap">
                        <div className="slide-item">
                            <img src="assets/img/rusa.png" />
                            <div className="slide-title">
                                Natal GBI PPL 2015
                            </div>
                            <div className="slide-description">
                                pada tahun 2015 ini acara natal gabungan GBI PPL akan diadakan pada tanggal 13
                                Desember 2015 di Sabuga ITB. Acara natal merupakan natal gabungan baik untuk
                                anak-anak, remaja maupun dewasa.
                            </div> 
                            <div className="slide-button">
                                <RaisedButton label="Selanjutnya" fullWidth={true} primary={true} onClick={this.next.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="slide-wrap">
                        <div className="slide-item">
                            <img src="assets/img/rusa.png" />
                            <div className="slide-title">
                                Menjadi Saksi Kristus
                            </div>
                            <div className="slide-description">
                                Menjadi Saksi Kristus artinya hidup kita mencerminkan Kristus. Perkataan dan perbuatan (karakter kita) seperti Kristus (karakter Kristus).
                                Orang melihat kita seperti melihat Kristus... <i className="fa fa-smile-o"></i>
                            </div> 
                            <div className="slide-button">
                                <RaisedButton label="Mulai" fullWidth={true} primary={true} onClick={this.start.bind(this)} />
                            </div>
                        </div>
                    </div>
                </ReactSwipe>
            </div>
        );
    }
};

Carousel.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default Carousel;