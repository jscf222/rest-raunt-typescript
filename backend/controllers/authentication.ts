import { Router, Request, Response } from 'express'
import db from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { User } = db

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({
      where: { email },
    })

    if (!user || !(await bcrypt.compare(password, user.passwordDigest))) {
      return res.status(404).json({ message: 'Could not find a user with the provided email and password' })
    }

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET)

    res.json({ user, token })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/profile', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const [method, token] = authHeader.split(' ')

    if (method !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const userId = decoded.id;
    const user = await User.findOne({
      where: { userId },
    })

    if (!user) {
      return res.status(404).json({ message: `Could not find user with id "${userId}"` })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default router