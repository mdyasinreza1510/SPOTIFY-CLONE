<h1> USER REGISTRATION </h1>

1) FIRST WE WILL CREATE A SCHEMA FOR REGISTRING A USER (user.model.js);

2) NOW WELL CREATE APIS FOR THE AUTHENTIATION OF THE USER

3) THEN WE WRITE THE LOGIC FOR THE API IN CONTROLLER FILE (controller.js)

4) THEN WE USE THE PASSWORD HASHING 
    - to use hasing we use a package "bcryptjs"
5) THEN WE GO TO THE CONTROLLERS AND MAKE A VAR TO USE THE B-CRYPT then we pass the password parametr in it.

<h1>USER LOGIN </h1>

1) IN USER LOGIN WERE DEVLOPING A FEATURE WHERE USER CAN CAN VIA EMAIL/USERNAME/PHONE NO.
2) WE'LL WRITE A QUERY WHERE IF ANY ONE OF THE CREDENTIAL IS PASSED THE DB USE THEM TO LOGIN THE USER 
3) ```javascript 
        query={
    $or:[
        {username:undefined}
        {email:mamta@saviour.com}
    ]
}

        user1 ->
        username = modi
        email=modi@chor.com

        user 2 ->
        username = mamtabanerjee
        email=mamta@saviour.com