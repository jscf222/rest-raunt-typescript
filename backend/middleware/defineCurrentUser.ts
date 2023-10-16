import db from "../models"
import jwt from 'json-web-token'

const { User } = db

async function defineCurrentUser(req: { headers: { authorization: { split: (arg0: string) => [any, any] } }, currentUser: null; }, res: any, next: () => void){
    try {
        const [ method, token ] = req.headers.authorization.split(' ')
        if(method == 'Bearer'){
            const result = await jwt.decode('asdljasldkfjs', token,token)
            const { id } = result.value
            let user = await User.findOne({ 
                where: {
                    userId: id
                }
            })
            req.currentUser = user
        }
        next()
    } catch(err){
        req.currentUser = null
        next() 
    }
}

module.exports = defineCurrentUser