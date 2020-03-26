import React, { Component } from 'react';

class FotoHeader extends Component{
    render(){
        return(
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src="https://instagram.fvix1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/62040972_331427394215904_5270398705868996608_n.jpg?_nc_ht=instagram.fvix1-1.fna.fbcdn.net&_nc_ohc=H33pLfpqnqEAX-PJ-GF&oh=a8b06dc1fe97dfdc2358b48bbf580851&oe=5EA4B757" alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <a href="#">
                            alots
                </a>
                    </figcaption>
                </figure>
                <time className="foto-data">03/10/2016 20:13</time>
            </header> 
        )
    }
}

class FotoInfo extends Component{
    render(){
        return(
            <div className="foto-in fo">
              <div className="foto-info-likes">

                <a href="#">
                  alots_ssa
                </a>
                ,
                <a href="#">
                  rafael_rollo
                </a> 
                 curtiram
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, illo?
              </p>

              <ul className="foto-info-comentarios">
                <li className="comentario">
                  <a className="foto-info-autor">seguidor </a>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem ad, molestiae.
                </li>
                <li className="comentario">
                  <a className="foto-info-autor">seguidor </a>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt cumque earum molestias voluptatem modi nihil sit magnam ratione eveniet distinctio magni error asperiores dignissimos tempora expedita, laborum ex soluta hic maiores veritatis deserunt.
                </li>
                <li className="comentario">
                  <a className="foto-info-autor">seguidor </a>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum laudantium quae ab fuga odio delectus maiores voluptatibus sit commodi quidem.
                </li>
              </ul>
            </div>   
        )
    }
}

class FotoAtualizacoes extends Component {
    render(){
        return(
            <section className="fotoAtualizacoes">
            <a href="#" className="fotoAtualizacoes-like">Likar</a>
            <form className="fotoAtualizacoes-form">
              <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
              <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
            </form>

          </section>  
        )
    }
}

export default class FotoItem extends Component {
    render(){
        return(
            <div>
                <div className="foto">
                    <FotoHeader />
                    <img alt="foto" className="foto-src"
                        src="https://instagram.fvix1-1.fna.fbcdn.net/v/t51.2885-15/e35/90396308_104826074404472_9016529115240617825_n.jpg?_nc_ht=instagram.fvix1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=q8QMTFCrHa0AX_m32al&oh=718d1c6434fef504539fcb1e7aaedaef&oe=5EA68107 640w,https://instagram.fvix1-1.fna.fbcdn.net/v/t51.2885-15/e35/90396308_104826074404472_9016529115240617825_n.jpg?_nc_ht=instagram.fvix1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=q8QMTFCrHa0AX_m32al&oh=718d1c6434fef504539fcb1e7aaedaef&oe=5EA68107 750w,https://instagram.fvix1-1.fna.fbcdn.net/v/t51.2885-15/e35/90396308_104826074404472_9016529115240617825_n.jpg?_nc_ht=instagram.fvix1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=q8QMTFCrHa0AX_m32al&oh=718d1c6434fef504539fcb1e7aaedaef&oe=5EA68107" />
                    <FotoInfo /> 
            <FotoAtualizacoes />
                </div>
            </div>
        )
    }

}