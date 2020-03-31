import { listagem, comentario, like, notifica } from '../actions/actionCreator';

export default class TimeLineApi {

    static lista(urlPerfil) {
        return (dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(listagem(fotos));
                    return fotos;
                });
        })
    }

    static comenta(fotoId, comentario) {
        return (dispatch => {
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
                    dispatch(comentario(fotoId, novoComentario));
                });
        });
    }

    static like(fotoId) {
        //OU X-AUTH-TOKEN VIA HEADER
        return (dispatch => {
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
                    dispatch(like(fotoId, liker));
                });
        })
    }

    static pesquisa(loginPesquisado) {

        let urlPesquisa;

        if (loginPesquisado === '')
            urlPesquisa = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        else
            urlPesquisa = `https://instalura-api.herokuapp.com/api/public/fotos/${loginPesquisado}`;

        return (dispatch => {
            fetch(urlPesquisa)
                .then(response => response.json())
                .then(fotos => {
                    var mensagemNotificacao = fotos.length === 0 ? 'Nenhum resultado encontrado.' : '';
                    dispatch(notifica(mensagemNotificacao));
                    dispatch(listagem(fotos));
                    return fotos;
                });
        });
    }
}