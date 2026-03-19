import { Inject, Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  constructor(@Inject('RESEND_CLIENT') private readonly resend: Resend) {}

  async sendInviteEmails(
    to: string[],
    docID: string,
    inviterName: string,
    docTitle: string,
    role: string,
  ) {
    const emailPromises = to.map((recipient: string) => {
      return this.resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: recipient,
        subject: `You've been invited to collaborate on a document`,
        html: `<p>Hi there,</p>
               <p>${inviterName} has invited you to collaborate on the document "${docTitle}".</p>
               <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
                 <a href="http://localhost:5173/${docID}/document" style="color: white; text-decoration: none;">Click here</a> to view the document.
               </button>
               
               Happy collaborating!

               <h3 style="font-weight: bold;">Insomnia</h3>`,
      });

      // update the document data and assign who's an editor/viewer
    });

    await Promise.all(emailPromises);
  }
}
