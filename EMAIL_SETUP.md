# 📧 Email System Configuration Guide

## ✅ What's Implemented

The contact form now sends emails using Nodemailer with the following features:
- **Secure SMTP** connection (SSL/TLS)
- **HTML formatted emails** with Stratoma branding
- **Reply-to functionality** (replies go to the customer)
- **Spam protection** (honeypot field)
- **Form validation**

## 🔧 Coolify Configuration

### Step 1: Access Coolify Dashboard
1. Go to your Coolify instance
2. Navigate to your Stratoma project
3. Go to **Environment Variables** section

### Step 2: Add Email Variables

Add these environment variables in Coolify:

```bash
EMAIL_HOST=mail.stratomai.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=info@stratomai.com
EMAIL_PASS=Moneyroll7+
EMAIL_FROM=info@stratomai.com
EMAIL_TO=stratoma.ai@gmail.com
```

**Important Security Notes:**
- ✅ Variables are secure in Coolify (encrypted)
- ✅ NOT pushed to GitHub
- ✅ Only visible in production environment

### Step 3: Alternative Ports

If port 587 doesn't work, try SSL port:

```bash
EMAIL_PORT=465
EMAIL_SECURE=true
```

Or standard SMTP:

```bash
EMAIL_PORT=25
EMAIL_SECURE=false
```

## 📨 How It Works

### When someone fills the contact form:

1. **Form submission** → `/api/contact` endpoint
2. **Validation** → Checks required fields, email format, role
3. **Email sent** → Beautiful HTML email to `stratoma.ai@gmail.com`
4. **Success response** → User sees confirmation message

### Email Template Features:

- 🎨 **Branded header** with blue/green gradient
- 📋 **All form details** formatted nicely
- 📧 **Reply-to** set to customer email
- 🕐 **Timestamp** and IP address for tracking
- 📱 **Mobile responsive** HTML

## 🧪 Testing in Production

Once deployed, test the contact form at:
```
https://stratomai.com/#contact
```

Fill out the form and check `stratoma.ai@gmail.com` for the email!

## 🔒 Security Features

- ✅ **Environment variables** (no credentials in code)
- ✅ **Honeypot field** (blocks bots)
- ✅ **Email validation** (regex check)
- ✅ **Role validation** (only buyer/seller/mandate)
- ✅ **TLS encryption** (secure connection)
- ✅ **Input sanitization** (prevents XSS)

## 📊 Email Preview

**Subject:** `New buyer inquiry from [Company Name]`

**Content:**
- Company name
- Customer email (with reply-to)
- Role (Buyer/Seller/Mandate)
- Product of interest
- Full inquiry message
- Timestamp and IP address

## 🐛 Troubleshooting

### Email not arriving?

1. **Check Coolify logs:**
   - Look for "Email sent successfully" or "Failed to send email"

2. **Verify environment variables:**
   - All 6 variables must be set correctly

3. **Check spam folder** in Gmail

4. **Port issues:**
   - Try different ports (25, 465, 587)
   - Some hosting providers block SMTP ports

5. **Test SMTP credentials:**
   - Use Thunderbird or another email client
   - Verify credentials work manually

### Alternative: Use a Third-Party Service

If cPanel email doesn't work, consider:

- **Resend** (5,000 emails/month free)
- **SendGrid** (100 emails/day free)
- **AWS SES** (very cheap)

I can help you integrate any of these if needed!

## 📝 Next Steps

1. ✅ Code is deployed to GitHub main branch
2. ⏳ Coolify will auto-deploy (check deployment status)
3. 🔧 Add environment variables in Coolify
4. 🧪 Test the contact form
5. 📧 Check your email!

---

**Need help?** The implementation is ready - just needs environment variables configured in Coolify.
