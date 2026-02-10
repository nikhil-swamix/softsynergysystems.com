# Project History

## Initial Deployment

**Goal**: Deploy softsynergysystems.com to OCI instance with Caddy web server

### Actions Taken

1. **File Deployment**
   - Used rsync to copy files from `/root/softsynergysystems.com` to `oci:/var/www/softsynergysystems.com/`
   - SSH alias: `ssh oci`
   - DNS already pointed to server

2. **Caddy Configuration**
   - Created modular Caddy setup with sites-available/sites-enabled pattern
   - Main config: `/etc/caddy/Caddyfile` (imports from sites-enabled/*.conf)
   - Site configs stored in `/etc/caddy/sites-available/`
   - Enabled sites via symlinks in `/etc/caddy/sites-enabled/`

3. **Sites Configured**

   **softsynergysystems.com.conf**
   ```caddyfile
   softsynergysystems.com {
       root * /var/www/softsynergysystems.com
       file_server
       encode gzip
   }
   ```

   **swamix.com.conf** (restored after initial config loss)
   ```caddyfile
   swamix.com {
       root * /var/www/swamix.com
       file_server
       encode gzip
   }
   ```

   **mustknow.news.conf** (from /srv frontend)
   ```caddyfile
   mustknow.news {
       root * /srv/mustknow/frontend
       file_server
       encode gzip

       @static {
           path *.js *.css *.png *.jpg *.jpeg *.svg *.ico *.woff *.woff2 *.json
       }
       header @static Cache-Control "public, max-age=31536000, immutable"

       header X-Content-Type-Options "nosniff"
       header X-Frame-Options "DENY"
       header Referrer-Policy "strict-origin-when-cross-origin"

       try_files {path} /index.html
   }

   www.mustknow.news {
       redir https://mustknow.news{uri} permanent
   }
   ```

4. **Deployment Script**
   - Created [`deploy.sh`](deploy.sh) for instant deployment
   ```bash
   #!/bin/bash
   rsync -avz --delete --progress \
       --exclude='.claude' \
       --exclude='deploy.sh' \
       . oci:/var/www/softsynergysystems.com/
   ```

5. **File Convention**
   - Renamed `SamplePage.html` → `index.html` (standard web convention)
   - Permissions: `ubuntu:ubuntu` ownership for rsync compatibility

### Issues Resolved

| Issue | Solution |
|-------|----------|
| Permission denied renaming SamplePage.html | Used `sudo mv` |
| Lost existing Caddy config (swamix.com) | Restored modular config with both sites |
| Rsync permission errors | Changed ownership to `ubuntu:ubuntu` |
| HTTP 404 errors | Renamed to index.html per standard convention |

### Verification

All sites confirmed working:
- ✅ https://softsynergysystems.com
- ✅ https://swamix.com
- ✅ https://mustknow.news

SSL provided automatically via Let's Encrypt through Caddy.
