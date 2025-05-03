const Newsletter = require ("../models/newsletter")
const nodemailer= require ("nodemailer")
exports.newsletter = async (req, res) => {
    try {
        const newnewsletter = new Newsletter(req.body)
        await newnewsletter.save()
        res.status(201).send({newnewsletter})
    } catch (error) {
        res.status(400).send({msg: "Invalid data", error })
        }
    
}
exports. getNewsletter = async (req, res) => { 
    try {
        const newsletters = await Newsletter.find()
        res.status(200).send({newsletters})
        } catch (error) {
            res.status(500).send({msg: "Failed to get newsletters", error })
            }
}
exports.sendnewsletter = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'skiouichames61@gmail.com',
                pass: 'jcpk mgjo okgj ncfa'
            }
        });
        const newsletters = await Newsletter.find()
        newsletters.forEach(async (newsletter) => {
            const mailOptions = {
                from: 'your_email',
                to: newsletter.email,
                subject: 'Grilli Newsletter',
             html: `
            <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template Preview</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">

  <!-- Email Container -->
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Grilli Restaurant</h1>
      <!-- SVG Logo -->
      <svg width="50" height="50" viewBox="0 0 50 50" style="margin-top: 10px;">
        <circle cx="25" cy="25" r="20" fill="#ecf0f1"/>
        <path d="M15 25 Q25 15 35 25" stroke="#2c3e50" stroke-width="3" fill="none"/>
        <circle cx="25" cy="25" r="5" fill="#2c3e50"/>
      </svg>
    </div>

    <!-- Content -->
    <div style="padding: 20px;">
     
      
      <p style="color: #2c3e50; font-size: 16px; line-height: 1.6;">
       ${req.body.msg}
      </p>

      <!-- Call to Action Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="http://192.168.1.124:3000/" style="background-color: #e67e22; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Take Action</a>
      </div>

      <!-- Promotional Section -->
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #2c3e50; margin-top: 0;">Special Offer!</h3>
        <p style="color: #7f8c8d; margin-bottom: 0;">
          Don't miss out on our latest promotions and special deals.
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #34495e; color: #ffffff; padding: 20px; text-align: center;">
      <p style="margin: 0; font-size: 14px;">
        Follow us on social media
      </p>
      
      <!-- Social Media Icons -->
      <div style="margin: 15px 0;">
        <a href="https://www.facebook.com/GrilliDesign" style="color: #ffffff; text-decoration: none; margin: 0 10px;">
          <i class="fa-brands fa-facebook"></i>
        </a>
       
        <a href="https://www.instagram.com/silvia_grilli/" style="color: #ffffff; text-decoration: none; margin: 0 10px;">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </div>

      <p style="margin: 0; font-size: 12px; color: #bdc3c7;">
        2024 Grilli Restaurant. All rights reserved.<br>
        123 Restaurant Street, Food City, FC 12345
      </p>
      
      <p style="margin: 10px 0 0; font-size: 11px; color: #bdc3c7;">
        If you no longer wish to receive these emails, you can <a href="#" style="color: #ffffff;">unsubscribe here</a>
      </p>
    </div>

  </div>

  <!-- Preview Text -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    Preview text for email clients that support it
  </div>

</body>
</html>

             `
            };
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
        res.status(200).send({msg: "Newsletters sent successfully"})
    } catch (error) {
        res.status(500).send({msg: "Failed to send newsletters", error })
    }
}