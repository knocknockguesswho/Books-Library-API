# Books Library App API

###### tags: `app usage`

| Role              | Id |      Usage                               |
| ----------------- |:---|------------------------------------------|
| Admin             | 1  |Can do everything! Post their own books to be borrowed by Members and another Admin|
| Member            | 2  |Use API to search books that they want to borrow|
| Non-member        | 3  |Can only see all stored books. **Upgrade are allowed.**|

###### note: `All users has their own responsibility.`

## :memo: How to use this API?

:one: **Register**

:two: **Login and get the token**

:three: **Use the given token to use Request Methods**



### Step 1: Register

Users need to decide what they want to do on this API, choose one role on the list then users can creating username, password and **chosen role**. Make sure username are available! Users can easily input the username, password and role on the request body.

![](https://i.imgur.com/20PwfHb.gif)


### Step 2: Login

Go to login endpoint, in my case I use registered user as Admin role and the host was local server on port 3000 **localhost:3000/auth/login**. Users just need to put their own username and password on the request body. If logged in, users will receive token that they need to use to do a request methods (e.g GET, POST, etc).

![](https://i.imgur.com/I9Ld4kS.gif)



>Users paste it to the **Headers** of request methods. 


### Step 3: Using Request Methods

On request methods, for example on '**See All Books**' request on Admin endpoint that was **localhost:3000/admin**, you just need to input your token on Headers field for authorization. If the token is valid, you can use it as role usage that you have registered before. You can add Our Collection to your Postman to see all the request methods of this API for better experience.

>Click on button below to demo this API on Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e4950ca6016991ea4dc7)

![](https://i.imgur.com/t2UrBr7.gif)

# Here is how do our App works

![](https://i.imgur.com/1nv0SeP.png)


## Dependencies:
**Bcrypt 5.0.0**

**Body Parser 1.19.0**

**CORS 2.8.5** *optional*

**Dotenv 8.2.0**

**Express 4.17.1**

**Jsonwebtoken 8.5.1**

**Morgan 1.10.0**

**Multer 1.4.2**

**MySQL 2.18.1**

**Split-Object 2.1.1**

>#### File with .env extention should be ignored, you can make your own .env File.


## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/knocknockguesswho/Books-Library-API/License) file for details
