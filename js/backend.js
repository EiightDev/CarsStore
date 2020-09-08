//--------------Récupération des données JSON---------------

let oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "js/data.json", true);
oReq.send();
//--------------------------------------------------------

function reqListener() {
    const data = JSON.parse(this.responseText)
    console.log(data)


//----------------------------Gestion Panier
    //envoyer l'objet {id, catégorie, img....}

    function ajouterPanier(produit) {
        let nombreProduit = JSON.parse(localStorage.getItem(`${produit.id}`))
        console.log(`Le nombre de produit est ${nombreProduit}`)
        if ( nombreProduit == null) {
            localStorage.setItem(`${produit.id}`, JSON.stringify(1))
            console.log('le produit est initialisé')
        } else {
            localStorage.setItem(`${produit.id}`, JSON.stringify(nombreProduit += 1 ))
            console.log('le produit est incrémenté')
        }
    }

    function supprPanier(produit) {
        let nombreProduit = JSON.parse(localStorage.getItem(`${produit.id}`))
        console.log(`Le nombre de produit est ${nombreProduit}`)

        if (nombreProduit == 1) {
            localStorage.removeItem(`${produit.id}`)
            console.log('le produit est supprimé')
        } else if (nombreProduit > 1) {
            localStorage.setItem(`${produit.id}`, JSON.stringify(nombreProduit -= 1))
            console.log('le produit est décrémenté')
        } else {
            console.log('Produit pas dans le panier')
        }
    }

    function clearPanier() {
        localStorage.clear()
    }

    let totalCost = 1500000;
    let totalCars = 15;

    //Parcours le localStorage pour retourner le nombre de voiture et leur coût
    function getTotalCost() {
        let sumCars = [0]
        let sumCost = [0]
        for (let indexProduit = 0 ; indexProduit < localStorage.length  ; indexProduit++) {
            let idProduit = localStorage.key(indexProduit)              //id du produit
            let nbrProduit = JSON.parse(localStorage[idProduit])        //nombre de produit
            console.log(`C'est le produit ${idProduit} et il y en a ${nbrProduit}`)
            sumCost.push(data[idProduit].prix * nbrProduit)
            sumCars.push(nbrProduit)
        }
        if (sumCost !== [] && sumCost !== []) {
            totalCost =  sumCost.reduce((result,number)=> result+number);
            totalCars =  sumCars.reduce((result,number)=> result+number);
        }

        console.log(`il y a ${totalCars} voitures pour ${totalCost} €`)
    }

    function applyReduc () {

    }


//-------------------------- TEST PANIER ---------------------------

    let listeAchat = [{'ferrari': 300000}, {'ferrari': 300000}, {'bugatti': 400000}]

//_____________ Données JSON à récupérer _________________


//_____________________________ Apparition du panier _____________________________________

    let panier = document.getElementById('panier')
    let btnPanier = document.getElementById('btnPanier')
    btnPanier.addEventListener('click', function () {
        panier.classList.toggle('none')
    })

//____________________ Lister des articles à acheter ______________________________________


//----------------------- Rétrogradation en React.Conpenent
//_______________ Création des articles selon le type de client

    function createArticle(vehicule) {
        vehicule.forEach(function (car) {

            let article = document.createElement('article')
            article.setAttribute('style', `background-image:url(${vehicule.img})`)
            let h3 = document.createElement('h3')
            h3.innerText = vehicule.modele
            let prix = document.createElement('p')
            prix.innerText = vehicule.prix + ' €'

            let div = document.createElement('div')
            let buttonAchat = document.createElement('button')
            buttonAchat.innerText = 'Acheter'
            buttonAchat.classList.add('achat')
            buttonAchat.setAttribute('onclick', 'appel()')

            div.appendChild(h3)
            div.appendChild(prix)
            div.appendChild(buttonAchat)
            article.appendChild(div)

            let main = document.querySelector('main');
            main.appendChild(article)
        });
    }

//_______________Création des articles dans le panier

    function lineAchat(product, price) {
        let ligneAchat = document.createElement('div')
        let btnClose = document.createElement('a')
        let nomProduct = document.createElement('p')
        nomProduct.innerText = 'Ferrari F430'//product
        let prixProduct = document.createElement('p')
        prixProduct.innerText = '400 000 €' //price

        ligneAchat.appendChild(nomProduct)
        ligneAchat.appendChild(prixProduct)
        ligneAchat.appendChild(btnClose)

        let main = document.getElementById('listeProduit');
        main.appendChild(ligneAchat)
    }
}