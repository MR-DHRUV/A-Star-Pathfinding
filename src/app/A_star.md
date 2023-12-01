Nothing, its an dijkstras algorithm that uses hueristics or information about search space to avoid searching in redundant directions to find shortest path

Directional search krta h A*
Hueristics can be  
    - Manhatten Distance
    - Eucledian Disatnce
    - chebyshev Distance 
    - Any other related to application -> like traffic etc 

## Algorithm
We have 2 arrays open_set and closed_set where closed_set contains nodes that are processed completely and do not require any further processing 

Algo terminates 
    -1 when open set is empty 
    -2 we have arrived at our destination  
