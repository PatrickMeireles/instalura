//REDUCER
export function timeline(state = [], action) {
  if (action.type === 'LISTAGEM')
    return action.fotos;

  if (action.type === 'COMENTARIO') {
    const fotoFind = state.find(com => com.id == action.fotoId);
    fotoFind.comentarios.push(action.novoComentario);
    return state;
  }

  if (action.type === 'LIKE') {
    const fotoFind = state.find(foto => foto.id == action.fotoId);
    fotoFind.likeada = !fotoFind.likeada;
    const possivelLiker = fotoFind.likers.find(likerAtual => likerAtual.login == action.liker.login);
    if (possivelLiker === undefined) {
      fotoFind.likers.push(action.liker);
    }
    else {
      const novosLikers = fotoFind.likers.filter(likerAtual => likerAtual.login !== action.liker.login);
      fotoFind.likers = novosLikers;
    }
    return state;
  }

  return state;
}