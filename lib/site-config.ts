const isGithubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';

export const basePath = isGithubPages ? '/atticapro' : '';
export const siteUrl = isGithubPages ? 'https://vkefallinos.github.io/atticapro' : 'https://atticapro.example.com';

/**
 * next/image with `unoptimized: true` doesn't auto-prefix basePath onto raw
 * string `src` values (unlike next/link or the default image loader), so
 * every local image src needs to go through this.
 */
export function assetPath(path: string) {
  return `${basePath}${path}`;
}

export const siteConfig = {
  name: 'AtticaPro',
  phoneDisplay: '+30 693 159 0153',
  phoneHref: 'tel:+306931590153',
  whatsappHref: 'https://wa.me/306933347282',
  viberHref: 'viber://chat?number=%2B306933347282',
  email: 'info@atticapro.gr',
  formEndpoint: 'https://api.web3forms.com/submit',
  formAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
};
