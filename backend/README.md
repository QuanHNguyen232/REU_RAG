# Backend

Done until 31:31 ([tutorial](https://youtu.be/wrHTcjSZQ1Y))

Start project:
1. Initialize the project using command, which generates `package.json`:
    ```bash
    npm init --yes
    ```
1. Following this [Medium](https://medium.com/@brailyguzman/mern-typescript-setup-guide-af1500100d4b)
    * Use this command to install dependencies:
        ```bash
        npm install bcrypt concurrently cookie-parser cors dotenv express express-validator jsonwebtoken mongoose openai
        ```
    * Use this to install typescript dependencies:
        ```bash
        npm install -D @types/bcrypt @types/cookie-parser @types/cors @types/express @types/jsonwebtoken @types/node nodemon ts-node typescript
        ```
    Those commands above will auto update the `package.json` file.
    
    ***NOTE***: later, after having `package.json` file, just use `npm install`.