import { Request, Response, Router } from 'express'
import db from '../models'

const Place = db.Place
const Comment = db.Comment
const User = db.User

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.body.pic) {
      req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.city) {
      req.body.city = 'Anytown'
    }
    if (!req.body.state) {
      req.body.state = 'USA'
    }
    const place = await Place.create(req.body)
    res.json(place)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const places = await Place.findAll()
    res.json(places)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.get('/:placeId', async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)
    if (isNaN(placeId)) {
      return res.status(404).json({ message: `Invalid id "${placeId}"` })
    }

    const place = await Place.findOne({
      where: { placeId: placeId },
      include: {
        association: 'comments',
        include: 'author',
      },
    })

    if (!place) {
      return res.status(404).json({ message: `Could not find place with id "${placeId}"` })
    }

    res.json(place)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.put('/:placeId', async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)
    if (isNaN(placeId)) {
      return res.status(404).json({ message: `Invalid id "${placeId}"` })
    }

    const place = await Place.findOne({
      where: { placeId: placeId },
    })

    if (!place) {
      return res.status(404).json({ message: `Could not find place with id "${placeId}"` })
    }

    Object.assign(place, req.body)
    await place.save()
    res.json(place)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/:placeId', async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)
    if (isNaN(placeId)) {
      return res.status(404).json({ message: `Invalid id "${placeId}"` })
    }

    const place = await Place.findOne({
      where: {
        placeId: placeId,
      },
    })

    if (!place) {
      return res.status(404).json({ message: `Could not find place with id "${placeId}"` })
    }

    await place.destroy()
    res.json(place)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/:placeId/comments', async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)

    req.body.rant = req.body.rant ? true : false

    const place = await Place.findOne({
      where: { placeId: placeId },
    })

    if (!place) {
      return res.status(404).json({ message: `Could not find place with id "${placeId}"` })
    }

    const author = await User.findOne({
      where: { userId: req.body.authorId },
    })

    if (!author) {
      return res.status(404).json({ message: `Could not find author with id "${req.body.authorId}"` })
    }

    const comment = await Comment.create({
      ...req.body,
      placeId: placeId,
    })

    res.json({
      ...comment.toJSON(),
      author,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/:placeId/comments/:commentId', async (req: Request, res: Response) => {
  try {
    const placeId = Number(req.params.placeId)
    const commentId = Number(req.params.commentId)

    if (isNaN(placeId) || isNaN(commentId)) {
      return res.status(404).json({ message: 'Invalid ID' })
    }

    const comment = await Comment.findOne({
      where: { commentId: commentId, placeId: placeId },
    })

    if (!comment) {
      return res.status(404).json({ message: 'Could not find the comment' })
    }

    await comment.destroy()
    res.json(comment)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default router