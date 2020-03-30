import PubSub from 'pubsub-js';

export default class TimeLineStore {

    constructor(fotos){
        this.fotos = fotos;
    }

    lista(urlPerfil){
        fetch(urlPerfil)
        .then(response => response.json())
        .then(fotos => {
            this.fotos = fotos;
            PubSub.publish('timeline', this.fotos);
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
                const fotoFind = this.fotos.find(com => com.id == fotoId);
                fotoFind.comentarios.push(novoComentario);
                PubSub.publish('timeline', this.fotos);
            });
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
                const fotoFind = this.fotos.find(foto => foto.id == fotoId);
                fotoFind.likeada = !fotoFind.likeada;
                const possivelLiker = fotoFind.likers.find(likerAtual => likerAtual.login == liker.login);
                if (possivelLiker === undefined) {
                    fotoFind.likers.push(liker);
                }
                else {
                    const novosLikers = fotoFind.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoFind.likers = novosLikers;
                }

                PubSub.publish('timeline', this.fotos);                
            });
    }

    subscribe(callback){
        PubSub.subscribe('timeline', (topico, fotos) => {
            callback(fotos);
        })
    }
}