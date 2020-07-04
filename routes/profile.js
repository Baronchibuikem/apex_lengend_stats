const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/:platform/:gamerid', async (req, res) => {
    try {
        const headers = {
            'TRN-Api-Key': process.env.TRACKER_API_KEY
        }
        const {platform, gamerid} = req.params

        const response = await fetch(`${process.env.TRACKER_API_URL}/profile/${platform}/${gamerid}`, {headers})
        const data = await response.json()
        if(data.errors && data.errors.length > 0){
            return res.status(400).json({
                message: "profile not found"
            })
        }
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error"
        })
    }
})

module.exports = router