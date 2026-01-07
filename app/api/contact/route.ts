import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Simple honeypot-based spam prevention
// In production, add reCAPTCHA or more sophisticated validation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract form fields - support both old and new format
    const {
      nombre,
      name,
      email,
      empresa,
      company,
      telefono,
      phone,
      servicio,
      service,
      mensaje,
      message,
      inquiry,
      role,
      product,
      honeypot,
    } = body;

    // Use new field names with fallback to old ones
    const contactName = nombre || name;
    const contactEmail = email;
    const contactCompany = empresa || company;
    const contactPhone = telefono || phone;
    const contactService = servicio || service;
    const contactMessage = mensaje || message || inquiry;

    // Honeypot field - if filled, it's a bot
    if (honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    // Validate required fields
    if (!contactName || !contactEmail || !contactMessage) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: 'Dirección de email inválida' },
        { status: 400 }
      );
    }

    // Log the submission
    console.log('Contact form submission:', {
      name: contactName,
      email: contactEmail,
      company: contactCompany,
      phone: contactPhone,
      service: contactService,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
    });

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email content
    const emailSubject = `Nueva consulta de ${contactName}${contactCompany ? ` - ${contactCompany}` : ''}`;
    const emailText = `
Nueva consulta desde ScaleOps Automation:

Nombre: ${contactName}
Email: ${contactEmail}
${contactCompany ? `Empresa: ${contactCompany}` : ''}
${contactPhone ? `Teléfono: ${contactPhone}` : ''}
${contactService ? `Servicio de interés: ${contactService}` : ''}

Mensaje:
${contactMessage}

---
Enviado: ${new Date().toISOString()}
IP: ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
User Agent: ${request.headers.get('user-agent') || 'Unknown'}
      `.trim();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6 0%, #22c55e 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #3b82f6; margin-bottom: 5px; }
    .value { background: white; padding: 12px; border-left: 4px solid #3b82f6; border-radius: 4px; }
    .inquiry { background: white; padding: 15px; border-left: 4px solid #22c55e; border-radius: 4px; white-space: pre-wrap; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #dee2e6; font-size: 12px; color: #6c757d; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Nueva Consulta</h1>
      <p style="margin: 10px 0 0 0;">ScaleOps Automation</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Nombre:</div>
        <div class="value">${contactName}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${contactEmail}">${contactEmail}</a></div>
      </div>
      ${contactCompany ? `
      <div class="field">
        <div class="label">Empresa:</div>
        <div class="value">${contactCompany}</div>
      </div>
      ` : ''}
      ${contactPhone ? `
      <div class="field">
        <div class="label">Teléfono:</div>
        <div class="value">${contactPhone}</div>
      </div>
      ` : ''}
      ${contactService ? `
      <div class="field">
        <div class="label">Servicio de interés:</div>
        <div class="value">${contactService}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Mensaje:</div>
        <div class="inquiry">${contactMessage}</div>
      </div>
      <div class="footer">
        <strong>Enviado:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} (Madrid)<br>
        <strong>IP:</strong> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'}
      </div>
    </div>
  </div>
</body>
</html>
      `.trim();

    // Send email with Resend
    try {
      const data = await resend.emails.send({
        from: process.env.RESEND_FROM || 'ScaleOps Contact <onboarding@resend.dev>',
        to: process.env.RESEND_TO || 'info@scaleops.com',
        replyTo: contactEmail,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });
      console.log('Email sent successfully:', data);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails - log it instead
      // In production, you might want to queue this for retry
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Gracias por tu consulta. Te responderemos pronto.',
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
