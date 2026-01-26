import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

def send_contact_email(name, sender_email, message):
    """
    Send an email notification when a contact form is submitted.
    """
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    receiver_email = os.environ.get('RECEIVER_EMAIL', smtp_user)

    if not all([smtp_host, smtp_user, smtp_pass]):
        logger.warning("SMTP credentials not fully configured. Email not sent.")
        return False

    try:
        # Create the email
        msg = MIMEMultipart()
        msg['From'] = smtp_user
        msg['To'] = receiver_email
        msg['Subject'] = f"New Portfolio Contact: {name}"

        body = f"Name: {name}\nEmail: {sender_email}\n\nMessage:\n{message}"
        msg.attach(MIMEText(body, 'plain'))

        # Send the email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        
        logger.info(f"Email sent successfully to {receiver_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False
