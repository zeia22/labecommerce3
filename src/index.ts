import { users,products,createUser,getAllUsers } from "./database";
import { searchProductsByName } from "./database";
import  express, { Request, Response} from 'express';
import cors from 'cors'
import { Products, Users } from "./types";

const app = express();

app.use(express());
app.use(cors());

app.listen(3004, ()=>{
    console.log("Servidor rodando na porta 3004"); 

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
  });
    
})
// console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"));

//  const busca = "Notebook"
//  const nomeSearch = searchProductsByName(busca)

//  console.log(getAllUsers());

//  console.table(users);
//  console.table(products);
//  console.log(nomeSearch);

 app.get('/users', (req: Request, res: Response) => {
    try {
        const result: Users[] = users

        if(!result){
            throw new Error("Deu erro")
        }
        res.status(200).send(result)
        
    } catch (error) {
        if(error instanceof Error){

            res.send(error.message)
        }
      
    }
    
    
  });
 app.get('/products', (req: Request, res: Response) => {
    const nameProduct= req.query.name as string
    console.log(products);
    
    
    if(nameProduct){
        const resulta: Products[] = products.filter(
            (produto) => produto.name.toLowerCase().includes(nameProduct.toLowerCase())
            )
            res.status(200).send(resulta)
        }else{
            res.status(200).send(products)
        }
        
    });


    app.post('/users', (req: Request, res: Response) => {
        // const{id,name,email,password} : Users = req.body
         const id: string = req.body.id;
         const name: string = req.body.name;
         const email: string = req.body.email;
         const password: string = req.body.password;

        const newUsers:Users = {
            id ,
            name,
            email,
            password
        }
        users.push(newUsers)
        res.status(200).send('Usuário registrado com sucesso');
      });

      app.delete('/users/:id', (req: Request, res: Response): void => {
        try {
            
            const userDelete: string = req.params.id
    
            const idIndex: number = users.findIndex((usua)=> usua.id === userDelete)
    
            if(idIndex !== -1){
                users.splice(idIndex, 1)
            }
            res.status(200).send("Item deletado com sucesso")
        } catch (error) {
            if(error instanceof Error){
                res.send(error.message)
            }
        }
      });

      app.put('/products/:id', (req: Request, res: Response) => {
        try {
            const productID = req.params.id
        const newId = req.body.id as string | undefined
        const newName = req.body.id as string | undefined
        const newPrice = req.body.id as string | undefined
        const newDescription = req.body.id as string | undefined
        const newImageUrl = req.body.id as string | undefined

        if(typeof newPrice !== 'number' ){
            res.status(404)
            throw new Error("'newType' deve ser do tipo 'number'")
        }

        const produtos = products.find((prod) => prod.id === productID)
        if(produtos){
            produtos.id = newId || produtos.id
            produtos.name = newName || produtos.name
            produtos.price = newPrice || produtos.price
            produtos.description = newDescription || produtos.description 
            produtos.imageUrl = newImageUrl || produtos.imageUrl

            // produtos.price = isNaN(Number(newPrice))? produtos.price : newPrice as number
        }
        res.status(200).send("Atualização realizada com sucesso")
            
        } catch (error) {
            if(error instanceof Error){
                res.send(error.message)
        }
    }
        
      });