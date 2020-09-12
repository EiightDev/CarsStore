//--------------Récupération des données JSON---------------
var cars;

let oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "./js/data.json", true); //./js/data.json
oReq.send();

//--------------------------------------------------------

function reqListener() {
    const data = JSON.parse(this.responseText)
    cars = data

    for (const key in cars) {
        if (cars.hasOwnProperty(key)) {
            const element = cars[key];
            createArticle(element)
        }
    }

    //-------------------------- TEST PANIER ---------------------------

    function createArticle(vehicule) {
        let article = document.createElement('article')
        article.setAttribute('style', `background-image:url(${vehicule.img})`)
        article.classList.add(`${vehicule.categorie}`)
        let h3 = document.createElement('h3')
        h3.innerText = vehicule.modele
        let prix = document.createElement('p')
        prix.innerText = formatage(vehicule.prix) + ' €'

        let div = document.createElement('div')
        let buttonAchat = document.createElement('button')
        buttonAchat.innerText = 'Acheter'
        buttonAchat.classList.add('achat')
        buttonAchat.setAttribute('id', `${vehicule.id}`)
        buttonAchat.setAttribute('onclick', 'ajouterPanier(cars[id])')

        div.appendChild(h3)
        div.appendChild(prix)
        div.appendChild(buttonAchat)
        article.appendChild(div)

        let main = document.getElementById('champArticle');
        main.appendChild(article)
    }
    getTotalCost()
    majPanier()
}

//---------------------------- Gestion Panier ----------------------------

//envoyer l'objet {id, catégorie, img....}

function ajouterPanier(produit) {
    let nombreProduit = JSON.parse(localStorage.getItem(`${produit.id}`))
    //console.log(`Le nombre de produit est ${nombreProduit}`)
    if (nombreProduit == null) {
        localStorage.setItem(`${produit.id}`, JSON.stringify(1))
        //console.log('le produit est initialisé')
    } else {
        localStorage.setItem(`${produit.id}`, JSON.stringify(nombreProduit += 1))
        //console.log('le produit est incrémenté')
    }
    getTotalCost()
    majPanier()
}

function supprPanier(produit) {
    let nombreProduit = JSON.parse(localStorage.getItem(`${produit.id}`))
    //console.log(`Le nombre de produit est ${nombreProduit}`)

    if (nombreProduit == 1) {

        let r = confirm('le produit sera supprimé')
        if (r == true) {
            localStorage.removeItem(`${produit.id}`)
        }


    } else if (nombreProduit > 1) {
        localStorage.setItem(`${produit.id}`, JSON.stringify(nombreProduit -= 1))
        //console.log('le produit est décrémenté')
    } else {
        console.log('Produit pas dans le panier')
    }
    getTotalCost()
    majPanier()
}
document.getElementById('init') .addEventListener('click', () => {
    if(confirm('Etes-vous sûr de vouloir vider votre panier ?')){
        clearPanier()
    }
    
})
function clearPanier() {
    localStorage.clear()
    getTotalCost()
    majPanier()
}

let totalCost = 1500000;
let totalCars = 15;

//Parcours le localStorage pour retourner le nombre de voitures et leurs coûts
function getTotalCost() {
    let sumCars = [0]
    let sumCost = [0]
    for (let indexProduit = 0; indexProduit < localStorage.length; indexProduit++) {
        let idProduit = localStorage.key(indexProduit)
        let nbrProduit = JSON.parse(localStorage[idProduit])
        //console.log(`C'est le produit ${idProduit} et il y en a ${nbrProduit}`)
        sumCost.push(cars[idProduit].prix * nbrProduit)
        sumCars.push(nbrProduit)
    }
    if (sumCost !== [] && sumCost !== []) {
        totalCost = sumCost.reduce((result, number) => result + number);
        totalCars = sumCars.reduce((result, number) => result + number);
    }
    document.getElementById('mi-panier').innerText = formatage(totalCost) + ' €'

    if (totalCost > 4000000) {
        totalCost = totalCost * 0.9
        document.getElementById('reduc').innerText = '10 %'
    } else if (totalCost > 1000000) {
        totalCost = totalCost * 0.95
        document.getElementById('reduc').innerText = '5 %'
    } else {
        document.getElementById('reduc').innerText = '0 %'
    }

    document.getElementById('mf-panier').innerText = formatage(totalCost) + ' €'
    document.getElementById('nbr-panier').innerText = totalCars
    document.getElementById('totalCost').innerText = formatage(totalCost)
    document.getElementById('totalCars').innerText = totalCars

}

//----------------------- Création des articles dans le panier -------------------------------

function lineAchat(product, nombre) {
    let ligneAchat = document.createElement('div')
    let nomProduct = document.createElement('p')

    let btnPlus = document.createElement('button')
    let nombreProduct = document.createElement('p')
    let btnMoins = document.createElement('button')
    let prixProduct = document.createElement('p')

    nomProduct.innerText = product.modele
    prixProduct.innerText = formatage(product.prix) + ' €'
    nombreProduct.innerText = nombre
    btnPlus.setAttribute('onclick', `ajouterPanier(cars[${product.id}])`)
    btnPlus.innerText = '+'
    btnMoins.setAttribute('onclick', `supprPanier(cars[${product.id}])`)
    btnMoins.innerText = '-'

    ligneAchat.appendChild(nomProduct)
    ligneAchat.appendChild(btnPlus)
    ligneAchat.appendChild(nombreProduct)
    ligneAchat.appendChild(btnMoins)
    ligneAchat.appendChild(prixProduct)

    let main = document.getElementById('listeProduit');
    main.appendChild(ligneAchat)
}

//Apparition du panier
let panier = document.getElementById('panier')
let btnPanier = document.getElementById('btnPanier')
btnPanier.addEventListener('click', function () {
    panier.classList.toggle('none')
})

let btnComfirm = document.getElementById('comfirmation')
btnComfirm.addEventListener('click', () => {
    if (localStorage.length != 0) {
        clearPanier()
        ;alert('Félicitaions pour votre achat !!!')
    } else {
        alert('Votre panier est vide !')
    }
})

function majPanier() {
    document.getElementById('listeProduit').innerText = ''
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            //console.log(key);
            const element = localStorage[key];
            //console.log(element);
            lineAchat(cars[key], localStorage[key])
        }
    }
}

function formatage(nombre){
    //arrondir à l'entier supérieur
    nombre = Math.ceil(nombre)
    strNombre = nombre.toString()
    
    //ajouter un espace tout les trois chiffres
        
    //retourner la chaine de caractére
    return strNombre
}