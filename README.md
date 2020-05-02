# login_page
## Website allow user to submit their secret anonymously.
## main focus on various level of authentication used
## - level 1 : is basic authentication user data stored on db server directly as it is
## - level 2 : is using mongoose plugin to encrypt data while storing on db server 
## - level 2.5:  use of environment variables
## - level 3 : is using md5 hashing to hash password before storing on db server
## - level 4: bcrypt is used for hashing and salting
## - level 5: passport js is used 
## - level 6: along with passport js , oauth2.0 is used to authorize user.
