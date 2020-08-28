const cars = {
    'or': {
        '0': {
            'img': 'adresse1',
            'modele': 'Modele Luxe 1',
            'prix': 19999
        },
        '1': {
            'img': 'adresse1',
            'modele': 'Modele Luxe 2',
            'prix': 29999
        },
        '2': {
            'img': 'adresse1',
            'modele': 'Modele Luxe 3',
            'prix': 39999
        },
        '3': {
            'img': 'adresse1',
            'modele': 'Modele Luxe 4',
            'prix': 49999
        },
        '4': {
            'img': 'adresse1',
            'modele': 'Modele Luxe 5',
            'prix': 59999
        }
    },
    'argent': {
        '0': {
            'img': 'adresse1',
            'modele': 'nom du véhicule A',
            'prix': 14999
        },
        '1': {
            'img': 'adresse1',
            'modele': 'nom du véhicule B',
            'prix': 15999
        },
        '2': {
            'img': 'adresse1',
            'modele': 'nom du véhicule C',
            'prix': 16999
        },
        '3': {
            'img': 'adresse1',
            'modele': 'nom du véhicule D',
            'prix': 17999
        },
        '4': {
            'img': 'adresse1',
            'modele': 'nom du véhicule E',
            'prix': 18999
        }
    },
    'bronze': {
        '0': {
            'img': 'adresse1',
            'modele': 'véhicule nulle',
            'prix': 9999
        },
        '1': {
            'img': 'adresse1',
            'modele': 'véhicule nulle',
            'prix': 8999
        },
        '2': {
            'img': 'adresse1',
            'modele': 'véhicule nulle',
            'prix': 7999
        },
        '3': {
            'img': 'adresse1',
            'modele': 'véhicule nulle',
            'prix': 6999
        },
        '4': {
            'img': 'adresse1',
            'modele': 'véhicule nulle',
            'prix': 5999
        }
    },
}
let tauxReduc



/*
Afficher les card selon la gamme de produit b b+a b+a+o
Modifier le nombre de véhicule selon plus et moins et l'afficher dans le p de la card 
qui changera aussi l'historique du footer


Panier 
    -lister les véhicules achetés avec nombres et prix 
        -enregistrer dans le localStorage
    -afficher les réduction selon le nombres de véhicule et le grade 
    -mettre une croix pour possibilité de supprimer
        -supprimer dans le localStorage
 */

 //Gestion Panier
let ajoutAchat = document.getElementsByClassName('achat')
console.log(ajoutAchat);
for (let btn = 0; btn < ajoutAchat.length; btn++) {
    const element = ajoutAchat[btn];
    element.addEventListener('click', function (event){
        console.log(event);
    })
    
}
//Apparition du panier
let panier = document.getElementById('panier')
let btnPanier = document.getElementById('btnPanier')
btnPanier.addEventListener('click', function () {
    panier.classList.toggle('none')
})

 //lister des articles à acheter
let vehicules = document.getElementById('reduc').addEventListener('change', function () {
    document.querySelector('main').innerHTML = ''

    let gamme = document.getElementById('reduc').value
    let data

    if (gamme == 'bronze') {
        tauxReduc = 5
        data = cars['bronze']
        console.log(data);
    } else if (gamme == 'argent') {
        tauxReduc = 7.5
        data = cars['argent']
        console.log(data);
    } else if (gamme == 'or') {
        tauxReduc = 10
        data = cars['or']
        console.log(data);
    } else {
        data = cars
    }

    for (let vehicule = 0; vehicule in data; vehicule++) {
        const element = data[vehicule];
        console.log(element);
        createArticle(element);
    }

})


//Création des articles selon le client
function createArticle(vehicule) {
    let article = document.createElement('article')
    let img = document.createElement('img')
    img.setAttribute('src', 'https://via.placeholder.com/150') //vehicule.img
    let h3 = document.createElement('h3')
    h3.innerText = vehicule.modele
    let prix = document.createElement('p')
    prix.innerText = vehicule.prix + ' €'

    let div = document.createElement('div')
    let buttonAchat = document.createElement('button')
    buttonAchat.innerText = 'Acheter'
    buttonAchat.classList.add('achat')
    
    div.appendChild(h3)
    div.appendChild(prix)
    div.appendChild(buttonAchat)
    article.appendChild(div)

    let main = document.querySelector('main');
    main.appendChild(article)
}

//Réinitialisation du panier et clear du localStorage
let initialize = document.getElementById('init')
initialize.addEventListener('click', function () {
    let init = confirm('Voulez-vous vous séparer de ces bagnoles ?')
    init == true ? localStorage.clear() : console.log('refus d\'init');
})