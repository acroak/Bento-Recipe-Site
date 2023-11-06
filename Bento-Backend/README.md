A repo for our Group Project backend

# Iter 3

[Frontend Deployment](https://codemaineia-summer2023-fe.uc.r.appspot.com/) \
[Frontend Repo](https://github.khoury.northeastern.edu/NEU-CS5610-SU23/CodeMaineia-Summer2023-Frontend) \
[Backend Deployment](https://codemaineia-summer2023-backend.uc.r.appspot.com/api/v1/recipes/)

For Iteration 3 we did not need to edit the backend beyond removing old comments.

The backend is complete as it is now.

# Iter 2

For Iteration 2 we did not need to update the backend.\
It is mostly complete as it is now.

# Iter 1

As a group we met together and pair programmed the backend.\
Below are some screenshots of some of the endpoints in insomnia:

![comments-backend](https://media.github.khoury.northeastern.edu/user/11233/files/f63e50a5-a06a-40b5-90f9-84d453fe5f58)

![recipe-all-backend](https://media.github.khoury.northeastern.edu/user/11233/files/145356d3-7e90-485f-87d7-a13d134434d0)

![recipe-id-backend](https://media.github.khoury.northeastern.edu/user/11233/files/fb7aae52-a18d-4d0e-bc30-d8108d0e966a)

### Progress
We have completed the general functionality of the backend, although we do have some stretch goals that we may
return to later if we have time.

#### Stretch Goals
* Ability to Add/Edit recipes
* Add additional queries to the dataset beyond title and category
* Query the recipes you have specifically made

### General Notes

###### DAO 
MongoDB queries
$text is looking for a text based 'index' of the Database collection\
Currently we have the index just on the titles of the recipes.\
If you want to add more to the search, we will need to make it 'compound'.\
Look at movie_db for reference, it did that. 
