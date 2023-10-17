import { Products,Users } from './types';




 export const  users: Users[] = [
    {
        id:" 1",
        name:"Fulano",
        email : "<fulano@email.com",
        password : "fulano123",
       
    },
    {
        id:" 2" ,
        name :"Ciclano" ,
        email :"<ciclano<EMAIL>",
        password : "<PASSWORD>" ,
        
    },
    {
        id:" 3" ,
        name :"pepeta" ,
        email :"pepeta@EMAIL",
        password : "123456" ,
       
    }
]

export const products: Products[]= [
    {
        id:" 3",
        name:'Notebook',
        price: "R$59876",
        description: 'color black.',
        imageUrl: '/images/notebook.svg'
    },
    {
        id:" 4",
        name:'Smartphone',
        price: "$1000 ",
        description: 'color Blue.' ,
        imageUrl: "/images/smartphone.png"
    },
    {
        id:" 5",
        name:'Chinelo',
        price: "$10 ",
        description: 'color Blue.' ,
        imageUrl: "/images/chinelo.png"
    },
] 

export function createUser(id: string, name: string, email: string, password: string): string  {
    const newUser: Users = {
        id,name,email,password};
        users.push(newUser);
        return `Usuário cadastrado com sucesso!`;
    }

export function getAllUsers(): Users[] {
    return users;
}    
export function createProduct(id: string, name: string, price: string, description: string,
    imageUrl: string): string  {
    const newUserr: Products = {
        id,name,price, description, imageUrl};
        products.push(newUserr);
        return `Usuário ${name} cadastrado com sucesso!`;
    }

export function getAllProducts(): Users[] {
    return users;
}    
export function searchProductsByName( name: string): Products[]  {
    const searchProducts: Products [] =[]
    for(const product of products){
        if (product.name === name){
    
        searchProducts.push(product)};
    }
        return searchProducts;
    
    }


   
    
