import { NextRequest, NextResponse } from 'next/server';

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

    // TODO: In production, send email using service like:
    // - SendGrid
    // - AWS SES
    // - Resend
    // - Nodemailer with SMTP

    // For now, just log the submission
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

    // TODO: Store in database (PostgreSQL, MongoDB, etc.)
    // await db.contactSubmissions.create({ company, email, role, product, inquiry });

    // TODO: Send notification email to sales team
    // await sendEmail({
    //   to: 'info@stratomai.com',
    //   subject: `New ${role} inquiry from ${company}`,
    //   body: `Company: ${company}\nEmail: ${email}\nRole: ${role}\nProduct: ${product}\n\nInquiry:\n${inquiry}`
    // });

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
