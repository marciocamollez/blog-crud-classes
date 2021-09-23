import React from 'react';
import { Link } from 'react-router-dom';
import PageTop from '../../components/page-top/page-top.component';
import postsService from '../../services/posts.service';
import './post-list.page.css';

class PostList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            posts: [], //Armazena o Array de posts da API
        }
    }

    //Executar assim que o componente carregar
    componentDidMount(){
        this.loadPosts()
    }

    //Chamar o serviço e carregar os posts
    async loadPosts(){
        try{
            let res = await postsService.list()
            this.setState({ posts: res.data.data })
        } catch(error){
            console.log(error);
            alert("Não foi possível listar os posts")
        }
    }



    render() {
        return(
            <div className="container">
                
                <PageTop title={"Posts"} desc={"Listagem dos posts"}>
                    <button className="btn btn-primary" onClick={() => this.props.history.push('/post-add')}>Adicionar</button>
                </PageTop>

                {/*Percorrendo o array de posts e renderizando*/}
                {this.state.posts.map(post => (
                    <Link to={"/post-detail/" + post.id} key={post.id}>
                        <div className="post-card">
                            <div className="post-card__img">
                                <img src={post.imageUrl} alt="Imagem" />
                            </div>
                            <div className="post-card__text">
                                <h4>{post.title}</h4>
                                <p>{post.content}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        )
    }
}

export default PostList;