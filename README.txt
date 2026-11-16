1. Create a free Fixie account (usefixie.com). Copy your Fixie proxy URL and note your two static IPs.
2. In Relworx > Business Account > API Authorized IPs, enter the Fixie IPs.
3. Upload this folder to a new GitHub repo and import it on vercel.com.
4. In Vercel > Settings > Environment Variables add:
   FIXIE_URL = your Fixie proxy URL
   RELAY_SECRET = any long random password
5. Deploy. Your relay address is https://<your-project>.vercel.app/api/relworx
6. Send that address and the RELAY_SECRET to Style District (saved as RELWORX_PROXY_URL / RELWORX_PROXY_SECRET).
