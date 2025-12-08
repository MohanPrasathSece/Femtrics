// Email service utility using Gmail SMTP
// Full implementation with file attachments and confirmation emails

interface EmailData {
  to?: string;
  subject: string;
  message: string;
  from?: string;
  fromName?: string;
  cc?: string;
  bcc?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

interface FormData {
  file?: File;
  [key: string]: any;
}

export const sendEmailWithGmailSMTP = async (emailData: EmailData, formData?: FormData): Promise<boolean> => {
  try {
    // Send simple form data for contact form
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: emailData.fromName || 'Anonymous',
        email: emailData.from || 'unknown@example.com',
        subject: emailData.subject,
        message: emailData.message
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email via Gmail SMTP:', error);
    return false;
  }
};

export const sendConfirmationEmail = async (userData: {
  name: string;
  email: string;
  formType: string;
  customMessage?: string;
}): Promise<boolean> => {
  try {
    const confirmationMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Femtrics</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Empowering Women Entrepreneurs with Data</p>
        </div>
        
        <div style="background: #f9fafb; padding: 40px 30px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Thank You for Your ${userData.formType}!</h2>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 25px;">
            Dear <strong>${userData.name}</strong>,
          </p>
          
          <div style="background: white; padding: 25px; border-radius: 10px; border-left: 4px solid #ec4899; margin-bottom: 25px;">
            ${userData.customMessage || `
              <p style="color: #374151; margin: 0 0 15px;">
                We have received your ${userData.formType.toLowerCase()} and our team will review it carefully.
              </p>
              <p style="color: #374151; margin: 0;">
                We'll contact you within 2-3 business days to discuss the next steps.
              </p>
            `}
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #92400e; margin: 0 0 10px;">What's Next?</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our team will review your application</li>
              <li style="margin-bottom: 8px;">We'll contact you for a consultation call</li>
              <li>Your personalized dashboard will be set up (if applicable)</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://femtrics.com" style="background: #ec4899; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit Our Website
            </a>
          </div>
        </div>
        
        <div style="background: #1f2937; color: white; padding: 30px; text-align: center;">
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">
            © 2024 Femtrics. All rights reserved.
          </p>
          <p style="margin: 10px 0 0; font-size: 12px; opacity: 0.6;">
            This is an automated message. Please do not reply to this email.
          </p>
        </div>
      </div>
    `;

    // Use the same server that serves the frontend
    const response = await fetch('/api/send-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: userData.email,
        subject: `Confirmation: Your ${userData.formType} - Femtrics`,
        message: confirmationMessage,
        from: 'noreply@femtrics.com'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Confirmation email sent:', result.messageId);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
};

// Helper functions for different form types
export const createWorkshopRegistrationEmail = (formData: any) => {
  const isGroup = formData.signupType === 'group';
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 32px;">New Workshop Registration</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">Stephanie Registration System</p>
      </div>
      
      <div style="background: #f9fafb; padding: 40px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            ${isGroup ? 'Group' : 'Individual'} Registration Details
          </h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Registration Type</h3>
              <p style="color: #1f2937; font-weight: bold; margin: 0;">${isGroup ? 'Group' : 'Individual'}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Submitted On</h3>
              <p style="color: #1f2937; margin: 0;">${new Date().toLocaleString()}</p>
            </div>
          </div>
          
          ${isGroup ? `
            <div style="margin-top: 30px;">
              <h3 style="color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Group Details</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div>
                  <strong>Group Name:</strong><br>
                  <span style="color: #374151;">${formData.groupName}</span>
                </div>
                <div>
                  <strong>Group Size:</strong><br>
                  <span style="color: #374151;">${formData.groupSize} participants</span>
                </div>
                <div>
                  <strong>Contact Email:</strong><br>
                  <span style="color: #374151;">${formData.email}</span>
                </div>
                <div>
                  <strong>Contact Phone:</strong><br>
                  <span style="color: #374151;">${formData.phone}</span>
                </div>
                <div style="grid-column: 1 / -1;">
                  <strong>Participant File:</strong><br>
                  <span style="color: #374151;">${formData.participantFile ? formData.participantFile.name : 'No file uploaded'}</span>
                </div>
                <div style="grid-column: 1 / -1;">
                  <strong>Total Participants:</strong><br>
                  <span style="color: #374151;">${formData.participants.length}</span>
                </div>
              </div>
            </div>
          ` : `
            <div style="margin-top: 30px;">
              <h3 style="color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Individual Details</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div>
                  <strong>Full Name:</strong><br>
                  <span style="color: #374151;">${formData.name}</span>
                </div>
                <div>
                  <strong>Email:</strong><br>
                  <span style="color: #374151;">${formData.email}</span>
                </div>
                <div style="grid-column: 1 / -1;">
                  <strong>Phone:</strong><br>
                  <span style="color: #374151;">${formData.phone}</span>
                </div>
              </div>
            </div>
          `}
          
          <div style="margin-top: 30px;">
            <h3 style="color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Workshop Details</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
              <div>
                <strong>Workshop:</strong><br>
                <span style="color: #374151;">${formData.workshop}</span>
              </div>
              <div>
                <strong>Date:</strong><br>
                <span style="color: #374151;">${formData.date}</span>
              </div>
              <div>
                <strong>Time:</strong><br>
                <span style="color: #374151;">${formData.time}</span>
              </div>
              <div>
                <strong>Location:</strong><br>
                <span style="color: #374151;">${formData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return {
    to: 'harshinik290@gmail.com',
    subject: `New Workshop Registration - ${formData.workshop}`,
    message: emailContent,
    from: formData.email,
    attachments: formData.participantFile ? [{
      filename: formData.participantFile.name,
      content: formData.participantFile,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }] : []
  };
};

export const createContactEmail = (formData: any) => {
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 32px;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">Femtrics Contact System</p>
      </div>
      
      <div style="background: #f9fafb; padding: 40px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            Contact Details
          </h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Name</h3>
              <p style="color: #1f2937; font-weight: bold; margin: 0;">${formData.name}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Submitted On</h3>
              <p style="color: #1f2937; margin: 0;">${new Date().toLocaleString()}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Email</h3>
              <p style="color: #1f2937; margin: 0;">${formData.email}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Phone</h3>
              <p style="color: #1f2937; margin: 0;">${formData.phone}</p>
            </div>
            
            <div style="grid-column: 1 / -1;">
              <h3 style="color: #4b5563; margin: 0 0 5px;">Business Type</h3>
              <p style="color: #1f2937; margin: 0;">${formData.businessType}</p>
            </div>
            
            <div style="grid-column: 1 / -1;">
              <h3 style="color: #4b5563; margin: 0 0 5px;">Message</h3>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px;">
                <p style="color: #374151; margin: 0; white-space: pre-wrap;">${formData.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return {
    to: 'harshinik290@gmail.com',
    subject: `New Contact Form Submission - ${formData.name}`,
    message: emailContent,
    from: formData.email
  };
};

export const createJoinEmail = (formData: any) => {
  const isVolunteer = formData.businessType?.includes('Volunteer');
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 32px;">New ${isVolunteer ? 'Volunteer' : 'Business'} Application</h1>
        <p style="margin: 10px 0 0; opacity: 0.9;">Femtrics Application System</p>
      </div>
      
      <div style="background: #f9fafb; padding: 40px;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; border-bottom: 2px solid #ec4899; padding-bottom: 10px;">
            ${isVolunteer ? 'Volunteer' : 'Business'} Application Details
          </h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Application Type</h3>
              <p style="color: #1f2937; font-weight: bold; margin: 0;">${isVolunteer ? 'Volunteer' : 'Business'}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Submitted On</h3>
              <p style="color: #1f2937; margin: 0;">${new Date().toLocaleString()}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Full Name</h3>
              <p style="color: #1f2937; margin: 0;">${formData.name}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Email</h3>
              <p style="color: #1f2937; margin: 0;">${formData.email}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">Phone</h3>
              <p style="color: #1f2937; margin: 0;">${formData.phone}</p>
            </div>
            
            <div>
              <h3 style="color: #4b5563; margin: 0 0 5px;">${isVolunteer ? 'Position' : 'Business Type'}</h3>
              <p style="color: #1f2937; margin: 0;">${formData.businessType}</p>
            </div>
            
            ${formData.businessName ? `
              <div>
                <h3 style="color: #4b5563; margin: 0 0 5px;">Business Name</h3>
                <p style="color: #1f2937; margin: 0;">${formData.businessName}</p>
              </div>
            ` : ''}
            
            <div style="grid-column: 1 / -1;">
              <h3 style="color: #4b5563; margin: 0 0 5px;">Message</h3>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin-top: 5px;">
                <p style="color: #374151; margin: 0; white-space: pre-wrap;">${formData.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return {
    to: 'harshinik290@gmail.com',
    subject: `New ${isVolunteer ? 'Volunteer' : 'Business'} Application - ${formData.name}`,
    message: emailContent,
    from: formData.email
  };
};
