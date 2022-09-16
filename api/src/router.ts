import { NextFunction, Router, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const router = Router()
const SECRET = process.env.SECRET || 'testejwt'

interface ITokenPayload {
    userId: string,
    iat: number;
    exp: number;
}

router.get('/', (request, response) => {
    return response.json({ msg: 'Index'})
})

function verifyJWT(request: Request, response: Response, next: NextFunction) {
    const { authorization }= request.headers
   
    if(!authorization) return response.status(401).json({ auth: false, mesage: 'No token provide'})
   
    const token = authorization.replace('Bearer', '').trim()

    try {
        const data = jwt.verify(token, SECRET)
        
        const { userId } = data as ITokenPayload
        request.userId = userId
        next()

        
    } catch {
        return response.status(401).json({ auth: false, mesage: 'Failed to authenticate token'})
    }
}

router.get('/clientes', verifyJWT, (request, response) => {
    response.json([
        { id: 1, nome: 'Cliente A' },
        { id: 2, nome: 'Cliente B' },
        { id: 3, nome: 'Cliente C' },
        { id: 4, nome: 'Cliente D' },
    ])
})

router.post('/login', (request, response) => {
    const { name, password } = request.body
    if(name === 'admin' && password === '123456') {
        const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 60 }) //expiresIn 300 equivale a 5 minutos (60seg x 5)

        return response.status(200).json({ auth: true, token})
    }

    response.status(401).json({ res: "Usuário/senha invalidos!"})
})

router.post('/logout', (request, response) => {
    response.status(200).json({ res: "Usuário deslogado"})
})

export default router