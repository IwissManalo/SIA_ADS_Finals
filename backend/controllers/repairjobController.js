const repairJob = require('../model/repairjobs')
const mysqlCon = require('../mysql/mysqlCon')

// Create

module.exports.createRepairJob = (req, res) => {
    const{vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status} = req.body;

    const checkEmployeeQuery = `
        SELECT * FROM employee 
        WHERE (employee_id = ? AND shop_id = ?) 
        OR (employee_id = ? AND manager_id IS NULL)`;

    const checkValues = [employee_id, shop_id, employee_id];

    mysqlCon.query(checkEmployeeQuery, checkValues, (err, results) => {
        if (err) {
            console.error('Error checking employee', err);
            return res.status(500).send('Error checking employee');
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Employee does not belong to the specified shop or is not a manager' });
        }

        const query =`Insert into repairjob( vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status) values (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const values = [vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status];
        
        mysqlCon.query(query, values, (error, result) => {
            if (error) {
                console.error('Error creating repairjob:', error);
                return res.status(500).json({ error: 'Error creating repairjob' });
            }
            res.status(201).json({ "New repairjob": {...req.body, id: result.insertId } });
        })
    })
}

// Read

module.exports.getRepairJobs = (req, res) => {
    const{ vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate,status } = req.body;

    const query = 'Select * from repairjob' ;
    const values = [vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status];

    mysqlCon.query(query, values, (error, result) => {
        if (error) {
            console.error('Error getting repairjobs:', error);
            return res.status(500).json({ error: 'Error getting repairjobs' });
        }
        res.status(200).json(result);
    })
}

// Update

module.exports.updateRepairJob = (req, res) => {
    const{ vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate,status } = req.body;

    const query = `UPDATE repairjob SET vehicle_id = ?, employee_id = ?, shop_id = ?, problem_type =?, description = ?, startDate = ?, endDate = ?, status = ? WHERE id = ?`;
    const values = [vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status];

    mysqlCon.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating repairjob:',err);
            return result.status(500).json({err: 'Error updating repairjob'});
        }
        res.status(200).json(result);
    })
}

// Delete
module.exports.deleteRepairJob = (req, res) => {
    const{ vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate,status } = req.body;
    const query = `DELETE FROM repairjob WHERE id = ?`;
    const values = [vehicle_id, employee_id, shop_id, problemType, description, startDate, endDate, status];
    
    mysqlCon.query (query, values, (err, result) => {
        if(err){
            console.error('Error deleting reparjob:', err);
            return result.status(500).json({err: 'Error deleting reparjob'});
        }
    })
}
