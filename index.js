const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const data = req.body.data;
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: 'Invalid request body' });
  }

  const oddNumbers = [];
  const evenNumbers = [];
  const alphabets = [];
  let userId, email, rollNumber; // Optional fields

  // Process data array
  data.forEach(item => {
    if (!isNaN(item)) {
      const number = parseInt(item);
      if (number % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    } else if (item.match(/^[a-zA-Z]+$/)) {
      alphabets.push(item.toUpperCase());
    }
  });

  // Include optional user data here (if applicable)

  res.json({
    is_success: true,
    odd_numbers: oddNumbers,
    even_numbers: evenNumbers,
    alphabets,
    userId, // Include user ID if applicable
    email,  // Include email if applicable
    rollNumber, // Include roll number if applicable
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
