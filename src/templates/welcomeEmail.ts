export interface WelcomeEmailParams {
  firstName: string;
  websiteUrl: string;
}

export function welcomeEmailTemplate({
  firstName,
  websiteUrl,
}: WelcomeEmailParams): string {
  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return entities[char];
    });

  const safeFirstName = escapeHtml(firstName || "there");
  const safeWebsiteUrl = escapeHtml(websiteUrl);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to FEXA</title>
      </head>

      <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:30px 10px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;">

                <tr>
                  <td align="center" style="padding:30px 20px;">
                    <img
                    
                      src="https://res.cloudinary.com/daqmey5dq/image/upload/v1791611726/fexa-logo.svg"
                      alt="FEXA"
                      width="140"
                      style="display:block;width:140px;max-width:100%;height:auto;border:0;"
                    />
                  </td>
                </tr>

                <tr>
                  <td align="center" style="background:#047857;padding:35px 20px;color:#ffffff;">
                    <h1 style="margin:0;font-size:28px;">Welcome to FEXA!</h1>
                    <p style="margin:12px 0 0;color: #dbeafe;font-size:15px;">  Great products. Great choices. A better shopping experience.</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:35px 30px;font-size:16px;line-height:1.7;">
                    <p>Hi ${safeFirstName},</p>               

                         <p
                  style="
                    margin: 0 0 18px;
                    color: #475569;
                    font-size: 15px;
                    line-height: 1.9;
                  "
                >
                       Welcome to FEXA! We're excited to have you join our community.
                  Your account has been created successfully, and you're all set
                  to explore a marketplace filled with products for your
                  everyday needs.
                      Discover products, explore great deals, and enjoy a
                      simpler shopping experience.
                    </p>

                     <p
                  style="
                    margin: 0 0 24px;
                    color: #475569;
                    font-size: 15px;
                    line-height: 1.9;
                  "
                >
                  From discovering new favourites to finding great deals, FEXA
                  makes it easier to shop for the things you love. We're glad
                  you're here!
                </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:25px 0;">
                      <tr>
                        <td bgcolor="#047857" style="border-radius:6px;">
                          <a
                            href="${safeWebsiteUrl}"
                            style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-weight:bold;"
                          >
                            Start Shopping
                          </a>
                        </td>
                      </tr>
                    </table>

                      <p
                  style="
                    margin: 0 0 12px;
                    color: #475569;
                    font-size: 14px;
                    line-height: 1.8;
                  "
                >
                  If you need help with your account or have any questions, our
                  team will be happy to assist you.
                </p>


                    <p
                  style="
                    margin: 24px 0 0;
                    color: #334155;
                    font-size: 15px;
                    line-height: 1.8;
                  "
                >
                  Happy shopping!<br />
                  <strong style="color: #047857">The FEXA Team</strong>
                </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="background:#f8fafc;padding:20px;font-size:12px;color:#64748b;">
                    &copy; ${new Date().getFullYear()} FEXA. All rights reserved.
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
