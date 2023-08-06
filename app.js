//imports
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');
const app = express();

//set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//Create MySQL connection
const connection = mysql.createConnection({
    host: 'webcourse.cs.nuim.ie',
    user: 'u220469',
    password: 'bephug8zoh1Ohpei',
    database: 'cs230_u220469'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


  //Display Data from Tables on the Webpage (Retrieve)
  app.get('/', (req, res) => {
    connection.query('SELECT * FROM tutor_personal_details', (err, tutorResults) => {
      if (err) throw err;
      connection.query('SELECT * FROM student_personal_details', (err, studentResults) => {
        if (err) throw err;
        connection.query('SELECT * FROM Tutorial', (err, tutorialResults) => {
          if (err) throw err;
          res.render('index', { tutorData: tutorResults, studentData: studentResults, tutorialData: tutorialResults });
        });
      });
    });
  });

  
  //Routes and Operations for Tutor Information
  app.get('/add-tutor', (req, res) => {
    res.render('add');
  });
  
  app.post('/add-tutor', (req, res) => {
    const {
      title,
      other_title,
      first_name,
      surname,
      phone_number,
      email_address,
      address_line_1,
      address_line_2,
      town,
      county_city,
      eircode,
    } = req.body;
  
    const newEntry = {
      title,
      other_title,
      first_name,
      surname,
      phone_number,
      email_address,
      address_line_1,
      address_line_2,
      town,
      county_city,
      eircode,
    };
  
    connection.query(
      'INSERT INTO tutor_personal_details SET ?',
      newEntry,
      (err) => {
        if (err) throw err;
        res.redirect('/');
      }
    );
  });
  
  app.get('/edit-tutor/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM tutor_personal_details WHERE id = ?',
      [id],
      (err, results) => {
        if (err) throw err;
        res.render('edit-tutor', { tutorData: results[0] });
      }
    );
  });
  
  app.post('/edit-tutor/:id', (req, res) => {
    const id = req.params.id;
    const {
      title,
      other_title,
      first_name,
      surname,
      phone_number,
      email_address,
      address_line_1,
      address_line_2,
      town,
      county_city,
      eircode,
    } = req.body;
  
    const updatedEntry = {
      title,
      other_title,
      first_name,
      surname,
      phone_number,
      email_address,
      address_line_1,
      address_line_2,
      town,
      county_city,
      eircode,
    };
  
    connection.query(
      'UPDATE tutor_personal_details SET ? WHERE id = ?',
      [updatedEntry, id],
      (err) => {
        if (err) throw err;
        res.redirect('/');
      }
    );
  });
  
  app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
      'DELETE FROM tutor_personal_details WHERE id = ?',
      [id],
      (err) => {
        if (err) throw err;
        res.redirect('/');
      }
    );
  });






//Routes and Operations for Strudent info
app.get('/add-student', (req, res) => {
    res.render('add-student');
  });
  
  app.post('/add-student', (req, res) => {
    const {
        title,
        other_title,
        first_name,
        surname,
        phone_number,
        email_address,
        address_line_1,
        address_line_2,
        town,
        county_city,
        eircode,
        date_of_birth,
        parent_guardian_name,
        attend_tutorial_virtually,
        gender,
        subject,
      } = req.body;
    
      const newEntry = {
        title,
        other_title,
        first_name,
        surname,
        phone_number,
        email_address,
        address_line_1,
        address_line_2,
        town,
        county_city,
        eircode,
        date_of_birth,
        parent_guardian_name,
        attend_tutorial_virtually,
        gender,
        subject,
        }
        
        connection.query(
            'INSERT INTO student_personal_details SET ?',
            newEntry,
            (err) => {
              if (err) throw err;
              res.redirect('/');
            }
          );
    
    });
  
  app.get('/edit-student/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM student_personal_details WHERE id = ?',
      [id],
      (err, results) => {
        if (err) throw err;
        res.render('edit-student', { studentData: results[0] });
      }
    );
  });
  
  app.post('/edit-student/:id', (req, res) => {
    const id = req.params.id;
    const {
      title,
      other_title,
      first_name,
      surname,
      phone_number,
      email_address,
      address_line_1,
      address_line_2,
      town,
      county_city,
      eircode,
      date_of_birth,
      parent_guardian_name,
      attend_tutorial_virtually,
      gender,
      subject,
    } = req.body;
  
    const updatedEntry = {
      title,
      other_title,
      first_name,
      surname,
      phone_number,
      email_address,
      address_line_1,
      address_line_2,
      town,
      county_city,
      eircode,
      date_of_birth,
      parent_guardian_name,
      attend_tutorial_virtually,
      gender,
      subject,
    };
  
    connection.query(
      'UPDATE student_personal_details SET ? WHERE id = ?',
      [updatedEntry, id],
      (err) => {
        if (err) throw err;
        res.redirect('/');
      }
    );
  });
  
app.get('/delete-student/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'DELETE FROM student_personal_details WHERE id = ?',
    [id],
    (err) => {
      if (err) throw err;
      res.redirect('/');
    }
  );
});






//Routes and Operations for Tutorials
app.get('/add-tutorial', (req, res) => {
    res.render('add-tutorial');
  });
  
  app.post('/add-tutorial', (req, res) => {
    const {
      TutorialID,
      TutorialDate,
      TutorialTime,
      Students,
      Tutor,
      Fee,
      TutorialNumber,
      TutorialAttendance,
      TutorialSubject,
      TutorialNotes
    } = req.body;
  
    const newEntry = {
      TutorialID,
      TutorialDate,
      TutorialTime,
      Students,
      Tutor,
      Fee,
      TutorialNumber,
      TutorialAttendance,
      TutorialSubject,
      TutorialNotes
    };
  
    connection.query('INSERT INTO Tutorial SET ?', newEntry, (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  app.get('/edit-tutorial/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM Tutorial WHERE TutorialID = ?', [id], (err, results) => {
      if (err) throw err;
      res.render('edit-tutorial', { tutorialData: results[0] });
    });
  });
  
  app.post('/edit-tutorial/:id', (req, res) => {
    const id = req.params.id;
    const {
      TutorialDate,
      TutorialTime,
      Students,
      Tutor,
      Fee,
      TutorialNumber,
      TutorialAttendance,
      TutorialSubject,
      TutorialNotes
    } = req.body;
  
    const updatedEntry = {
      TutorialDate,
      TutorialTime,
      Students,
      Tutor,
      Fee,
      TutorialNumber,
      TutorialAttendance,
      TutorialSubject,
      TutorialNotes
    };
  
    connection.query('UPDATE Tutorial SET ? WHERE TutorialID = ?', [updatedEntry, id], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
  
  app.post('/delete-tutorial/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM Tutorial WHERE TutorialID = ?', [id], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  });






const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
  