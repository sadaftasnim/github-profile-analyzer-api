# GitHub Profile Analyzer API

## Overview

This project analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a MySQL database.

## Tech Stack

* Node.js
* Express.js
* MySQL
* Axios
* GitHub Public API

## Features

* Analyze GitHub profile by username
* Store profile insights in MySQL
* Update existing profile data automatically
* Fetch all analyzed profiles
* Fetch a single analyzed profile

## API Endpoints

### Analyze Profile

POST /api/github/analyze/:username

Example:

POST [/api/github/analyze/sadaftasnim](http://localhost:3000/api/github/analyze/sadaftasnim)

### Get All Profiles

GET /api/github/profiles 

Example: 

GET [/api/github/profiles](http://localhost:3000/api/github/profiles)

### Get Single Profile

GET /api/github/profiles/:username

Example:

GET [/api/github/profiles/sadaftasnim](http://localhost:3000/api/github/profiles/sadaftasnim)

## Installation

### Clone Repository

git clone https://github.com/sadaftasnim/github-profile-analyzer-api.git

### Install Dependencies

npm install

### Configure Environment Variables

Create .env file:

PORT=3000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=github_analyzer

### Run Application

npm start

## Author

Sadaf Tasnim
