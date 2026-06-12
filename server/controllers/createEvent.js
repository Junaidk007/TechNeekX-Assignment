const Event = require('../model/Event');


const createEvent = async (req, res) => {
    const { eventName, category, date, time, registrations } = req.body;

    if (!eventName || !category || !date || !time || registrations === undefined) {
        return res.status(400).json({
            success: false,
            error: "Missing required fields: eventName, category, date, time, registrations"
        });
    }

    let newEvent = new Event({
        eventName,
        category,
        date: new Date(date),
        time,
        registrations: Number(registrations)
    });
    await newEvent.save();

    res.status(201).json({
        success: true,
        data: newEvent
    });
};

module.exports = createEvent;
