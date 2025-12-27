import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple honeypot-based spam prevention
// In production, add reCAPTCHA or more sophisticated validation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { company, email, role, product, inquiry, honeypot } = body;

    // Honeypot field - if filled, it's a bot
    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // Validate required fields
    if (!company || !email || !role || !inquiry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate role
    const validRoles = ['buyer', 'seller', 'mandate'];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Log the submission
    console.log('Contact form submission:', {
      company,
      email,
      role,
      product,
      inquiry,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
    });

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false, // For self-signed certificates
      },
    });

    // Email content
    const mailOptions = {
      from: `"Stratoma Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New ${role} inquiry from ${company}`,
      text: `
New contact form submission from Stratoma Interchange website:

Company: ${company}
Email: ${email}
Role: ${role}
Product of Interest: ${product || 'Not specified'}

Inquiry:
${inquiry}

---
Submitted: ${new Date().toISOString()}
IP: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0066CC 0%, #2E7D32 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #0066CC; margin-bottom: 5px; }
    .value { background: white; padding: 12px; border-left: 4px solid #0066CC; border-radius: 4px; }
    .inquiry { background: white; padding: 15px; border-left: 4px solid #2E7D32; border-radius: 4px; white-space: pre-wrap; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #dee2e6; font-size: 12px; color: #6c757d; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0;">Stratoma Interchange</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Company:</div>
        <div class="value">${company}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Role:</div>
        <div class="value">${role.charAt(0).toUpperCase() + role.slice(1)}</div>
      </div>
      ${product ? `
      <div class="field">
        <div class="label">Product of Interest:</div>
        <div class="value">${product}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Inquiry:</div>
        <div class="inquiry">${inquiry}</div>
      </div>
      <div class="footer">
        <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC<br>
        <strong>IP Address:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', process.env.EMAIL_TO);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails - log it instead
      // In production, you might want to queue this for retry
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry. We will contact you shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
