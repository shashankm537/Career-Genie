const express = require('express');
const bcrypt = require('bcrypt');
const notifier = require('node-notifier');
const session = require('express-session');
const Admin = require('../../models/admin');
const Pc = require('../../models/pc');
const Student = require('../../models/student');
const Event = require('../../models/events');
const Drive = require('../../models/drives');
const Apply_drive = require('../../models/apply_drives');
const Apply_event = require('../../models/apply_events');
const Event_student = require('../../models/event_students');
const Drive_student = require('../../models/drive_students');
const Notifications = require('../../models/notifications');
const pc = require('../../models/pc');
const mongoose = require('mongoose');
const route = express.Router();

route.use(express.urlencoded({ extended: true }));

route.use(session({ secret: 'notgoodsecret' }));




route.get('/', (req, res) => {
    res.render('home_head', { title: 'Career geNIE', req: req })
})
route.get('/home_head', async (req, res) => {
    res.render("home_head", { title: 'Home', req: req })
})

route.get('/register_index', async (req, res) => {
    res.render("register_index", { title: 'register', req: req })
})
route.get('/login_index', async (req, res) => {
    res.render("login_index", { title: 'login', req: req })
})
route.get('/faq', async (req, res) => {
    res.render("faq", { title: 'faq', req: req })
})
route.get('/contact', async (req, res) => {
    res.render("contact", { title: 'contact', req: req })
})
route.get('/stats', (req, res) => {
    res.render("stats", { title: 'statistics', req: req })
})
route.get('/admin_page', (req, res) => {
    res.render("admin_page", { title: 'admin_page', req: req })
})


// Admin Register & Login & logout

route.get('/admin_register', (req, res) => {
    res.render("admin_register", { title: 'admin_register', req: req })
})

route.post('/admin_register', async (req, res) => {
    const { password, email } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const admin = new Admin({
        email,
        password: hash
    })
    await admin.save();
    res.redirect('/admin_login');
})

route.get('/admin_login', (req, res) => {

    res.render("admin_login", { title: 'admin_login', req: req })
})

route.post('/admin_login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        res.redirect('/admin_login');

        notifier.notify({
            title: 'Invalid credentials',
            message: 'Please check your username and password',
            sound: true,
            wait: true
        });
    }
    else {
        const validPassword = await bcrypt.compare(password, admin.password);
        if (validPassword) {
            req.session.admin_id = admin._id;
            res.redirect('/admindash');
        }

        else {
            res.redirect('/admin_login');

            notifier.notify({
                title: 'Invalid credentials',
                message: 'Please check your username and password',
                sound: true,
                wait: true
            });
        }
    }
})

route.post('/logout', (req, res) => {
    //req.session.admin_id = null;
    req.session.destroy();
    res.redirect('/home_head');
})

route.get('/admindash', (req, res) => {
    if (req.session.admin_id) {
        res.render("admindash", { title: 'admindash', req: req });
    }
})

