Build & Deploy 
Repository on "render" hosting site
The repository used for your Static Site.

https://github.com/shivendradas/HerokuBuddySphereApp

Edit
Branch
The Git branch to build and deploy.


master

Edit
Git Credentials
User providing the credentials to pull the repository.

shivendra_das@rediffmail.com (you)
Use My Credentials
Root DirectoryOptional
If set, Render runs commands from this directory instead of the repository root. Additionally, code changes outside of this directory do not trigger an auto-deploy. Most commonly used with a monorepo.

client

Edit
Build Filters
Include or ignore specific paths in your repo when determining whether to trigger an auto-deploy. Paths are relative to your repo's root directory. Learn more.


Edit
Included Paths
Changes that match these paths will trigger a new build.


Add Included Path
Ignored Paths
Changes that match these paths will not trigger a new build.


Add Ignored Path
Build Command
Render runs this command to build your app before each deploy.

client/ $
npm install && npm run build

Edit