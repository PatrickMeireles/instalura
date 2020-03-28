import React, { Component } from 'react';
import FotoItem from './Foto';
import PubSub from 'pubsub-js';
import  { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';

export default class Timeline extends Component {

    constructor(props) {
        super(props);

        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    componentWillMount(){
        PubSub.subscribe('timeline', (topico, fotos)=> {
            this.setState({fotos: fotos.fotos})
        })

        PubSub.subscribe('atualiza-liker', (topico, infoLiker) => {
            const fotoFind = this.state.fotos.find(foto => foto.id == infoLiker.fotoId);
            fotoFind.likeada = !fotoFind.likeada;
            const possivelLiker = fotoFind.likers.find(liker => liker.login == infoLiker.liker.login);
            if (possivelLiker === undefined) {
                fotoFind.likers.push(infoLiker.liker);
            }
            else {
                const novosLikers = fotoFind.likers.filter(liker => liker.login !== infoLiker.liker.login);
                fotoFind.likers = novosLikers;
            }
            this.setState({ fotos: this.state.fotos });
        }
        )
      
        PubSub.subscribe('novos-comentarios', (topico, infoComentario) => {
            const fotoFind = this.state.fotos.find(com => com.id == infoComentario.fotoId);
            fotoFind.comentarios.push(infoComentario.novoComentario);
            this.setState({ fotos: this.state.fotos });
        });

    }

    carregaFotos(){
        let urlPerfil;
        if(this.login === undefined){
            urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        }
        else{
            urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
        }
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.setState({ fotos: fotos });
            });
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.login !== undefined){
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    like(fotoId) {
        //OU X-AUTH-TOKEN VIA HEADER
        fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error('Não foi possível realizar o like da foto');
                }
            })
            .then(liker => {                
                PubSub.publish('atualiza-liker', { fotoId: fotoId, liker });
            });
    }

    comenta(fotoId, comentario){
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto: comentario }),
            headers: new Headers({ 'Content-type': 'application/json' })
          }
      
          fetch(`https://instalura-api.herokuapp.com/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            requestInfo)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              else {
                throw new Error('Não foi possível comentar');
              }
            }).
            then(novoComentario => {
              PubSub.publish('novos-comentarios', { fotoId: fotoId, novoComentario })
            });
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like} comenta={ this.comenta }/>)
                    }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}