route.get('/admin_events', async (req, res) => {
    Event.find()
        .exec()
        .then((result) => {
            res.render('admin_events', { result });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
})

route.get('/admin_drives', async (req, res) => {
    Drive.find()
        .exec()
        .then((result) => {
            res.render('admin_drives', { result });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
})

// PC registration
route.get('/pc_register', (req, res) => {
    res.render("pc_register", { title: 'pc_register', req: req })
})

route.post('/pc_register', async (req, res) => {
    const { usn, firstname, lastname, gender, branch, email, phone, password, active, grad, skills } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const pc = new Pc({
        usn,
        firstname,
        lastname,
        gender,
        branch,
        email,
        phone,
        password: hash,
        active,
        grad,
        skills
    })
    await pc.save();
    res.redirect('/pc_login');
})

route.get('/pc_login', (req, res) => {

    res.render("pc_login", { title: 'pc_login', req: req })
})

route.post('/pc_login', async (req, res) => {
    const { email, password } = req.body;
    const pc = await Pc.findOne({ email });
    if (!pc) {
        res.redirect('/pc_login');

        notifier.notify({
            title: 'Invalid credentials',
            message: 'Please check your username and password',
            sound: true,
            wait: true
        });
    }
    else {
        const validPassword = await bcrypt.compare(password, pc.password);
        if (validPassword && pc.active == 1) {
            req.session.pc_id = pc._id;
            res.redirect('/pcdash');
        }
        else {
            res.redirect('/pc_login');
            if (!validPassword) {
                notifier.notify({
                    title: 'Invalid credentials',
                    message: 'Please check your username and password',
                    sound: true,
                    wait: true
                });
            }
            else {
                notifier.notify({
                    title: 'Admin approval pending',
                    message: 'Wait for the approval of admin',
                    sound: true,
                    wait: true
                });
            }
        }
    }
})

route.get('/pcdash', (req, res) => {
    if (req.session.pc_id) {
        res.render("pcdash", { title: 'pcdash', req: req });
    }
})

//Student registration

route.get('/student_register', (req, res) => {
    res.render("student_register", { title: 'student_register', req: req })
})

route.post('/student_register', async (req, res) => {
    const { usn, firstname, lastname, gender, branch, email, phone, password, tenth, twelfth, cgpa, active, backlogs, grad, skills, dob, age, address, state } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const userDOB = new Date(req.body.dob);
    const student = new Student({
        usn,
        firstname,
        lastname,
        gender,
        branch,
        email,
        phone,
        password: hash,
        tenth,
        twelfth,
        cgpa,
        backlogs,
        active,
        grad,
        dob: userDOB,
        age,
        address,
        state,
        skills
    })
    await student.save();
    res.redirect('/student_login');
})

route.get('/student_login', (req, res) => {
    res.render("student_login", { title: 'student_login', req: req })
})

route.post('/student_login', async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
        res.redirect('/student_login');

        notifier.notify({
            title: 'Invalid credentials',
            message: 'Please check your username and password',
            sound: true,
            wait: true
        });
    }
    else {
        const validPassword = await bcrypt.compare(password, student.password);
        if (validPassword && student.active == 1) {
            req.session.student_id = student.usn;
            res.redirect('/studentdash');
            console.log(req.session.student_id)
        }
        else {
            res.redirect('/student_login');
            if (!validPassword) {
                notifier.notify({
                    title: 'Invalid credentials',
                    message: 'Please check your username and password',
                    sound: true,
                    wait: true
                });
            }
            else {
                notifier.notify({
                    title: 'Admin approval pending',
                    message: 'Wait for the approval of admin',
                    sound: true,
                    wait: true
                });
            }
        }
    }
})

route.get('/studentdash', async (req, res) => {
    if (req.session.student_id) {
        const notifications = await Notifications.find();
        const notify = [];
        for (var i = 0; i < notifications.length; i++) {
            const notificationDate = new Date(notifications[i].date);
            const currentDateMinus24Hrs = new Date(Date.now() - 24 * 60 * 60 * 1000);

            if (notificationDate >= currentDateMinus24Hrs) {
                notify.push(notifications[i]);
            }
        }

        res.render("studentdash", { title: 'studentdash', req: req, notify: notify });
    } else {
        res.redirect('/student_login');
    }
});


// Student approval


route.get('/student_approval', function (req, res) {
    // const collection = genie.collection('mycollection');
    Student.find()
        .exec()
        .then((students) => {
            res.render('student_approval', { req: req, students });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});

// To view student profile by admin

route.get('/view_student/:usn', async (req, res) => {

    const stu = await Student.findOne({ usn: req.params.usn });

    res.render('view_student', { stu: stu });
});


route.post('/student_approved/:usn', async (req, res) => {

    const stu = await Student.findOne({ usn: req.params.usn });
    await stu.updateOne({ $set: { 'active': 1 } });

    Student.find()
        .exec()
        .then((students) => {

            res.redirect('../student_approval')

        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});

route.post('/student_rejected/:usn', async (req, res) => {

    const stu = await Student.findOne({ usn: req.params.usn });
    await stu.updateOne({ $set: { 'active': 0 } });
    //  res.redirect({ students: students }, '/student_approval')
    Student.find()
        .exec()
        .then((students) => {
            //   res.render('student_approval', { students });
            res.redirect('../student_approval')
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});

route.post('/student_deleted/:usn', async (req, res) => {

    const stu = await Student.findOne({ usn: req.params.usn });
    // await stu.updateOne({ $set: { 'active': 0 } });
    await stu.deleteOne();
    //  res.redirect({ students: students }, '/student_approval')
    Student.find()
        .exec()
        .then((students) => {
            // res.render('student_approval', { students });
            res.redirect('../student_approval')
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});



// PC Approval

route.get('/pc_approval', function (req, res) {
    // const collection = genie.collection('mycollection');
    Pc.find()
        .exec()
        .then((pc) => {
            res.render('pc_approval', { req: req, pc });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});

route.get('/view_pc/:usn', async (req, res) => {

    const pc = await Pc.findOne({ usn: req.params.usn });

    res.render('view_pc', { pc: pc });
});


route.post('/pc_approved/:usn', async (req, res) => {

    const pc = await Pc.findOne({ usn: req.params.usn });
    await pc.updateOne({ $set: { 'active': 1 } });
    //  res.redirect({ students: students }, '/student_approval')
    Pc.find()
        .exec()
        .then((pc) => {
            //  res.render('student_approval', { students });
            res.redirect('../pc_approval')

        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});

route.post('/pc_rejected/:usn', async (req, res) => {

    const pc = await Pc.findOne({ usn: req.params.usn });
    await pc.updateOne({ $set: { 'active': 0 } });
    //  res.redirect({ students: students }, '/student_approval')
    Pc.find()
        .exec()
        .then((pc) => {
            //   res.render('student_approval', { students });
            res.redirect('../pc_approval')
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});

route.post('/pc_deleted/:usn', async (req, res) => {

    const pc = await Pc.findOne({ usn: req.params.usn });
    // await stu.updateOne({ $set: { 'active': 0 } });
    await pc.deleteOne();
    //  res.redirect({ students: students }, '/student_approval')
    Pc.find()
        .exec()
        .then((pc) => {
            // res.render('student_approval', { students });
            res.redirect('../pc_approval')
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});



// PC event posting

route.get('/pc_students', function (req, res) {

    Student.find()
        .exec()
        .then((students) => {
            res.render('pc_students', { req: req, students });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
});


route.get('/view_pc_student/:usn', async (req, res) => {

    const stu = await Student.findOne({ usn: req.params.usn });

    res.render('view_pc_student', { stu: stu });
});



route.get('/pc_events', (req, res) => {
    res.render("pc_events", { title: 'pc_events', req: req });
})

route.get('/post_new_event', (req, res) => {
    res.render("post_new_event", { title: 'post_new_event', req: req });
})

route.post('/post_new_event', async (req, res) => {
    const { event_name, company_name, date_of_event, event_desc } = req.body;
    const event_date = new Date(req.body.date_of_event);
    const doc = await Event.findOne().sort({ event_id: -1 }).exec();
    if (!doc) {
        event_id = 1;
    } else {
        event_id = doc.event_id + 1;
    }
    const event = new Event({
        event_id,
        event_name,
        company_name,
        date_of_event: event_date,
        event_desc
    })
    await event.save();
    notifier.notify({
        title: 'Submission recorded',
        message: 'New event posted successfully',
        sound: true,
        wait: true
    });
    res.redirect('/pc_events');
})




// student view and apply for an event



route.get('/student_events', async (req, res) => {
    try {
        const events = await Event.find(); // find all events
        const appliedEvents = [];

        // loop through each event and check if the student has applied for it
        await Promise.all(events.map(async (event) => {
            const isApplied = await Apply_event.findOne({
                applicant: req.session.student_id,
                events_applied: event.event_id,
            });
            const eventDate = new Date(event.date_of_event);
            if (!isApplied && eventDate > Date.now()) {
                appliedEvents.push(event);
            }
        }));

        res.render('student_events', { req: req, events: appliedEvents });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});


route.post('/student_apply_event/:event_id', async (req, res) => {
    try {
        const student = await Student.findOne({ usn: req.session.student_id });
        const { event_id } = req.params;
        const eventdetails = await Event.findOne({ event_id: event_id });
        await Apply_event.create({ applicant: student.usn, events_applied: event_id });
        console.log('Apply_event created successfully.');

        await Event_student.create({
            stuusn: student.usn,
            stufirstname: student.firstname,
            stulastname: student.lastname,
            stubranch: student.branch,
            stuemail: student.email,
            stuevent_name: eventdetails.event_name,
            stucompany_name: eventdetails.company_name,
            studate_of_event: eventdetails.date_of_event,
        });
        console.log('Event_student created successfully.');

        res.redirect('/student_events');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});




//student views the event details

route.get('/view_student_event/:event_id', async (req, res) => {
    const event = await Event.findOne({ event_id: req.params.event_id });

    res.render('view_student_event', { event: event });
})

//View Student list by PC

route.get('/view_student_list_event', async (req, res) => {
    Event_student.find()
        .exec()
        .then((result) => {
            res.render('view_student_list_event', { result });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
})

//View Student list by PC Drives

route.get('/view_student_list_drive', async (req, res) => {
    Drive_student.find()
        .exec()
        .then((result) => {
            res.render('view_student_list_drive', { result });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching students');
        });
})


//PC posting Drives

route.get('/pc_drives', (req, res) => {
    res.render("pc_drives", { title: 'pc_drives', req: req });
})

route.get('/post_new_drive', (req, res) => {
    res.render("post_new_drive", { title: 'post_new_drive', req: req });
})

route.post('/post_new_drive', async (req, res) => {
    const { company_name, offer, ctc, job_desc, date_of_recruitment, comp_desc, last_date, cgpa } = req.body;
    const drive_date = new Date(req.body.date_of_recruitment);
    const date_last = new Date(req.body.last_date);
    const doc = await Drive.findOne().sort({ drive_id: -1 }).exec();
    if (!doc) {
        drive_id = 1;
    } else {
        drive_id = doc.drive_id + 1;
    }
    const drive = new Drive({
        drive_id,
        company_name,
        offer,
        ctc,
        job_desc,
        date_of_recruitment: drive_date,
        comp_desc,
        last_date: date_last,
        cgpa
    })
    await drive.save();
    notifier.notify({
        title: 'Submission recorded',
        message: 'New drive posted successfully',
        sound: true,
        wait: true
    });
    res.redirect('/pc_drives');
})

//PC posting notifications

route.get('/post_notifications', (req, res) => {
    res.render("post_notifications", { title: 'post_notifications', req: req });
})

route.post('/post_notifications', async (req, res) => {
    const { message } = req.body;
    const doc = await Notifications.findOne().sort({ notification_id: -1 }).exec();
    if (!doc) {
        notification_id = 1;
    } else {
        notification_id = doc.notification_id + 1;
    }
    const notification = new Notifications({
        notification_id,
        message,
        date: Date.now(),

    })
    await notification.save();
    notifier.notify({
        title: 'Submission recorded',
        message: 'New notification posted successfully',
        sound: true,
        wait: true
    });
    res.redirect('../pcdash');
})



route.get('/student_drives', async (req, res) => {
    try {
        const drives = await Drive.find(); // find all events
        const appliedDrives = [];

        // loop through each event and check if the student has applied for it
        await Promise.all(drives.map(async (drive) => {
            const isApplied = await Apply_drive.findOne({
                applicant: req.session.student_id,
                drives_applied: drive.drive_id,
            });
            const driveDate = new Date(drive.last_date);
            if (!isApplied && driveDate > Date.now()) {
                appliedDrives.push(drive);
            }
        }));

        res.render('student_drives', { req: req, drives: appliedDrives });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

route.post('/student_apply_drive_aaa/:drive_id', async (req, res) => {
    const drive = await Drive.findOne({ drive_id: req.params.drive_id });
    const stu = await Student.findOne({ usn: req.session.student_id });
    if (drive.cgpa > stu.cgpa) {
        notifier.notify({
            title: 'CGPA criteria is not matching',
            message: 'Sorry... you are not eligible to apply for this job',
            sound: true,
            wait: true
        });
    }
    else
        res.render("student_apply_drive", { drive_id: req.params.drive_id, req: req });
});


route.post('/student_apply_drive', async (req, res) => {
    try {
        const { drive_id, stu_name, gender, cgpa, date_of_birth, skills } = req.body;
        const student = await Student.findOne({ usn: req.session.student_id });
        const drivedetails = await Drive.findOne({ drive_id: drive_id });
        await Apply_drive.create({ applicant: student.usn, drives_applied: drive_id });
        await Drive_student.create({
            stu_usn: student.usn,
            stu_firstname: student.firstname,
            stu_lastname: student.lastname,
            stu_branch: student.branch,
            stu_email: student.email,
            stu_company_name: drivedetails.company_name,
            stu_date_of_recruitment: drivedetails.date_of_recruitment,
            stu_offer: drivedetails.offer
        });

        res.redirect('/student_drives');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

route.get('/view_student_drive/:drive_id', async (req, res) => {
    const drive = await Drive.findOne({ drive_id: req.params.drive_id });

    res.render('view_student_drive', { drive: drive });
})



module.exports = route