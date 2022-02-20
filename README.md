# Maze

**Features;**

=> Right path appears step by step

**Process;**

=> There are two stage in this code;

    - Creating the path
    - Creating the detours

=> Steps

    - Size of the area given at the top as *Size* variable
    
    - First function creates an area of box, gives every box a coordinate as x and y

    - Creating path starts from the top left box (0,0). Assigns that box as *previous* 

    - Logic of the function is finding a next box by checking every box around. To check, runs the *Choices* function. To get the surrounding boxes, uses the coordinates of the current box and adds or substract 1 from the x and y of the current box.

    - Evaluate the choices by; if the next box does not exist (-1,0), or already visited.

    - After the evaluation, adds the choices to an array called *next*. If there is any item in next array, gets a random number based on length of next, adds *path* class to that box.

    - Add that box to *way* array to use later to show the correct path. Calls *Next* function

    - *Next* function is about the walls between boxes. Gets the coordinate of the both boxes as previous and next, then checks for the relative positions of these boxes. Make the proper walls disappear. Adds the next to *exits* array. Assing next to previous.  

    - While loop inside the *CreatePath* function continues. Assign new x and y from the coordinates of the box as *next* variable (see line 93-94)

    *Dead Ends*

    - Choices runs again. If there is no avalible choice, add dead class to that box, delete that box from the exits array, remove path class. This makes sures (dead class) that the box will not be visited again. Gets the box before and continue from the coordinates of that box.
    assign the 2 box before to the previous variable. 

    - While loop stops when the path hits the bottom right end.

    *Detour*

    - Checks the path again. If any box has another avalible next box, creates another path from that box. 
    
    - Does the same things with the original path. Does not ad *path* class. Stops when there is no other box avalible (line 283)

    - When *Show* button clicked, gets the *way* array, remove if there is a dead end. Creates small circles and adds to the path. Run again in every 0.1 second.


