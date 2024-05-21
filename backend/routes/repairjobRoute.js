const express = require ('express')
const router = express.Router()

const repairJobController = require('../controllers/repairjobController')

// Create

router.post('/create', repairJobController.createRepairJob)

// Read

router.get('/', repairJobController.getRepairJobs)

// Update

router.put('/update/:id', repairJobController.updateRepairJob)

// Delete

router.delete('/delete/:id', repairJobController.deleteRepairJob)

module.exports = router;