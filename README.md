# Shuttle Booking System

**Project Description**

The Shuttle Booking System allows drivers to register and publish their vehicles, making it easy for passengers to book a ride. Passengers can view driver details and select a shuttle. The booking form automatically captures the passenger’s current location and destination, calculates the fare based on the distance and the driver’s rate per kilometer, and displays the total charge to the passenger.

**Features**

*Driver Portal:*

1. Register and log in as a driver.
2. Publish vehicle details for passengers to book.

*Passenger Functionality:*

1. View available drivers and their vehicle details.
2. Book a shuttle by entering current location and destination.
3. Automatically calculate fare based on the distance and the driver's rate per kilometer.

*Technology Stack*

1. Backend: Node.js, Express.js
2. Frontend: EJS (Embedded JavaScript templates)
3. Database: MongoDB
4. Google Maps API: Used for location services and distance calculation.

   *Installation and Setup*

   1. Clone the repository: *git clone https://github.com/Jayranking/shuttle-booking.git*
   2. Navigate to the project directory: *cd shuttle-booking*
   3. Install the dependencies: *npm install*
   4. Set up environment variables in a .env file:
  
      APP_PORT = 5001

      DB_URI = mongodb://127.0.0.1:27017/shuttle
      
      TOKEN_SECRET = ""





