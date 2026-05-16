export const BASE_URL = 
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : (process.env.NEXT_PUBLIC_SITE_URL || 'https://aurews.id.vn');

export const DEFAULT_IMAGE = "https://res.cloudinary.com/docpflk0p/image/upload/v1778733016/aurews/bzgyf35n62herkehu9jy.png";

export const CONTACT_EMAIL = "23520904@gm.uit.edu.vn";
export const FACEBOOK_PAGE = "https://www.facebook.com/profile.php?id=61589167535017";
