// Donor-facing email markup. Tables and inline styles throughout: Outlook
// ignores most modern CSS, and the logo is an inline (cid:) part so it renders
// without the recipient having to unblock remote images.

import { EMAIL_LOGO_CID } from "./emailAssets";

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Gmail draws its own preview card for real attachments, but a linked PDF gets
// nothing — so we render our own.
const buildPdfCard = (url: string, name: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td style="border:1px solid #e8eaf0;border-radius:12px;padding:18px;background:#fbfcfe">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="46" valign="middle" style="background:#E5252A;border-radius:6px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;text-align:center;padding:13px 0;letter-spacing:.5px">PDF</td>
            <td width="14">&nbsp;</td>
            <td valign="middle" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#1a1a1a;word-break:break-all">
              ${escapeHtml(name)}
              <div style="font-size:12px;font-weight:normal;color:#8a93a6;padding-top:3px">Click below to read or download</div>
            </td>
          </tr>
        </table>
        <div style="padding-top:16px">
          <a href="${escapeHtml(
            url
          )}" style="display:inline-block;background:#FFC629;color:#1a1a1a;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;padding:12px 26px;border-radius:8px">View newsletter</a>
        </div>
      </td>
    </tr>
  </table>`;

// `message` is plain text; blank lines split paragraphs and single newlines
// become line breaks. `pdfUrl` is set only in link mode — in attach mode the
// PDF rides along as a real attachment instead.
export const buildHtml = (
  message: string,
  pdfUrl?: string,
  pdfName?: string
) => {
  const blocks = message.split(/\n{2,}/);
  const paragraphs = blocks
    .map((p, i) => {
      // No trailing margin on the last block, or it stacks with the cell
      // padding and leaves a dead gap above the footer rule.
      const margin = i === blocks.length - 1 ? "0" : "0 0 16px";
      return `<p style="margin:${margin}">${escapeHtml(p).replace(
        /\n/g,
        "<br/>"
      )}</p>`;
    })
    .join("");

  return `<div style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e8eaf0">
      <tr>
        <td align="center" style="padding:28px 28px 22px">
          <img src="cid:${EMAIL_LOGO_CID}" alt="Soower" width="180" style="display:block;width:180px;max-width:180px;height:auto;border:0;outline:none;text-decoration:none" />
        </td>
      </tr>
      <tr>
        <td style="height:4px;background:#FFC629;font-size:0;line-height:0">&nbsp;</td>
      </tr>
      <tr>
        <td style="padding:28px;color:#1a1a1a;font-size:15px;line-height:1.7">
          ${paragraphs}
          ${
            pdfUrl
              ? `<div style="padding-top:24px">${buildPdfCard(
                  pdfUrl,
                  pdfName || "Newsletter.pdf"
                )}</div>`
              : ""
          }
        </td>
      </tr>
      <tr>
        <td style="padding:18px 28px;border-top:1px solid #eef0f5;color:#8a93a6;font-size:12px;line-height:1.5">
          You're receiving this email because you supported Soower. Thank you for
          standing with the widows, orphans, and missionaries we serve.
        </td>
      </tr>
    </table>
  </div>`;
};
