import { Inject, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    @Inject('RESEND_CLIENT') private readonly resend: Resend,
    private configService: ConfigService,
  ) {}

  async sendInviteEmails(
    to: string,
    docID: string,
    inviterName: string,
    docTitle: string,
    role: string,
  ) {
    await this.resend.emails.send({
      from: this.configService.get('FROM_EMAIL')!,
      to,
      subject: `You've been invited to collaborate on a document`,
      html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Invitation</title>
          </head>
          <body style="margin: 0; padding: 20px; background-color: #ffffff;">
            
            <p style="font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 16px 0;">
              Hello,
            </p>

            <p style="font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 16px 0;">
              <strong>${inviterName}</strong> has invited you to collaborate on the document 
              "<strong>${docTitle}</strong>" with <strong>${role.toLowerCase()}</strong> access.
            </p>

            <p style="font-family: Arial, sans-serif; font-size: 14px; margin: 0 0 24px 0;">
              To review and begin collaborating, please use the button below:
            </p>

            <p style="text-align: center; margin: 30px 0;">
              <a 
                href="${this.configService.get('FRONTEND_URL')}/${docID}/document"
                style="
                  display: inline-block;
                  background-color: #111827;
                  color: #ffffff;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-family: Arial, sans-serif;
                  font-size: 14px;
                  font-weight: 600;
                  border: 1px solid #374151;
                "
              >
                View Document
              </a>
            </p>

            <p style="font-family: Arial, sans-serif; font-size: 14px; margin: 24px 0 0 0;">
              We look forward to your collaboration.
            </p>

            <p style="font-family: Arial, sans-serif; font-size: 12px; color: #9ca3af; margin-top: 40px;">
              This is an automated message; please do not reply.
            </p>

            <!-- Slightly larger branding text -->
            <p style="font-family: Arial, sans-serif; font-size: 18px; font-weight: 600; margin-top: 12px;">
              Insomnia
            </p>

          </body>
        </html>`,
    });
  }
}
