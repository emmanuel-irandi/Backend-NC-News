/*

the request from the client goes to the server, the server more ales goes to the app,
the app containing the addresses for all our tools, goes to the controller
the controller controlling the flow of information looks to our model
our model is like our outline, our "model example" of what we're supposed to do
the controller recieves the models instructions then passes them back to our app 
our test is able to view this whole process through the app.


we need to enquire our model so that we can invoke its function a couple of lines down, 

like ticket 2, we would be invoking our model function first, 
and then asynchronously running it afterwards with a then, 
so that the objects we're returning have actually been selected through the find article by ID process.

then we just export this so we can bring it back to our app.

*/