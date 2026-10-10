export interface WelcomeEmailParams {
  firstName: string;
  websiteUrl: string;
}

export function welcomeEmailForVendorsTemplate({
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
    <meta name="color-scheme" content="light" />
    <title>Welcome to FEXA — Vendor Account</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: Arial, Helvetica, sans-serif;
      color: #0f172a;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="background-color: #f1f5f9; padding: 30px 10px;"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            width="600"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              width: 100%;
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
            "
          >
            <!-- FEXA Logo -->
            <tr>
              <td align="center" style="padding: 28px 20px;">
                <img
                  src="https://res.cloudinary.com/daqmey5dq/image/upload/v1791611726/fexa-logo.svg"
                  alt="FEXA"
                  width="140"
                  style="
                    display: block;
                    width: 140px;
                    max-width: 100%;
                    height: auto;
                    border: 0;
                  "
                />
              </td>
            </tr>

            <!-- Welcome Banner -->
            <tr>
              <td
                align="center"
                style="
                  background-color: #047857;
                  padding: 38px 25px;
                  color: #ffffff;
                "
              >
                <p
                  style="
                    margin: 0 0 12px;
                    color: #d1fae5;
                    font-size: 12px;
                    font-weight: bold;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                  "
                >
                  Welcome to the FEXA Marketplace
                </p>

                <h1
                  style="
                    margin: 0;
                    font-size: 29px;
                    line-height: 1.3;
                    font-weight: bold;
                    color: #ffffff;
                  "
                >
                  Let's Grow Your Business!
                </h1>

                <p
                  style="
                    margin: 14px 0 0;
                    color: #ecfdf5;
                    font-size: 15px;
                    line-height: 1.8;
                  "
                >
                  Your products. Your business. More opportunities.
                </p>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td
                style="
                  padding: 35px 30px;
                  font-size: 15px;
                  line-height: 1.9;
                  color: #475569;
                "
              >
                <p style="margin: 0 0 18px; color: #0f172a;">
                  Hello <strong>${safeFirstName}</strong>,
                </p>

                <p style="margin: 0 0 18px;">
                  Welcome to <strong style="color: #047857;">FEXA!</strong>
                  We're delighted to have you join our growing community of
                  vendors. Thank you for choosing FEXA as a platform to showcase
                  your products, reach customers, and grow your business.
                </p>

                <p style="margin: 0 0 24px;">
                  At FEXA, we believe every business deserves the opportunity
                  to reach more people. Our marketplace is designed to help
                  vendors present their products to customers looking for
                  quality, convenience, and great choices.
                </p>

                <!-- Getting Started Section -->
                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    background-color: #f0fdf4;
                    border: 1px solid #d1fae5;
                    border-radius: 8px;
                    margin: 0 0 25px;
                  "
                >
                  <tr>
                    <td style="padding: 22px 20px;">
                      <h2
                        style="
                          margin: 0 0 16px;
                          color: #065f46;
                          font-size: 18px;
                          line-height: 1.5;
                        "
                      >
                        Get Your Store Ready
                      </h2>

                      <p style="margin: 0 0 14px; font-size: 14px;">
                        <strong style="color: #047857;">
                          01. Complete Your Profile
                        </strong>
                        <br />
                        Add your business information to establish your
                        presence on FEXA.
                      </p>

                      <p style="margin: 0 0 14px; font-size: 14px;">
                        <strong style="color: #047857;">
                          02. Upload Your Products
                        </strong>
                        <br />
                        Add clear product images, accurate descriptions,
                        and competitive prices.
                      </p>

                      <p style="margin: 0; font-size: 14px;">
                        <strong style="color: #047857;">
                          03. Manage Your Store
                        </strong>
                        <br />
                        Keep your listings updated and provide excellent
                        customer service.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="margin: 0 0 24px;">
                  Your journey as a FEXA vendor starts here. Take the next step
                  by visiting your vendor dashboard and preparing your store
                  for customers to discover.
                </p>

                <!-- Dashboard Button -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="margin: 28px 0;"
                >
                  <tr>
                    <td
                      align="center"
                      bgcolor="#047857"
                      style="border-radius: 7px;"
                    >
                      <a
                        href="https://vexa-admin.vercel.app/dashboard"
                        target="_blank"
                        style="
                          display: inline-block;
                          padding: 15px 28px;
                          color: #ffffff;
                          text-decoration: none;
                          font-size: 15px;
                          font-weight: bold;
                          border-radius: 7px;
                        "
                      >
                        Go to Your Vendor Dashboard &rarr;
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 0 0 18px;">
                  If you have any questions or need assistance setting up your
                  store, please contact our support team at
                  <a
                    href="mailto:sharkollymofeoluwa@gmail.com"
                    style="
                      color: #047857;
                      text-decoration: none;
                      font-weight: bold;
                    "
                  >
                    sharkollymofeoluwa@gmail.com
                  </a>.
                  We're here to help.
                </p>

                <p style="margin: 25px 0 0; color: #334155;">
                  Thank you for being part of FEXA. We look forward to
                  supporting your journey and growing together.
                </p>

                <p
                  style="
                    margin: 24px 0 0;
                    color: #334155;
                    line-height: 1.8;
                  "
                >
                  Warm regards,<br />
                  <strong style="color: #047857; font-size: 16px;">
                    The FEXA Team
                  </strong>
                  <br />
                  <span style="color: #64748b; font-size: 13px;">
                    Your Loved Market
                  </span>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  background-color: #f8fafc;
                  border-top: 1px solid #e2e8f0;
                  padding: 24px 20px;
                  color: #64748b;
                  font-size: 12px;
                  line-height: 1.8;
                "
              >
                <p style="margin: 0 0 8px;">
                  <a
                    href="${safeWebsiteUrl}"
                    target="_blank"
                    style="color: #047857; text-decoration: none;"
                  >
                    Visit FEXA
                  </a>
                  &nbsp; | &nbsp;
                  <a
                    href="mailto:sharkollymofeoluwa@gmail.com"
                    style="color: #047857; text-decoration: none;"
                  >
                    Contact Support
                  </a>
                </p>

                <p style="margin: 0 0 8px;">
                  Great products. Great choices. A better shopping experience.
                </p>

                <p style="margin: 0;">
                  &copy; ${new Date().getFullYear()} FEXA. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>  `;
}
