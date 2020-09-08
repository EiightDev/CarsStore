

//--------------------------------------------------------
function Articles({data}) {
    return <Article product{data}/>

}

function ArticlesB({product}) {
    return (
        <article style={{backgroundImage: `url(${this.state.img})`}} className={this.state.categorie}>
            <div>
                <h3>{this.state.modele}</h3>
                <p>{this.state.prix} €</p>
                <button id={this.state.id} onClick={this.loger}>Acheter</button>
            </div>
        </article>
    );
}

//--------------------------------------------------
class Article extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        }
    }
    componentDidMount() {
        /*let oReq = new XMLHttpRequest();
        oReq.onload = reqListener;
        oReq.open("get", "js/data.json", true);
        oReq.send();


        function reqListener() {
            const data = JSON.parse(this.responseText);
            console.log(`Data de l'ajax React :\n${data}`);
        }*/
        fetch("js/data.json").then((response) => {
            return  response.json();
        }).then((data) => {
            this.setState({ items: data.data });
        })
    }

    render() {
        let { items } = this.state
        let item = items.map((data,i) => <Articlept key={i} data={data} />);
        return {item}
        /*return (
            <article style={{backgroundImage: `url(${this.state.img})`}} className={this.state.categorie}>
                <div>
                    <h3>{this.state.modele}</h3>
                    <p>{this.state.prix} €</p>
                    <button id={this.state.id} onClick={this.loger}>Acheter</button>
                </div>
            </article>
            );*/
    }

}

class Footer extends React.Component {
    constructor(totalCars, totalCost) {
        super();
        this.state = {
            totalCost: 150000,
            totalCars: 20
        }
    }

    render() {
        return (
            <footer id="footer">
                <div>
                    <p className="nbrCar"><span>{this.state.totalCars}</span> véhicules</p>
                    <p className="total"><span>{this.state.totalCost}</span> €</p>
                </div>
            </footer>
        )
    }
}

function App() {
    return (
        <div>
            <Article/>
            <Footer/>
        </div>
    )
}

class ArticleLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <p>{this.props.id}</p>
                <button>plus</button>
                <p>400000 €</p>
                <button>moins</button>
                <a href="">Close</a>
            </div>
        )
    }
}

//rendu des blocs Articles
ReactDOM.render(
    <App/>,
    document.getElementById('champArticle')
)
//rendu des lignes articles

ReactDOM.render(
    <ArticleLine id={i}/>,
    document.getElementById('listeProduit')
)

